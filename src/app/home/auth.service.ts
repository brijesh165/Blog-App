import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authObservable: BehaviorSubject<any> = new BehaviorSubject(this.checkUserStatus());
  constructor(private _http: HttpClient,
              private _router: Router,
              private _cookie: CookieService) {}

  login(auth_details: any) {
    this._http.post('http://localhost:3000/authenticate', auth_details)
      .subscribe((data: any) => {
        if (data.isLoggedIn) {
          this._cookie.set('token', data.token);
          this.$authObservable.next(this.checkUserStatus());
          this._router.navigate(['/home']);
        } else {
          alert('Invalid Credentials. Please try again!!!');
        }
      });
  }

  checkUserStatus() {
    return this._cookie.get('token');
  }

  logout() {
    this._cookie.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }
}
