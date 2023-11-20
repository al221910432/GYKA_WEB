import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import {faBars, faHeart, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons'
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { CartService } from 'src/app/_service/cart.service';
import { CategoryService } from 'src/app/_service/category.service';
import { StorageService } from 'src/app/_service/storage.service';
import { WishlistService } from 'src/app/_service/wishlist.service';
import { UserService } from 'src/app/_service/user.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService]

})
export class IndexComponent implements OnInit {

  username: any;
    user :any;
    

  
    
   getUser(){
      this.userService.getUser(this.username).subscribe({
        next: res=>{
          this.user = res;
          this.user.email;
        },error : err =>{
          console.log(err);
        }
      })
    }








  listItemInCart: any[] = [];
  totalPrice = 0;
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  userIcon = faUser;
  logoutIcon = faRightFromBracket;
  bars = faBars;
  showDepartment = false;



  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
    
  }

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  authModal : boolean = false;
  listCategoryEnabled : any;


  keyword: any;

  constructor(
    public cartService:CartService,
    public wishlistService: WishlistService,
    private authService: AuthService,
    private storageService: StorageService,
    private messageService:MessageService,
    private categoryService: CategoryService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient){

  }


  checkEmailExists(email: string) {
    return this.http.get<boolean>(`https://gykabackendfinal-production.up.railway.app/api/user/check-email-exists/${email}`);
  }

  checkUserExists(username: string) {
    return this.http.get<boolean>(`https://gykabackendfinal-production.up.railway.app/api/user/check-username-exists/${username}`);
  }
  
  


  ngOnInit(): void {

    
   

    this.getCategoryEnbled();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.wishlistService.loadWishList();
    this.cartService.loadCart();
    this.username = this.storageService.getUser().username;
      // console.log(this.storageService.getUser())
      this.getUser();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  getCategoryEnbled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategoryEnabled = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  removeFromCart(item:any){
    this.cartService.remove(item);
  }

  removeWishList(item: any){
    this.wishlistService.remove(item);
  }

  showAuthForm(){
    if(!this.isLoggedIn){
      this.authModal = true;
      this.loginForm = {username: null,password: null};
      this.registerForm = {username: null,email: null, password: null};
    }
  }
  validarLogin(): boolean {
    if (this.Usua.length < 1) {
      alert('Se requiere de un usuario');
      return false;
    }
   
    if (this.Contra.length <1 ) {
      alert('Se requiere de una contraseña');
      return false;
    }
    return true;
  }
  Usua: string = '';
  Contra: any = '';
  login():void{
    if (this.validarLogin()) {
    const {username,password} = this.loginForm;
    console.log(this.loginForm);
    this.authService.login(username,password).subscribe({
      next: res =>{
        this.storageService.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
        this.showSuccess("Acceso Correcto!!");
        this.router.navigate(['/']);
        this.authModal=false
      },error: err =>{
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      }
    })
  }}


  usernam: string = '';
  email: string = '';
  password: string = '';

  validarFormulario(): boolean {
    if (this.usernam.length < 5) {
      alert('El nombre de usuario debe de tener almenos 5 caracteres.');
      return false;
    }
    if (!this.email.includes('@')) {
      alert('Debe ser un correo electronico.');
      return false;
    }
    if (this.password.length <5 ) {
      alert('Almenos 5 caracteres de contraseña');
      return false;
    }
    return true;
  }

  register() {
    if (this.validarFormulario()) {
    const {username,email,password} = this.registerForm;
    console.log(this.registerForm);
    this.checkEmailExists(email).subscribe(exists => {
      if (exists) {
        alert('¡El email ya existe!');
        return;
      }
      this.checkUserExists(username).subscribe(exists => {
        if (exists) {
          alert('¡El Usuario ya existe!');
          return;
        }
      
      this.authService.register(username,email,password).subscribe({
        next: res =>{
          
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.showSuccess("Registro Correcto")
           this.loginForm.username = username;
          this.loginForm.password = password;
          this.login();
          this.router.navigate(['/']);
        },error: err =>{
          this.showError(err.message);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      })
    })});
  }
}





  logout():void{
    this.authService.logout().subscribe({
      next:res =>{
        this.storageService.clean();
        this.isLoggedIn = false;
        this.authModal = false;
        this.showSuccess("Sesion Finalizada");
      },error: err=>{
        this.showError(err.message);
      }
    })
  }




  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }


}
