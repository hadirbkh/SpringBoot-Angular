import { Component, OnInit } from '@angular/core';
import { ROLES } from './../constants/contants';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ROLES = ROLES
  role! : string

  constructor(private authService : AuthService) {

  }
  ngOnInit(): void {
    this.role = this.authService.currentUser?.role?.nom ?? ""

  }

}
