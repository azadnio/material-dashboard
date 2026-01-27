import { NgIf } from '@angular/common';
import { Component, computed, input, signal, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList, MatListItemTitle, MatListItemIcon } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem = {
  label: string;
  icon: string;
  route?: string;
};

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatIcon, RouterLink, MatNavList, MatListItem, MatListItemIcon, MatListItemTitle, NgIf, RouterLinkActive],
  template: `
    <div class="pt-8 text-center bg-gray-200 h-full">
      <img src="https://www.randomuser.me/api/portraits/men/1.jpg" alt="User Avatar" [width]="imageSize()" [height]="imageSize()" class="rounded-full mx-auto"/>
      <div class="mt-2" *ngIf="!collaped()">
        <h2 class="text-lg font-semibold mt-4">John Doe</h2>
        <p class="text-sm text-gray-600"> 
          My Channel
        </p>
      </div>
      <mat-nav-list>
        @for(menu of menuItems(); track menu.label){
          <a mat-list-item 
            [routerLink]="menu.route" 
            routerLinkActive
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            class="flex items-center hover:bg-gray-300"
          >
            <mat-icon matListItemIcon>{{menu.icon}}</mat-icon>
            <span matListItemTitle>{{menu.label}}</span>
          </a>
        }
      </mat-nav-list>
    </div>
  `,
  styles: ``,
})
export class CustomSidenav {

  collaped = input.required<boolean>();
  imageSize = computed(() => (this.collaped() ? 40 : 100));

  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Content', icon: 'content_copy', route: '/content' },
    { label: 'Analytics', icon: 'analytics', route: '/analytics' },
    { label: 'Comments', icon: 'comment', route: '/comments' },
  ]);
}
