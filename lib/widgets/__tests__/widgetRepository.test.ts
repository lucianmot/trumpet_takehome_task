import { getAllWidgets, saveWidget, deleteWidget } from '../widgetRepository';

describe('widgetRepository', () => {
  beforeEach(() => {
    saveWidget('reset-id', '');
  });

  it('should save and retrieve a widget', () => {
    saveWidget('widget-1', 'Hello widget!');
    const widgets = getAllWidgets();
    expect(widgets).toEqual(expect.arrayContaining([
      { id: 'widget-1', text: 'Hello widget!' }
    ]));
  });

  it('should return multiple saved widgets', () => {
    saveWidget('a', 'Alpha');
    saveWidget('b', 'Beta');
    const all = getAllWidgets();
    expect(all).toEqual(expect.arrayContaining([
      { id: 'a', text: 'Alpha' },
      { id: 'b', text: 'Beta' }
    ]));
  });

  it('should update text if saving same ID again', () => {
    saveWidget('widget-x', 'Old');
    saveWidget('widget-x', 'New');
    const updated = getAllWidgets().find(w => w.id === 'widget-x');
    expect(updated?.text).toBe('New');
  });

  it('should delete a widget by ID', () => {
    saveWidget('delete-me', 'To be removed');
    deleteWidget('delete-me');
    const widgets = getAllWidgets();
    const found = widgets.find(w => w.id === 'delete-me');
    expect(found).toBeUndefined();
  });
});
