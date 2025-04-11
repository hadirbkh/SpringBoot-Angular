import { Component, ViewChild } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator,MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilisateursService } from '../services/utilisateurs.service';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent {

  utilisateur:Utilisateur[] = [];
  constructor(private utilisateurService:UtilisateursService){
    this.utilisateurService.getUsers().subscribe((data:Utilisateur[]) => {
      this.utilisateur=data;
      this.dataSource=new MatTableDataSource(this.utilisateur);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  displayColumns=["select","id","name","login","password","id_role"];
  dataSource = new MatTableDataSource(this.utilisateur);
  selection = new SelectionModel(true,[]);
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  ngAfterViewInit(){

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  SelectHandler(row:Utilisateur){
    this.selection.toggle(row as never);
  }
  handleDelete(id:number){
    console.log(id);
    
  }
}
function data(value: Utilisateur[]): void {
  throw new Error('Function not implemented.');
}

