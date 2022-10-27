import { Injectable } from '@angular/core';
import { Country } from './country.model';
import {WeatherService} from "./weather.service";

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  constructor(private weatherService : WeatherService) {
    
  }

  addLocation(zipcode : string,code:string):Country[]{
    
      const locations:Country[]= this.getLocations() || [];
       locations.push({zipCode:parseInt(zipcode),code});
      
      localStorage.setItem(LOCATIONS, JSON.stringify(locations));
      return locations;
  }

  removeLocation(zipcode : number,country:string):Country[]{

    const locations = this.getLocations().filter(data=>data.zipCode!==zipcode && data.code!==country);
    localStorage.setItem(LOCATIONS, JSON.stringify(locations));
    return locations;

    //let index = this.locations.indexOf(zipcode);
    // if (index !== -1){
    //   this.locations.splice(index, 1);
    //   localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    //   this.weatherService.removeCurrentConditions(zipcode);
    // }
  }
   getLocations():Country[]{
    const locString = localStorage.getItem(LOCATIONS);
    if (!!locString){
      return JSON.parse(locString);
    }
   }
}
