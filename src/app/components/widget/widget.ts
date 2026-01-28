import { Component, input } from '@angular/core';
import { TWidget } from '../../models/dashboard';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet],
  template: `
    <div class="p-4 border border-gray-300 rounded-md shadow-sm bg-white m-2 ">
      <h3 class="text-lg font-semibold mb-2">
        {{ data().label }}
      </h3>
      <ng-container [ngComponentOutlet]="data().content"></ng-container>
    </div>
  `,
  styles: ``,
})
export class Widget {
  data = input.required<TWidget>()
}
