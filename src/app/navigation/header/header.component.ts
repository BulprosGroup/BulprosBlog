import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

import { UserInfo } from 'app/auth/user-info';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(this.isLoggedIn);
  }
  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }

  logout() {
    this.authService.logout();
  }
}
