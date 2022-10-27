import { Injectable } from '@angular/core';
import { Country } from './country.model';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  constructor() {
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

  }
   getLocations():Country[]{
    const locString = localStorage.getItem(LOCATIONS);
    if (!!locString){
      return JSON.parse(locString);
    }
    return [];
   }
}
