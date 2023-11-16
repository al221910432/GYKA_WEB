import { Component } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { event } from 'jquery';
import { filter } from 'rxjs';

declare var gtag:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  constructor(private router:Router){
    const navEndEvents$ = this.router.events
    .pipe(
      filter((event:any) => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
         gtag('config', 'G-5WHVDB3PMN', {
          'page_path' : event.urlAfterRedirects
         }); 
    });
    
  }
}




