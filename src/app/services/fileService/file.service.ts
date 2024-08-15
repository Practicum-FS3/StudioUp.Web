import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = `https://localhost:7101/api/FileUpload`;

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/UploadFile`, formData).pipe(
      catchError(this.handleError)
    );;
  }

  getFile(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/GetFileById/${id}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  deleteFile(id: number): Observable<void> {
    console.log("deleteFile");
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}