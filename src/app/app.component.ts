
import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { AdmobService } from './services/admob.service'
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {
 constructor(
    private platform: Platform,
    private admobService: AdmobService
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      // 1. Initialize AdMob
      this.admobService.initialize();

      // App.addListener('appStateChange', (state) => {
      //   if (state.isActive) {
      //     this.admobService.showAppOpenAd();
      //   }
      // });

      // 3. Show App Open Ad on First Launch (Optional)
      setTimeout(() => {
        this.admobService.showAppOpenAd(); 
      }, 10000);
    });
  }
}
