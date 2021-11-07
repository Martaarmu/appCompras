import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { AddpresComponent } from '../addpres/addpres.component';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

 
  presupuestos:any[]=[];
  presupuesto:any;
  id:any='';
  key:any='';
  

  constructor(public presupuestoService:PresupuestosService) { 
    this.presupuestos=this.presupuestoService.getPresupuestos();
  }

  ngOnInit(): void {
 
  }

 
  eliminar(presupuesto:AddpresComponent){
    this.presupuesto=this.presupuestoService.delPresupuesto(presupuesto.key);
    this.presupuestos=this.presupuestoService.getPresupuestos();
  }
  editar(presupuesto:AddpresComponent)
  {
    this.presupuesto=this.presupuestoService.getPresupuesto(presupuesto.key);
  }
}
