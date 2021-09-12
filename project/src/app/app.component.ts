import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style/app.component.scss']
})
export class AppComponent {

  public bntStyle = 'show-history';

  constructor() { 
    
  }

  public showHistory(): void {

    if (this.bntStyle == 'show-history') {
      this.bntStyle = 'hide-history';
    } else {
      this.bntStyle = 'show-history';
    }

  }

}
