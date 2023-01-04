import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'view',
  templateUrl:'./view.component.html'
})
export class ViewComponent implements OnInit,OnChanges {
  
  title:string = "Glimpse";
  constructor(  ) {  

    
   }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    

  }

}
