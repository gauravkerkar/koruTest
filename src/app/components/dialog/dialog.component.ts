import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  dialogAction(event:any,value:boolean): void {
    event?.stopPropagation()
    this.dialogRef.close(value);
  }
}
