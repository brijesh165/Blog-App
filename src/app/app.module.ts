import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { AuthService } from './home/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './home/auth.guard';
import { AuthinterceptorService } from './home/authinterceptor.service';
import { ListpostComponent } from './posts/listpost/listpost.component';
import { CommentsComponent } from './posts/listpost/comments/comments.component';
import { AddcommentsComponent } from './posts/listpost/comments/addcomments/addcomments.component';
import { EditpostComponent } from './posts/listpost/editpost/editpost.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    NavigationComponent,
    PostsComponent,
    ListpostComponent,
    CommentsComponent,
    AddcommentsComponent,
    EditpostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: WelcomeComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'createpost', component: PostsComponent, canActivate: [AuthGuard]},
      {path: 'listposts', component: ListpostComponent, canActivate: [AuthGuard]},
      {path: 'logout', redirectTo: 'home', canActivate: [AuthGuard]},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [AuthService, CookieService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
