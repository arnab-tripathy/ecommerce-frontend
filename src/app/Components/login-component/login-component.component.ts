import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/services/user.service';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/Model/login-request';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  @Input() sourceUrl: string;
  form: FormGroup;  
  mode: 'login' | 'register' = 'login';
  userinput:any={};
  passwordValid:boolean=false;
  isPasswordTyping=false;
  showSuccess=false;
  isLoading=false;

  constructor(private fb: FormBuilder,private userService:UserService,
    private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword:['',Validators.required]
    });

    this.form.get('password')?.valueChanges.subscribe(data=>{
      if(data)
      this.isPasswordTyping=true
      console.log("password change"+data)
      const regex : RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(regex.test(data)){
      this.passwordValid=true;
    }
    })
  }

  toggleMode() {
    console.log("in toggle mode")
    this.mode = this.mode === 'login' ? 'register' : 'login';
    // Reset form
    this.form.reset();
  }

  onSubmit() {

    console.log("submit");
    if (this.form.invalid && this.mode!='login') {
      console.log("invalid")
      return;
    }

    if (this.mode === 'login') {
      const userInput=this.form.value;
        const loginRequest=new LoginRequest(userInput.email,userInput.password);
        this.userService.loginUser(loginRequest).subscribe(res=>{
          if(res!=null){
            console.log("success",res);
            this.userService.setToken(res.jwtToken);
            document.getElementById("loginBadge")!.style.display ="flex"
            setTimeout(()=>{
              
              document.getElementById("loginBadge")!.style.display ="none";
              this.userService.checkTokenExpired();
              this.router.navigate(['/products']);
            },1000)
            
          }
        })
    } else {

      const userInput=this.form.value;
      if(validatePassword(userInput)){
        this.isLoading=true;
        
        console.log("value"+userInput);
        const user=new User(userInput.firstName,userInput.lastName,userInput.email,userInput.mobileNumber,
          userInput.password);
        console.log(user.first_name);
        this.userService.signupUser(user).subscribe(res=>{
          if(res.statusCode.toString()=='CREATED'){
              this.userService.setToken(res.token)
              this.userService.checkTokenExpired();
              openModal();
              this.isLoading=false;
          } 
        });
      
      // Handle registration logic
    }
  }
  }

}
function validatePassword(userInput: any) :boolean{
 if(userInput.password==userInput.confirmpassword){

  return true
 }
 else{
  return false;
 }

}



function openModal() {
 const modalDiv=document.getElementById("myModal")
 if(modalDiv!=null){
  console.log("modal div")
  modalDiv.style.display='block';
 }
}

