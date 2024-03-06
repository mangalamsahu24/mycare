// file-upload.component.ts
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFile: File | undefined;
  files: any[] = [];

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit() {
    this.getFiles();
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response: any) => {
          console.log(response.message);
          this.getFiles();
        },
        (error) => {
          console.error('File upload error:', error);
        }
      );
    }
  }

  getFiles() {
    this.fileUploadService.getFiles().subscribe(
      (response: any) => {
        this.files = response;
      },
      (error) => {
        console.error('Error fetching files:', error);
      }
    );
  }
}
