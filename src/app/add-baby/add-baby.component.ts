import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { BabyProfile } from '../data/vaccine-schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-baby',
  standalone: false,
  template: `
   <ion-header>
      <ion-toolbar>
        <ion-title>{{ isEditMode ? 'Edit Profile' : 'New Profile' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="form-container">
        
        <div class="avatar-select">
          <div class="circle" [class.girl]="gender === 'girl'" [class.boy]="gender === 'boy'">
            <ion-icon [name]="gender === 'girl' ? 'woman-outline' : 'man-outline'"></ion-icon>
          </div>
        </div>

        <ion-list lines="full">
          <ion-item>
            <ion-label position="stacked">Baby's Name</ion-label>
            <ion-input [(ngModel)]="name" placeholder="Enter name"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Gender</ion-label>
            <ion-select [(ngModel)]="gender">
              <ion-select-option value="boy">Boy</ion-select-option>
              <ion-select-option value="girl">Girl</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Date of Birth</ion-label>
            <ion-datetime-button datetime="dob-picker"></ion-datetime-button>
            <ion-modal [keepContentsMounted]="true">
              <ng-template>
                <ion-datetime id="dob-picker" presentation="date" 
                  [(ngModel)]="dob" [max]="today"></ion-datetime>
              </ng-template>
            </ion-modal>
          </ion-item>
        </ion-list>

        <div class="ion-padding-top">
          <ion-button expand="block" (click)="save()" [disabled]="!name">
            {{ isEditMode ? 'Update Profile' : 'Save Profile' }}
          </ion-button>
          
          <ion-button *ngIf="isEditMode" expand="block" color="danger" fill="outline" 
            class="ion-margin-top" (click)="confirmDelete()">
            Delete Profile
          </ion-button>
        </div>
      </div>
    </ion-content>
    
    <style>
       .avatar-select { display: flex; justify-content: center; margin: 20px 0; }
       .circle { 
         width: 80px; height: 80px; border-radius: 50%; background: #eee; 
         display: flex; align-items: center; justify-content: center; font-size: 40px; color: #888;
       }
       .circle.boy { background: #e3f2fd; color: #2196f3; }
       .circle.girl { background: #fce4ec; color: #e91e63; }
    </style>`
})
export class AddBabyComponent {
@Input() baby: BabyProfile | null = null; // Input from Parent

  name = '';
  gender: 'boy' | 'girl' = 'boy';
  dob = new Date().toISOString();
  today = new Date().toISOString();
  
  isEditMode = false;

  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public router: Router

  ) {}
ngOnInit() {
    if (this.baby) {
      this.isEditMode = true;
      this.name = this.baby.name;
      this.gender = this.baby.gender;
      this.dob = this.baby.dob;
    }
  }

  close() {
    this.modalCtrl.dismiss(null);
  }

  save() {
    this.modalCtrl.dismiss({
      role: 'save',
      data: {
        id: this.baby ? this.baby.id : null, // Pass ID if editing
        name: this.name,
        gender: this.gender,
        dob: this.dob
      }
    });
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Profile?',
      message: `Are you sure you want to delete ${this.name}? This cannot be undone.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Delete', 
          role: 'destructive',
                  handler: () => {
            // Make sure this.baby.id is actually being sent!
            console.log('Confirm Delete for ID:', this.baby?.id); 
            this.modalCtrl.dismiss({ role: 'delete', id: this.baby?.id });
          }
        }
      ]
    });
    await alert.present();
  }
  


}