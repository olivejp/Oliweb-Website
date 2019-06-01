import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SignInService} from "../../services/SignInService";

@Injectable()
export class NewAnnonceGuardGuard implements CanActivate {

  constructor(private signInService: SignInService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) =>{
      resolve(this.signInService.isAuth);
      if (!this.signInService.isAuth) {
        this.router.navigate(['/login']);
      }
    });
  }
}
