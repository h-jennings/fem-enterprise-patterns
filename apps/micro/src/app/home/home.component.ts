import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  price;
  mode;
  widgets: Widget[];

  updateWidgets(mode: any, widgets: any[], widget: any) {
    switch (mode) {
      case 'create': {
        return this.addWidget(widgets, widget);
      }
      case 'update': {
        return this.updateWidget(widgets, widget);
      }
      case 'delete': {
        return this.deleteWidget(widgets, widget);
      }
      default:
        return widgets;
    }
  }
  updateWidget(widgets, widget) {
    return widgets.map((_widget) =>
      widget.id === _widget.id ? Object.assign({}, widget) : _widget
    );
  }
  addWidget(widgets, widget) {
    const newWidget = Object.assign({}, widget, { id: uuidv4() });
    return [newWidget, ...widgets];
  }
  deleteWidget(widgets, widget) {
    return widgets.filter((_widget) => widget.id !== _widget.id);
  }
  getTotalPrice(widgets) {
    return widgets.reduce((acc, curr) => acc + curr.price, 0);
  }
  reCalculateTotal(mode, widgets, widget) {
    this.widgets = this.updateWidgets(mode, widgets, widget);
    this.price = this.getTotalPrice(widgets);
  }
}
