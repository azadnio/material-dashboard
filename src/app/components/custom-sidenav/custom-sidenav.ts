import { NgIf } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MenuItem } from '../menu-item/menu-item';

export type TMenuItem = {
  label: string;
  icon: string;
  route: string;
  subItems?: TMenuItem[];
};

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatNavList, NgIf, MenuItem],
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
          <app-menu-item [menu]="menu" [menuCollapsed]="collaped()" />
        }
      </mat-nav-list>
    </div>
  `,
  styles: ``,
})
export class CustomSidenav {

  collaped = input.required<boolean>();
  imageSize = computed(() => (this.collaped() ? 40 : 100));

  menuItems = signal<TMenuItem[]>([
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    {
      label: 'Content', icon: 'content_copy', route: 'content',
      subItems: [
        { label: 'Articles', icon: 'article', route: 'articles' },
        { label: 'Categories', icon: 'category', route: 'categories' },
        {
          label: 'Tags', icon: 'label', route: 'tags',
          subItems: [
            { label: 'Tag 1', icon: 'label', route: 'tag1' },
            { label: 'Tag 2', icon: 'label', route: 'tag2' },
          ]
        },
      ]
    },
    { label: 'Analytics', icon: 'analytics', route: 'analytics' },
    { label: 'Comments', icon: 'comment', route: 'comments' },
  ]);
}
