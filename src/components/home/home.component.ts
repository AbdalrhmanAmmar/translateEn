import { Component, computed, OnInit, signal} from '@angular/core';
import {
  ColComponent,
  ContainerComponent,
  ProgressComponent,
  RowComponent,
  TemplateIdDirective,
  WidgetModule
} from '@coreui/angular-pro';
import { cilOptions, cilArrowTop, cilChartPie } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ChartjsComponent } from '@coreui/angular-chartjs'; 
import { getStyle } from '@coreui/utils';

@Component({
  selector: 'app-home',
  imports: [
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  icons = { cilOptions, cilArrowTop, cilChartPie };

  data: any = {};
  options: any = {};

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];

  datasets = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ];

  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.data = {
      labels: this.labels.slice(0, 7),
      datasets: this.datasets
    };
    this.options = this.optionsDefault;
  }

  value1 = signal<number>(75.9);
  valuePercent1 = computed(() => `${this.value1()}%`);

  value2 = signal<number>(95);
  valuePercent2 = computed(() => `${this.value2()}%`);
}
