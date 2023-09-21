import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter;
  registerForm: FormGroup; 
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router ) {}

  ngOnInit(): void {
    this.intitzializeForm();
  }

  intitzializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
      ]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]], 
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const parentControl = control?.parent as FormGroup;
      return control?.value === parentControl?.controls[matchTo].value 
        ? null : { isMatching: true };
    };
  }

  // register
  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
