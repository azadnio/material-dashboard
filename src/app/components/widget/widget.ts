import { Component, effect, input, signal } from '@angular/core';
import { TWidget } from '../../models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { WidgetOptions } from "./widget-options/widget-options";
import { CdkDrag, CdkDragPlaceholder } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatIconButton, MatIcon, WidgetOptions, CdkDrag, CdkDragPlaceholder],
  template: `
    <div 
      class="relative p-4 border border-gray-300 rounded-md shadow-sm bg-white m-2 h-[inherit]"
      [style.background-color]="data().backgroundColor || 'white'"
      [style.color]="data().textColor || 'inherit'"
      cdkDrag
      cdkDragPreviewContainer="parent"
    >
      <h3 class="text-lg font-semibold mb-2">
        {{ data().label }}
      </h3>
      <button 
        mat-icon-button class="absolute! top-2 right-2" 
        (click)="showOptions.set(true)" 
        aria-label="Widget Options"
        [style.color]="data().textColor || 'inherit'"
      >
        <mat-icon >settings</mat-icon>
      </button>      
      <ng-container [ngComponentOutlet]="data().content"></ng-container>
      @if(showOptions()){
        <app-widget-options [(showOptions)]="showOptions" [data]="data()" [last]="last()" [first]="first()" />
      }

      <div *cdkDragPlaceholder></div>
    </div>
  `,
  host: {
    class: `h-full`,
    '[style.grid-area]': '"span " + (data().rows || 1) + " / span " + (data().cols || 1)'
  },
  styles: ``,
})
export class Widget {
  data = input.required<TWidget>();
  last = input.required<boolean>();
  first = input.required<boolean>();

  showOptions = signal(false);
}
