import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {
  private http = inject(HttpClient);

  constructor() {}

  downloadFile(fileUrl: string): Observable<Blob> {
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  downloadPdf() {
    const fileUrl = '/api/wp-content/uploads/2019/06/pdf-file-for-example.pdf'; // Update to your file URL
    this.downloadFile(fileUrl).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_file.pdf'; // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      err => {
        // Download the fallback URL as a Blob
        fetch('/api/wp-content/uploads/2019/06/pdf-file-for-example.pdf')
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'downloaded_file.pdf'; // Name of the file to be downloaded
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Error downloading fallback file:', error);
          });
      }
    );
  }
}

