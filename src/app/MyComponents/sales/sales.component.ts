import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../Sale';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SaleDialogComponent } from '../sale-dialog/sale-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { InvoiceComponent } from '../invoice/invoice.component';
import { InvoiceTableComponent } from '../invoice-table/invoice-table.component';
import { Invoice } from '../../Invoice';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceTableComponent,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    InvoiceComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent {
  constructor(private matDialog: MatDialog) {}

  @Output() emitInvoice: EventEmitter<Sale> = new EventEmitter();

  selection = new SelectionModel<Sale>(true, []);

  salesList: Sale[] = [
    {
      productId: 1,
      product: 'Item A',
      rate: 10,
      quantity: 5,
      total: 50,
      insertDate: '2023-11-25',
    },
    {
      productId: 2,
      product: 'Item B',
      rate: 15,
      quantity: 3,
      total: 45,
      insertDate: '2023-11-24',
    },
    {
      productId: 3,
      product: 'Item C',
      rate: 20,
      quantity: 2,
      total: 40,
      insertDate: '2023-11-23',
    },
  ];

  displayedColumns: string[] = [
    'select',
    'productId',
    'productName',
    'rate',
    'quantity',
    'total',
    'date',
    'action',
  ];
  dataSource = [...this.salesList];
  generatedInvoiceDetails: any;

  openAddSaleDialog() {
    const newSaleDialog = this.matDialog.open(SaleDialogComponent, {
      width: '500px',
      height: '600px',
      data: { title: 'Add New Sale', buttonText: 'Create Sale' },
    });

    newSaleDialog.componentInstance.addNewSale.subscribe((details: Sale) => {
      this.addCreatedSale(details, newSaleDialog);
    });
  }

  addCreatedSale(details: Sale, dialogRef: any) {
    // console.log( this.productsDetails.length);
    details.productId = this.salesList.length + 1;
    this.salesList.push(details);
    // console.log('Newly created product');
    // console.log(this.productsDetails);
    this.dataSource = [...this.salesList];
    dialogRef.close();
  }

  openDialogToEdit(saleDetails: Sale) {
    // console.log({...productDetails,isEdit:true});
    const editDialog = this.matDialog.open(SaleDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        ...saleDetails,
        isEdit: true,
        title: 'Edit Sale Data',
        buttonText: 'Update Data',
      },
    });

    editDialog.componentInstance.updateSaleDetails.subscribe(
      (details: Sale) => {
        this.udpateProductDetails(details, editDialog);
      }
    );
  }

  udpateProductDetails(details: Sale, editDialog: any) {
    console.log(details);
    const updatedProductDetails = this.salesList.map((obj) => {
      if (obj.productId == details.productId) {
        obj.product = details.product;
        obj.rate = details.rate;
        obj.quantity = details.quantity;
        obj.total = details.rate * details.quantity;
        obj.insertDate = details.insertDate;
      }
    });

    this.dataSource = [...this.salesList];
    editDialog.close();
  }

  // delete Row
  deleteRow(row: Sale) {
    console.log(row);
    const index = this.salesList.indexOf(row);
    console.log(index);
    this.salesList.splice(index,1);
    this.dataSource = [...this.salesList];
  }

  // functions for checkbox
  toggleRow(sale: Sale) {
    this.selection.toggle(sale); // this will toggle the selection of the row
    console.log(this.selection);
  }

  isSelectAll() {
    return this.selection.selected?.length === this.salesList.length;
  }

  toggleAll() {
    if (this.isSelectAll()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.salesList);
    }
  }

  generateInvoice() {
    this.generatedInvoiceDetails = this.selection.selected;
    console.log('this.generatedInvoiceDetails');
    console.log(...this.generatedInvoiceDetails);
    this.emitInvoice.emit(...this.generatedInvoiceDetails);
    this.selection.clear();
  }
}
