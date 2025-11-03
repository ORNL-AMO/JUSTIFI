export type ReportType = 'executiveSummary' | 'stakeholder' | 'kpi' | 'productionProcess' | 'custom' | 'assessment';

export const ReportTypeOptions: Array<{ reportType: ReportType, label: string }> = [
  {
    reportType: 'assessment',
    label: 'Assessment Report(s)'
  },
  {
    reportType: 'executiveSummary',
    label: 'Executive Summary Report'
  },
  {
    reportType: 'stakeholder',
    label: 'Stakeholder Report'
  },
  // {
  //   reportType: 'kpi',
  //   label: 'Key Performance Indicator Report'
  // },
  // {
  //   reportType: 'productionProcess',
  //   label: 'Production Process Report'
  // },
  // {
  //   reportType: 'custom',
  //   label: 'Custom Report'
  // },
]