import { Component, OnInit, AfterViewInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare function loadPage(): any;
import { filter } from 'rxjs/operators';
import { locales } from '../locales.values';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  locales = [];
  currentUrl = "";
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private router: Router
  ) {

  }

  ngAfterViewInit() {
    loadPage()
  }

  ngOnInit() {
    this.locales = locales;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = this.router.url;
      });
  }

}
