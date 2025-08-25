import { ChangeEvent, useRef, useState } from "react";
import { FileWithProgress } from "./types";
import axios from "axios";
import { FileList } from "./FileList";
import { ActionsButtons } from "./ActionsButtons";
import { FileInput } from "./FileInput";


const FileUpload = () => {
    const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL;
    const [files, SetFiles] = useState<FileWithProgress[]>([])
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
                await axios.post(UPLOAD_URL, formData, {
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
        
        <ActionsButtons
        onUpload={handleUpload}
        onClear={handleClear}
        disabled={files.length === 0 ||  uploading}
        />
        </div>
        <FileList files={files} onRemove={removeFile} uploading={uploading}/>
    </div>
    
     );
}


export default FileUpload;