import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Invoice } from '../../Invoice';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';


@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatTableModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent {
  constructor(private matDialog: MatDialog) {
    console.log('Invoice Component');
  }

  // selection model
  selection = new SelectionModel<Invoice>(true, []);

  invoices: Invoice[] = [
    {
      invoiceId: 1,
      invoiceNumber: 'INV-001',
      customer: 'ABC Company',
      invoiceAmount: 1500.0,
      invoiceDate: '2023-11-01',
      salesInfo: [
        {
          salesId: 101,
          customer: 'ABC Company',
          rate: 50.0,
          quantity: 20,
          salesAmount: 1000.0,
        },
        {
          salesId: 102,
          customer: 'ABC Company',
          rate: 25.0,
          quantity: 20,
          salesAmount: 500.0,
        },
      ],
    },
    {
      invoiceId: 2,
      invoiceNumber: 'INV-002',
      customer: 'XYZ Corporation',
      invoiceAmount: 2000.0,
      invoiceDate: '2023-11-05',
      salesInfo: [
        {
          salesId: 201,
          customer: 'XYZ Corporation',
          rate: 75.0,
          quantity: 20,
          salesAmount: 1500.0,
        },
        {
          salesId: 202,
          customer: 'XYZ Corporation',
          rate: 50.0,
          quantity: 10,
          salesAmount: 500.0,
        },
      ],
    },
    {
      invoiceId: 3,
      invoiceNumber: 'INV-003',
      customer: '123 Enterprises',
      invoiceAmount: 2100.0,
      invoiceDate: '2023-11-10',
      salesInfo: [
        {
          salesId: 301,
          customer: '123 Enterprises',
          rate: 60.0,
          quantity: 15,
          salesAmount: 900.0,
        },
        {
          salesId: 302,
          customer: '123 Enterprises',
          rate: 40.0,
          quantity: 30,
          salesAmount: 1200.0,
        },
      ],
    },
  ];

  displayedColumns: string[] = [
    'select',
    'invoiceId',
    'invoiceNumber',
    'customer',
    'invoiceAmount',
    'invoiceDate',
  ];
  dataSource = [...this.invoices];

  generateInvoice() {
    const newProductDialog = this.matDialog.open(InvoiceDialogComponent, {
      width: '800px',
      height: '450px',
      data: {data:[...this.selection.selected], titleOfInvoiceDetail: 'Invoice Details',titleOfInvoiceSummary: 'Invoice Summary', buttonText: 'Print' },
    });

    // newProductDialog.componentInstance.addNewInvoice.subscribe(
    //   (details: Invoice) => {
    //     this.addCreatedProduct(details, newProductDialog);
    //   }
    // );
  }

  // addCreatedProduct(details: Invoice, dialogRef: any) {
  //   // console.log( this.productsDetails.length);
  //   details.invoiceId = this.invoices.length + 1;
  //   this.invoices.push(details);
  //   // console.log('Newly created product');
  //   // console.log(this.productsDetails);
  //   this.dataSource = [...this.invoices];
  //   dialogRef.close();
  // }

  // for chechbox methods
  toggleRowState(row: Invoice) {
    console.log(this.selection.selected?.length);
   this.selection.selected?.length===0?this.selection.toggle(row):this.selection.deselect;
    console.log('selecton model');
    console.log(this.selection.selected);
  }
}
