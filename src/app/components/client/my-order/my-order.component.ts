import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {


  displayForm: boolean = false;



  onUpdate : boolean = false;

  categoryForm : any ={
    id: null,
    firstname : null,
    lastname: null,
    country: null,
    address: null,
    town: null,
    state: null,
    postCode: null,
    phone: null,
    email: null,
    note: null
    
    
  }

  listOrder:any;
  username: any;
  constructor(private orderService: OrderService,private storageService: StorageService){}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getListOrder();
  }

  getListOrder(){
    this.orderService.getListOrderByUser(this.username).subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
  
    
    this.onUpdate = false;
    
    this.categoryForm ={
      id: null,
      firstname : null,
      lastname: null,
      country: null,
      address: null,
      town: null,
      state: null,
      postCode: null,
      phone: null,
      email: null,
      note: null
  
   
      

    }
    this.displayForm = true;
  }

  onUpdateForm(id: number,firstname: string,lastname:string,country:string,address: string,town: string,state:string,postCode:number,phone:number,email:string,note:string){
    this.onUpdate = true;
    this.displayForm =true;
    this.categoryForm.id = id;
    this.categoryForm.firstname = firstname;
    this.categoryForm.lastname = lastname;
    this.categoryForm.country = country;
    this.categoryForm.address = address;
    this.categoryForm.town = town;
    this.categoryForm.state = state;
    this.categoryForm.postCode = postCode;
    this.categoryForm.phone = phone;
    this.categoryForm.email = email;
    this.categoryForm.note = note;
  

}

updateCategory(){
    
  const {id,firstname,lastname,country,address,town,state,postCode,phone,email,note} = this.categoryForm;
  this.orderService.updateOrderClient(id,firstname,lastname,country,address,town,state,postCode,phone,email,note).subscribe({
    next: res =>{
      this.getListOrder();
      
      this.displayForm = false;
    },error: err =>{
      console.log("no sirve")
    }
  })
}

}
