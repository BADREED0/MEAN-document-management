import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './components/document/document.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListdocumentsComponent } from './components/listdocuments/listdocuments.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { ListFoldersComponent } from './components/list-folders/list-folders.component';
import { FolderFormComponent } from './components/folder-form/folder-form.component';

const routes: Routes = [
  {path: 'document', component: DocumentComponent, children: [
                {path: 'list', component: ListdocumentsComponent},
                {path: 'add', component: DocumentFormComponent},
                {path: 'folders', component: ListFoldersComponent},
                {path: 'add-folder', component: FolderFormComponent},
                {path: '', redirectTo: '/list', pathMatch: 'full'}
              ]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
