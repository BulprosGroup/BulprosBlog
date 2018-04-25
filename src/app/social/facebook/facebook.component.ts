import { Component, Input } from '@angular/core';
import { FacebookPost } from './facebookPost.model';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent {
  @Input() post: FacebookPost;
  constructor() { }
}
