import { Component, OnInit } from '@angular/core';
import {AuthService} from '../home/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = {};
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this._authService.login(this.loginForm);
  }

}
