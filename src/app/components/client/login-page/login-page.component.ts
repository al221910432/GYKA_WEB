import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]

})
export class LoginPageComponent implements OnInit {


  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  constructor(private authService:AuthService,private storageService: StorageService,private messageService:MessageService,private router:Router,private http: HttpClient){}


  
  ngOnInit(): void {
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(`http://localhost:8080/api/user/check-email-exists/${email}`);
  }

  checkUserExists(username: string) {
    return this.http.get<boolean>(`http://localhost:8080/api/user/check-username-exists/${username}`);
  }
  
  validarLogin(): boolean {
    if (this.Usua.length < 3) {
      alert('Se requiere de un usuario');
      return false;
    }
   
    if (this.Contra.length <3 ) {
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
      },error: err =>{
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      }
    })
  }}

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
          this.router.navigate(['/']);
          this.login();
        },error: err =>{
          this.showError(err.message);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      })
    })});
  }
}


  username: string = '';
  email: string = '';
  password: string = '';



  validarFormulario(): boolean {
    if (this.username.length < 3) {
      alert('El nombre de usuario debe de tener almenos 5 caracteres.');
      return false;
    }
    if (!this.email.includes('@')) {
      alert('Debe ser un correo electronico.');
      return false;
    }
    if (this.password.length <3 ) {
      alert('Almenos 5 caracteres de contraseña');
      return false;
    }
    return true;
  }


  
  loginFormChange(){
    document.getElementById('container')?.classList.remove("right-panel-active");
  }
  registerFormChange(){
    document.getElementById('container')?.classList.add("right-panel-active");
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
