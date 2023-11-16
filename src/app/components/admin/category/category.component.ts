import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_service/category.service';
import { ImageService } from 'src/app/_service/image.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService,ConfirmationService]

})

export class CategoryComponent implements OnInit {

  


  disabled : boolean = true;

  listCategory : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  categoryForm : any ={
    id: null,
    name : null,
  }

  constructor(private messageService : MessageService,private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getListCategory();

  }


 




  getListCategory(){
    this.categoryService.getListCategory().subscribe({
      next: res =>{
        this.listCategory = res;
        console.log(res);
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
  
    
    this.onUpdate = false;
    
    this.categoryForm ={
      id : null,
      name : null,
      

    }
    this.displayForm = true;
  }

  
 onUpdateForm(id: number,name : string){
      this.onUpdate = true;
      this.displayForm =true;
      this.categoryForm.id = id;
      this.categoryForm.name = name;
  }

  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.categoryForm.id = id;
    this.categoryForm.name = name;
  }

  createCategory(){
  
    const {name} = this.categoryForm;
    this.categoryService.createCategory(name).subscribe({
      next: res =>{
        this.getListCategory();
        this.showSuccess("Categoria Creada");
        this.displayForm = false;
      },error: err=>{
        this.showError(err.message);
      }
    })
  }


  updateCategory(){
    
    const {id,name} = this.categoryForm;
    this.categoryService.updateCategory(id,name).subscribe({
      next: res =>{
        this.getListCategory();
        this.showSuccess("Categoria Actualizada");
        this.displayForm = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }


  enableCategory(id : number){
    this.categoryService.enableCategory(id).subscribe({
      next: res =>{
        this.getListCategory();
        this.showSuccess("Categoria Habilitada");
      },error: err=>{
        this.showError(err.message);
      }
    })
  }


  deleteCategory(){
    const {id} = this.categoryForm;
    this.categoryService.deleteCategory(id).subscribe({
      next: res =>{
        this.getListCategory();
        this.showWarn("Categoria Eliminada");
        this.deleteForm = false;
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

  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
