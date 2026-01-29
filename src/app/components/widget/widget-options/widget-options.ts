import { Component, inject, input, model } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { TWidget } from '../../../models/dashboard';
import { Dashboard as DashboardService } from '../../../services/dashboard';

@Component({
  selector: 'app-widget-options',
  imports: [MatIconButton, MatIcon, MatButtonToggleGroup, MatButtonToggle],
  template: `
  <div class="flex flex-col justify-center items-center m-2 gap-2 w-full relative h-full rounded-[inherit]">
    <button mat-icon-button aria-label="Close Options"  class="absolute! top-0 right-0" (click)="showOptions.set(false)">
      <mat-icon>close</mat-icon>
    </button>
    <button mat-icon-button class="absolute! top-0 left-0 hover:text-red-400!" (click)="remove()" aria-label="Delete Widget">
      <mat-icon >delete</mat-icon>
    </button>

    <div class="flex items-center w-100 gap-4 justify-center">
      Width:
      <mat-button-toggle-group 
        hideSingleSelectionIndicator="true" 
        style="--mat-button-toggle-height:25px" 
        [value]="data().cols"
        (change)="store.updateWidget(data().id, { cols: +$event.value })"
        >
        <mat-button-toggle [value]="1">1</mat-button-toggle>
        <mat-button-toggle [value]="2">2</mat-button-toggle>
        <mat-button-toggle [value]="3">3</mat-button-toggle>
        <mat-button-toggle [value]="4">4</mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    <div class="flex items-center w-100 gap-4 justify-center">
      Height
      <mat-button-toggle-group 
        hideSingleSelectionIndicator="true" 
        style="--mat-button-toggle-height:25px" 
        [value]="data().rows"
        (change)="store.updateWidget(data().id, { rows: +$event.value })"
        >
        <mat-button-toggle [value]="1">1</mat-button-toggle>
        <mat-button-toggle [value]="2">2</mat-button-toggle>
        <mat-button-toggle [value]="3">3</mat-button-toggle>
        <mat-button-toggle [value]="4">4</mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    @if(!first()){
      <button 
        mat-icon-button aria-label="Move left" 
        class="absolute! top-[50%] left-0 -translate-y-[50%]"
        (click)="store.moveLeft(data().id)"
      >
        <mat-icon mat-icon-button>chevron_left</mat-icon>
      </button>
    }

    @if(!last()){
      <button 
        mat-icon-button aria-label="Move right" 
        class="absolute! top-[50%] right-0 -translate-y-[50%]"
        (click)="store.moveRight(data().id)"
      >
        <mat-icon mat-icon-button>chevron_right</mat-icon>
      </button>
    }
  </div>
  `,
  styles: ``,
  host: {
    class: `absolute top-0 left-0 w-full h-full bg-white opacity-90 flex 
    flex-col justify-center items-center rounded-[inherit]`
  }
})
export class WidgetOptions {
  store = inject(DashboardService);

  showOptions = model.required<boolean>();
  data = input.required<TWidget>();
  last = input.required<boolean>();
  first = input.required<boolean>();

  remove() {
    this.store.removeWidget(this.data().id);
    this.showOptions.set(false);
  }
}
