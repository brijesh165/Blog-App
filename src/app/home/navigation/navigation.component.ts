import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: Boolean = false;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.$authObservable.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  logout() {
    this._authService.logout();
  }
}
