import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeZh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeZh, 'zh');

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { ListComponent } from './management/list/list.component';
import { CreateComponent } from './management/create/create.component';
import { EditComponent } from './management/edit/edit.component';
import { AppconfigService } from './Service/appconfig.service';



@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    HeaderComponent,
    MainComponent,
    ManagementComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppconfigService],
      useFactory: (appConfigService: AppconfigService) => () => appConfigService.loadConfig()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
