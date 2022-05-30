import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService} from '@tejb/users'
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tejb-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
users: User[]=[]
constructor(
  private usersService: UsersService,
  private router: Router
) {}

ngOnInit(): void {
  this._getUsers();
}

deleteUser(userId: string){
  this.usersService.deleteUser(userId).subscribe(()=>
  this. _getUsers()
  )

};
updateUser(userId:string){
  this.router.navigateByUrl(`users/form/${userId}`)
};
private _getUsers(): void{
  this.usersService.getUsers().subscribe((use) =>{
    this.users=use;

  });
}
}