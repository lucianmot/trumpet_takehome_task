import { useState } from 'react';

type WidgetProps = {
  id: string;
  initialText: string;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
};

export default function Widget({ id, initialText, onUpdate, onDelete }: WidgetProps) {
  const [text, setText] = useState(initialText);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'right', marginBottom: '4px' }}>
        <button onClick={() => onDelete(id)} style={{ fontSize: '0.8rem' }}>
          Delete
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onUpdate(id, text)}
        rows={5}
        style={{ width: '100%', resize: 'vertical' }}
        placeholder="Type something..."
      />
    </div>
  );
}
