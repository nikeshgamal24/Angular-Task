import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '../../Customer';

// For MatDialog
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
import { CustomerAddDialogComponent } from '../customer-add-dialog/customer-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatDialogModule, HttpClientModule, MatInputModule, CustomerAddDialogComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  constructor(private matDialog: MatDialog, private http: HttpClient) {
    this.getCustomerDetails();
   }
  customers: any = [];

  getCustomerDetails() {
    this.http.get('http://localhost:5307/api/Customer').subscribe(data => {
    console.log(data);
    this.customers = data;
    this.dataSource = [...this.customers];
    console.log(this.dataSource);
    });
  }


  displayedColumns: string[] = ['customerId', 'name', 'insertDate', 'action'];
  dataSource = [...this.customers];


  openDialog() {
    const dialogRef = this.matDialog.open(CustomerAddDialogComponent, {
      width: '500px',
      height: '600px'
    });
    
    dialogRef.componentInstance.customerAdd.subscribe((detail: Customer) => {
      console.log('editDialogRef function');
      this.addCustomerDetails(detail, dialogRef);
    });

  }

  openEditDialog(customerDetail:any) {
    console.log(customerDetail);
    const editDialogRef = this.matDialog.open(CustomerEditDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        ...customerDetail,
        isEdit: true,
      },
    });
    

    editDialogRef.componentInstance.updateEditedData.subscribe((updatedDetail: Customer) => {
      this.updateCustomerDetail(updatedDetail, editDialogRef);
      console.log("editDialogRef");
    });
  }


  addCustomerDetails(detail: Customer, dialogRef: any) {
    let lengthOfCustomers = this.customers.length;
    console.log('addingCustomerDetails function');
    detail.customerId = lengthOfCustomers + 1;
    this.customers.push(detail);
    this.dataSource = [...this.customers];
    dialogRef.close();
  }

  updateCustomerDetail(updatedDetail: Customer, dialogRef: any) {
    console.log('updatedDetail');
    console.log(updatedDetail);
    // this.dataSource = [...this.customers];
    dialogRef.close();
    this.customers.map((obj:any) => {
      if (obj.customerId == updatedDetail.customerId) {
        obj.customerId = updatedDetail.customerId;
        obj.customerName = updatedDetail.customerName;
        obj.insertDate = updatedDetail.insertDate;
      }
    });

    this.dataSource = [...this.customers];
    dialogRef.close();
  }

  // delete Row
  deleteRow(row: Customer) {
    // console.log(row);
    const index = this.customers.indexOf(row);
    const customerId = row.customerId;
    console.log(customerId);
    var url = "http://localhost:5307/api";
    console.log(url);
    this.http.delete(url+"/"+"Customer"+"/"+customerId).subscribe(customersDetails => {
      console.log(customersDetails)
    this.getCustomerDetails();
      });
  
  }
}
