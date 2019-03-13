import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MessageService } from 'primeng/components/common/messageservice';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginFormForAdmin: FormGroup;
  validationMessages: any;
  loginModel: any;
  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    public api: ApiService) { }

  ngOnInit() {
    this.loginFormForAdmin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      rememberme: [false]
    });

    this.validationMessages = {
      'username': [
        { type: 'required', message: "This field is required" },
        { type: 'email', message: "Please enter valid email address" }
      ],
      'password': [
        { type: 'required', message: "This field is required" },
        { type: 'minlength', message: "Please enter at least 6 character" },
        { type: 'maxlength', message: "You can not enter more than 8 character" }
      ]
    };

    if (localStorage) {
      if (localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null) {
        const uName = window.atob(localStorage.getItem('username'));
        this.loginFormForAdmin.controls['username'].setValue(uName);
      }
      if (localStorage.getItem('password') !== undefined && localStorage.getItem('password') !== null) {
        const pass = window.atob(localStorage.getItem('password'));
        this.loginFormForAdmin.controls['password'].setValue(pass);
      }
      if (localStorage.getItem('rememberme') !== undefined && localStorage.getItem('rememberme') !== null) {
        const rememberme = window.atob(localStorage.getItem('rememberme'));
        this.loginFormForAdmin.controls['rememberme'].setValue(rememberme);
      }
    }
  }

  public async login(loginFormForAdmin: FormGroup) {
    debugger
    if (loginFormForAdmin.valid) {
      this.loginModel = loginFormForAdmin.value;
      if (loginFormForAdmin.value.rememberme) {
        localStorage.setItem('username', window.btoa(loginFormForAdmin.value.username));
        localStorage.setItem('password', window.btoa(loginFormForAdmin.value.password));
        localStorage.setItem('rememberme', window.btoa(loginFormForAdmin.value.rememberme));
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberme');
      }
      const result: any = await this.api.authenticationLogin(this.loginModel);
      if (result.status === 200) {
        localStorage.setItem('current-user', btoa(JSON.stringify(result.result.userInfo)));
        localStorage.setItem('current-user-token', result.result.token);
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }
      console.log(result);
    }
  }
  hasValidationError(validation: any, controlName: (string | number)[], formGroup: FormGroup): boolean {
    const control: AbstractControl = formGroup.get(controlName);
    return control.hasError(validation.type) && (control.dirty || control.touched) && (control === null || control.value === '');
  }

  onKeyPressLogin(event: any) {
    if (event.key === 'Enter') {
      this.login(this.loginFormForAdmin);
    }
  }


  ngAfterViewInit() {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%'
    });
  }

}
