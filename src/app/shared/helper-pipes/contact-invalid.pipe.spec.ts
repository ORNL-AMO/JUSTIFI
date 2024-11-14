import { FormBuilder } from '@angular/forms';
import { CompanyContactsFormService } from '../shared-company-forms/company-contacts-form/company-contacts-form.service';
import { ContactInvalidPipe } from './contact-invalid.pipe';

describe('ContactInvalidPipe', () => {
  let formService: CompanyContactsFormService = new CompanyContactsFormService(new FormBuilder());
  it('create an instance', () => {
    const pipe = new ContactInvalidPipe(formService);
    expect(pipe).toBeTruthy();
  });
});
