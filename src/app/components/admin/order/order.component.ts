import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from 'src/app/_service/order.service';




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {





  displayForm: boolean = false;



  onUpdate : boolean = false;

  categoryForm : any ={
    id: null,
    status : null,
    diaentrega: null,
    diapedido: null,
    diapago: null,
    diaenvio: null,
    seguimiento: null
    
    
  }


  listOrder: any;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder() {
    this.orderService.getListOrder().subscribe({
      next: res => {
        this.listOrder = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

 


  showForm(){
  
    
    this.onUpdate = false;
    
    this.categoryForm ={
      id: null,
    status : null,
    diaentrega: null,
    diapedido: null,
    diapago: null,
    diaenvio: null,
    seguimiento: null
  
   
      

    }
    this.displayForm = true;
  }

  onUpdateForm(id: number, status: string, diaentrega:string, diapedido: string, diapago:string, diaenvio:string, seguimiento:string){
    this.onUpdate = true;
    this.displayForm =true;
    this.categoryForm.id = id;
    this.categoryForm.status = status;
    this.categoryForm.diaentrega = diaentrega;
    this.categoryForm.diapedido = diapedido;
    this.categoryForm.diapago = diapago;
    this.categoryForm.diaenvio = diaenvio;
    this.categoryForm.seguimiento = seguimiento;
  

}

updateCategory(){
    
  const {id,status,diaentrega,diapedido,diapago,diaenvio,seguimiento} = this.categoryForm;
  this.orderService.updateOrder(id,status,diaentrega,diapedido,diapago,diaenvio,seguimiento).subscribe({
    next: res =>{
      this.getListOrder();
      
      this.displayForm = false;
    },error: err =>{
      console.log("no sirve")
    }
  })
}


}
