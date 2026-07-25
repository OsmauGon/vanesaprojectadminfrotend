import { useState } from "react";
import type { MissingPost } from "../types/types";

export default function MissingPostForm() {
  const [formData, setFormData] = useState<MissingPost>({
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    tipo: 0,
    contact: ""

  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo MissingPost:", formData);
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
      <div className="mb-3">{/* Tipo */}
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
        <select name="tipo" id="tipo" className="form-control" onChange={handleChange}>
          <option value="0">Extraviado</option>
          <option value="1">Encontrado</option>
          <option value="2">En Adopcion</option>
        </select>
      </div>
      <div className="mb-3">{/* Contacto */}
        <label className="form-label">Contacto</label>
        <input
        placeholder="Enlace de publicacion"
          type="text"
          name="contact"
          className="form-control"
          value={formData.contact}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-success">
        Guardar MissingPost
      </button>
    </form>
  );
}
