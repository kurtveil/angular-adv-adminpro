import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Kurt', Validators.required],
    email: ['kurt@gmail.com', [Validators.required, Validators.email]],
    password: ['1234567', Validators.required],
    password2: ['1234567', Validators.required],
    terms: [true, Validators.required],
  }, {
    validators: this.passwordsEquals('password', 'password2')
  });
  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuarioService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid){
      return;
    }
    // Realizar el posteo
    this.usuariosService.crearUsuario(this.registerForm.value).subscribe(res => {
      // Navegar al dashboard
      this.router.navigateByUrl(`/`);
    }, (msgError) => {
      // Si sucede un error
      swal.fire('Error', msgError.error.msg, 'error');
    });
  }

  camposInvalido(campo: string): boolean{
    this.registerForm.get(campo);
    if (this.registerForm.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }
  contrasenasNoValidas(): boolean{
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  passwordsEquals(passName1: string, passName2: string){
    return (formgroup: FormGroup) => {
      const pass1Control = formgroup.get(passName1);
      const pass2Control = formgroup.get(passName2);
      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else {
        pass2Control.setErrors({noEsIgual: true});
      }
    };
  }

  aceptaTerminos(): any{
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }
}
