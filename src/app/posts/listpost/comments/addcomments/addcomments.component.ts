import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcomments',
  templateUrl: './addcomments.component.html',
  styleUrls: ['./addcomments.component.css']
})
export class AddcommentsComponent implements OnInit {

  @Input() post_id: any;
  showButton: Boolean = false;
  addcomment: any = {};

  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  toggleButton() {
    this.showButton = !this.showButton;
  }

  onAddComment() {
    this.addcomment.post_id = this.post_id;
    this._http.post('http://localhost:3000/addcomment', this.addcomment)
      .subscribe((resp) => {
        this.addcomment = {};
      });
  }
}
