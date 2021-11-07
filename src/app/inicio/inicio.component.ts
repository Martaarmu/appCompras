import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public loggingout:boolean=false;
  
  constructor(private authS:AutenticacionService, private router:Router) { }
  

  ngOnInit(): void {
    this.authS.$ready?.subscribe((data)=>{
      if(data){
        console.log(this.authS);
        
      }
    })
  }
  public async logout() {
    //deshablito el boton de llogout // muestro un espere...
    this.loggingout=true;
    try {
      await this.authS.logout();
      this.router.navigate(['/inises']);
      this.loggingout=false;
    } catch (err) {
      //toast no he podido cerrar sesión
      this.loggingout=false;
      alert(err);
    }
  }

}
