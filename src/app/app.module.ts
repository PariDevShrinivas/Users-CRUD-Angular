import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserPopupComponent } from './components/add-user-popup/add-user-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AddUserPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
