import { Hmos } from './../../models/hmos-model';
import { HmosService } from './../../services/hmos.service/hmos.service';
import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../../services/download-file.service/download-file.service';

@Component({
  selector: 'app-hmos',
  templateUrl: './hmos.component.html',
  styleUrl: './hmos.component.scss'
})
export class HmosComponent implements OnInit {
  hmosList?: Hmos[];
  constructor(private _downloadService: DownloadFileService, private _hmoService: HmosService) { }


  ngOnInit(): void {
    this._hmoService.getAllHmosFromServer().subscribe((data) => {
      this.hmosList = data;
      console.log("get all function")
      console.log( this.hmosList)

    },
      (err) => {
        console.log("error from get Hmos From Server function");
      }

    )

// //test server function'all of them corret

//     this._hmoService.getHmosByIdFromServer(16).subscribe((data) => {
//       console.log("get by id function")

//       console.log(data)
//     }, (err) => {
//       console.log("error from get by id Hmos From Server function");
//     })

//     this._hmoService.addHmosToServer(this.x).subscribe((data)=>{
//       console.log("add function")
//       console.log(data)
//     },
//     (err)=>{
//       console.log("error from add Hmos From Server function");
//     })
    
//     this._hmoService.updateHmosInServer(this.x).subscribe((data)=>{
//       console.log("update function")
//       console.log(data)
//     },(err)=>{
//       console.log("error from update Hmos From Server function");

//     })

//     this._hmoService.deleteHmoFromServer(40).subscribe((data)=>{
//       console.log("delete function")
//       console.log(data)
//     },(err)=>{
//       console.log("error from delete Hmos From Server function");

//     })
    // Initialization logic here
    console.log('data from NgOnInit');
  }
  // x: Hmos={
  //   ID: 0,
  //   title: "try",
  //   isActive: true,
  //   arrangementName: "try",
  //   trainingsPerMonth: 5,
  //   trainingPrice: 0,
  //  minimumAge: 10,
  //   maximumAge: 0,
  //   trainingDescription: "try"};

  downloadFile(): void {
   
    this._downloadService.downloadPdf();
  }
}
