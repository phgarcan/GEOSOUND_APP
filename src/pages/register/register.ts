import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {RegistrationProvider} from "../../providers/register/register";
import {RegistrationRequest} from "../../models/registration-Request";
import {AlertController} from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Registration Page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  templateUrl: 'register.html'
})
export class Register {

  /**
   * This registration request object will be updated when the user
   * edits the registration form. It will then be sent to the API.
   */
  registrationRequest: RegistrationRequest;

  /**
   * If true, it means that the registration API has return a failed response
   */
  registrationError: boolean;

  /**
   * The register form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(private alertCtrl: AlertController, private registration: RegistrationProvider, private navCtrl: NavController) {
    this.registrationRequest = new RegistrationRequest();
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    // Hide any previous registration error.
    this.registrationError = false;

    // Perform the registration request to the API.
    this.registration.register(this.registrationRequest).subscribe(success => {


      let alert = this.alertCtrl.create({
        title: 'Registration Successful',
        subTitle: 'Welcome on board ' + success.name,
        buttons: [
          {
            text: 'Login',
            role: 'login',
            handler: () => {
              this.navCtrl.push(LoginPage);
            }
          }]
      });
      alert.present();


      console.log(success);
      // traiter enregistrement réussi
    }, err => {
      this.registrationError = true;
      console.warn(`Registration failed: ${err.message}`);
    });
  }
}
