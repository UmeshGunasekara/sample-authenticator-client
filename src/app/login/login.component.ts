import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { TokenStoreService } from '../token-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  response:any = null;

  constructor(private authenticationService: AuthenticationService, private tokenStore: TokenStoreService) { }

  ngOnInit(): void {
    if (this.tokenStore.getToken()) {
      this.isLoggedIn = true;
    }
    this.onSubmit();
  }

  onSubmit(): void {
    // const { username, password } = this.form;

    //Test
    const username = "user1";
    const password = "user1";

    let resp = this.authenticationService.login(username, password)
    resp.subscribe(
      data => {
        this.response = data;

        this.tokenStore.saveToken(data.jwt);
        this.tokenStore.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
