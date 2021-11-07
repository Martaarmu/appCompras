import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { AddproveeComponent } from '../addprovee/addprovee.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores:any[]=[];
  proveedor:any;
  key:any='';
  
 
  constructor(private proveedoresService:ProveedoresService) { 
    this.proveedores=this.proveedoresService.getProveedores();
  }

  ngOnInit(): void {
   
    
  }

  editar(proveedor:any){
    this.proveedor=this.proveedoresService.getProveedor(proveedor.key);
  }
  eliminar(proveedor:any){
    this.proveedor=this.proveedoresService.delProveedor(proveedor.key);
    this.proveedores=this.proveedoresService.getProveedores();
  }

}
