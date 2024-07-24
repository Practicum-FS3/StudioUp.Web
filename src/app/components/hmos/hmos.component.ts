import { Component } from '@angular/core';
import { DownloadFileService } from '../../services/download-file.service/download-file.service';

@Component({
  selector: 'app-hmos',
  templateUrl: './hmos.component.html',
  styleUrl: './hmos.component.scss'
})
export class HmosComponent {

  constructor(private _downloadService: DownloadFileService) {}

  downloadFile() {
    this._downloadService.downloadPdf();
  }}
