import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_class/order';
import { OrderDetail } from '../_class/order-detail';

const ORDER_API = "https://gykabackendfinal-production.up.railway.app/api/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }


  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }

  placeOrder(firstname: string,lastname:string,country:string,address: string,town: string,state:string,postCode:number,phone:number,email:string,note:string,orderDetails: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'create',{firstname,lastname,country,address,town,state,postCode,phone,email,note,orderDetails,username},httpOptions);
  }

  updateOrder(id: number, status: string, diaentrega: string, diapedido:string, diapago:string, diaenvio:string, seguimiento:string){
    return  this.http.put(ORDER_API + 'update/' +id,{status,diaentrega,diapedido,diapago,diaenvio,seguimiento},httpOptions);
  }

  updateOrderClient(id: number, firstname: string,lastname:string,country:string,address: string,town: string,state:string,postCode:number,phone:number,email:string,note:string){
    return  this.http.put(ORDER_API + 'update/' +id,{firstname,lastname,country,address,town,state,postCode,phone,email,note},httpOptions);
  }
}
