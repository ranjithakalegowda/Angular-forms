import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsername = ['chris','anna'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
  onSubmit(){
    console.log(this.signupForm);
  }
  onAddHobby(){
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }
  forbiddenEmails(control: FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout( ()=>{
        if(control.value === 'test@gmail.com'){
          resolve({'emailIsForbidden' : true});
        }
        else{
          resolve(null);
        }
      }, 1500);
    });
    return promise
  }
}
