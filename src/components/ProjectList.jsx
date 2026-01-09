export default function ProjectList({ projects, onEdit, onDelete }) {
  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
      {projects.map((project) => (
        <div key={project.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {project.images && project.images[0] && (
            <img 
              src={project.images[0]} 
              alt={project.title} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
            />
          )}
          <h4 style={{ margin: '0.5rem 0' }}>{project.title}</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>{project.category}</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => onEdit(project)} style={{ flex: 1 }}>Edit</button>
            <button onClick={() => onDelete(project.id)} style={{ flex: 1, backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
