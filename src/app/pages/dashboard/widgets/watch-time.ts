import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-watch-time',
  imports: [MatIcon],
  template: `
    <div class="flex row gap-2 items-center">
      <p class="text-2xl font-semibold"> 10,000,122 </p>
      <mat-icon class="text-green-500!">check_circle</mat-icon>
    </div>
    <div class="text-sm text-gray-400">
      <span class="text-green-600">+22,862</span> in the last 10 days
    </div>
  `,
  styles: ``,
})
export class WatchTime {

}
