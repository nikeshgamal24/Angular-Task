import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../Invoice';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-invoice-table',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.css'
})


export class InvoiceTableComponent {

  @Input() newInvoice:any;
  // dataSource:any
  constructor(){
    console.log('this.newInvoice');
    console.log(this.newInvoice);
  }

  displayedColumns:string []=['productId','productName','total','date'];
  // dataSource = [newInvoice];


}
