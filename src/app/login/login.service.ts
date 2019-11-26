import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<firebase.User>;
  isLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  login(userInfo: User) {
    this.afAuth.auth.
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        console.log('Successfully signed in!');
        this.isLoggedIn = true;
        this.router.navigate(['/list']);
      })
      .catch(err => {
        console.log('Somethings is wrong...');
        console.log(err);
        this.isLoggedIn = false;
      });
  }


  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        console.log('sign out successfull!');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('Somethings is wrong...');
        console.log(err);
        this.isLoggedIn = false;
      });
  }

}
