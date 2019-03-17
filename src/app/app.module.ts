import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { GridComponent } from './tools/grid/grid.component';
import { GridcolumnComponent } from './tools/gridcolumn/gridcolumn.component';
import { ProductTypeComponent } from './admin/product-type/product-type.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/', '.json');
}
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'producttype', component: ProductTypeComponent },
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
    ContactComponent,
    GridComponent,
    GridcolumnComponent,
    ProductTypeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'brief-ammos' }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    NgxPageScrollModule,
    RadioButtonModule,
    NgxPageScrollCoreModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
