import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('matButton') matButton;

  constructor() { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();

    // This hacky solution is required to remove ripple effect from menu icon after closing sidenav
    this.matButton._elementRef.nativeElement.blur();
  }

}
