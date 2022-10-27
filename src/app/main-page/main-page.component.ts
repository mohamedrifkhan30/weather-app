import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit,OnDestroy {

  sub: Subscription;
  
  constructor(
    private locationServices: LocationService,
    private weatherService:WeatherService
    ){}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
    ngOnInit(): void {
      this.loadData();
      this.sub= interval(30000).subscribe((x =>{
        this.loadData();
    }));
    }

    loadData(){
      const locations = this.locationServices.getLocations();
      if(!!locations){
        this.weatherService.getAllWeatherDetail(locations);
      }else{
        this.weatherService.addedWeatherList.next([]);
      }
    }


}
