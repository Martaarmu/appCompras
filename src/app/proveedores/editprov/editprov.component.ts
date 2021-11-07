import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editprov',
  templateUrl: './editprov.component.html',
  styleUrls: ['./editprov.component.css']
})
export class EditprovComponent implements OnInit {

  @ViewChild('formpro') formpro!: NgForm;
  proveedorForm!:FormGroup;
  key:any;
  proveedor:any;
  nombre:any;
  cif:any;
        direccion:any;
        cp: any;
        localidad: any;
        provincia: any;
        telefono: any;
        email: any;
        contacto: any;

  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
    'Zamora', 'Zaragoza'];

  constructor(private proveedorService:ProveedoresService,
    private activateRouter:ActivatedRoute,
    private router:Router,
    private cdref:ChangeDetectorRef,
    private pf:FormBuilder) {
      this.activateRouter.params.subscribe(parametros=>{
        this.key=parametros['key'];
        (async()=>{
          this.proveedor=await this.proveedorService.getProveedor(this.key);
        })();
        ////
        this.cdref.detectChanges();
      })
     }

  ngOnInit(): void {
    this.setProveedor();
  }
  onChanges():void{
    this.proveedorForm.valueChanges.subscribe(valor => {
      this.nombre=valor.nombre;
      this.cif=valor.cif;
      this.direccion=valor.direccion;
      this.cp=valor.cp;
      this.localidad=valor.localidad;
      this.provincia=valor.provincia;
      this.telefono=valor.telefono;
      this.email=valor.email;
      this.contacto=valor.contacto;

    })
  }
  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorService.putProveedor(this.proveedor,this.key);
  
    }
    saveProveedor() {
      const saveProveedor = {
        nombre: this.proveedorForm.get('nombre')?.value,
        cif:  this.proveedorForm.get('cif')?.value,
        direccion:  this.proveedorForm.get('direccion')?.value,
        cp:  this.proveedorForm.get('cp')?.value,
        localidad:  this.proveedorForm.get('localidad')?.value,
        provincia:  this.proveedorForm.get('provincia')?.value,
        telefono:  this.proveedorForm.get('telefono')?.value,
        email:  this.proveedorForm.get('email')?.value,
        contacto:  this.proveedorForm.get('contacto')?.value,
        
      };
      
      return saveProveedor;
    }

    updateProveedor(){
      this.proveedor = this.saveProveedor();
      this.proveedorService.putProveedor(this.proveedor,this.key);
      console.log(this.proveedor);
      this.router.navigate(['/proveedores']);
     
    }

    setProveedor(){
      this.proveedorForm = this.pf.group({
        nombre: [this.proveedor?.nombre],
        cif: [this.proveedor?.cif],
       direccion: [this.proveedor?.direccion],
        cp: [this.proveedor?.cp],
        localidad: [this.proveedor?.localidad],
        provincia: [this.proveedor?.provincia],
        telefono: [this.proveedor?.telefono],
        email: [this.proveedor?.email],
        contacto: [this.proveedor?.contacto],
      });
      this.onChanges();
      this.cdref.detectChanges();
      
      
    }
   

    


}
