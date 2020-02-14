import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoginComponent } from 'app/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatInputModule} from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
