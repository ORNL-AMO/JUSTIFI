import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IdbContact } from 'src/app/models/contact';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactsFormService {

  constructor(private formBuilder: FormBuilder) { }

  getFormFromIdbContact(contact: IdbContact): FormGroup {
    // Process phone number before saving
    let phone = '';
    let ext = '';
    if (contact.phone) {
      if (isValidPhoneNumber(contact.phone)) {
        const phoneWithExt = parsePhoneNumber(contact.phone, 'US');
        phone = phoneWithExt.number;
        ext = phoneWithExt.ext;
      } else {
        phone = contact.phone.trim();
      }
    }
    return this.formBuilder.group({
      'firstname': [contact.firstName, [Validators.required]],
      'lastname' : [contact.lastName, [Validators.required]],
      'phone': [phone, []],
      'ext': [ext, []],
      'email': [contact.email, [Validators.email, Validators.maxLength(255)]],
      'role': [contact.role, []],
      'team': [contact.team, []],
      'notes': [contact.notes, []]
    }, {validator: this.phoneNumberValidator()});
  }

  updateIdbContactFromForm(contactForm: FormGroup, contact: IdbContact): IdbContact {
    contact.firstName = contactForm.controls['firstname'].value;
    contact.lastName = contactForm.controls['lastname'].value;
    let phone = contactForm.controls['phone'].value;
    let ext = contactForm.controls['ext'].value;
    const phoneWithExt = phone + (ext? ' ext. ' + ext : '');
    contact.phone = isValidPhoneNumber(phoneWithExt, 'US')? parsePhoneNumber(phoneWithExt, 'US').formatInternational() : phone + ext;
    contact.email = contactForm.controls['email'].value;
    contact.role = contactForm.controls['role'].value;
    contact.team = contactForm.controls['team'].value;
    contact.notes = contactForm.controls['notes'].value;
    return contact;
  }

  // Custom validator for phone number
  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.get('phone').value;
      const ext = control.get('ext').value;
      if (!phone && !ext) {
        control.get('phone').setErrors(null);
        return null;
      };
      const phoneWithExt = phone + (ext? ' ext. ' + ext : '');
      const isValidPhone = isValidPhoneNumber(phoneWithExt, 'US');
      if (!isValidPhone) {
        control.get('phone').setErrors({invalidPhoneNumber: true });
      } else {
        control.get('phone').setErrors(null);
      }
      return null;
    };
  }
}
