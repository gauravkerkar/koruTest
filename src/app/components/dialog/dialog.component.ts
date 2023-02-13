import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("dialogRef",this.data);
    
  }

  dialogAction(event:any,value:boolean): void {
    event?.stopPropagation()
    this.dialogRef.close(value);
  }
}
