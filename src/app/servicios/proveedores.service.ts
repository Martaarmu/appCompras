import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProveedoresComponent } from '../proveedores/proveedores/proveedores.component';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor( private db:AngularFireDatabase) { }

  addProv(proveedor:any){
    return this.db.database.ref().child("proveedores").push(proveedor);
  }

  getProveedores():any[] {
    let list:any[]=[];
    this.db.database.ref().child("proveedores").get().then((data)=>{
      const proveedores = data.val();
      for (let proveedor in proveedores){
        list.push({key:proveedor, ...proveedores[proveedor]});
      }
    })
    return list;
  }

  async getProveedor(key:string){
    let tmp = await this.db.database.ref().child("proveedores").child(key).get();
    let result =tmp.val();
    result.$key = key;
    return result;
  }
  putProveedor(proveedor: any, key: string) {
    this.db.database.ref().child("proveedores").child(key).update(proveedor);
  }
  delProveedor(key: string) {
    this.db.database.ref().child("proveedores").child(key).remove();
  }

}
