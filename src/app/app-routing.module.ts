import { ManagementComponent } from './management/management.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CreateComponent } from './management/create/create.component';
import { EditComponent } from './management/edit/edit.component';
import { ListComponent } from './management/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, },
  { path: 'article-detail/:id', component: ArticleDetailComponent },
  { path: 'login', component: LoginComponent, },
  {
    path: 'management', component: ManagementComponent,
    children:
      [
        { path: 'list', component: ListComponent },
        { path: 'create', component: CreateComponent },
        { path: 'edit/:id', component: EditComponent },
        { path: '**', redirectTo: 'list' }
      ]
  },
  { path: '**', redirectTo: '/home' }, //當上面路由都未匹被時會重導
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
