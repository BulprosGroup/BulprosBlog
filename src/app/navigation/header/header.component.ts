import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

import { Observable } from 'rxjs';

import { UserInfo } from 'app/auth/user-info';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,  private authService: AuthService) {  }
  
  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
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
