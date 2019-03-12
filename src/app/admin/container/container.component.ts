import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { locales } from '../../locales.values';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styles: []
})
export class ContainerComponent implements OnInit {
  locales = [];
  currentUrl = "";
  selectCode = "En";
  constructor(@Inject(LOCALE_ID) public locale: string, public router: Router) { }

  ngOnInit() {
    this.locales = locales;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(this.router.url)
        this.currentUrl = this.router.url;
      });
    this.currentUrl = this.router.url;
    let data: any = this.router;
    this.selectCode = "en";
    if (data.location._baseHref.substring(1) != "") {
      this.selectCode = data.location._baseHref.substring(1);
    } else {
      this.selectCode = "en";
    }
  }

  selectedCode(code) {
    this.selectCode = code;
  }

  logoutApp() {
    this.router.navigate(['/login'])
  }
}
