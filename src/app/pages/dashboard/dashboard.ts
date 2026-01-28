import { Component, inject } from '@angular/core';
import { Widget } from '../../components/widget/widget';
import { Dashboard as DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [Widget],
  providers: [DashboardService],
  template: `
    <h2 class="text-2xl font-bold mb-4"> Channel Dashboard </h2>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
      @for (widgets of store.widgets(); track widgets.id) {
        <app-widget [data]="widgets" />
      }
    </div>
  `,
  styles: ``,
})
export default class Dashboard {

  store = inject(DashboardService);
}
