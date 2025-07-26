import { Widget } from '@/types/widget';

const widgetStore: Record<string, string> = {};

export function getAllWidgets(): Widget[] {
  return Object.entries(widgetStore).map(([id, text]) => ({ id, text }));
}

export function saveWidget(id: string, text: string): void {
  widgetStore[id] = text;
}

export function deleteWidget(id: string): void {
  delete widgetStore[id];
}
