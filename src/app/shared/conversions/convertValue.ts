
import { mass } from "./definitions/mass";
import { temperature } from "./definitions/temperature";
import { volume } from "./definitions/volume";
import { pressure } from "./definitions/pressure";
import { power } from "./definitions/power";
import { energy } from "./definitions/energy";
import { length } from './definitions/length';
import * as _ from 'lodash';
import { area } from "./definitions/area";
import { time } from "./definitions/time";
import { rate } from "./definitions/rate";

export class ConvertValue {
    _measures = {
        length: length,
        mass: mass,
        volume: volume,
        temperature: temperature,
        pressure: pressure,
        power: power,
        energy: energy,
        area: area,
        time: time,
        rate: rate
    };

    constructor() {
    }

    convertValue(value: number, from?: string, to?: string): 
        { convertedValue: number, hasError: boolean } {

        if (value == undefined) {
            return { convertedValue: value, hasError: true };
        }
        if (from == undefined) {
            // If no from unit is provided, return the value as is
            return { convertedValue: value, hasError: true };
        }

        if (to == undefined) {
            // If no to unit is provided, default to convert to metric anchor
            let tempToUnit = this.getUnit(from);
            if (tempToUnit != undefined) {
                to = this._measures[tempToUnit.measure]._anchors.metric.unit;
            }
        }

        // Don't change the value if origin and destination are the same
        if (from === to) {
            return { convertedValue: value, hasError: false };
        }

        let origin = this.getUnit(from);
        let destination = this.getUnit(to);

        if (origin == undefined || destination == undefined) {
            return { convertedValue: value, hasError: true };
        }

        // You can't go from liquid to mass, for example
        if (destination.measure !== origin.measure) {
            return { convertedValue: value, hasError: true };
        }

        /**
         * Convert from the source value to its anchor inside the system
         */
        let result: number = value * origin.to_anchor;

        /**
         * For some changes it's a simple shift (C to K)
         * So we'll add it when converting into the unit (later)
         * and subtract it when converting from the unit
         */
        if (origin.anchor_shift) {
            result -= origin.anchor_shift;
        }

        /**
         * Convert from one system to another through the anchor ratio. Some conversions
         * aren't ratio based or require more than a simple shift. We can provide a custom
         * transform here to provide the direct result
         */
        if (origin.system !== destination.system) {
            let transform = this._measures[origin.measure]._anchors[origin.system].transform;
            if (typeof transform === 'function') {
                result = transform(result);
            }
            else {
                result *= this._measures[origin.measure]._anchors[origin.system].ratio;
            }
        }

        /**
         * This shift has to be done after the system conversion business
         */
        if (destination.anchor_shift) {
            result += destination.anchor_shift;
        }

        /**
         * Convert to another unit inside the destination system
         */
        return { convertedValue: result / destination.to_anchor, hasError: false };
    }


    getUnit(abbr: string):
        {   name: { display: string, plural: string, singular: string },
            to_anchor: number,
            measure?: string,
            system?: string,
            anchor_shift?: number } {
        let found: { name: { display: string, plural: string, singular: string },
                    to_anchor: number,
                    measure?: string,
                    system?: string,
                    anchor_shift?: number };
        for (const property in this._measures) { // length, mass, volume, etc.
            if (!found) {
                let measure = this._measures[property];
                for (const measureProp in measure as any) { // metric, imperial, etc.
                    if (!found) {
                        let system = measure[measureProp];
                        if (system != '_anchors') {
                            for (const systemProp in system) { // C, F, K, etc.
                                if (!found) {
                                    if (abbr == systemProp) {
                                        found = system[systemProp];
                                        found.measure = property; // add the measure property
                                        found.system = measureProp; // add the system property
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return found;
    }
}