import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Iusers } from '../users-list/users-list.component';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss']
})
export class AddUserPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddUserPopupComponent>) {
    // console.log(this.data);
  }
  user: Iusers = {
    "id": 1,
    "name": "Leanne Graham",
    "username": "",
    "email": "",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  };

  public userForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required])
  })
  get f() { return this.userForm.controls; }
  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.userForm.invalid) {
      return
    }
    console.log(" Billing Form", this.userForm.value);
    this.user.id = this.data.users.length + 1;
    this.user = { ...this.user, ...this.userForm.value };
    this.data.users.unshift(this.user);
    this.dialogRef.close(this.data.users);
  }

}
