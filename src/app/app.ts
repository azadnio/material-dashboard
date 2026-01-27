import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { CustomSidenav } from "./components/custom-sidenav/custom-sidenav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatButton, MatIcon, MatSidenavContainer, MatSidenav, MatSidenavContent, CustomSidenav],
  template: `
    <mat-toolbar>
      <button mat-icon-button aria-label="Menu" class="hover:bg-gray-300 rounded-sm p-2 cursor-pointer" (click)="collaped.set(!collaped())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container class="h-[calc(100vh-64px)]">
      <mat-sidenav mode="side" opened [style.width.px]="navbarWidth()" class="bg-gray-100">
        <app-custom-sidenav [collaped]="collaped()" />
      </mat-sidenav>
      <mat-sidenav-content [style.marginLeft.px]="navbarWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('material-dashboard');
  collaped = signal(false);
  navbarWidth = computed(() => (this.collaped() ? 65 : 256));
}
