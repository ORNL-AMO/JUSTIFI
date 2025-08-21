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
        return CustomerSatisfactionDescription;
      case 'quality':
        return QualityDescription;
      case 'reduceExpenseCost':
        return OtherCostsDescription;
      case 'safety':
        return SafetyDescription;
      case 'waterConsumption':
        return WaterConsumptionDescription;
      case 'productivity':
        return ProductivityDescription;
      case 'airEnvironmentalQuality':
        return AirEnvironmentalQualityDescription;
      case 'maintenanceExpense':
        return MaintenanceExpenseDescription;
      case 'machineUtilization':
        return MachineUtilizationDescription;
      case 'employeeEngagementWorkforceDevelopment':
        return WorkforceDevelopmentDescription;
      case 'employeeEngagementWorkingEnvironment':
        return WorkingEnvironmentDescription;
      case 'materialUtilization':
        return MaterialUtilizationDescription;
      case 'waste':
        return WasteDescription;
      case 'salesGrowth':
        return SalesGrowthDescription;
      default:
        return "No description available for this KPI.";
    }
  }

}


const ProductivityDescription = `Productivity is generally defined as the ratio of output to input, essentially measuring how efficiently resources are used to create goods. It focuses on the rate at which a company produces finished products, often in relation to the amount of labor or other resources used. Higher productivity means more output for the same or fewer inputs, indicating improved efficiency and potentially increased profitability.<br>
Productivity metrics track performance, identify areas for improvement, and make decisions that benefit operations. Energy projects can impact productivity by improving energy, and thus production, reliability or faster production.`

const OtherCostsDescription = `Reducing costs is always favorable. Identifying and eliminating unnecessary operational expenses increases profitability. In JUSTIFI, Other Costs covers a variety of operating costs which are not associated with company targets (KPMs) but can be greatly impacted by energy projects.`

const QualityDescription = `Quality is the ability of a product to meet or exceed customer expectations and specifications while minimizing defects and variations. Quality metrics are used to measure success towards a goal and drive continuous improvement. Energy projects can impact quality by improving consistency and maintaining stable production.`

const MachineUtilizationDescription = `Machine Utilization refers to the percentage of time a machine is actively producing compared to its total available operating time. Metrics for machine utilization help identify areas for improvement, cost downtime cost, and changeovers cost. Energy projects can improve machine utilization by improving the load profiles of equipment and optimizing runtime.`

const MaintenanceExpenseDescription = `Maintenance expense refers to the costs associated with keeping production equipment, facilities, and other assets in good working condition. This includes both routine upkeep and necessary repairs to ensure smooth and efficient operations. Essentially, it is the money spent to prevent breakdowns and maintain the functionality of everything needed to manufacture products. Reducing these costs increases profitability. These may not be associated with company targets (KPMs) but can be greatly impacted by energy projects.`

const SafetyDescription = `Safety refers to the processes, practices, and technologies implemented to protect workers from workplace hazards and injuries. It encompasses a proactive approach to minimizing risks associated with machinery, materials, and processes within a manufacturing environment. Safety metrics help identify areas for improvement, ensure compliance with regulations, and prevent accidents and injuries. Energy projects can improve safety by reducing equipment heat loss (burn potential), reducing equipment noise, improving lighting conditions, and much more.`;

const WorkforceDevelopmentDescription = `Workforce Development is a strategic process focused on building a skilled and adaptable workforce to meet current and future industry needs. It involves identifying skills gaps, implementing targeted training programs.  Employee satisfaction or dissatisfaction can be an indicator of workforce development effectiveness.  Low satisfaction or engagement leads to high turnover and employee replacement costs. These metrics help companies assess the value of investment in workforce development and identify areas for improvement. Energy projects can improve workforce development metrics by reducing the training needs for new equipment or providing a safer and more pleasant work environment.`;

const WorkingEnvironmentDescription = `Working Environment encompasses the physical, psychological, and social conditions under which employees perform their jobs. It is more than the physical space; it includes how the work is organized, the relationships between workers and management, and the overall atmosphere of the workplace. A positive manufacturing work environment fosters productivity, innovation, and employee well-being, while a negative one can lead to decreased morale, increased errors, and higher turnover rates.  Energy projects can improve working environment by creating a more positive work environment such lowering environmental temperatures reducing noise, improving lighting conditions, and much more.`;

const MaterialUtilizationDescription = `Material Utilization refers to how efficiently raw materials are converted into finished products, minimizing waste and maximizing the usable amount of material. It is essentially the ratio of the material needed for a product compared to the material actually used, with higher percentages indicating better utilization.   Metrics involving material utilization include consumable use and costs, product shrinkage, and product yield. Energy projects can improve material utilization by reducing raw material waste and lost.`;

const WasteDescription = `In manufacturing, waste is broadly defined as anything that does not add value to the final product from the customer's perspective. This can include excess materials, defects, overproduction, waiting time, unnecessary motion, transportation, inventory, and underutilized talent. Essentially, it encompasses any resource or process that doesn't contribute to the creation of a product or service that a customer is willing to pay for.   One waste that commonly tracked by KPM is physical waste of a company. Several kinds of costs are associated with physical waste: disposal, regulatory, rework, nonconforming product value, returns, and more  Energy projects can reduce waste by reducing by improving quality.`;

const WaterConsumptionDescription = `Water Use, Quality, Disposal is an indicator monitoring several aspects of a company's water systems. It includes use and disposal, volume and cost metrics, as well as quality and regulatory metrics. Energy projects can improve water metrics by reducing water needs and having fewer out-of-compliance incidents.`;

const AirEnvironmentalQualityDescription = `Air and environmental quality is an indicator monitoring a company’s the air quality and emissions. These metrics include dust, particulate matter, GHG and other gaseous emissions, and regulatory compliance. Energy projects can improve air and environmental quality metrics by reducing emissions and having fewer out-of-compliance incidents.`;

const CustomerSatisfactionDescription = `Customer Satisfaction is an indicator measuring the success of a business's engagement with partners and the health of those relationships. While this may be difficult to measure, can be partially quantified using KPMs that measure the success of a business's engagement with partners, such as customer and supplier satisfaction ratings, customer churn, lost sales. Energy projects can improve customer satisfaction by increasing productivity, meeting sustainability targets, or introducing green products.`;

const SalesGrowthDescription = `Sales Growth is an indicator of the revenue increase from selling manufactured goods over a specific period, typically a month, quarter, or year. It is a key indicator of a company's financial health and market performance, reflecting how well it is attracting customers and meeting demand.  Energy projects have the potential to generate additional revenues by increasing productivity, introducing green products, or other product changes.`;