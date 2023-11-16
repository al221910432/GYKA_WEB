import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TagService } from 'src/app/_service/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  providers: [MessageService]

})
export class TagComponent implements OnInit {
  
  listTag : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  tagForm : any ={
    id: null,
    name : null
  }

  constructor(private tagService: TagService,private messageService:MessageService){

  }

  ngOnInit(): void {
    this.getListTag();
  }


  getListTag(){
    this.tagService.getListTag().subscribe({
      next : res =>{
        this.listTag = res;
        console.log(res);
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
    this.onUpdate = false;
    this.tagForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }

  onUpdateForm(id: number,name : string){
    this.onUpdate = true;
    this.displayForm =true;
    this.tagForm.id = id;
    this.tagForm.name = name;
  }
  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.tagForm.id = id;
    this.tagForm.name = name;
  }

  createTag(){
    const {name} = this.tagForm;
    this.tagService.createTag(name).subscribe({
      next: res =>{
        this.getListTag();
        this.showSuccess("Tag Creado");
        this.displayForm = false;
      },error: err=>{
        this.showError(err.message);
      }
    })
  }

  updateTag(){
    const {id,name} = this.tagForm;
    this.tagService.updateTag(id,name).subscribe({
      next: res =>{
        this.getListTag();
        this.showSuccess("Tag Actulizado");
        this.displayForm = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  enableTag(id : number){
    this.tagService.enableTag(id).subscribe({
      next: res =>{
        this.getListTag();
        this.showSuccess("Tag Habilitada");

      },error: err=>{
        this.showError(err.message);
      }
    })
  }

  deleteTag(){
    const {id} = this.tagForm;
    this.tagService.deleteTag(id).subscribe({
      next: res =>{
        this.getListTag();
        this.showWarn("Tag Eliminado");
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
