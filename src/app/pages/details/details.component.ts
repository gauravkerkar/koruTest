import { Component, NgZone, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ServiceCallsService } from 'src/app/@core/services/service-calls.service';
import { Sort } from '@angular/material/sort';
import { compare } from 'src/app/@core/modules/modules';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { bottom, right } from '@popperjs/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  details: any;
  sortedData: any =[];
  selection = new SelectionModel<any>(true, []);

  loading:boolean= true

  constructor(private service: ServiceCallsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
   //#SUBSCRIBE TO DATA
   this.getData()
   }

  ngOnInit(): void {

  }

  getData(){
    this.service.getDetails().subscribe({
      next: (value) => {
        this.details = value
        this.sortedData = this.details.slice();
        this.loading =false
      },
      error: (error) =>{
console.log("error");
this.loading =false

      }
    })
  }

  dragItem(event: any) {
    moveItemInArray(this.details, event.previousIndex, event.currentIndex);
  }

  sortData(sort: any) {

    const data = this.details.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((itemOne: any, itemTwo: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName':
          return compare(itemOne.username, itemTwo.username, isAsc);
        case 'phoneNumber':
          return compare(itemOne.phone, itemTwo.phone, isAsc);
        case 'email':
          return compare(itemOne.email, itemTwo.email, isAsc);
        default:
          return 0;
      }
    });
  }

  //#CHECKBOX
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.sortedData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.sortedData.forEach((item: any) => this.selection.select(item.id));
    // console.log("this.selection.selected",this.selection.selected); 
  }


  //#DELETE CONFIRMATION
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'action-dialog',
      data:{
        'text':"Are you sure want to delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        //#MAKE A REQUEST TO DELETE ITEM BASED ON UNIQUE ID AND 
        this.sortedData.splice(this.sortedData.findIndex((item: any) => item.id === id), 1);
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          panelClass: 'action-snackbar',
          horizontalPosition: right,
          verticalPosition: bottom,
        });
      }
    });
  }

  //#DELETE SELECTED
  deleteSelected(event: any) {
    let _selectedItems = this.selection.selected
    
    //#MAKE A BACKEND REQUEST TO DELETE ITEMS BASED ON ID


    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'action-dialog',
      data:{
        'text':"Are you sure want to delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        //#MAKE A REQUEST TO DELETE ITEM BASED ON UNIQUE ID AND 
        this.sortedData = this.sortedData.filter(function (elem: any) {
          return _selectedItems.indexOf(elem.id) === -1;
        });
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          panelClass: 'action-snackbar',
          horizontalPosition: right,
          verticalPosition: bottom,
        });
        this.selection.clear()
      }
    });
  }
}


