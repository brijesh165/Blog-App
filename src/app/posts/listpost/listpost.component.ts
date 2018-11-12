import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css']
})
export class ListpostComponent implements OnInit {

  posts: any = [];
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    console.log('Hi');
    this._http.get('http://localhost:3000/getposts')
      .subscribe((resp: any) => {
        this.posts = resp;
      });
  }
}
