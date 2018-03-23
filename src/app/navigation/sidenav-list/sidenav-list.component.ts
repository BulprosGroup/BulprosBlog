import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'app/shared/auth.service';
import { UserInfo } from 'app/shared/user-info';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(this.isLoggedIn);
  }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }
}
