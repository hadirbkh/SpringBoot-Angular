import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './views/login-component/login.component';
import { AppComponent } from './views/main-component/app.component';


import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './services/auth.interceptor';
import { WelcomeComponent } from './views/welcome-component/welcome.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StatisticsComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatPaginatorModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    NgChartsModule,
    MatFormFieldModule,
    MatInputModule,MatCardModule,MatGridListModule

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
