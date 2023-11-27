import { Component,Output,EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../Customer';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-add-dialog',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './customer-add-dialog.component.html',
  styleUrl: './customer-add-dialog.component.css'
})
export class CustomerAddDialogComponent {
  name!:string;
  date!:Date;

  @Output() customerAdd:EventEmitter<Customer>= new EventEmitter();

  
  addCustomer(){
    console.log("Add Customer Button Clicked");
    console.log(this.name,this.date);
    const product= {
      customerId:4,
      name:this.name,
      insertDate:this.date.toString(),
      isEdit:false
    }
    // console.log(product);
    this.customerAdd.emit(product);
    // this.dialogRef.close(product);
  }
}
