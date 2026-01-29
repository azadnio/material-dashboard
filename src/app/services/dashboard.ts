import { computed, effect, Injectable, signal } from '@angular/core';
import { TWidget } from '../models/dashboard';
import { Subscriber } from '../pages/dashboard/widgets/subscriber';
import { Views } from '../pages/dashboard/widgets/views';
import { WatchTime } from '../pages/dashboard/widgets/watch-time';
import { Revenue } from '../pages/dashboard/widgets/revenue';
import { Analytics } from '../pages/dashboard/widgets/analytics';
import { PieChart } from '../pages/dashboard/widgets/pie-chart';

@Injectable()
export class Dashboard {

  private widgets = signal<TWidget[]>([
    { id: '1', label: 'Subscribers', content: Subscriber, rows: 1, cols: 1, backgroundColor: '#003f5c', textColor: 'whitesmoke' },
    { id: '2', label: 'Views', content: Views, rows: 1, cols: 1, backgroundColor: '#003f5c', textColor: 'whitesmoke' },
    { id: '3', label: 'Watch time', content: WatchTime, rows: 1, cols: 1, backgroundColor: '#003f5c', textColor: 'whitesmoke' },
    { id: '4', label: 'Revenue', content: Revenue, rows: 1, cols: 1, backgroundColor: '#003f5c', textColor: 'whitesmoke' },
    { id: '5', label: 'Analytics', content: Analytics, rows: 2, cols: 2 },
    { id: '6', label: 'Pie Chart', content: PieChart, rows: 2, cols: 1 },
  ]);

  addedWidget = signal<TWidget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidget().map(w => w.id);
    return this.widgets().filter(w => !addedIds.includes(w.id));
  })

  constructor() {
    this.fetchWidgets();
  }

  addWidget(widget: TWidget) {
    this.addedWidget.update(widgets => [...widgets, widget]);
  }

  updateWidget(id: string, updatedWidget: Partial<TWidget>) {
    this.addedWidget.update(widgets =>
      widgets.map(w => w.id === id ? { ...w, ...updatedWidget } : w)
    );
  }

  removeWidget(id: string) {
    this.addedWidget.update(widgets =>
      widgets.filter(w => w.id !== id)
    );
  }

  moveRight(id: string) {
    this.addedWidget.update(widgets => {
      const index = widgets.findIndex(w => w.id === id);
      if (index < 0 || index === widgets.length - 1) return widgets;
      const newWidgets = [...widgets];
      [newWidgets[index], newWidgets[index + 1]] = [newWidgets[index + 1], newWidgets[index]];
      return newWidgets;
    });
  }

  moveLeft(id: string) {
    this.addedWidget.update(widgets => {
      const index = widgets.findIndex(w => w.id === id);
      if (index <= 0) return widgets;
      const newWidgets = [...widgets];
      [newWidgets[index], newWidgets[index - 1]] = [newWidgets[index - 1], newWidgets[index]];
      return newWidgets;
    });
  }

  updateWidgetPosition(sourceWidgetId: string, targetWidgetId: string) {

    this.addedWidget.update(widgets => {
      const sourceIndex = widgets.findIndex(w => w.id === sourceWidgetId);
      const targetIndex = widgets.findIndex(w => w.id === targetWidgetId);
      if (sourceIndex < 0 || targetIndex < 0) return widgets;
      const newWidgets = [...widgets];
      const [movedWidget] = newWidgets.splice(sourceIndex, 1);
      newWidgets.splice(targetIndex, 0, movedWidget);
      return newWidgets;
    });
  }

  saveWidgets = effect(() => {
    const widgets: Partial<TWidget>[] = this.addedWidget().map(w => ({ ...w }));
    widgets.forEach(w => {
      delete w.content;
    });
    localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
  });

  private fetchWidgets() {
    const widgets = localStorage.getItem('dashboard-widgets');
    if (widgets) {
      const parsed: Partial<TWidget>[] = JSON.parse(widgets);
      const restored = parsed.map(w => {
        const original = this.widgets().find(ow => ow.id === w.id);
        return { ...original, ...w } as TWidget;
      });
      this.addedWidget.set(restored);
    }
  }

}