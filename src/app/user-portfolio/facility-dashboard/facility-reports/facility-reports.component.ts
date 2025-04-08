import { Component } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
    selector: 'app-facility-reports',
    templateUrl: './facility-reports.component.html',
    styleUrl: './facility-reports.component.css',
    standalone: false
})
export class FacilityReportsComponent {

    facilityReports: Array<IdbReport>;
    reportsSub: Subscription;
    facility: IdbFacility;
    facilitySub: Subscription;
    faChevronRight: IconDefinition = faChevronRight;

    printSub: Subscription;
    print: boolean;
    constructor(private reportIdbService: ReportIdbService,
        private facilityIdbService: FacilityIdbService,
        private sharedDataService: SharedDataService
    ) {

    }

    ngOnInit() {
        this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
            this.facility = facility;
        });

        this.reportsSub = this.reportIdbService.reports.subscribe(reports => {
            this.facilityReports = reports.filter(report => {
                return report.facilityId == this.facility.guid;
            })
        });
        this.printSub = this.sharedDataService.print.subscribe(print => {
            this.print = print;
        })
    }

    ngOnDestroy() {
        this.facilitySub.unsubscribe();
        this.reportsSub.unsubscribe();
        this.printSub.unsubscribe();
    }
}
