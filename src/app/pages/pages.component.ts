import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router,public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  logOut(event:any){
event.stopPropagation()
const dialogRef = this.dialog.open(DialogComponent, {
  panelClass: 'action-dialog',
  data:{
    'text':"Are you sure want to log out"
  }
});

dialogRef.afterClosed().subscribe(result => {

  if (result) {
    localStorage.removeItem('koruAuth')
    console.log("logout");
    
    this.router.navigate(['/auth/login']);
  }
});

  }

}
