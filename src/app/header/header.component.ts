import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggingout: boolean = false;
  constructor(public authS: AutenticacionService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public async logout() {
    this.loggingout = true;
    try {
      await this.authS.logout();
      this.router.navigate(['']);
      this.loggingout = false;
      console.log(this.authS);

    } catch (err) {
      this.loggingout = false;
      alert(err);
    }

  }

}
