// src/app/features/dashboard/search/search.component.ts

import {
  Component,
  computed,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import {
  CardModule,
  ColComponent,
  RowComponent,
  Tabs2Module,
  DatePickerComponent,
  SpinnerModule,
} from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import { cilSettings } from '@coreui/icons';

import { DashboardService } from '../../../../../core/services/modules-services/dashboards.service';
import { LookupsService } from '../../../../../core/services/modules-services/lookups.service';

import {
  IFilterLookups,
  IProductsLookUps,
  ISearchRequest,
  ISearchResponse,
  ISearchResponseCounts,
  ISearchResponseItems,
} from '../../../../../core/interfaces/idashboard';

import { ChartsComponent } from '../../dashboard/charts/charts.component';
import { TableComponent } from '../../dashboard/table/table.component';
import { UserStore } from '../../../../../core/current-user/user-store';
import { Roles } from '../../../../../core/interfaces/iauth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-search',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    IconDirective,
    ColComponent,
    RowComponent,
    ChartsComponent,
    TableComponent,
    Tabs2Module,
    DatePickerComponent,
    CommonModule,
    SpinnerModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  // icons
  icons = { cilSettings };

  // DI
  private readonly _fb = inject(FormBuilder);
  private readonly _dashSvc = inject(DashboardService);
  private readonly _lookupsSvc = inject(LookupsService);

  // UI signals
  showMedRepFilter: WritableSignal<boolean> = signal(false);
  showAreaAndCityFilter: WritableSignal<boolean> = signal(false);
  dashboardLoading: WritableSignal<boolean> = signal(true);
  fromMaxDate: Date = new Date(new Date().setDate(new Date().getDate()));
  toMinDate: Date = new Date(new Date().setDate(new Date().getDate()));
  toMaxDate: Date = new Date(new Date().setDate(new Date().getDate()));

  // state
  pageIndex: WritableSignal<number> = signal(1);
  pageSize: WritableSignal<number> = signal(10);

  searchResponse: WritableSignal<ISearchResponse> = signal({} as ISearchResponse);
  searchResponseCount: Signal<ISearchResponseCounts> = computed(() => {
    const c = this.searchResponse().counts;
    return c ?? ({} as ISearchResponseCounts);
  });
  itemsOnly: Signal<ISearchResponseItems[]> = computed(() => {
    const items = this.searchResponse().items;
    return Array.isArray(items) ? items : [];
  });
  pageCount: Signal<number> = computed(() =>
    this.searchResponse().pageCount || 1
  );

  filterLookups: WritableSignal<IFilterLookups> = signal(
    {} as IFilterLookups
  );
  productsLookUps: WritableSignal<IProductsLookUps> = signal(
    {} as IProductsLookUps
  );

  // form
  searchRequestForm: FormGroup = this._fb.group({
    startDate: [null],
    endDate: [null],
    doctorId: [null],
    doctorSpecialization: [null],
    rank: [null],
    area: [null],
    city: [null],
    brand: [null],
    organizationId: [null],
    product1: [null],
    product2: [null],
    product3: [null],
    MedRepId: [null],
  });

  // subscriptions
  private unsubscribeForm$!: Subscription;
  private unsubscribeData$!: Subscription;
  private unsubscribeLookups$!: Subscription;

  ngOnInit(): void {
    this.fetchFilterLookups();
    this.setFilterVisibility();
    this.initFormListener();

    this.searchVisits({
      filter: {},
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
    });

    this.searchRequestForm.get('startDate')?.valueChanges.subscribe((date: Date) => {
      if (date) {
        this.onStartDateChange(date);
      }
    });
  }

  /** Load lookups directly instead of via a resolver */
  private fetchFilterLookups(): void {
    this.unsubscribeLookups$ = this._lookupsSvc
      .getFilterLookups()
      .subscribe({
        next: (lookups) => this.filterLookups.set(lookups),
        error: (err) => console.error('Failed to load lookups', err),
      });
  }

  /** Listen to form changes and re‑search */
  private initFormListener(): void {
    this.unsubscribeForm$ = this.searchRequestForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((values) => {
        if (this.searchRequestForm.valid) {
          const cleaned = this._dashSvc.cleanFilter(values);
          this.searchVisits({
            filter: cleaned,
            pageIndex: this.pageIndex(),
            pageSize: this.pageSize(),
          });
        }
      });
  }

  /** Show/hide filters based on user role */
  setFilterVisibility(): void {
    if (UserStore.hasRole([Roles.Developer, Roles.Admin])) {
      this.showMedRepFilter.set(true);
      this.showAreaAndCityFilter.set(true);
    } else if (UserStore.hasRole([Roles.MedSup])) {
      this.showMedRepFilter.set(true);
      this.showAreaAndCityFilter.set(false);
    } else if (UserStore.hasRole([Roles.MedRep])) {
      this.showMedRepFilter.set(false);
      this.showAreaAndCityFilter.set(false);
    }
  }

  /** Core search method */
  searchVisits(request: ISearchRequest): void {
    this.unsubscribeData$?.unsubscribe();
    this.unsubscribeData$ = this._dashSvc.SearchVisits(request).subscribe({
      next: (res) =>{
        this.searchResponse.set(res)
        this.dashboardLoading.set(false);
      },
      error: (err) => console.error('Search error', err),
    });
  }

  /** Pagination handler */
  onPageChange(pageIndex: number): void {
    console.log('Page changed to:', pageIndex);
    this.pageIndex.set(pageIndex);
    this.searchVisits({
      filter: this._dashSvc.cleanFilter(this.searchRequestForm.value),
      pageIndex,
      pageSize: this.pageSize(),
    });
  }

  /** Reset filters and reload */
  onResetForm(): void {
    this.searchRequestForm.reset();
    this.searchVisits({
      filter: {},
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
    });
  }

  // Single‑filter shortcuts
  onDoctorSelected(doctorId: number): void {
    this.searchVisits({ filter: { doctorId }, pageIndex: 1, pageSize: this.pageSize() });
  }
  onOrganizationSelected(name: string): void {
    this.searchVisits({ filter: { organizationName: name }, pageIndex: 1, pageSize: this.pageSize() });
  }
  onCitySelected(city: string): void {
    this.searchVisits({ filter: { city }, pageIndex: 1, pageSize: this.pageSize() });
  }
  onAreaSelected(area: string): void {
    this.searchVisits({ filter: { area }, pageIndex: 1, pageSize: this.pageSize() });
  }
  onSegmentSelected(segment: string): void {
    this.searchVisits({ filter: { segment }, pageIndex: 1, pageSize: this.pageSize() });
  }
  onBrandSelected(brand: string): void {
    this.searchVisits({ filter: { brand }, pageIndex: 1, pageSize: this.pageSize() });
  }
  onProductSelected(product: number): void {
    this.searchVisits({ filter: { products: [product] }, pageIndex: 1, pageSize: this.pageSize() });
  }

  ngOnDestroy(): void {
    this.unsubscribeForm$?.unsubscribe();
    this.unsubscribeData$?.unsubscribe();
    this.unsubscribeLookups$?.unsubscribe();
  }

  onStartDateChange(date: Date): void {
    console.log('Start date changed:', date);
    this.toMinDate = new Date(new Date(date).setDate(date.getDate()));
  }
}
