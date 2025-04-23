import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Pipe({
    name: 'kpiDescription',
    standalone: false
})
export class KpiDescriptionPipe implements PipeTransform {

  transform(kpiOptionValue: KeyPerformanceIndicatorValue): string {
    switch (kpiOptionValue) {
      case 'customerSatisfaction':
        return "Customer Satisfaction measures the success of a business's engagement with partners and the health of those relationships. While this may be difficult to measure, can be partially quantified using KPMs that measure the success of a business's engagement with partners: customer and supplier satisfaction ratings, customer churn, etc."
      case 'quality':
        return "Quality metrics are quantifiable measurements used to evaluate performance, quality, or effectiveness for a product, process or system. They are used to measure success towards a goal and drive continuous improvement.";
      case 'reduceExpenseCost':
        return "Reducing costs is a strategic process that identifies and eliminates unnecessary operational expenses to increase profitability. The goal is always to maximize value and efficiency without compromising quality or core operations.";
      case 'safety':
        return "Safety metrics are qualitative and quantitative measurements that help organizations to monitor and improve their safety performance. They help identify areas for improvement, ensure compliance with regulations, and prevent accidents and injuries.";
      case 'waterConsumption':
        return "Water Consumption is the amount of water used by an organization.  Measuring water consumption with respect to sustainability is for the purposes of reduced consumption.";
      case 'productivity':
        return "Productivity is a quantitative measurement that assesses how efficiently a company is producing their products. Productivity metrics can be used to track performance, identify areas for improvement, maximize efficiency, and make decisions that benefit operations.";
      case 'airEnvironmentalQuality':
        return "Air and environmental quality is a key sustainability metric. Emissions related to global warming and air quality are often reported to governmental agencies or other bodies to show improvements in sustainability and meet regulatory standards.";
      case 'maintenanceExpense':
        return 'Reduce Maintenance Cost is a strategic process that identifies and eliminates unnecessary operational expenses directly related to maintenance to increase profitability. The goal is always to maximize value and efficiency without compromising quality or core operations.'
      default:
        return "Lorem ipsum odor amet, consectetuer adipiscing elit. Ex consequat nulla vestibulum dapibus lectus vestibulum. Ex nisi phasellus tempus himenaeos erat.";
    }
  }

}
