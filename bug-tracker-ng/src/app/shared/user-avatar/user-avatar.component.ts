import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() image: string;
  @Input() firstName: string;
  @Input() lastName: string;
  displayName: string;

  constructor() { }

  ngOnInit(): void {
    this.displayName = this.firstName.charAt(0).toLocaleUpperCase();
    if(this.lastName) {
      this.displayName += this.lastName?.charAt(0).toLocaleUpperCase();
    }
  }
}
