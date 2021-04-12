import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels1: string[] = ['Tv', 'Smartphone', 'Mails'];
  public data1 = [
    [50, 30, 90],
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
