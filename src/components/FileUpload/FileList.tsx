import { FileItem } from "./FileItem"
import { FileListProps } from "./types"

export const FileList = ({files, onRemove, uploading}: FileListProps) => {
    if(files.length === 0) {
        return
    }

    return (
        <div className="space-y-2">
            <h3 className="font-semibold">Files: </h3>
            <div>
                {files.map((file) => (
                    <FileItem
                    key={file.id}
                    file={file}
                    onRemove={onRemove}
                    uploading={uploading}
                    />
                ))}
            </div>
        </div>
    )
}
