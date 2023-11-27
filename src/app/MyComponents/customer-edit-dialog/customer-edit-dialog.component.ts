import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../Customer';

@Component({
  selector: 'app-customer-edit-dialog',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './customer-edit-dialog.component.html',
  styleUrl: './customer-edit-dialog.component.css'
})
export class CustomerEditDialogComponent {
  name:string ='';
  date!:Date;
  inputData:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){

    this.name=data.name;
    this.date=data.insertDate;
  }
 
  @Output() updateEditedData:EventEmitter<Customer>= new EventEmitter();

  submitEditedData(){
    console.log(this.data);
    this.data.name = this.name;
    this.data.insertDate= this.date;
    console.log(this.data);
    this.updateEditedData.emit(this.data);
  }

}
