import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PostShowComponent } from './post-show/post-show.component';
import { PostBandaComponent } from './post-banda/post-banda.component';
import { FeedComponent } from './feed/feed.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: '', component: IndexComponent },
  { path: 'home', component: HomeComponent , children:[
    { path: '', component: FeedComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'post-show', component: PostShowComponent },
    { path: 'post-banda', component: PostBandaComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
