import { forwardRef } from "react";
import { FileInputProps } from "./types";
import { Plus } from "lucide-react";

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ disabled, onFileSelect}: FileInputProps, ref) => {
    return (<>
    <input 
    type="file"
    ref={ref}
    onChange={onFileSelect}
    className="hidden"
    id="file-upload"
    disabled={disabled}
    multiple
    />
    <label
    htmlFor="file-upload"
    className="flex cursor-printer bg-grayscsale-500 items-center gap-2 px-2 py-1 rounded-md hover:opacity"
    >
        <Plus size={18} />
        Select Files
    </label>

    </>)
});
