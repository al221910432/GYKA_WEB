import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = "https://gykabackendfinal-production.up.railway.app/api/user/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
          
  }

  getUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(USER_API,{params: params})
  }


  updateProfile(id: number,firstname: string,lastname:string,email:string,country:string,state:string,address: string,phone: number):Observable<any>{
    return  this.http.put(USER_API + 'update/' +id,{firstname,lastname,country,address,state,phone,email},httpOptions);
  }

  changePassword(username: string, oldPassword: string,newPassword: string):Observable<any>{
    return this.http.put(USER_API + 'password',{username,oldPassword,newPassword},httpOptions);
  }

}
