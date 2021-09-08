import { Component } from '@angular/core';
import { ResourceService } from './services/resourses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public bntStyle = 'show-history';

  constructor ( ) { }

  public showHistory(): void {
    if(this.bntStyle == 'show-history') {
      this.bntStyle = 'hide-history'
    } else {
      this.bntStyle = 'show-history'
    }

  }
  
}
