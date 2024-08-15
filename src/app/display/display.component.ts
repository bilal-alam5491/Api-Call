import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { IDisplay } from './displayInterface';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  apiData: IDisplay[] = [];
  flag: boolean = false;

  status: string = 'Loading ';

  constructor(private _service: ApiCallService) {}

  ngOnInit(): void {
    // this._service.getData().subscribe((resData) => {
    //   return (this.apiData = resData);
    // }),
    //   (err: any) => {
    //     this.status = 'Fail to load'
    //     console.log(err);
    //   };
    this._service.getData().subscribe({
      next: (resData) => {
        this.apiData = resData;
        if (resData.length === 0) {
          this.status = 'No data to display';
        } else {
          this.status = '';
        }
      },
      error: (err) => {
        this.status = 'Failed to load';
        console.error('Error occurred:', err);
      },
    });
  }

  show() {
    console.log(this.apiData);
    this.flag = true;
  }
}
