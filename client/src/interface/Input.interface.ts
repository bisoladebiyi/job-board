import { ChangeEvent } from "react";

export interface IInput {
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string;
    name?: string;
    value?: string;
}