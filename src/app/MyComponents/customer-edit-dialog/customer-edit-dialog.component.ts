import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../Customer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './customer-edit-dialog.component.html',
  styleUrl: './customer-edit-dialog.component.css'
})
export class CustomerEditDialogComponent {
  url: string = 'http://localhost:5307/api' + '/Customer';
  customerName: string = '';
  insertDate!: Date;
  customerId!: number;
  inputData: any;
  todaysDate: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
    this.inputData = data;
    
    if (data.isEdit) {
      console.log(data.insertDate);
      this.customerId = data.customerId;
      this.customerName = data.customerName;
      this.insertDate = data.insertDate;
    }
  }

  OnInit() {
    this.setTodayDate();
  }
  setTodayDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.todaysDate = `${year}-${month}-${day}`;
  }

  @Output() updateEditedData: EventEmitter<Customer> = new EventEmitter();

  submitEditedData(form:any) {
    // console.log(this.data);
    // this.data.name = this.customerName;
    // this.data.insertDate= this.insertDate;
    console.log('form');
    console.log(form.value);
    const updatedCustomerDetails = {
      customerId: this.customerId,
      customerName: form.value.customerName,
      insertDate: this.insertDate.toString()
    }
    console.log("updatedCustomerDetails");
    console.log(updatedCustomerDetails);
    console.log(this.customerId);
    this.http.put(this.url + "/" + this.customerId, updatedCustomerDetails).subscribe((details: any) => {
      console.log(details);
      console.log('put function');
      this.updateEditedData.emit(details);
    });
  }

}
