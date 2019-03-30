import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/Services/auth/auth.service';
import { UserService } from 'src/Services/user.service';
import { PassThrough } from 'stream';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrManager, private userService: UserService) { }
  participantsForm: FormGroup;
  Button: any;
  submitted = false;
  participants: Array<any>;
  ngOnInit() {
    this.createForm();
    this.getParticipants();
  }
  get f() { return this.participantsForm.controls; }
  //Create Form is Used to Initalize the Values the Form


  createForm() {
    this.Button = "Create"
    this.submitted = false;
    this.participantsForm = this.formBuilder.group({
      email_id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  //The action performed After the Button is Pressed
  onSubmit(values: any) {
    this.submitted = true;
    this.Button = "Creating......."
    if (this.participantsForm.valid) {
      const email_id = this.participantsForm.value.email_id;
      const password = this.participantsForm.value.password;
      this.userService.createParticipant(email_id, password).subscribe((response: any) => {
        if (response.success) {
          this.toastr.successToastr(response.message, 'Success', { position: 'bottom-right' });
          this.createForm();
          this.Button = "create";
          this.getParticipants();
        }
        else {
          this.createForm();
          this.Button = "create";
          this.getParticipants();
        }
      });
    } else {
      this.toastr.infoToastr("Check the form", 'Alert!', { position: 'bottom-right' });
      this.Button = "create";
    }
  }

  getParticipants() {
    this.userService.getAllParticipants().subscribe((response: any) => {
      this.participants = response;
    });
  }

  deleteParticipant(id: String) {
    this.userService.deleteParticipant(id).subscribe((response: any) => {
      this.toastr.warningToastr(response.msg, "Delete");
      this.getParticipants();
    });
  }


}
