import { Component, effect, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemTitle, MatListItemIcon, MatListItemMeta } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TMenuItem } from '../custom-sidenav/custom-sidenav';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  imports: [
    MatIcon,
    MatListItem,
    MatListItemTitle,
    MatListItemIcon,
    RouterLink,
    RouterLinkActive,
    MatListItemMeta,
    NgClass
  ],
  template: `
      <a mat-list-item 
        [routerLink]=" routeHistory() + '/' + menu().route" 
        routerLinkActive="active-link"
        #rla="routerLinkActive"
        [activated]="rla.isActive"
        (click)="toggleNestedMenu()"
        class="flex items-center border-l-5 border-transparent hover:border-blue-500 hover:bg-gray-300"
      >
        <mat-icon matListItemIcon [fontSet]=" rla.isActive ? 'material-icons' : 'material-icons-outlined'">{{menu().icon}}</mat-icon>
        <span matListItemTitle>{{menu().label}}</span>
        @if(menu().subItems){
          <span matListItemMeta>
            <mat-icon>{{ nestedMenuOpen() ? 'expand_less' : 'expand_more' }}</mat-icon>
          </span>
        }        
      </a>

      @if(menu().subItems && nestedMenuOpen()){
        <div [ngClass]="menuCollapsed() ? '' : 'ml-4'">
          @for(subMenu of menu().subItems; track subMenu.label){
            <!-- <a mat-list-item 
              [routerLink]=" menu().route + '/' + subMenu.route" 
              routerLinkActive="active-link"
              #subRla="routerLinkActive"
              [activated]="subRla.isActive"
              class="flex items-center border-l-5 border-transparent hover:border-blue-500 hover:bg-gray-300"
            >
              <mat-icon matListItemIcon [fontSet]=" subRla.isActive ? 'material-icons' : 'material-icons-outlined'">{{subMenu.icon}}</mat-icon>
              <span matListItemTitle>{{subMenu.label}}</span>
            </a> -->
            <app-menu-item [menu]="subMenu" [menuCollapsed]="menuCollapsed()" [routeHistory]=" routeHistory() + '/' + menu().route" />
          }
        </div>
      }
  `,
  styles: ``,
})
export class MenuItem {
  menu = input.required<TMenuItem>();
  menuCollapsed = input.required<boolean>();
  nestedMenuOpen = signal(false);
  routeHistory = input('');

  // routerLink

  toggleNestedMenu() {
    if (this.menu().subItems) {
      this.nestedMenuOpen.set(!this.nestedMenuOpen());
    }
  }

  logRoutes = effect(() => {
    console.log('Current Route History:', this.routeHistory());
  });
}
