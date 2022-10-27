import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
  weatherList:Observable<any[]>;

  constructor(
     private weatherService : WeatherService,
     private router : Router,
     private locationService:LocationService
     ) {
  }
  
  ngOnInit(): void {
    this.weatherList =  this.weatherService.addedWeatherList.asObservable();
  }

  showForecast(zipcode : number,country:string){
    this.router.navigate(['/forecast',country.toLowerCase(),zipcode])
  }

  removeLocation(zipcode : number,country:string){
    
    const availableAdded = this.locationService.removeLocation(zipcode,country);
    this.weatherService.getAllWeatherDetail(availableAdded);
  }
}
