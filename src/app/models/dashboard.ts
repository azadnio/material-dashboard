import { Type } from "@angular/core";

export type TWidget = {
    id: string;
    label: string;
    content: Type<unknown>;
}