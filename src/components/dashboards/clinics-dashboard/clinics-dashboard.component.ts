import { Component, signal, WritableSignal} from '@angular/core';
import { SearchComponent } from './dashboard/search/search.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clinics-dashboard',
  imports: [
    SearchComponent, SpinnerModule, CommonModule
  ],
  templateUrl: './clinics-dashboard.component.html',
  styleUrl: './clinics-dashboard.component.scss'
})
export class ClinicsDashboardComponent  {
    dashboardLoading: WritableSignal<boolean> = signal(true);

    onLoadingStateChange(loading: boolean): void {
      console.log('Loading state changed:', loading);
        this.dashboardLoading.set(loading);
    }
}
