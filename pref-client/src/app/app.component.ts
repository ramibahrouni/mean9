import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Client } from './Client';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {MatTable} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  clients: any;
  columnsToDisplay: string[] = ['CIN', 'FirstName', 'LastName', 'PhoneNumber', 'Email', 'edit', 'delete'];
  dataSource: Client[];
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private apiService: ApiService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef){
    this.getClients();
  }

  ngOnInit(): void {
  }

  getClients(): void {
    this.apiService.getClients()
    .subscribe(data => {
        this.clients = data;
        this.dataSource = this.clients;
    });
  }

  onAddButtonClickHandler(): void {
    this.openModalDialog(null);
  }

  onEditButtonClickHandler(client: Client): void {
    this.openModalDialog(client);
  }

  onDeleteButtonClickHandler(client: Client): void {
    this.deleteUser(client);
  }

  openModalDialog(client: Client): void {
    let dialog = this.dialog.open(DialogBoxComponent, { data: client });

    dialog.afterClosed().subscribe(results => {
      if (results.data.message === 'OK') {
        this.getClients();
      }
    });
  }

  deleteUser(client: Client) {
    this.apiService.deleteClient(client._id)
      .subscribe(data => {
        this.getClients();
        this.table.renderRows();

      });
  }




}
