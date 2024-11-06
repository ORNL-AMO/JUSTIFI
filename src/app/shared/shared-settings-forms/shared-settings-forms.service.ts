import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { UnitSettings } from 'src/app/models/unitSettings';
import valZip from 'val-zip';
import { energy } from '../conversions/definitions/energy';

@Injectable({
  providedIn: 'root'
})
export class SharedSettingsFormsService {
  /**
   * Generate reactive forms with validators
   * Extract form info for updating Idb
   * 1. Location Form (General Information)
   * 2. Units form (Utilities)
   */

  constructor(private formBuilder: FormBuilder) { }

  getGeneralInformationForm(generalInformation: GeneralInformation, formType: string): FormGroup {
    let form: FormGroup;
    switch (formType) {
      case 'location':
        form = this.formBuilder.group({
          country: [generalInformation.country],
          city: [generalInformation.city],
          state: [generalInformation.state],
          zip: [generalInformation.zip, [this.zipCodeValidator()]],
          address: [generalInformation.address],
        });
        break;
      case 'additional-details':
        form = this.formBuilder.group({
          naics1: [generalInformation.naics1],
          naics2: [generalInformation.naics2],
          naics3: [generalInformation.naics3],
          notes: [generalInformation.notes]
        });
        break;
      default:
        console.log('not valid form type: "location" or "additional-details".');
    }
    return form;
  }

  updateGeneralInformationFromForm(form: FormGroup, generalInformation: GeneralInformation, formType: string): GeneralInformation {
    switch (formType) {
      case 'location':
        generalInformation.country = form.controls['country'].value;
        generalInformation.city = form.controls['city'].value;
        generalInformation.state = form.controls['state'].value;
        generalInformation.zip = form.controls['zip'].value;
        generalInformation.address = form.controls['address'].value;
        break;
      case 'additional-details':
        generalInformation.naics1 = form.controls['naics1'].value;
        generalInformation.naics2 = form.controls['naics2'].value;
        generalInformation.naics3 = form.controls['naics3'].value;
        generalInformation.notes = form.controls['notes'].value;
        break;
      default:
        console.log('not valid form type: "location" or "additional-details".');
    }
    return generalInformation;
  }

  getUnitsForm(unitSettings: UnitSettings): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      includeElectricity: [unitSettings.includeElectricity],
      electricityUse: [unitSettings.electricityUse, [Validators.min(0)]],
      electricityUnit: [unitSettings.electricityUnit],
      electricityPrice: [unitSettings.electricityPrice, [Validators.min(0)]],
      electricityHHV: [unitSettings.electricityHHV, [Validators.min(0)]],
      electricityEnergyUnit: [unitSettings.electricityEnergyUnit],

      includeNaturalGas: [unitSettings.includeNaturalGas],
      naturalGasUse: [unitSettings.naturalGasUse, [Validators.min(0)]],
      naturalGasUnit: [unitSettings.naturalGasUnit],
      naturalGasPrice: [unitSettings.naturalGasPrice, [Validators.min(0)]],
      naturalGasHHV: [unitSettings.naturalGasHHV, [Validators.min(0)]],
      naturalGasEnergyUnit: [unitSettings.naturalGasEnergyUnit],

      includeSteam: [unitSettings.includeSteam],
      steamUse: [unitSettings.steamUse, [Validators.min(0)]],
      steamUnit: [unitSettings.steamUnit],
      steamPrice: [unitSettings.steamPrice, [Validators.min(0)]],
      steamHHV: [unitSettings.steamHHV, [Validators.min(0)]],
      steamEnergyUnit: [unitSettings.steamEnergyUnit],

      includeOtherFuels: [unitSettings.includeOtherFuels],
      otherFuelsUse: [unitSettings.otherFuelsUse, [Validators.min(0)]],
      otherFuelsUnit: [unitSettings.otherFuelsUnit],
      otherFuelsPrice: [unitSettings.otherFuelsPrice, [Validators.min(0)]],
      otherFuelsHHV: [unitSettings.otherFuelsHHV, [Validators.min(0)]],
      otherFuelsEnergyUnit: [unitSettings.otherFuelsEnergyUnit],

