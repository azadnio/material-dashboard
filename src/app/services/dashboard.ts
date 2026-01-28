import { Injectable, signal } from '@angular/core';
import { TWidget } from '../models/dashboard';
import { Subscriber } from '../pages/dashboard/widgets/subscriber';
import { Views } from '../pages/dashboard/widgets/views';

@Injectable()
export class Dashboard {

  widgets = signal<TWidget[]>([
    { id: '1', label: 'Subscriber Widget', content: Subscriber },
    { id: '2', label: 'Views Widget', content: Views }
  ]);
}
