import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { MyUser } from './model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kiyawamu-new';

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {}

  username: string;
  age: number;

  users: Array<MyUser>;

  ngOnInit(): void {
    // this.firebaseService.getUsers().then((res: Array<any>) => {
    //   this.users = res.map((r) => {
    //     const user: MyUser = new MyUser();
    //     user.name = r.payload.doc.data().name;
    //     user.age = r.payload.doc.data().age;
    //     return user;
    //   });
    // });

    this.firebaseService.getUserStream().subscribe((res) => {
      this.users = res.map((r) => {
        const user: MyUser = new MyUser();
        user.id = r.payload.doc.id;
        user.name = r.payload.doc.data()['name'];
        user.age = r.payload.doc.data()['age'];
        return user;
      });
    });
  }

  handleSubmit(): void {
    console.log(this.username, this.age);
    this.firebaseService
      .createUser({
        name: this.username,
        age: this.age,
      })
      .then((res) => {
        console.log(res);
      });
  }

  handleClick(id) {
    this.router.navigateByUrl(`/${id}`);
  }
}
