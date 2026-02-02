import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.html',
  styleUrls: ['./splash.scss'],
  standalone: false
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Show splash for 2.5 seconds, then navigate to Home
    // In a real app, you can load your JSON/API data here instead of just waiting
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 3500);
  }
}