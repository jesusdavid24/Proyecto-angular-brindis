import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styles: []
})
export class ComponentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
