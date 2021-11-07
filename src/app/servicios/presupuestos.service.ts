
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presupuesto: any;


  constructor(
    private db: AngularFireDatabase) { }


  addPres(presupuesto: any) {
    return this.db.database.ref().child("presupuestos").push(presupuesto);
  }

  getPresupuestos(): any[] {

    let list: any[] = [];

    this.db.database.ref().child("presupuestos").get().then((data) => {

      const presupuestos = data.val();
      for (let presupuesto in presupuestos) {

        list.push({ key: presupuesto, ...presupuestos[presupuesto] });
      }
    })
    return list;
  }


  async getPresupuesto(key: string) {
    let tmp = await this.db.database.ref().child("presupuestos").child(key).get();
    let result = tmp.val();
    result.$key = key;
    return result;
  }

  putPresupuesto(presupuesto: any, key: string) {
    this.db.database.ref().child("presupuestos").child(key).update(presupuesto);
  }

  delPresupuesto(key: string) {
    this.db.database.ref().child("presupuestos").child(key).remove();
  }


}

