import { Component, OnInit } from '@angular/core';
import { VaccineService } from '../vaccine';
import { BabyProfile, Vaccine, VACCINE_DETAILS } from '../data/vaccine-schedule';
import { IonicModule,ModalController } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'; 
import { 
  addCircle, 
  createOutline, 
  personCircle, 
  womanOutline, 
  manOutline,
  happyOutline 
} from 'ionicons/icons';
import { AdmobService } from '../services/admob.service';
import { AddBabyComponent } from '../add-baby/add-baby.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})

export class HomePage implements OnInit {
  babyName = 'Baby';
  birthDate: string = new Date().toISOString(); // Default to today
  schedule: Vaccine[] = [];
  babies: BabyProfile[] = [];
  activeBaby: BabyProfile | null = null;
 
  
  // New variables for Details Modal
  selectedVaccineInfo: any = null;
  isModalOpen = false;
  isDetailsOpen = false;

  constructor(private vaccineService: VaccineService,
    private modalCtrl: ModalController,
    private admobService: AdmobService
  ) {
    addIcons({ 
      addCircle, 
      createOutline, 
      personCircle, 
      womanOutline, 
      manOutline,
      happyOutline 
    });
  }

  async ngOnInit() {
    const saved = await this.vaccineService.loadProgress();
    if (saved) {
      this.schedule = saved;
    } else {
      this.recalc();
    }

this.vaccineService.babies$.subscribe(list => {
      this.babies = list;

      // 1. Check if the currently active baby still exists in the new list
      if (this.activeBaby) {
        const stillExists = this.babies.find(b => b.id === this.activeBaby!.id);
        
        if (stillExists) {
          // Case A: Baby exists (maybe Name/DOB was edited), update our reference
          this.activeBaby = stillExists;
          this.schedule = this.vaccineService.getScheduleForBaby(this.activeBaby);
        } else {
          // Case B: Baby was DELETED. Clear selection.
          this.activeBaby = null;
          this.schedule = [];
        }
      }

      // 2. If no baby is selected, try to auto-select the first one available
      if (!this.activeBaby && this.babies.length > 0) {
        this.selectBaby(this.babies[0]);
      } 
      // 3. If list is completely empty, ensure we show the empty state
      else if (this.babies.length === 0) {
        this.activeBaby = null;
        this.schedule = [];
      }
    });
  }
// 2. FORCE LOAD when view is about to enter (The Fix)
  ionViewWillEnter() {
    console.log('View entering, forcing data load...');
    this.vaccineService.loadProfiles();

    this.vaccineService.loadProfiles();
   setTimeout(() => {  
     this.admobService.showBanner();
   }, 1000);
  }
  recalc() {
    this.schedule = this.vaccineService.calculateSchedule(new Date(this.birthDate));
  }

  async toggleDone(vaccineId: string) {
    
    const idx = this.schedule.findIndex(v => v.id === vaccineId);
    if (idx > -1) {
      this.schedule[idx].isDone = !this.schedule[idx].isDone;
      this.vaccineService.saveProgress(this.schedule);
    }
    if (this.activeBaby) {
      await this.vaccineService.toggleVaccine(this.activeBaby.id, vaccineId);
      
      // 2. Show Interstitial Ad (The Full Screen Ad)
      // Tip: Don't show it EVERY click. Maybe every 3rd click, or only on "Mark Done".
      // For now, we show it on every click for testing.
      
    }
  }

  async openDetails(vaccineName: string) {
    // 1. Remove numbering (e.g., "IPV-1" becomes "IPV-1") 
    // Usually we match the exact string, but if you want to be generic you can strip numbers.
    // For now, we look up the exact string.
    
    const info = VACCINE_DETAILS[vaccineName];
    
    if (info) {
      this.selectedVaccineInfo = { name: vaccineName, ...info };
    } else {
      // Fallback if data is missing
      this.selectedVaccineInfo = { 
        name: vaccineName, 
        full_name: 'Standard Vaccine', 
        protects_against: 'Consult your pediatrician for details.',
        side_effects: ''
      };
    }
    
    this.isModalOpen = true;
    setTimeout(async () => {
     await this.admobService.showAppOpenAd();
    }, 3000)
  }

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  selectBaby(baby: BabyProfile) {
    this.activeBaby = baby;
    this.schedule = this.vaccineService.getScheduleForBaby(baby);
  }

  // async openAddBabyModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: AddBabyComponent
  //   });

  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     // Save data via service
  //     await this.vaccineService.addBaby(data.name, data.gender, data.dob);
  //   }
  // }

  // async toggleDone(vaccineId: string) {
  //   if (this.activeBaby) {
  //     await this.vaccineService.toggleVaccine(this.activeBaby.id, vaccineId);
  //     // The subscription in ngOnInit will handle the UI update automatically
  //   }
  // }

  // ... (Keep your existing openDetails() logic here)
  // openDetails(name: string) {
  //   this.selectedVaccineInfo = VACCINE_DETAILS[name] || { full_name: name, protects_against: 'Unknown', side_effects: '' };
  //   this.isDetailsOpen = true;
  // }

// Find your editBaby() function and update the DELETE section:

async editBaby() {
  if (!this.activeBaby) return;

  const modal = await this.modalCtrl.create({
    component: AddBabyComponent,
    componentProps: { baby: this.activeBaby }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data) {
    if (data.role === 'delete') {
      console.log('Deleting Baby ID:', data.id); // Debug Log

      // 1. Force the UI to clear the current baby IMMEDIATELY
      this.activeBaby = null; 
      this.schedule = []; 

      // 2. Perform the deletion in the background
      await this.vaccineService.deleteBaby(data.id);
      
      // 3. The subscription in ngOnInit will handle selecting a new baby or showing empty state
    } 
    else if (data.role === 'save') {
      // ... (Save logic remains the same) ...
      const updatedBaby = { ...this.activeBaby, ...data.data };
      await this.vaccineService.updateBaby(updatedBaby);
        //  await this.admobService.showInterstitial();
        setTimeout(async () => {
         await this.admobService.showAppOpenAd()
        }, 3000);
    }
  }
}

  // 2. Open Modal for ADDING (Updated to handle new structure)
  async openAddBabyModal() {
    const modal = await this.modalCtrl.create({
      component: AddBabyComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    // Check for 'save' role explicitly
    if (data && data.role === 'save') {
      await this.vaccineService.addBaby(
        data.data.name, 
        data.data.gender, 
        data.data.dob
      );
    }
  }

  

  ionViewWillLeave() {
    // Optional: Hide banner if you navigate away (prevents overlay issues)
    this.admobService.hideBanner(); 
  }

 
    
}