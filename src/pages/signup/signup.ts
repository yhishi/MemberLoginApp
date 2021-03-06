import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'Firebase';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  
  data: { email: string, password: string } = { email: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  // signup(){
  // //Api connections
  // this.navCtrl.push(TabsPage);
  // }

  async signUp() {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.email, this.data.password);

      this.navCtrl.push(TabsPage);

    } catch (error) {
      const alert = await this.alertController.create({
        title: '警告',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
