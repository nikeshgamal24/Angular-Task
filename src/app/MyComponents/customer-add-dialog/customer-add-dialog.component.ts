import { Component,Output,EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
// import { Customer } from '../../Customer';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../Customer';
import { CustomersComponent } from '../customers/customers.component';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-add-dialog',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './customer-add-dialog.component.html',
  styleUrl: './customer-add-dialog.component.css'
})
export class CustomerAddDialogComponent {
  customerName!:string;
  insertDate!:Date;
  url:string = 'http://localhost:5307/api'+'/Customer';

  constructor(private http:HttpClient){
    
  }

  @Output() customerAdd:EventEmitter<any>= new EventEmitter();

  
  addCustomer(form:any){
    console.log("Add Customer Button Clicked");
    console.log(form.value);
    console.log(this.insertDate.toString());
    const customerDetails= {
      customerId:6,
      customerName:form.value.customerName,
      insertDate:this.insertDate.toString()
    }
    console.log(customerDetails);
    // // console.log(product);
    this.http.post(this.url,customerDetails).subscribe((details:any)=>{
      console.log(details);
      console.log('post function');
      this.customerAdd.emit(details);
    });
    // // this.dialogRef.close(product);
  }
}
