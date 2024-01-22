// file-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:3000/upload', formData);
  }

  getFiles() {
    return this.http.get('http://localhost:3000/files');
  }
}