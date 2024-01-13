import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataPerson } from 'app/data';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{
    public dataPerson:any;
    public checkDirty:boolean = false;
    public namePlatform:any = '';
    loginForm = this.formBuilder.group({
        email: [null, [Validators.required]],
        password: [null, [Validators.required]],
        platform: [this.namePlatform,[Validators.required]],
      })

      constructor(
        private formBuilder: FormBuilder,
        private router: Router
        ){}
    
    ngOnInit(){
        this.dataPerson = dataPerson;
        const getLogin = localStorage.getItem('auth');
        if(getLogin) this.router.navigate(['/dashboard'])

    }

    onInputEmail() {
        if(this.loginForm.value.email){
            let filterUser = this.dataPerson.filter((user:any)=>{
                return user.email === this.loginForm.value.email;
            });
            console.log(filterUser);
            if(filterUser.length === 0){
                console.log("dirunning bosku")
                this.checkDirty = true;
            } else {
                this.loginForm.value.platform = filterUser[0].platform;
                this.namePlatform = filterUser[0].platform;
                this.checkDirty = false;
            }
        }
    }



    doLogin(){
        if (this.loginForm.invalid){
            if (!this.loginForm.value.email) return this.loginForm.controls.email.markAsDirty;
            if (!this.loginForm.value.password) return this.loginForm.controls.password.markAsDirty;
        }

        let filterUser = this.dataPerson.filter((user:any)=>{
            return user.email === this.loginForm.value.email;
        });

        if(filterUser[0].password === this.loginForm.value.password){
            localStorage.setItem(`auth`, `login`);
            this.router.navigate(['/dashboard'])
        }
    }
}