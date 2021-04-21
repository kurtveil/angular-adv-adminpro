import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string;
  public titleSubs$: Subscription;
  constructor( private router: Router, private route: ActivatedRoute ) {

    console.log(route.snapshot.children[0].data);

    // this.titleSubs$ = this.getDataRuta().subscribe( ({title}) => {
    //   this.title = title;
    //   document.title = `AdminPro - ${ title }`;
    // });

   }
  ngOnDestroy() {
    // this.titleSubs$.unsubscribe();
  }

  ngOnInit(): void {
    this.getDataRuta();
  }

  getDataRuta(){

    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),
    );

  }

}
