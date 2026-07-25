import { useState } from "react";
import type { Profesional } from "../types/types";

export default function ProfesionalForm() {
  const [formData, setFormData] = useState<Profesional>({
    id: 0,
    nombre: "",
    especialidad: "",
    practicas: [],
    imagen: "",
    ubicacion: "",
    telefono: "",
    email: "",
    hacedomicilio: false,
    finDEsuscripcion: "",//PONER INPUT
    horarioDEcontacto: "",//PONER INPUT
  });

  const [practicaInput, setPracticaInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, hacedomicilio: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Podrías subirlo a tu backend o convertirlo en URL temporal
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imagen: url }));
    }
  };

  const addPractica = () => {
    if (practicaInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        practicas: [...(prev.practicas ?? []), practicaInput.trim()],
      }));
      setPracticaInput("");
    }
  };

  const removePractica = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.practicas?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo profesional:", formData);
    // Aquí podrías hacer un POST al backend
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* NOMBRE */}
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">{/* ESPECIALIDAD */}
        <label className="form-label">Especialidad</label>
        <input
          type="text"
          name="especialidad"
          className="form-control"
          value={formData.especialidad}
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

      <div className="mb-3">{/* TELEFONO */}
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          name="telefono"
          className="form-control"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">{/* EMAIL */}
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">{/* Practicas */}
        <label className="form-label">Prácticas</label>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={practicaInput}
            onChange={(e) => setPracticaInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={addPractica}
          >
            Agregar
          </button>
        </div>
      </div>
      <div>{/* CONJUNTO DE PRACTICAS */}
          {formData.practicas?.map((p, i) => (
            <span key={i} className="badge bg-secondary me-2">
              {p}{" "}
              <button
                type="button"
                className="btn-close btn-close-white ms-1"
                onClick={() => removePractica(i)}
              ></button>
            </span>
          ))}
      </div>

      <div className="form-check mb-3">{/* HACE DOMICILIO */}
        <input
          type="checkbox"
          className="form-check-input"
          checked={formData.hacedomicilio}
          onChange={handleCheckbox}
          id="hacedomicilio"
        />
        <label className="form-check-label" htmlFor="hacedomicilio">
          Hace visitas a domicilio
        </label>
      </div>







      <details>
        <summary>Perfil Personal</summary>
        <div>
          <div className="mb-3">{/* NOMBRE */}
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
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

          <div className="mb-3">{/* TELEFONO */}
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">{/* EMAIL */}
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Perfil Profesional</summary>
        <div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario de contacto</label>
            <input
              type="text"
              name="horario"
              className="form-control"
              value={formData.horarioDEcontacto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">{/* ESPECIALIDAD */}
            <label className="form-label">Especialidad</label>
            <input
              type="text"
              name="especialidad"
              className="form-control"
              value={formData.especialidad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">{/* Practicas */}
            <label className="form-label">Prácticas</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={practicaInput}
                onChange={(e) => setPracticaInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addPractica}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE PRACTICAS */}
              {formData.practicas?.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removePractica(i)}
                  ></button>
                </span>
              ))}
          </div>
          <div className="form-check mb-3">{/* HACE DOMICILIO */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.hacedomicilio}
              onChange={handleCheckbox}
              id="hacedomicilio"
            />
            <label className="form-check-label" htmlFor="hacedomicilio">
              Hace visitas a domicilio
            </label>
          </div>
          <div className="mb-3">{/* Limite de Suscripcion */}
            <label className="form-label">Limite de suscripcion</label>
            <input
              type="date"
              name="limitedesuscripcion"
              className="form-control"
              value={formData.finDEsuscripcion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Otros</summary>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique totam modi voluptatibus numquam corrupti? Enim provident eum non maxime ut, excepturi iste recusandae quo quaerat? Velit distinctio qui quaerat alias?</p>
      </details>

      <button type="submit" className="btn btn-success">
        Guardar Profesional
      </button>
    </form>
  );
}
