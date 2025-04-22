import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,HttpClientModule ,CommonModule,
     MatIconModule,MatToolbarModule,MatSidenavModule,
     SidebarComponent,MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion-formation';
  sidebarOpen=true;
  toggleSidebar(){
    this.sidebarOpen=this.sidebarOpen? false:true;
  }
}
