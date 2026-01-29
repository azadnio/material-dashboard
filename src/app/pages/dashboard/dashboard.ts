import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { Widget } from '../../components/widget/widget';
import { Dashboard as DashboardService } from '../../services/dashboard';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import { CdkDropListGroup, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  imports: [Widget, MatAnchor, MatIcon, MatButton, MatMenu, MatMenuItem, MatMenuTrigger, CdkDropListGroup, CdkDropList],
  providers: [DashboardService],
  template: `
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-4"> Channel Dashboard </h2>
      <button matButton="elevated" color="primary"  class="mb-4" [matMenuTriggerFor]="widgetMenu">
        <mat-icon>add_circle</mat-icon>
        Add Widget 
      </button>
      <mat-menu #widgetMenu="matMenu">
        @for (widget of store.widgetsToAdd(); track widget.id) {
          <button mat-menu-item (click)="store.addWidget(widget)">
            <mat-icon>widgets</mat-icon>
            {{ widget.label }}
          </button>
        }
        @empty {
          <span mat-menu-item >No widgets</span>
        }
      </mat-menu>
    </div>
    <div #dashboard class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[150px] gap-2" cdkDropListGroup>
      @for (widgets of store.addedWidget(); track widgets.id; let last = $last; let first = $first) {
        <app-widget [data]="widgets" [last]="last" [first]="first" cdkDropList (cdkDropListDropped)="drop($event)" [cdkDropListData]="widgets.id"/>
      }
    </div>
  `,
  styles: ``,
})
export default class Dashboard implements OnInit {

  store = inject(DashboardService);

  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, {
      duration: 300
    });
  }

  drop(event: CdkDragDrop<string>) {
    const { previousContainer, container } = event;
    if (previousContainer === container) {
      return;
    }
    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}
