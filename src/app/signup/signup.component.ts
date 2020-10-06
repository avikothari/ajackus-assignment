import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  sign_in_type: string;

  signInForm: FormGroup
  submitted: boolean;
  error_text = '';

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.sign_in_type = this.activatedRoute.snapshot.queryParamMap.get('type')

    this.createForm()
  }

  /**Building the signup form */
  createForm(){
    this.signInForm = this.formBuilder.group({
      name: [{value : 'John Doe', disabled:true}],
      email: [{ value: 'john@requantive.com', disabled: true }],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.maxLength(10),Validators.minLength(10)]]
    })
  }

  /**Check Input for mobile Number */
  checkChar(event){
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }

  /**Access form controls */
  get formControls(){
    return this.signInForm.controls
  }

  /**Sign Up */
  signUp(){
    this.submitted =true

    if(this.signInForm.invalid){
      return
    }
    

    this.authService.signUp({
      name: this.signInForm.getRawValue().name,
      email: this.signInForm.getRawValue().email,
      phone_number: this.signInForm.value.phone_number
    }).subscribe(data=>{
      this.router.navigate(['signup-success'])
    },error=>{
      this.error_text = error.error['message']
    })


  }


}
