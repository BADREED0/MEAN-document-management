import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentComponent } from './components/document/document.component';
import { ListdocumentsComponent } from './components/listdocuments/listdocuments.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { ListFoldersComponent } from './components/list-folders/list-folders.component';
import { FolderFormComponent } from './components/folder-form/folder-form.component';


@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ListdocumentsComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    DocumentFormComponent,
    ListFoldersComponent,
    FolderFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
