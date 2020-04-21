import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../Model/Users';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  isAdmin: boolean;
  id: string;
  user: User
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.id = localStorage.getItem('UserId')
     var admin = JSON.parse(localStorage.getItem('IsAdmin'));
     if(admin){
        this.isAdmin = false;
     }
     else{
       this.isAdmin = true;
     }

     this.GetUser();
  }

  GetUser(){
    debugger
    this.userService.getUseById(this.id).subscribe(x => {
        this.user = x;
    })
  }

}


