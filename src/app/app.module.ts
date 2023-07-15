import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { CorsConfig } from 'src/config/CorsConfig';
import { LoginService } from './services/authentication-request.service';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PostShowComponent } from './post-show/post-show.component';

// tem q declarar os modulos aqui
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    IndexComponent,
    CadastroComponent,
    HomeComponent,
    PerfilComponent,
    PostShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CorsConfig, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
