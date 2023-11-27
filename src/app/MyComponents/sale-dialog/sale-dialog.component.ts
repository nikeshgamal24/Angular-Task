import { Component, EventEmitter, Inject,OnInit,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../Sale';

@Component({
  selector: 'app-sale-dialog',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatButtonModule,FormsModule,MatInputModule],
  templateUrl: './sale-dialog.component.html',
  styleUrl: './sale-dialog.component.css'
})
export class SaleDialogComponent implements OnInit{
  name!: string;
  rate!: number;
  quantity!: number;
  date!:Date;
  
  inputData: any;

  todaysDate: string; // Assuming date is a string type

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
    this.inputData = data;
    
    if (data.isEdit) {
      console.log(data.product);
      this.name = data.product;
      this.rate = data.rate;
      this.quantity = data.quantity;
      this.date = data.insertDate;

    }
  }


  ngOnInit(): void {
    this.setTodayDate();
  }

  setTodayDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.todaysDate = `${year}-${month}-${day}`;
  }


  @Output() addNewSale: EventEmitter<Sale> = new EventEmitter();
  @Output() updateSaleDetails: EventEmitter<Sale> = new EventEmitter();

  submitSaleDetails() {
    if (this.data.isEdit) {
      console.log('Updated Data');
      this.data.product = this.name;
      this.data.rate = this.rate;
      this.data.quantity = this.quantity;
      this.data.insertDate = this.date.toString();

      const updatedDetails = {
        productId: this.data.productId,
        product: this.name,
        rate: this.rate,
        quantity:this.quantity,
        total:this.rate*this.quantity,
        insertDate: this.date.toString(),
      };
      // console.log(updatedDetails);
      this.updateSaleDetails.emit(updatedDetails);
    } else {
      const newSaleDetails = {
        productId: 2,
        product: this.name,
        rate: this.rate,
        quantity: this.quantity,
        total: this.rate*this.quantity,
        insertDate:this.date.toString(),
      };
      this.addNewSale.emit(newSaleDetails);
    }
  }

}
