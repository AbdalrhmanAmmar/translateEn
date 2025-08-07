import { Component, effect, input, InputSignal } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { CardModule, ColComponent, RowComponent } from '@coreui/angular-pro';
import { type ChartData } from 'chart.js';
import { ISearchResponseCounts } from '../../../../../core/interfaces/idashboard';

@Component({
  selector: 'app-dashboard-charts',
  imports: [ChartjsComponent, RowComponent, ColComponent, CardModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  data: InputSignal<ISearchResponseCounts> = input<ISearchResponseCounts>(
    {} as ISearchResponseCounts
  );

  chartConfigs = [
    {
      key: 'doctorVisitsCount',
      title: 'الأطباء الأكثر زيارة',
      chartKey: 'doctorChart',
      color: '#4B49B6',
    },
    {
      key: 'specializationVisitsCount',
      title: 'التخصصات الأكثر زيارة',
      chartKey: 'specializationChart',
      color: '#E17C05',
    },
    {
      key: 'segmentVisitsCount',
      title: 'التصنيفات الأكثر زيارة',
      chartKey: 'segmentChart',
      color: '#009F4D',
    },
    {
      key: 'areaVisitsCount',
      title: 'المناطق الأكثر زيارة',
      chartKey: 'areaChart',
      color: '#3D348B',
    },
    {
      key: 'cityVisitsCount',
      title: 'المدن الأكثر زيارة',
      chartKey: 'cityChart',
      color: '#D7263D',
    },
    {
      key: 'brandVisitsCount',
      title: 'العلامات التجارية الأكثر زيارة',
      chartKey: 'brandChart',
      color: '#F49D37',
    },
    {
      key: 'organizationVisitsCount',
      title: 'العيادات الأكثر زيارة',
      chartKey: 'organizationChart',
      color: '#0077B6',
    },
    {
      key: 'productVisitsCount',
      title: 'المنتجات الأكثر زيارة',
      chartKey: 'productVisitsCount',
      color: '#151111',
    },
  ];

  chartData: { [key: string]: ChartData } = {};
  chartOptions: { [key: string]: any } = {};

  constructor() {
    effect(() => {
      const response = this.data();
      if (response) {
        this.chartConfigs.forEach((config) => {
          const rawData = (response as any)[config.key];
          if (rawData) {
            const items = this.flattenRecord(rawData);

            this.chartData[config.chartKey] = {
              labels: items.map((item) => item.key),
              datasets: [
                {
                  label: 'عدد الزيارات',
                  backgroundColor: config.color,
                  data: items.map((item) => item.value),
                  barPercentage: 1,
                  categoryPercentage: 0.5,
                },
              ],
            };

            this.chartOptions[config.chartKey] = this.getChartOptions(
              config.title
            );
          }
        });
      }
    });
  }

  flattenRecord(obj: Record<string, any>): { key: string; value: any }[] {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }

  getChartOptions(title: string) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          align: 'end',
          font: {
            size: 20,
            weight: '600',
          },
          color: '#000',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: '#000',
            font: {
              size: 12,
            },
          },
        },
      },
    };
  }
}
