import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  AdOptions, 
  AdLoadInfo,
  InterstitialAdPluginEvents,
  RewardAdOptions
} from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {
  // TEST IDs (Replace these with Real IDs from AdMob Console before releasing!)
  private readonly bannerId = 'ca-app-pub-3507060400137036/8461235795';
  private readonly interstitialId = 'ca-app-pub-3507060400137036/2533347615';
  private readonly appOpenId = 'ca-app-pub-3507060400137036/8712177921';

  constructor(private platform: Platform) {
    this.initialize();
  }

  async initialize() {
    if (this.platform.is('capacitor')) {
      // FIX: Remove the object inside initialize()
      await AdMob.initialize();
      
      // Pre-load the first Interstitial so it's ready when clicked
      this.prepareInterstitial();
    }
  }

  // --- 1. BANNER ADS ---
  async showBanner() {
    if (!this.platform.is('capacitor')) return;

    const options: BannerAdOptions = {
      adId: this.bannerId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      // isTesting: true 
    };

    await AdMob.showBanner(options);
  }

  async hideBanner() {
    if (this.platform.is('capacitor')) {
      await AdMob.hideBanner();
    }
  }

  // --- 2. INTERSTITIAL ADS ---
  async prepareInterstitial() {
    if (!this.platform.is('capacitor')) return;

    const options: AdOptions = {
      adId: this.interstitialId,
      // isTesting: true 
    };

    await AdMob.prepareInterstitial(options);
  }

  async showInterstitial() {
    if (!this.platform.is('capacitor')) return;

    // Check if loaded, then show
    // Note: In a real app, you might want to wrap this in a try/catch
    await AdMob.showInterstitial();

    // Prepare the next one automatically after showing
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      this.prepareInterstitial();
    });
  }

// --- 3. APP OPEN ADS ---
async prepareAppOpenAd() {
  if (!this.platform.is('capacitor')) return;

  try {
      const options: AdOptions = {
        adId: this.appOpenId,
        // isTesting: true
      };
      await AdMob.prepareInterstitial(options);
  } catch (e) {
      console.warn('App Open Ad preparation failed:', e);
  }
}

async showAppOpenAd() {
  if (!this.platform.is('capacitor')) return;

  try {
      await this.prepareAppOpenAd();
      await AdMob.showInterstitial();
  } catch (e) {
      console.warn('App Open Ad failed to show:', e);
  }
 }
}