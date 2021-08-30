import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { ContentComponent } from './components/content/content.component';
import { ResoursesComponent } from './components/filter/resourses/resourses.component';
import { InformationComponent } from './components/filter/information/information.component';
import { SortingComponent } from './components/filter/sorting/sorting.component';
import { ResourceService } from './services/resourses.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    FilterComponent,
    SearchComponent,
    ContentComponent,
    ResoursesComponent,
    InformationComponent,
    SortingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
