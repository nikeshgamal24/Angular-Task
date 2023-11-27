import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { Customer } from '../../Customer';

// For MatDialog
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CustomerAddDialogComponent } from '../customer-add-dialog/customer-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule,MatFormFieldModule,MatDialogModule,MatInputModule,FormsModule,CustomerAddDialogComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

     customers:Customer[] = [
      {
          customerId: 1,
          name: "Customer A",
          insertDate: "2023-11-24",
          isEdit:false,
      },
      {
          customerId: 2,
          name: "Customer B",
          insertDate: "2023-11-23",
          isEdit:false,
      },
      {
          customerId: 3,
          name: "Customer C",
          insertDate: "2023-11-22",
          isEdit:false,
      },
  ];


  displayedColumns: string[] = ['customerId', 'name', 'insertDate','action'];
  dataSource = [...this.customers];
  
  constructor(private matDialog:MatDialog){}
  
  openDialog(){
   const dialogRef =  this.matDialog.open(CustomerAddDialogComponent,{
        width:'500px',
        height:'600px'
    });
    dialogRef.componentInstance.customerAdd.subscribe((detail: Customer) => {
      this.addCustomerDetails(detail,dialogRef);
    });
    
  }

  openEditDialog(customerDetail:Customer){
    const editDialogRef = this.matDialog.open(CustomerEditDialogComponent,{
      width:'500px',
      height:'600px',
      data:customerDetail
    });
    console.log(customerDetail);

    editDialogRef.componentInstance.updateEditedData.subscribe((updatedDetail:Customer)=>{
      this.updateCustomerDetail(updatedDetail,editDialogRef);
    });
  }


  addCustomerDetails(detail:Customer,dialogRef:any){
    let lengthOfProducts = this.customers.length;
    detail.customerId = lengthOfProducts+1;
    this.customers.push(detail); 
    this.dataSource = [...this.customers]; 
    dialogRef.close();
  }

  updateCustomerDetail(updatedDetail:Customer,dialogRef:any){
    this.dataSource = [...this.customers]; 
    dialogRef.close();
  }

   // delete Row
   deleteRow(row: Customer) {
    console.log(row);
    const index = this.customers.indexOf(row);
    console.log(index);
    this.customers.splice(index,1);
    this.dataSource = [...this.customers];
  }
}
