import Widget from './Widget';

type WidgetData = {
  id: string;
  text: string;
};

type CanvasProps = {
  widgets: WidgetData[];
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function Canvas({ widgets, onUpdate, onDelete }: CanvasProps) {
  return (
    <div
      style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        height: '100vh',
        boxSizing: 'border-box',
        backgroundColor: '#fefefe',
      }}
    >
      {widgets.map((w) => (
        <Widget key={w.id} id={w.id} initialText={w.text} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
