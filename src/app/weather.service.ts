import { Injectable } from '@angular/core';
import {Observable, forkJoin, BehaviorSubject} from 'rxjs';
import{map, flatMap, shareReplay}from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import { Country } from './country.model';

@Injectable()
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = [];
  addedWeatherList = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  addCurrentConditions(zipcode: string,country:string): Observable<any> {
    // Here we make a request to get the curretn conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(`${WeatherService.URL}/weather?zip=${zipcode},${country}&APPID=${WeatherService.APPID}`).pipe(map(res=>{
      res["zipCode"] = zipcode;
      return res;
    }));
  }

  removeCurrentConditions(zipcode: string) {
    for (let i in this.currentConditions){
      if (this.currentConditions[i].zip == zipcode)
        this.currentConditions.splice(+i, 1);
    }
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }

  getForecast(zipcode: string,country:string): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${country.toLowerCase()}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

  getWeatherIcon(id){
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

  public getCountries(): Observable<Country[]> {

    return this.http.get<Country[]>("./assets/countries.json").pipe(
      map(res=>res),
      shareReplay()
    );
}

getAllWeatherDetail(counties:Country[]):void{
  if(counties.length==0){
    this.addedWeatherList.next([]);
    return ;
  }
  
  const urls = [];
  counties.forEach(res=>{
    urls.push(this.http.get(`${WeatherService.URL}/weather?zip=${res.zipCode},${res.code}&APPID=${WeatherService.APPID}`));
  });
   forkJoin(urls).pipe(map(res=>{
    
    for(let i=0;i<counties.length;i++){
      res[i]["zipCode"]=counties[i].zipCode;
    }
    return res;
   })).subscribe(res=>{
    this.addedWeatherList.next([...res]);
   });
}
}