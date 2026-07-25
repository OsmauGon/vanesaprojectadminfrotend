import { useState } from "react";
import type { Event } from "../types/types";

export default function EventForm() {
  const [formData, setFormData] = useState<Event>({
    id: 0,
    titulo: "",
    fecha: "",
    hora: "",
    ubicacion: "",
    tipo: "",
    contacto: "",
    responsable: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo profesional:", formData);
    // Aquí podrías hacer un POST al backend
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* Titulo */}
        <label className="form-label">Titulo</label>
        <input
          type="text"
          name="titulo"
          className="form-control"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">{/* Fecha */}
        <label className="form-label">Fecha</label>
        <input
          type="date"
          name="fecha"
          className="form-control"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">{/* Hora */}
        <label className="form-label">Hora</label>
        <input
          type="text"
          name="hora"
          className="form-control"
          value={formData.hora}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Responsable */}
        <label className="form-label">Responsable</label>
        <input
          type="text"
          name="responsable"
          className="form-control"
          value={formData.responsable}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* UBICACION */}
        <label className="form-label">Ubicación</label>
        <input
          type="text"
          name="ubicacion"
          className="form-control"
          value={formData.ubicacion}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Tipo */}
        <label className="form-label">Tipo</label>
        <input
          type="email"
          name="tipo"
          className="form-control"
          value={formData.tipo}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Contacto */}
        <label className="form-label">Contacto</label>
        <input
          type="text"
          name="contacto"
          className="form-control"
          value={formData.contacto}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success">
        Guardar Profesional
      </button>
    </form>
  );
}
