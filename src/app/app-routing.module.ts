import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { InicioComponent } from './inicio/inicio.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { EditprovComponent } from './proveedores/editprov/editprov.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { ResgistroComponent } from './resgistro/resgistro.component';
import { GuardService } from './servicios/guard.service';

const routes: Routes = [
  {path:"",component:InisesComponent},
  {path:"inicio",component:InicioComponent},
  {path:'proveedores',component:ProveedoresComponent},
  {path:'addprovee',component:AddproveeComponent},
  {path:'editprov/:key',component:EditprovComponent},
  {path:'presupuestos',component:PresupuestosComponent},
  {path:'addpres',component:AddpresComponent},
  {path:'editpres/:key',component:EditpresComponent},
  {path:'registro',component:ResgistroComponent},
  {path:'inises',component:InisesComponent},
  {path:"**",component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
