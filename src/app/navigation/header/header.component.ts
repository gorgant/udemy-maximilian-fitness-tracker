import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('matButton') matButton;
  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Subscribe to the subject in authService to determine if user is logged in
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();

    // This hacky solution is required to remove ripple effect from menu icon after closing sidenav
    this.matButton._elementRef.nativeElement.blur();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
