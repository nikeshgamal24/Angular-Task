import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../Product';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './product-add-dialog.component.html',
  styleUrl: './product-add-dialog.component.css',
})
export class ProductAddDialogComponent {
  name!: string;
  rate!: number;
  stock!: number;
  inputData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
    this.inputData = data;
    if (data.isEdit) {
      this.name = data.productName;
      this.rate = data.productRate;
      this.stock = data.available;
    }
  }

  @Output() addNewProduct: EventEmitter<Product> = new EventEmitter();
  @Output() updateProductDetails: EventEmitter<Product> = new EventEmitter();

  submitProductDetails() {
    if (this.data.isEdit) {
      // console.log('Updated Data');
      this.data.productName = this.name;
      this.data.productRate = this.rate;
      this.data.available = this.stock;

      const updatedDetails = {
        productId: this.data.productId,
        productName: this.name,
        productRate: this.rate,
        available: this.stock,
      };
      // console.log(updatedDetails);
      this.updateProductDetails.emit(updatedDetails);
    } else {
      const newProductDetails = {
        productId: 2,
        productName: this.name,
        productRate: this.rate,
        available: this.stock,
      };
      this.addNewProduct.emit(newProductDetails);
    }
  }
}
