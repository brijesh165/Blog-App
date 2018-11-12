import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {HttpHeaders, HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req, next) {
    const token = this._authService.checkUserStatus();
    const authRequest = req.clone({
      headers: new HttpHeaders().set('authtoken', token)
    });
    return next.handle(authRequest);
  }
}
