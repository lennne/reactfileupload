import { ChangeEvent, forwardRef, useRef, useState } from "react";
import { ActionButtonsProps, FileInputProps, FileItemProps, FileListProps, FileWithProgress, ProgressBarProps } from "./types";
import { FileAudio, FileIcon, FileImage, FileText, FileVideo, Plus, Upload, X } from "lucide-react";
import axios from "axios";
import { ProgressBar } from "./ProgressBar";
import { FileList } from "./FileList";
import { ActionsButtons } from "./ActionsButtons";
import { FileInput } from "./FileInput";

const FileUpload = () => {

    const [files, SetFiles] = useState<FileWithProgress[]>([])
    const [disabled, SetDisabled] = useState(false);
    //input ref for the normal HTML element
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, SetUploading] = useState(false);

    const handleClear = () => {
        SetFiles([]);
    }

    const handleUpload = async () => {
        if(files.length === 0 || uploading) {
            return;
        }
        SetUploading(true);

        const uploadPromise = files.map(async(fileWithProgress) => {
            const formData = new FormData();
            formData.append('file', fileWithProgress.file);

            try{
                await axios.post('https://kobiansah-3000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const total = progressEvent.total ?? 1
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / total
                        )
                        SetFiles((prevFiles) =>
                            prevFiles.map((file) => file.id === fileWithProgress.id ? {...file, progress} : file)
                        )
                    }
                })
                SetFiles((prevFiles) => 
            prevFiles.map((file) => 
            file.id === fileWithProgress.id ?  {...file, uploaded: true} : file,
            )
         )
            }catch(error){
                console.error(error);
            }
        })
        
        await Promise.all(uploadPromise); 
        SetUploading(false)
    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files?.length){
            return;
        }
        const newFiles = Array.from(e.target.files).map((file) => ({
            file,
            id: file.name,
            progress: 0,
            uploaded: false
        }));

        SetFiles([...files, ...newFiles])
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    const removeFile = (id: string) => {
        SetFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    }

    return ( 
    <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">File Upload</h2>
        <div className="flex gap-2">
        <FileInput
        ref={inputRef}
        disabled={uploading}
        onFileSelect={handleFileSelect}/>
        </div>
        <ActionsButtons
        onUpload={handleUpload}
        onClear={handleClear}
        disabled={files.length === 0 ||  uploading}
        />
        <FileList files={files} onRemove={removeFile} uploading={uploading}/>
    </div>
    
     );
}


export default FileUpload;