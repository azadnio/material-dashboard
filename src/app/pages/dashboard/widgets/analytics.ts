import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  imports: [MatAnchor],
  template: `
    <div class="w-full h-[calc(100%-80px)]">
      <canvas #chart></canvas>
    </div>
    <button mat-raised-button>Go to Analytics</button>
  `,
  styles: ``,
})
export class Analytics implements OnInit {

  chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    const ctx = this.chart().nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [{
          label: 'View',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: 'start',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false,        
      }
    });
  }
}
