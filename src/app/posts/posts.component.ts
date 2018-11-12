import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: any = {};
  constructor(private _http: HttpClient,
              private _router: Router,
              private _authservice: AuthService) { }

  ngOnInit() {
  }

  onPost() {
    this._http.post('http://localhost:3000/createpost', this.post)
      .subscribe((data: any) => {
        console.log(data.status);
        if (data.status) {
          alert('Post Created successfully');
          this._router.navigate(['/listposts']);
        } else {
          alert('Please try again!!!');
        }
      });
  }
}
