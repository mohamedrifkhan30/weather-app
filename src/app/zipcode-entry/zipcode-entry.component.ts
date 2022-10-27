import { Component, OnInit } from '@angular/core';
import { ButtonLabel } from '../button/button.model';
import { Country } from '../country.model';
import { WeatherService } from '../weather.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LocationService} from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent implements OnInit{
  
  showList:boolean=false;
  countryName:string;
  countryCode:string;
  countriesAll$: Observable<Country[]>;
  countries$: Observable<Country[]>;
  button$:Observable<any>;
  
  constructor(private service : LocationService,private weatherService:WeatherService) {}

  ngOnInit(): void {
    this.countriesAll$ = this.weatherService.getCountries().pipe(shareReplay());
  }

  addLocation(zipcode : string){
    this.button$ = this.weatherService.addCurrentConditions(zipcode,this.countryCode);
  }
  settingData($event){
    this.weatherService.getAllWeatherDetail(this.service.addLocation($event.zipCode,$event.sys.country.toLowerCase()));
  }



 getCountries(country:string){
  this.showList =true;
  this.countries$ =
  this.countriesAll$.pipe(
    map(res=>res.filter(row=> {
      return row["name"].toLowerCase().includes(country.toLowerCase()) && (row["displayName"] = row["name"].replace(country, '<b>' + country + '</b>'))
    }).slice(0, 5))
    );
 }

 identifyFn(index, item){
  return item.name; 
 }

selectedCountry(country:Country){
  this.countryName = country.name;
  this.countryCode =country.code;
  this.showList =false;
}
}
