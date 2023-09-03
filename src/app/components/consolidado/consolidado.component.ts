import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {

  consolidado?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.consolidado = this.uploadService.getConsolidado();
  }

}
