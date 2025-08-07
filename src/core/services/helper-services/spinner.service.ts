import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loadingCount: WritableSignal<number> = signal<number>(0);

  readonly isLoading: Signal<boolean> = computed(() => this.loadingCount() > 0);

  show(): void {
    this.loadingCount.update((v) => v + 1);
  }

  hide(): void {
    this.loadingCount.update((v) => Math.max(0, v - 1));
  }
}
