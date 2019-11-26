import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean>{

    return this.loginService.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      }),
    );
    
  }
}
