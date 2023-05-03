import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppJwtService } from '../services/app-jwt.service'
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  title = 'login-user-data';
  error: string = "";
  result: any;

  constructor(private formBuilder: FormBuilder,
    private appService: AppJwtService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ['', Validators.required],
    });
  }

  SubmitLogin() {

    let authUser = {
      Email: this.loginForm.value.Email,
      Password: this.loginForm.value.Password
    }
    this.appService
      .Login(authUser)
      .subscribe({
        next: (resp: any) => {
          if(resp?.accessToken != ""){
            sessionStorage.setItem('token',resp?.accessToken);
            alert('Login Successfully!');
             this.router.navigateByUrl("/users");
          }else
          alert("Something went wrong!");
        },
        error: (error: any) => {
          this.error = error;
          alert(error.error.message);

        },
      });
    }
}
