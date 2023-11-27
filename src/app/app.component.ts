import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Store } from './Store';
import { User } from './User';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
// for dialog we import
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,FormsModule,RouterLink,RouterLinkActive,RouterOutlet,MatDialogModule],
})
export class AppComponent {
  stores:Store[] | undefined;
  users:User[] | undefined;

  title = 'my-app';
  username!:string;
  password!: string;
constructor(){
  this.stores = [
   { 
    storeName: "SuperMart",
    storePassword: "super123" 
   },
   { 
    storeName: "TechHaven", 
    storePassword: "tech123" 
  }
 ];

  this.users = [
  // Users for SuperMart
  { 
    personId: 1,
    username: "user1_supermart",
    firstname: "John",
    lastname: "Doe",
  },
  { 
    personId: 2,
    username: "user2_supermart",
    firstname: "Alice",
    lastname: "Smith",
  },
  { 
    personId: 3,
    username: "user3_supermart",
    firstname: "Emily",
    lastname: "Johnson",
  },
  // Users for Tech Haven
  { 
    personId: 4,
    username: "user1_techhaven",
    firstname: "Michael",
    lastname: "Brown",
  },
  { 
    personId: 5,
    username: "user2_techhaven",
    firstname: "Sophia",
    lastname: "Miller",
  },
  { 
    personId: 6,
    username: "user3_techhaven",
    firstname: "David",
    lastname: "Wilson",
  }
];
}

 onSubmit(){
  // console.log("Form is submitted");
  // console.log(this.username,this.password);
  // console.log(this.stores);
  // let providedStore ={
  //   storeName: this.username,
  //   storePassword: this.password
  // }

  // console.log('Provided Store:', providedStore);
  // console.log('Stores:', this.stores);
  // console.log(this.stores!.includes(providedStore));

  // if(this.stores!.includes(providedStore)){
  //   console.log(providedStore);
  //   console.log('You are logged In Successfully');
  //   console.log(this.username,this.password);
  // }else{
  //   console.log(providedStore);
  //   console.log(this.username,this.password);
  //   console.log("Please! Enter valid credentials");
  // }
 
 
  // Working login
  let flag=0;

  for(let store of this.stores!){
  console.log(store);
  if(store.storeName === this.username && store.storePassword===this.password){
      flag=1;
      break;
  }
  }
  // console.log(flag);
  flag==1?console.log('You are logged In Successfully'):console.log("Please! Enter valid credentials");
 }

 
}
