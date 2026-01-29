import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-revenue',
  imports: [MatIcon],
  template: `
    <div class="flex row gap-2 items-center">
      <p class="text-2xl font-semibold"> $100.00 </p>
      <mat-icon class="text-green-500!">arrow_upward</mat-icon>
    </div>
    <div class="text-sm text-gray-400">
      <span class="text-green-600">+$2</span> in the last 30 days
    </div>
  `,
  styles: ``,
})
export class Revenue {

}
