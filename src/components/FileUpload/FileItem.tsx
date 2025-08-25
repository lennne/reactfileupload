import { X } from "lucide-react";
import { FileItemProps } from "./types";
import { ProgressBar } from "./ProgressBar";
import { formatFileSize, getFileIcon } from "../../lib/utils";


export const FileItem = ({file, onRemove, uploading}: FileItemProps ) => {
    const Icon = getFileIcon(file.file.type);

    return (
        <div className="space-y-2 rounded-md bg-grayscale-700 p-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Icon size={40} className="text-primary-500" />
                    <div className="flex flex-col">
                        <span className="font-medium">{file.file.name}</span>
                        <div className="flex items-center gap-2 text-xs text-grayscale-400">
                            <span>{formatFileSize(file.file.size)}</span>
                            <span>•</span>
                            <span>{file.file.type || 'Unknown Type'}</span>
                        </div>
                    </div>
                </div>
                {!uploading && (
                    <button onClick={() => onRemove(file.id)} className="!bg-none !p-0">
                        <X size={16} className="text-white " />
                    </button>
                )}
            </div>
            <div className="text-right text-xs">
                {file.uploaded ? 'completed' : `${Math.round(file.progress)}%`}
                <ProgressBar progress={file.progress}/>
            </div>
        </div>
    )
}
