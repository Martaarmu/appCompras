import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {
  loginForm!: FormGroup;
  userdata: any;
  constructor(private formBuilder: FormBuilder,
    public authService: AutenticacionService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.loginForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]
      ]
    });
/*
    this.authService.$ready?.subscribe((data)=>{
      if(data){
           this.router.navigate(["/inicio"]);
        }
       })
       */
       
  }
  onSubmit() {
    this.userdata = this.saveUserdata();
    this.authService.inicioSesion(this.userdata);
    this.router.navigate(['/inicio']);
  }
  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    return saveUserdata;
  }
  login(){
    this.authService.googleLogin()
    .then((data)=>{
      this.authService.setUser(data); //////////
      if(this.authService.isLogged){
        this.router.navigate(['/inicio']);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
    

}
