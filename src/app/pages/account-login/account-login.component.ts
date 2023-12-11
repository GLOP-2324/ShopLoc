import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from "@angular/forms";
import {AccountService} from "../../shared/service/accountService";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../shared/service/AuthService";

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent {

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  credentials: any;

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  connexion() {
    this.credentials = this.loginForm.getRawValue();
    if (this.loginForm.get("email")?.value !== null && this.loginForm.get("email")?.value !== ""
      && this.loginForm.get("password")?.value !== null && this.loginForm.get("password")?.value !== "") {
      this.authService.signIn(this.credentials).subscribe((response: any) => {
        console.log(response)
        if (response != null) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("firstname", response.firstname);
          localStorage.setItem("lastname", response.lastname);
          switch (response.roleId) {
            case 1:
              console.log("rediriger vers l'interface ADMIN");
              break;
            case 2:
              this.router.navigateByUrl("/commercant");
              break;
            case 3:
              console.log("rediriger vers l'interface CLIENT");
              break;
            default:
              this.router.navigateByUrl("/error");
              break;
          }
        }
        else {
          this.router.navigateByUrl("/error");
        }
      })
    } else {
      this.toastr.error(
        "Veuillez remplir tous les champs requis"
      );
    }

  }
}
