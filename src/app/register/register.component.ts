import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppJwtService } from '../services/app-jwt.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ConfirmPasswordValidator } from './confirmPassword.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
registerForm!:FormGroup;
error: string = "";
result: any;

constructor(private formBuilder: FormBuilder,
  private http:AppJwtService,
  private router:Router,
  ){}


ngOnInit(){
this.registerForm = this.formBuilder.group({
  FirstName: ['', Validators.required],
  LastName: ['', Validators.required],
  Contact:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  Location:['', Validators.required],
  Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  Password: ['', Validators.required],
  ConfirmPassword: ['', Validators.required],
},
  {
    validator: ConfirmPasswordValidator("Password", "ConfirmPassword")
  }
  );
}

Register() {
   this.http.RegisterUser(this.registerForm.value).subscribe(res => {
    this.result = res;
    if(this.result){
      alert('Reigstered Successfully!');
        this.router.navigateByUrl("/login");
      }else{
        alert('Something went wrong!');
      }
     });

}

}
