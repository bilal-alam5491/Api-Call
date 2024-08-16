import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { IProduct } from './productInterface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product!: IProduct;
  status: string = 'Loading, Please Wait';

  constructor(
    private _productService: ApiCallService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let product_code = this._activatedRoute.snapshot.params['productCode'];
    this._productService.getDataPerId(product_code).subscribe({
      next: (res) => {
        if (res == null) {
          this.status = 'No Record Found';
        } else {
          this.product = res;
          this.status = ''; // Clear status if data is loaded
        }
      },
      error: (err) => {
        this.status = 'Problem with Api';
        console.log(err);
      },
    });
  }
}
