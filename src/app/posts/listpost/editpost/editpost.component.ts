import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  @Input() posts: any;
  showButton: Boolean = false;
  editpost: any = {};

  constructor(private _http: HttpClient,
              private _router: Router) { }

  ngOnInit() {
    }

  showpost() {
    this.showButton = !this.showButton;
    this.editpost.title = this.posts.title;
    this.editpost.description = this.posts.description;
  }

  onUpdatePost() {
    this.editpost.post_id = this.posts._id;
    this._http.post('http://localhost:3000/updatepost', this.editpost)
      .subscribe((resp: any) => {
        if (resp.status) {
          alert('Updated Successfully!!!');
          this._router.navigate(['/listposts']);
          this.showpost();
        } else {
          alert('Please try again!!!');
        }
      });
  }

  onDeletePost() {
    this.editpost.post_id = this.posts._id;
    this._http.post('http://localhost:3000/deletepost', this.editpost)
      .subscribe((resp: any) => {
        if (resp.status) {
          alert('Deleted Successfully!!!');
          this._router.navigate(['/listposts']);
          this.showpost();
        } else {
          alert('Please try again!!!');
        }
      });
  }
}
