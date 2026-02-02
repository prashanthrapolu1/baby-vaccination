import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BabyProfile, INDIAN_VACCINE_SCHEDULE, Vaccine } from './data/vaccine-schedule';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class VaccineService {
  // private STORAGE_KEY = 'baby_vaccine_data';
  private STORAGE_KEY = 'baby_profiles_v1';
 private babiesSubject = new BehaviorSubject<BabyProfile[]>([]);
  public babies$ = this.babiesSubject.asObservable();
  constructor(

  ) { 
    this.loadProfiles();
  }

  // 1. Initialize Schedule based on Birth Date
  calculateSchedule(birthDate: Date): Vaccine[] {
    return INDIAN_VACCINE_SCHEDULE.map(v => {
      const due = new Date(birthDate);
      due.setDate(due.getDate() + v.ageInDays);
      return { ...v, dueDate: due };
    });
  }

  // 2. Save Progress
  async saveProgress(schedule: Vaccine[]) {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(schedule),
    });
    this.scheduleNotifications(schedule); // Auto-schedule reminders
  }

  // 3. Load Progress
  async loadProgress(): Promise<Vaccine[] | null> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    return value ? JSON.parse(value) : null;
  }

  // 4. Schedule Local Notifications
  async scheduleNotifications(schedule: Vaccine[]) {
    // Filter for future, undone vaccines
    const pending = schedule.filter(v => !v.isDone && new Date(v.dueDate!) > new Date());
    
    const notifications = pending.map(v => ({
      id: v.ageInDays, // Unique ID based on age
      title: `Vaccination Due: ${v.ageLabel}`,
      body: `Ideally get: ${v.vaccines.join(', ')}`,
      schedule: { at: v.dueDate }, // Schedules natively
    }));

    // await LocalNotifications.schedule({ notifications });
  }

  // 1. Load all babies from storage
  async loadProfiles() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    if (value) {
      this.babiesSubject.next(JSON.parse(value));
    }
  }

  // 2. Add a new baby
  async addBaby(name: string, gender: 'boy' | 'girl', dob: string) {
    const newBaby: BabyProfile = {
      id: Date.now().toString(), // Simple unique ID
      name,
      gender,
      dob,
      completedVaccines: []
    };

    const currentList = this.babiesSubject.value;
    const updatedList = [...currentList, newBaby];
    
    await this.saveToStorage(updatedList);
  }

  // 3. Mark a vaccine as Done/Undone for a specific baby
  async toggleVaccine(babyId: string, vaccineId: string) {
    const list = [...this.babiesSubject.value];
    const babyIndex = list.findIndex(b => b.id === babyId);

    if (babyIndex > -1) {
      const baby = list[babyIndex];
      const hasVaccine = baby.completedVaccines.includes(vaccineId);

      if (hasVaccine) {
        // Remove it (Undo)
        baby.completedVaccines = baby.completedVaccines.filter(id => id !== vaccineId);
      } else {
        // Add it (Done)
        baby.completedVaccines.push(vaccineId);
      }

      list[babyIndex] = baby;
      await this.saveToStorage(list);
    }
  }

  // 4. Generate the Schedule View for a specific baby
  getScheduleForBaby(baby: BabyProfile): Vaccine[] {
    const birthDate = new Date(baby.dob);
    
    return INDIAN_VACCINE_SCHEDULE.map(v => {
      const due = new Date(birthDate);
      due.setDate(due.getDate() + v.ageInDays); // Calculate due date
      
      return {
        ...v,
        dueDate: due,
        isDone: baby.completedVaccines.includes(v.id) // Check if this baby has taken it
      };
    });
  }

  private async saveToStorage(list: BabyProfile[]) {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(list)
    });
    this.babiesSubject.next(list);
  }

  async updateBaby(updatedBaby: BabyProfile) {
    const list = [...this.babiesSubject.value];
    const index = list.findIndex(b => b.id === updatedBaby.id);
    
    if (index > -1) {
      list[index] = updatedBaby;
      await this.saveToStorage(list);
    }
  }

  // 2. Delete a baby
 async deleteBaby(id: string) {
  // 1. Get the latest data directly from Storage (Disk)
  const { value } = await Preferences.get({ key: this.STORAGE_KEY });
  let currentList: BabyProfile[] = value ? JSON.parse(value) : [];

  // 2. Filter out the baby with the matching ID
  const updatedList = currentList.filter(b => b.id !== id);

  // 3. Save the new list back to Disk PERMANENTLY
  await Preferences.set({
    key: this.STORAGE_KEY,
    value: JSON.stringify(updatedList)
  });

  // 4. Update the App's Memory so the screen refreshes
  this.babiesSubject.next(updatedList);
}
}

// src/app/data/vaccine-schedule.ts (Add this to the file)

