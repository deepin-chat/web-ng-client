import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfile } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  form?: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.get()
      .subscribe(res => {
        this.buildForm(res.profile)
      });
  }

  buildForm(profile: UserProfile) {
    this.form = this.fb.group({
      name: this.fb.control(profile.name, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      nickName: this.fb.control(profile.nickName, [Validators.required, Validators.maxLength(32)]),
      firstName: this.fb.control(profile.firstName, [Validators.maxLength(32)]),
      lastName: this.fb.control(profile.lastName, [Validators.maxLength(32)]),
      pictureId: this.fb.control(profile.picture),
      gender: this.fb.control(profile.gender),
      birthDate: this.fb.control(profile.birthDate),
      bio: this.fb.control(profile.bio, [Validators.maxLength(256)]),
      zoneInfo: this.fb.control(profile.zoneInfo, [Validators.maxLength(32)]),
      local: this.fb.control(profile.local, [Validators.maxLength(32)]),
      title: this.fb.control(profile.title, [Validators.maxLength(32)])
    });
  }

  onSubmit() {
    if (this.isLoading || this.form?.invalid) return;
    this.isLoading = true;
    this.userService.update(this.form?.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Profile updated', 'Ok')
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }
}
