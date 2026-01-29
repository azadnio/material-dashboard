import { Type } from "@angular/core";

export type TWidget = {
    id: string;
    label: string;
    content: Type<unknown>;
    rows?: number;
    cols?: number;
    backgroundColor?: string;
    textColor?: string;
}