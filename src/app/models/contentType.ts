import { ContentSections } from "./contentSection";

export class ContentType {
    id?: number;
    title?: string;
    description?: string;
    linkHP?: string;
    link2?: string;
    title1?: string;
    title2?: string;
    title3?: string;
    contentSections?:ContentSections[];
}
