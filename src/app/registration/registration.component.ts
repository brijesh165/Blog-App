import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  authRegistration: any = {};
  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
  }

  onRegistration() {
    this._http.post('http://localhost:3000/registration', this.authRegistration)
      .subscribe((data: any) => {
        if (data.status === true) {
          alert('Register Successfully');
          this._router.navigate(['/login']);
        } else {
          alert('Something Wrong! Please try again.');
        }
      });
  }

}
