import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard = [
    {
      image: '../assets/images/food/churros.jpg'
    },
    {
      image: './assets/images/food/fried-chicken.jpg'
    },
    {
      image: './assets/images/food/hamburger.jpg'
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
