import {
  listWidgets,
  createOrUpdateWidget,
  removeWidget,
} from '../widgetService';

describe('widgetService', () => {
  beforeEach(() => {
    createOrUpdateWidget('reset-id', '');
  });

  it('should create and list widgets', () => {
    createOrUpdateWidget('widget-1', 'Alpha text');
    const all = listWidgets();
    expect(all).toEqual(expect.arrayContaining([
      { id: 'widget-1', text: 'Alpha text' }
    ]));
  });

  it('should update an existing widget', () => {
    createOrUpdateWidget('widget-2', 'Initial');
    createOrUpdateWidget('widget-2', 'Updated');
    const updated = listWidgets().find(w => w.id === 'widget-2');
    expect(updated?.text).toBe('Updated');
  });

  it('should remove a widget by ID', () => {
    createOrUpdateWidget('widget-3', 'Temp text');
    removeWidget('widget-3');
    const after = listWidgets();
    const found = after.find(w => w.id === 'widget-3');
    expect(found).toBeUndefined();
  });
});
