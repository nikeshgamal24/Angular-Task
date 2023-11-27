import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../Product';
// import { Products } from '../../Customer';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private matDialog: MatDialog) {}

  productsDetails: Product[] = [
    {
      productId: 1,
      productName: 'ProductABC',
      productRate: 19.99,
      available: 50,
    },
    {
      productId: 2,
      productName: 'ProductXYZ',
      productRate: 29.99,
      available: 25,
    },
    {
      productId: 3,
      productName: 'Product123',
      productRate: 16.99,
      available: 27,
    },
  ];

  displayedColumns: string[] = [
    'ProductId',
    'ProductName',
    'Rate',
    'Available',
    'action',
  ];
  dataSource = [...this.productsDetails];

  openAddProductDialog() {
    const newProductDialog = this.matDialog.open(ProductAddDialogComponent, {
      width: '500px',
      height: '600px',
      data: { title: 'Add New Product', buttonText: 'Create Product' },
    });

    newProductDialog.componentInstance.addNewProduct.subscribe(
      (details: Product) => {
        this.addCreatedProduct(details, newProductDialog);
      }
    );
  }

  addCreatedProduct(details: Product, dialogRef: any) {
    // console.log( this.productsDetails.length);
    details.productId = this.productsDetails.length + 1;
    this.productsDetails.push(details);
    // console.log('Newly created product');
    // console.log(this.productsDetails);
    this.dataSource = [...this.productsDetails];
    dialogRef.close();
  }

  openDialogToEdit(productDetails: Product) {
    // console.log({...productDetails,isEdit:true});
    const editDialog = this.matDialog.open(ProductAddDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        ...productDetails,
        isEdit: true,
        title: 'Edit Product Data',
        buttonText: 'Update Data',
      },
    });
    editDialog.componentInstance.updateProductDetails.subscribe(
      (details: Product) => {
        this.udpateProductDetails(details, editDialog);
      }
    );
  }

  udpateProductDetails(details: Product, editDialog: any) {
    // console.log(details);
    const updatedProductDetails = this.productsDetails.map((obj) => {
      if (obj.productId == details.productId) {
        obj.productName = details.productName;
        obj.productRate = details.productRate;
        obj.available = details.available;
      }
    });

    this.dataSource = [...this.productsDetails];
    editDialog.close();
  }



    // delete Row
    deleteRow(row: Product) {
      console.log(row);
      const index = this.productsDetails.indexOf(row);
      console.log(index);
      this.productsDetails.splice(index,1);
      this.dataSource = [...this.productsDetails];
    }
  
}


