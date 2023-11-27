import { Routes } from '@angular/router';
import { CustomersComponent } from './MyComponents/customers/customers.component';
import { ProductsComponent } from './MyComponents/products/products.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { SalesComponent } from './MyComponents/sales/sales.component';
import { InvoiceComponent } from './MyComponents/invoice/invoice.component';

export const routes: Routes = [
    {path:'',title:'Home', component:HomeComponent},
    {path:'customers',title:'Customers', component:CustomersComponent},
    {path:'products',title:'Products', component:ProductsComponent},
    {path:'sales',title:'Sales', component:SalesComponent},
    {path:'invoices',title:'Invoices', component:InvoiceComponent}
];
