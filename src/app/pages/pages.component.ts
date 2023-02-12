import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(event:any){
event.stopPropagation()
localStorage.removeItem('koruAuth')
console.log("logout");

this.router.navigate(['/auth/login']);
  }

}
