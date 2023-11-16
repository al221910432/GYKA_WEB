import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  submitted = false;
  generos: string[] =['Masculino','Femenino'];
  formAbout !: FormGroup;


  constructor (private fb: FormBuilder) {}


  
  

    ngOnInit(): void {

      
      this.formAbout=this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      apellido: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      genero:['',Validators.required],
      correo:['',[Validators.required,Validators.email]],
      calle:['',Validators.required],
      ciudad: ['',Validators.required],
      estado: ['',Validators.required],
      codigoPostal: ['',Validators.required]
    })
    


  } 

  get f(){ return this.formAbout.controls;}
  Enviar() {
    this.submitted = true;

    if (this.formAbout.invalid) {
        return;
    }

    alert('Mensaje Enviado !'+JSON.stringify(this.formAbout.value))
    console.log(this.formAbout);
}

getFormato(componente:string) {
  let formato:string ='form-control' ;
  if (this.formAbout.get (componente)?.invalid && this.formAbout.get (componente)?.touched) {
  formato ='form-control is-invalid ';
}else if(this.formAbout.get (componente)?.valid && this.formAbout.get(componente) ?.touched){
  formato ='form-control is-valid' ;
  

  
}return formato;

}



getErrorMessage (componente:string){
  let message: string ='';
  let length: string ='';
  if (this.formAbout.get(componente )?.hasError('required')) {
  message = 'Este campo es requerido';
  }else if (this .formAbout.get (componente)?.hasError('minlength')){
  length=this.formAbout .get (componente)?.errors?.['minlength']?.['requiredLength']
  message= `La longitud mínima de este campo es de ${ length } caracteres.`;
  }else if (this.formAbout.get (componente)?.hasError('email')) {
  message ='Correo con formato incorrecto';
  }

  return message;
   
}


}




