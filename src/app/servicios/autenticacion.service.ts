import { Injectable } from '@angular/core';


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from 'firebase/auth';
import { Auth } from 'firebase/auth';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',

})
export class AutenticacionService {
  public user:any|null=null;
  public ready:boolean=false;
  public $ready: Observable<any>|null=null;
  constructor(
    private authf:AngularFireAuth  
    ) {
      this.checkSSO();
     }
  public registroUser(userdata:{email:any; password:any;}):Promise<firebase.default.auth.UserCredential>{
    return this.authf.createUserWithEmailAndPassword(userdata.email,userdata.password);
  }

  public inicioSesion(userdata:{email:any; password:any;}):Promise<firebase.default.auth.UserCredential>{
    console.log(userdata);
    return this.authf.signInWithEmailAndPassword(userdata.email,userdata.password);
  }
  public googleLogin():Promise<firebase.default.auth.UserCredential>{
    return this.authf.signInWithPopup(new GoogleAuthProvider())

  }

  public setUser(u:firebase.default.auth.UserCredential | null | any):void{
    if(u && u.user){
      this.user={
        displayName:u.user?.displayName,
        email:u.user?.email,
        photoURL:u.user?.photoURL,
        uid:u.user?.uid
      };  

    }else{
      this.user=null;
    }
  }
  public get isLogged():boolean{
    return this.user?true:false;
  }
  public checkSSO():void{
    //Comprobar si tenemos sesion abierta en nuestro SSO Provider
    this.$ready = new Observable((observer)=>{
      try {
        this.authf.authState.subscribe((data)=>{
          console.log(data);
          this.ready=true;
          if (data!=null) {
            this.setUser({user:data});
            observer.next(true);

          } else {
            this.setUser(null);
            this.ready=true;
            observer.next(false);
          }
          
          observer.complete();
        })
      } catch (err) {
        console.log(err);
        this.setUser(null);
        this.ready=true;
        observer.next(false);
        observer.complete();
      }
    })
    
  }

  public logout():Promise<void>{
    return new Promise(async (resolve,reject)=>{
      if(this.isLogged){
        try {
          await this.authf.signOut();
          this.setUser(null);
          resolve();
          console.log(this.authf);
        } catch (err) {
          reject(err);
        }
      }
    })
  }
}

