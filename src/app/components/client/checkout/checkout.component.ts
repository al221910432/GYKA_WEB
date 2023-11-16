import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_class/order';
import { OrderDetail } from 'src/app/_class/order-detail';

import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';
import Swal from 'sweetalert2';

declare var paypal:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]

})
export class CheckoutComponent implements OnInit {

  @ViewChild('paypal', { static: true}) paypalElement : ElementRef | undefined;

  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] =[];
  username !: string;

  orderForm :any ={
    firstname: null,
    lastname : null,
    country : null,
    addrest : null,
    town : null,
    state : null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }

  constructor(public cartService: CartService,private orderService:OrderService,private storageService: StorageService, private router: Router,){
    
  }
  comprar() {

    
    Swal.fire({
      title: '¡Compra realizada con éxito!',
      text: 'Gracias por su compra.',
      icon: 'success',
      confirmButtonColor: '#6f6f6f'
    });
  }
  

  ngOnInit(): void {
    paypal.Buttons({
      createOrder: (data:any,actions:any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount:  {
                currency_code: 'MXN',
                value : this.cartService.total
              }
            }
          ]
        })
      },
      onApprove:async (data:any,actions:any) => {
        const order = await actions.order.capture();
        this.cartService.items.forEach(res =>{
          let orderDetail : OrderDetail = new OrderDetail;
          orderDetail.name = res.name;
          orderDetail.price = res.price;
          orderDetail.quantity = res.quantity;
          orderDetail.subTotal = res.subTotal;
          this.listOrderDetail.push(orderDetail);
        })
    
        const {firstname,lastname,country,address,town,state,postCode,phone,email,note} = this.orderForm;
        this.orderService.placeOrder(firstname,lastname,country,address,town,state,postCode,phone,email,note,this.listOrderDetail,this.username).subscribe({
          next: res =>{
            this.cartService.clearCart();
          }
        })
        Swal.fire({
          title: '¡Compra realizada con éxito!',
          text: 'Gracias por su compra.',
          icon: 'success',
          confirmButtonColor: 'rgba(255,69,0,.8)'
        });
        console.log(order);
        this.router.navigate(['/my-order']);
        
      },
      onError: (err: any) => {
        console.log(err)
      }
    })
    .render(this.paypalElement?.nativeElement);


    
    this.username = this.storageService.getUser().username;
    this.cartService.getItems();
    console.log(this.username);
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  validarLogin(): boolean {
    if (this.orderForm.firstname.length < 1) {
      alert('Se requiere de un nombre');
      return false;
    }
   
    if (this.orderForm.lastname.length <1 ) {
      alert('Se requiere de una contraseña');
      return false;
    }
    return true;
  }

  

  placeOrder(){
    
    

   

  }


}
