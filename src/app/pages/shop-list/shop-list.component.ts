import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  stores = [
    {
      name: 'Churros S.A',
      image: '../assets/images/food/churros.jpg'
    },
    {
      name: 'Fried Chicken S.A',
      image: './assets/images/food/fried-chicken.jpg'
    },
    {
      name: 'Hamburguer S.A',
      image: './assets/images/food/hamburger.jpg'
    },
    {
      name: 'Pizza S.A',
      image: './assets/images/food/pizza.jpg'
    },
    {
      name: 'Shusshi S.A',
      image: './assets/images/food/sushi.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
