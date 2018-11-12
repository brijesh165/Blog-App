import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() post_id: any;
  showButton: Boolean = false;
  allcomments: any = [];

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this._http.get('http://localhost:3000/getcomments/' + '?post_id=' + encodeURIComponent(this.post_id))
      .subscribe((resp: any) => {
        if (resp.length >= 1) {
          this.allcomments = resp;
        } else {
          this.allcomments = [];
        }
      });
  }

  toggleButton() {
    this.showButton = !this.showButton;
  }
}
