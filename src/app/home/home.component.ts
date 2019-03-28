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
    

  }

  ngOnInit() {
  
    $.getScript('./assets/bootstrap/js/bootstrap.min.js');
    $.getScript('./assets/plugin/iCheck/icheck.min.js');
$.getScript('/assets/js/script.js');
$.getScript('/assets/js/prefixfree.min.js');
$.getScript('/assets/js/modernizr.custom.js');
$.getScript('/assets/js/jquery-migrate.min.js');
$.getScript('/assets/js/responsiveslides.js');
$.getScript('/assets/js/jquery.parallax.js');
$.getScript('/assets/js/ScrollMagic.js');
$.getScript('/assets/js/debug.addIndicators.js');
$.getScript('/assets/js/animation.gsap.js');
$.getScript('/assets/js/jquery.mousewheel.js');
$.getScript('/assets/js/lethargy.js');
$.getScript('/assets/js/pace.min.js');
$.getScript('/assets/js/main.min.js');
    this.locales = locales;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = this.router.url;
      });
  }

}
