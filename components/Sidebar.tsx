type SidebarProps = {
  onAddWidget: () => void;
};

export default function Sidebar({ onAddWidget }: SidebarProps) {
  return (
    <div
      style={{
        width: '200px',
        padding: '1rem',
        borderRight: '1px solid #ccc',
        backgroundColor: '#f8f8f8',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <button onClick={onAddWidget} style={{ width: '100%', padding: '0.5rem' }}>
        Add Widget
      </button>
    </div>
  );
}
