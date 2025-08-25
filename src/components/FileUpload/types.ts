import { ChangeEvent } from "react";

export type FileWithProgress = {
    id: string;
    file: File;
    progress: number;
    uploaded: boolean;
};

export type FileInputProps = {
    disabled: boolean;
    onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void; //This is the onChange function that you use in the input element, therefore the event object being passed is of type ChangeEvent<HTMLInputElement>
}

export type FileListProps = {
    files: FileWithProgress[];
    onRemove: (id: string) => void;
    uploading: boolean;
}

export type FileItemProps = {
    file: FileWithProgress;
    onRemove: (id: string) => void;
    uploading: boolean;
}

export type ProgressBarProps = {
    progress: number;
}

export type ActionButtonsProps = {
    disabled:  boolean;
    onUpload: () => void;
    onClear: () => void;
}