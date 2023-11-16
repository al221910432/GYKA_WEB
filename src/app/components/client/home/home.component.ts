import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faInfo, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { WishlistService } from 'src/app/_service/wishlist.service';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]

})
export class HomeComponent implements OnInit {

  



  listCategoryEnableda : any;
  router: any;
 getCategoryEnbledd(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategoryEnableda = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

 
  

  heart = faHeart;
  bag = faShoppingBag;
  info = faInfo;

  listProductNewest : any;
  listProductPrice: any;

  showDepartment = true;


constructor(private productSerive:ProductService,private cartService: CartService, private wishlistService: WishlistService,private messageService: MessageService,private categoryService: CategoryService){}

ngOnInit(): void {
  this.getListProduct();  
  this.getCategoryEnbledd();

}


getListProduct(){
  this.productSerive.getListProductNewest(8).subscribe({
    next: res =>{
      this.listProductNewest = res;
    },error: err =>{
      console.log(err);
    }
  })
  this.productSerive.getListProductByPrice().subscribe({
    next:res =>{
      this.listProductPrice =res;
    },error: err=>{
      console.log(err);
    }
  })
}

addToCart(item: any){
  this.cartService.getItems();
  this.showSuccess("Agregado al Carrito")
  this.cartService.addToCart(item,1);
}

addToWishList(item: any){
  if(!this.wishlistService.productInWishList(item)){
    this.showSuccess("Agregado a Favoritos")
    this.wishlistService.addToWishList(item);
  }
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
