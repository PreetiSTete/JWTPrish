import { Component, OnInit, ViewChild } from '@angular/core';
import { AppJwtService } from '../../services/app-jwt.service'
import { first } from 'rxjs';
import { ConfirmPasswordValidator } from '../../register/confirmPassword.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  registerForm!:FormGroup;
  p: number = 1;
  userData: any = null;
  result: any;
  formModal: any;
  empId: any;
  employeeDetail: any[] = [];

  //@ViewChild('addModal') closebutton: { nativeElement: { click: () => void; }; };

  constructor(private appService: AppJwtService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAllUsers();
    this.SetEmployeeForm();
    console.log(this.activatedRoute);
    this.empId = this.activatedRoute.snapshot.params['id'];
  }

  SetEmployeeForm(){
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
          Contact:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          Location:['', Validators.required],
          Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          Password: ['', Validators.required],
          ConfirmPassword: ['', Validators.required],
        },  {
          validator: ConfirmPasswordValidator("Password", "ConfirmPassword")
        });
  }

  getAllUsers(){
    this.appService.GetAll().subscribe(data => {
      console.log(data);
      this.userData = data;
    });
  }

  add() {
    if(this.registerForm.status == 'INVALID'){
      alert('Something went wrong with the form data!');
    }
    this.appService.RegisterUser(this.registerForm.value).subscribe(res => {
     this.result = res;
     if(this.result){
       alert('Added Successfully!');
       this.getAllUsers();
       this.registerForm.reset();
       }else{
         alert('Something went wrong!');
       }
      });
      // this.registerForm.reset();
      // window.location.reload();
 }

  deleteUser(id:number){
    this.appService.RemoveData(id).subscribe({
      next: (res) => {
        if(res){
        alert('Employee Deleted!');
        this.getAllUsers();
        }
        else
        alert('Something went wrong!');
      },
      error: console.log,
    });
  }

  reset(){
    this.registerForm.reset();
  }

  setUser(){
    window.location.reload();
    this.appService.UpdateDetails(this.registerForm.value).subscribe();
  }

  getEmployeeById(empId: number){
    this.appService
    .UpdateDetails(empId)
    .subscribe({
      next: (res: any) => {
        if(res != null){
          this.employeeDetail = res;
          this.SetEmployeeForm();

        }}
      });
  }
}

