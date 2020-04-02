import { Component, OnInit, Inject } from '@angular/core';
import { Client } from '../Client';
import { ApiService } from 'src/shared/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  

  ngOnInit(): void {
  }
  DIALOG_CLOSE_MSGS: any = {
    OK: 'OK',
    CANCEL: 'CANCEL'
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public client: Client,
    public apiService: ApiService,
    public dialogRef: MatDialogRef<any>) {

    if (!this.client) {
      this.client = {
        _id: undefined,
        CIN: undefined,
        FirstName: undefined,
        LastName: undefined,
        PhoneNumber: undefined,
        Email: undefined
      };
    }
  }

  onCancelClickHandler(): void {
    this.closeDialog({ message: this.DIALOG_CLOSE_MSGS.CANCEL });
  }

  onSaveClickHandler(): void {
    if (this.client._id) {
      this.updateUser();
    }
    if (!this.client._id) {
      this.addUser();
    }
  }

  closeDialog(data: any): void {
    this.dialogRef.close({ data: data });
  }

  addUser(): void {

    this.apiService.addClient(this.client)
      .subscribe((res: any) => {
        this.closeDialog({ message: this.DIALOG_CLOSE_MSGS.OK });
      });
  }

  updateUser(): void {

    this.apiService.updateClient(this.client._id, this.client)
      .subscribe((res: any) => {
        this.closeDialog({ message: this.DIALOG_CLOSE_MSGS.OK });
      });
  }
}
