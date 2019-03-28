import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { locales } from './locales.values';
import { filter } from 'rxjs/operators';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  locales = [];
  currentUrl = "";

  constructor(
    private ccService: NgcCookieConsentService,
    private translateService: TranslateService,
    @Inject(LOCALE_ID) public locale: string,
    private router: Router
  ) { }

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
    let data: any = this.router;
    console.log();
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    let browserLanguage = "en";
    if (data.location._baseHref.substring(1) != "") {
      browserLanguage = data.location._baseHref.substring(1);
    } else {
      browserLanguage = "en";
    }
    this.translateService.use(browserLanguage);

    this.translateService.get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
      .subscribe(data => {
        this.ccService.getConfig().content = this.ccService.getConfig().content || {};
        this.ccService.getConfig().content.header = data['cookie.header'];
        this.ccService.getConfig().content.message = data['cookie.message'];
        this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
        this.ccService.getConfig().content.allow = data['cookie.allow'];
        this.ccService.getConfig().content.deny = data['cookie.deny'];
        this.ccService.getConfig().content.link = data['cookie.link'];
        this.ccService.getConfig().content.policy = data['cookie.policy'];
        this.ccService.destroy();
        this.ccService.init(this.ccService.getConfig());
      });

  }

}
