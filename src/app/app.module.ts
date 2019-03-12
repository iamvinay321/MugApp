import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './404/404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ScrollToDirective } from './directive-scroll-to.directive';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContainerComponent } from './admin/container/container.component';
import { SubscribersComponent } from './admin/subscribers/subscribers.component';
import { SeoInformationComponent } from './admin/seo-information/seo-information.component';
import { ProductMenuComponent } from './admin/product-menu/product-menu.component';
import { NavigationMenuComponent } from './admin/navigation-menu/navigation-menu.component';
import { ContentPagesComponent } from './admin/content-pages/content-pages.component';
import { ContactComponent } from './admin/contact/contact.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/', '.json');
}
const route: any = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductMenuComponent },
      { path: 'navigation', component: NavigationMenuComponent },
      { path: 'content', component: ContentPagesComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'seo', component: SeoInformationComponent },
      { path: 'subscribers', component: SubscribersComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
]

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ScrollToDirective,
    LoginComponent,
    DashboardComponent,
    ContainerComponent,
    SubscribersComponent,
    SeoInformationComponent,
    ProductMenuComponent,
    NavigationMenuComponent,
    ContentPagesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'brief-ammos' }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    RouterModule.forRoot(route),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
