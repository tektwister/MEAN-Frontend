import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrManager) { }
  loginForm: FormGroup;
  Button: any;
  submitted = false;
  ngOnInit() {
    this.createForm();
  }
  get f() { return this.loginForm.controls; }
  //Create Form is Used to Initalize the Values the Form
  createForm() {
    this.Button = "Login"
    this.submitted = false;
    this.loginForm = this.formBuilder.group({
      email_id: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  //The action performed After the Button is Pressed
  onSubmit(values: any) {

    this.submitted = true;
    this.Button = "Checking......."
    if (this.loginForm.valid) {
      const email_id = this.loginForm.value.email_id;
      const password = this.loginForm.value.password;
      this.authService.authenticate(email_id, password).subscribe((response: any) => {
        if (response.success) {
          window.location.reload();
          this.router.navigate(['']);
          this.toastr.successToastr(response.msg.desc, 'Success', { position: 'bottom-right' });
          this.authService.createSession(response);
        } else {
          // Create session for the user
          this.Button = "Login";
          this.toastr.infoToastr(response.msg.desc, 'Alert!', { position: 'bottom-right' });
          this.loginForm.reset();
        }
      });
    } else {
      this.toastr.infoToastr("Check the form", 'Alert!', { position: 'bottom-right' });
      this.Button = "Login";
    }
  }

}
