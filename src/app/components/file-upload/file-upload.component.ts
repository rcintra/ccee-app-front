import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }

  selectFile(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }

    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
        this.uploadService.upload(file).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              const msg = "Upload do arquivo com sucesso: " + file.name;
              this.message.push(msg);
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            this.progressInfos[idx].value = 0;
            const msg = "Não foi possivel fazer o upload do arquivo " + file.name;
            this.message.push(msg);
            this.fileInfos = this.uploadService.getFiles();
        });
    }
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

}
