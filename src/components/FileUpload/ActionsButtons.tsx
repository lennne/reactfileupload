import { Upload } from "lucide-react"
import { ActionButtonsProps } from "./types"

export const ActionsButtons = ({ onUpload, onClear, disabled}: ActionButtonsProps) => {
    return (
        <>
            <button
            onClick={onUpload}
            disabled={disabled}
            className="flex items-center gaps-2"
            >
                <Upload size={18} />
                Upload
            </button>
            <button
            onClick={onClear}
            disabled={disabled}
            className="flex items-center gap-2"
            >
                Clear All
            </button>
        </>
    )
}