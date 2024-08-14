export interface FileDownload {
    fileName: string;
    contentType: string;
    data: Blob; // או ArrayBuffer אם זה מתאים יותר
}