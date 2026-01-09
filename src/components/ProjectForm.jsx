import { useState, useEffect } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProjectForm({ projectToEdit, onCancel, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setDescription(projectToEdit.description);
      setCategory(projectToEdit.category);
      // We don't pre-fill file input, but we could show existing images if we wanted
    }
  }, [projectToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrls = projectToEdit ? projectToEdit.images || [] : [];

      // Upload new images
      if (images.length > 0) {
        const uploadPromises = Array.from(images).map(async (image) => {
          const storageRef = ref(storage, `projects/${Date.now()}_${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          return await getDownloadURL(snapshot.ref);
        });
        const newUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newUrls];
      }

      const projectData = {
        title,
        description,
        category,
        images: imageUrls,
        updatedAt: new Date()
      };

      if (projectToEdit) {
        const projectRef = doc(db, "projects", projectToEdit.id);
        await updateDoc(projectRef, projectData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date()
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving project: ", error);
      alert("Error saving project: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {projectToEdit ? "Edit Project" : "Add New Project"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter project category"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
            placeholder="Enter project description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">You can select multiple images</p>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {uploading ? "Saving..." : "Save Project"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={uploading}
            className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
