import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { IProduct } from './productInterface';
import { delay, retryWhen, tap, scan } from 'rxjs/operators';
import { isSubscription, Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product!: IProduct;
  status: string = 'Loading, Please Wait';

  subscription: Subscription = new Subscription();

  constructor(
    private _productService: ApiCallService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  backButton() {
    this._router.navigate(['/display']);
  }

  cancelRequest() {
    this.status = 'Request Cancelled';
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let product_code = this._activatedRoute.snapshot.params['productCode'];
    this.subscription = this._productService
      .getDataPerId(product_code)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            scan((retryCount: any, err: any) => {
              if (retryCount >= 4) {
                throw err; // After 5 attempts, throw the error
              } else {
                retryCount++;
                console.log(`Retrying attempt #${retryCount}`);
                return retryCount;
              }
            }, 0), // Initial retry count set to 0
            delay(2000) // Delay before retrying
          );
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res == null) {
            this.status = 'No Record Found';
          } else {
            this.product = res;
            this.status = ''; // Clear status if data is loaded
          }
        },
        error: (err: any) => {
          this.status = 'Problem with Api';
          console.log(err);
        },
      });
  }
}
