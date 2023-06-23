import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  backdropTapListener: any;
  alertOverlay: HTMLIonAlertElement | undefined;

  constructor(private router: Router, private alertController: AlertController) {
    this.alertOverlay = undefined;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Credenciales incorrectas',
      message: 'Por favor, intenta nuevamente.',
      buttons: ['OK']
    });

    await alert.present();


    this.alertOverlay = await this.alertController.getTop();
    if (this.alertOverlay) {
      this.backdropTapListener = this.backdropTapHandler.bind(this);
      this.alertOverlay.addEventListener('ionBackdropTap', this.backdropTapListener);
    }
  }

  backdropTapHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  login() {
    if (this.username === 'arparra' && this.password === '1234') {
      this.router.navigate(['/home']);
    } else {
      this.presentAlert();
    }
  }

  ngOnDestroy() {
    // Remover el listener cuando el componente se destruye
    if (this.alertOverlay) {
      this.alertOverlay.removeEventListener('ionBackdropTap', this.backdropTapListener);
    }
  }
}
