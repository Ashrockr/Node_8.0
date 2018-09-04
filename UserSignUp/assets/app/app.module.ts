import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [ BrowserModule,routing,FormsModule,ReactiveFormsModule,HttpModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'},AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
