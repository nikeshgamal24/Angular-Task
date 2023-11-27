import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../Invoice';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-invoice-dialog',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatButtonModule,FormsModule,MatInputModule,MatTableModule],
  templateUrl: './invoice-dialog.component.html',
  styleUrl: './invoice-dialog.component.css'
})

export class InvoiceDialogComponent implements OnInit{
  customer!: string;
  invoiceAmount!: number;
  invoiceDate!: string;
  
  inputData: any;

  todaysDate: string; // Assuming date is a string type

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.inputData = data;
    console.log(this.data.data);
  }



  displayedColumnstitleOfInvoiceDetail:string []=['salesId', 'customer', 'rate', 'quantity', 'salesAmount',];
  dataSourceInvoiceDetails = [...this.data.data[0].salesInfo];
 
  displayedColumnstitleOfInvoiceSummary:string []=['invoiceId','invoiceNumber','customer', 'invoiceAmount', 'invoiceDate'];
  dataSourceInvoiceSummary = [...this.data.data];

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

}

