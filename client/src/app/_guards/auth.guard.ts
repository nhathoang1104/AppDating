import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, map } from "rxjs";
import { AccountService } from "../_services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toarstr: ToastrService) {}
  canActivate():Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user =>{
        if(user){
          return true;
        } 
        this.toarstr.error("You shall not pass!")
        return false;
      })
    )
  }
}