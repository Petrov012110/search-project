import { Component } from '@angular/core';
import { ResourceService } from './services/resourses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor ( private resours: ResourceService ) { }
  
}
