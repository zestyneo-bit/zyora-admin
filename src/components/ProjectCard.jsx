export default function ProjectCard({ project, onEdit, onDelete }) {
  // Handle both 'images' and 'imageUrls' field names
  const imageUrls = project.imageUrls || project.images || [];
  const firstImage = imageUrls[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {firstImage && (
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={firstImage}
            alt={project.title || "Project image"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{project.category}</p>
        {project.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
