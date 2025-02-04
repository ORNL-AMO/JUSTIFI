import { Pipe, PipeTransform } from '@angular/core';
import { IdbCompany } from 'src/app/models/company';

@Pipe({
    name: 'companyName',
    standalone: false
})
export class CompanyNamePipe implements PipeTransform {

  transform(companyGUID: string, companies: Array<IdbCompany>): string {
    let company: IdbCompany = companies.find(company => {
      return company.guid == companyGUID;
    })
    if (company) {
      return company.generalInformation.name;
    }
    return '';
  }

}
