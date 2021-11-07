import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-resgistro',
  templateUrl: './resgistro.component.html',
  styleUrls: ['./resgistro.component.css']
})
export class ResgistroComponent implements OnInit {
  registroForm!: FormGroup;
  userdata: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private autService:AutenticacionService, private db:AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
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
    this.registroForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.userdata=this.autService.registroUser(this.userdata);
    this.router.navigate(['/inicio']);
  }
  saveUserdata() {
    const saveUserdata = {
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
    };
    return saveUserdata;
  }
  erroresForm: any = {
    'email': '',
    'password': ''
  }
  mensajesValidacion: any = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  }
  onValueChanged(data?: any) {
    if (!this.registroForm) { return; }
    const form = this.registroForm;
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }
}



