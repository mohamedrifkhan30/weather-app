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

  //buttonObservalvbe = new BehaviorSubject<ButtonLabel>({disabled:false,label:"Add Location"});
  
  constructor(private service : LocationService,private weatherService:WeatherService) {}

  ngOnInit(): void {
    this.countriesAll$ = this.weatherService.getCountries().pipe(shareReplay());
  }

  addLocation(zipcode : string){
    this.button$ = this.weatherService.addCurrentConditions(zipcode,this.countryCode);

    // // this.weatherService.addCurrentConditions(zipcode,this.countryCode).subscribe(res=>{
    // //   this.weatherService.getAllWeatherDetail(this.service.addLocation(zipcode,this.countryCode));
    // //  // this.triggerNextState({disabled:true,label:"Done"});
    // // },()=>{
    // //  // this.triggerNextState({disabled:false,label:"Add Location"});
    // // },()=>{
    // //   setTimeout(()=>{
    // //    // this.triggerNextState({disabled:false,label:"Add Location"});
    // //    }, 500);
    // // });
    
  }
  settingData($event){
    this.weatherService.getAllWeatherDetail(this.service.addLocation($event.zipCode,$event.sys.country.toLowerCase()));
  }

//  triggerNextState(label:ButtonLabel){
//   this.buttonObservalvbe.next(label);
//  }

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
