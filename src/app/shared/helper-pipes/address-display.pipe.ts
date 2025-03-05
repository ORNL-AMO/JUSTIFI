import { Pipe, PipeTransform } from '@angular/core';
import { GeneralInformation } from 'src/app/models/generalInformation';

@Pipe({
    name: 'addressDisplay',
    standalone: false
})
export class AddressDisplayPipe implements PipeTransform {

  transform(generalInformation: GeneralInformation): string {
    let addressStr: string = '';
    if (generalInformation.address) {
      addressStr += generalInformation.address;
    }
    if (generalInformation.city) {
      addressStr += (' ' + generalInformation.city)
    }
    if (generalInformation.state) {
      addressStr += (', ' + generalInformation.state)
    }
    if (generalInformation.zip) {
      addressStr += (' ' + generalInformation.zip)
    }
    if (generalInformation.country) {
      addressStr += (' ' + generalInformation.country)
    }
    return addressStr;
  }

}
