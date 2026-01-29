import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  imports: [MatAnchor],
  template: `
    <div class="w-full h-[calc(100%-80px)]">
      <canvas #chart></canvas>
      <button mat-raised-button>See more</button>
    </div>
  `,
  styles: ``,
})
export class PieChart implements OnInit {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    const ctx = this.chart().nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        maintainAspectRatio: false,
      }
    });
  }
}
