import { useState } from "react";
import type { Blog } from "../types/types";

export default function BlogForm() {
  const [formData, setFormData] = useState<Blog>({
    id: 0,
    idOwner: 0,
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    documentUrl: "",
    state: "standby"
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Podrías subirlo a tu backend o convertirlo en URL temporal
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Podrías subirlo a tu backend o convertirlo en URL temporal
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, documentUrl: url }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo blog:", formData);
    // Aquí podrías hacer un POST al backend
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* titulo */}
        <label className="form-label">Titulo</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">{/* Descripcion */}
        <label className="form-label">Descripcion</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">{/* Video*/}
        <label className="form-label">Enlace del video</label>
        <input
          type="text"
          name="videoUrl"
          className="form-control"
          value={formData.videoUrl}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Documento */}
        <label className="form-label">Adjuntar documento</label>
        <input
          type="file"
          className="form-control"
          accept="document/*"
          onChange={handleDocumentChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Guardar Blog
      </button>
    </form>
  );
}
