import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User, UsersService } from '@tejb/users';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tejb-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  editmode = false;
  created = false;
  updated = false;
  currentUserId: string;
  countries = [];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }
  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe();
    this.created = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timer(2000)
      .toPromise()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_done) => {
        this.location.back();
      });
  }
  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe();
    this.updated = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timer(2000)
      .toPromise()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_done) => {
        this.location.back();
      });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params)=> {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe(user => {
          this.userform.name.setValue(user.name);
          this.userform.password.setValidators([]);
          this.userform.password.updateValueAndValidity();
          this.userform.email.setValue(user.email);
          this.userform.phone.setValue(user.phone);
          this.userform.isAdmin.setValue(user.isAdmin);
          this.userform.street.setValue(user.street);
          this.userform.apartment.setValue(user.apartment);
          this.userform.zip.setValue(user.zip);
          this.userform.city.setValue(user.city);
          this.userform.country.setValue(user.country);

          
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userform.name.value,
      email: this.userform.email.value,
      password: this.userform.password.value,
      phone: this.userform.phone.value,
      isAdmin: this.userform.isAdmin.value,
      street: this.userform.street.value,
      apartment: this.userform.apartment.value,
      zip: this.userform.zip.value,
      city: this.userform.city.value,
      country: this.userform.country.value,
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }
  onCancel() {
    this.location.back();
  }
  get userform() {
    return this.form.controls;
  }
}
