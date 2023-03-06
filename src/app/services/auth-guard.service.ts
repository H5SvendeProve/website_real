import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return this.authService.validateToken(token).pipe( 
        tap(isValid => {
          if (!isValid) {
            this.router.navigate(['/login']);
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  //CanActivate(): boolean{
  //const token = localStorage.getItem('token');
  //  if (token) {
  //    return this.authService.validateToken(token).pipe(
  //      tap(isValid => {
  //        if (!isValid) {
  //          this.router.navigate(['/login']);
  //          return false;
  //        }
  //        return true;
  //      })
  //    );
  //  } else {
  //    this.router.navigate(['/login']);
  //    return false;
  //  }
  //}
  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //  return this.canActivateFn(route, state);
  //}
//
  //canActivateFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
  //  const token = localStorage.getItem('token');
  //  if (token) {
  //    const isValid = this.authService.validateToken(token);
  //    if (!isValid) {
  //      return this.router.createUrlTree(['/login']);
  //    }
  //    return true;
  //  } else {
  //    return this.router.createUrlTree(['/login']);
  //  }
  //}
  //constructor(private loginService: LoginService, private router: Router){}
  //canActivateFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean> | UrlTree | Promise<boolean> {
  //  const token = localStorage.getItem('token');
  //  if (token) {
  //    const isValid = this.loginService.validateToken(token);
  //    if (isValid) {
  //      return true;
  //    } else {
  //      this.router.navigate(['/login']);
  //     return false;
  //    }
  //  } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //  }
  //}


 // CanActivateFn(): Observable<boolean> | Promise<boolean> | boolean { 
 //   const token = localStorage.getItem('token');
 //   if(token){
 //     return this.loginService.validateToken(token).pipe(
 //       tap(isValid => {
 //         if (!isValid) {
 //           this.router.navigate(['/login']);
 //         }
 //       })
 //     );
 //   } else {
 //     this.router.navigate(['/login'])
 //     return false;
 //   }
 // }
}