      includeCompressedAir: [unitSettings.includeCompressedAir],
      compressedAirUse: [unitSettings.compressedAirUse, [Validators.min(0)]],
      compressedAirUnit: [unitSettings.compressedAirUnit],
      compressedAirPrice: [unitSettings.compressedAirPrice, [Validators.min(0)]],
      compressedAirHHV: [unitSettings.compressedAirHHV, [Validators.min(0)]],
      compressedAirEnergyUnit: [unitSettings.compressedAirEnergyUnit],

      includeWater: [unitSettings.includeWater],
      waterUse: [unitSettings.waterUse, [Validators.min(0)]],
      waterUnit: [unitSettings.waterUnit],
      waterPrice: [unitSettings.waterPrice, [Validators.min(0)]],
      waterHHV: [unitSettings.waterHHV, [Validators.min(0)]],
      waterEnergyUnit: [unitSettings.waterEnergyUnit],

      includeWasteWater: [unitSettings.includeWasteWater],
      wasteWaterUse: [unitSettings.wasteWaterUse, [Validators.min(0)]],
      wasteWaterUnit: [unitSettings.wasteWaterUnit],
      wasteWaterPrice: [unitSettings.wasteWaterPrice, [Validators.min(0)]],
      wasteWaterHHV: [unitSettings.wasteWaterHHV, [Validators.min(0)]],
      wasteWaterEnergyUnit: [unitSettings.wasteWaterEnergyUnit],
    });

    // Update required validators for included items
    this.setRequiredValidator(form.controls['electricityPrice'], unitSettings.includeElectricity);
    this.setRequiredValidator(form.controls['naturalGasPrice'], unitSettings.includeNaturalGas);
    this.setRequiredValidator(form.controls['steamPrice'], unitSettings.includeSteam);
    this.setRequiredValidator(form.controls['otherFuelsPrice'], unitSettings.includeOtherFuels);
    this.setRequiredValidator(form.controls['compressedAirPrice'], unitSettings.includeCompressedAir);
    this.setRequiredValidator(form.controls['waterPrice'], unitSettings.includeWater);
    this.setRequiredValidator(form.controls['wasteWaterPrice'], unitSettings.includeWasteWater);

    this.setRequiredValidator(form.controls['electricityUse'], unitSettings.includeElectricity);
    this.setRequiredValidator(form.controls['naturalGasUse'], unitSettings.includeNaturalGas);
    this.setRequiredValidator(form.controls['steamUse'], unitSettings.includeSteam);
    this.setRequiredValidator(form.controls['otherFuelsUse'], unitSettings.includeOtherFuels);
    this.setRequiredValidator(form.controls['compressedAirUse'], unitSettings.includeCompressedAir);
    this.setRequiredValidator(form.controls['waterUse'], unitSettings.includeWater);
    this.setRequiredValidator(form.controls['wasteWaterUse'], unitSettings.includeWasteWater);

    // TO DO: Add validators for HHV and Energy Unit

    return form;
  }

  updateUnitSettingsFromForm(form: FormGroup,unitSettings: UnitSettings): UnitSettings {
    unitSettings.includeElectricity = form.controls['includeElectricity'].value;
    this.setRequiredValidator(form.controls['electricityPrice'], unitSettings.includeElectricity);
    this.setRequiredValidator(form.controls['electricityUse'], unitSettings.includeElectricity);
    unitSettings.electricityUse = form.controls['electricityUse'].value;
    unitSettings.electricityUnit = form.controls['electricityUnit'].value;
    unitSettings.electricityPrice = form.controls['electricityPrice'].value;

    unitSettings.includeNaturalGas = form.controls['includeNaturalGas'].value;
    this.setRequiredValidator(form.controls['naturalGasPrice'], unitSettings.includeNaturalGas);
    this.setRequiredValidator(form.controls['naturalGasUse'], unitSettings.includeNaturalGas);
    unitSettings.naturalGasUse = form.controls['naturalGasUse'].value;
    unitSettings.naturalGasUnit = form.controls['naturalGasUnit'].value;
    unitSettings.naturalGasPrice = form.controls['naturalGasPrice'].value;

    unitSettings.includeSteam = form.controls['includeSteam'].value;
    this.setRequiredValidator(form.controls['steamPrice'], unitSettings.includeSteam);
    this.setRequiredValidator(form.controls['steamUse'], unitSettings.includeSteam);
    unitSettings.steamUse = form.controls['steamUse'].value;
    unitSettings.steamUnit = form.controls['steamUnit'].value;
    unitSettings.steamPrice = form.controls['steamPrice'].value;
    unitSettings.steamHHV = form.controls['steamHHV'].value;
    unitSettings.steamEnergyUnit = form.controls['steamEnergyUnit'].value;

    unitSettings.includeOtherFuels = form.controls['includeOtherFuels'].value;
    this.setRequiredValidator(form.controls['otherFuelsPrice'], unitSettings.includeOtherFuels);
    this.setRequiredValidator(form.controls['otherFuelsUse'], unitSettings.includeOtherFuels);
    unitSettings.otherFuelsUse = form.controls['otherFuelsUse'].value;
    unitSettings.otherFuelsUnit = form.controls['otherFuelsUnit'].value;
    unitSettings.otherFuelsPrice = form.controls['otherFuelsPrice'].value;

    unitSettings.includeCompressedAir = form.controls['includeCompressedAir'].value;
    this.setRequiredValidator(form.controls['compressedAirPrice'], unitSettings.includeCompressedAir);
    this.setRequiredValidator(form.controls['compressedAirUse'], unitSettings.includeCompressedAir);
    unitSettings.compressedAirUse = form.controls['compressedAirUse'].value;
    unitSettings.compressedAirUnit = form.controls['compressedAirUnit'].value;
    unitSettings.compressedAirPrice = form.controls['compressedAirPrice'].value;
    unitSettings.compressedAirHHV = form.controls['compressedAirHHV'].value;
    unitSettings.compressedAirEnergyUnit = form.controls['compressedAirEnergyUnit'].value;

    unitSettings.includeWater = form.controls['includeWater'].value;
    this.setRequiredValidator(form.controls['waterPrice'], unitSettings.includeWater);
    this.setRequiredValidator(form.controls['waterUse'], unitSettings.includeWater);
    unitSettings.waterUse = form.controls['waterUse'].value;
    unitSettings.waterUnit = form.controls['waterUnit'].value;
    unitSettings.waterPrice = form.controls['waterPrice'].value;
    unitSettings.waterHHV = form.controls['waterHHV'].value;
    unitSettings.waterEnergyUnit = form.controls['waterEnergyUnit'].value;

    unitSettings.includeWasteWater = form.controls['includeWasteWater'].value;
    this.setRequiredValidator(form.controls['wasteWaterPrice'], unitSettings.includeWasteWater);
    this.setRequiredValidator(form.controls['wasteWaterUse'], unitSettings.includeWasteWater);
    unitSettings.wasteWaterUse = form.controls['wasteWaterUse'].value;
    unitSettings.wasteWaterUnit = form.controls['wasteWaterUnit'].value;
    unitSettings.wasteWaterPrice = form.controls['wasteWaterPrice'].value;
    unitSettings.wasteWaterHHV = form.controls['wasteWaterHHV'].value;
    unitSettings.wasteWaterEnergyUnit = form.controls['wasteWaterEnergyUnit'].value
    
    return unitSettings;
  }

  setRequiredValidator(control: AbstractControl, isRequired: boolean) {
    if (isRequired) {
      control.addValidators(Validators.required);
    } else {
      control.removeValidators(Validators.required);
    }
    control.updateValueAndValidity;
  }

  /**
   * Custom validators
   */

  zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const countryCode = control.parent?.get('country').value;
      const zipCode = control.value;
      if (!zipCode) return null; // empty zip code
      const currentConsoleError = console.error;
      let isZipValid;
      try {
        console.error = () => {};
        isZipValid = valZip(zipCode.split('-')[0], countryCode || '');
      } finally {
        console.error = currentConsoleError;
      }
      
      if (isZipValid === false) return {invalidZipCode: true};
      return null;
    }
  }

}
