import { getAllWidgets, saveWidget, deleteWidget } from './widgetRepository';
import { Widget } from '@/types/widget';

export function listWidgets(): Widget[] {
  const widgets = getAllWidgets();
  console.log(`[Service] listWidgets → ${widgets.length} widget(s) found`);
  return widgets;
}

export function createOrUpdateWidget(id: string, text: string): void {
  console.log(`[Service] createOrUpdateWidget → ID: ${id}`);
  saveWidget(id, text);
}

export function removeWidget(id: string): void {
  console.log(`[Service] removeWidget → ID: ${id}`);
  deleteWidget(id);
}
