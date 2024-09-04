import { ContentSections } from "./contentSection";

export class ContentType {
    iD?: number;
    title?: string;
    description?: string;
    linkHP?: string;
    link2?: string;
    title1?: string;
    title2?: string;
    title3?: string;
    isActive?:boolean;
    contentSections?:ContentSections[];
}
