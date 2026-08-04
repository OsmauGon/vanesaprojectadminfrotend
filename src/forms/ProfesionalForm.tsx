import { useState } from "react";
import type { Profesional } from "../types/types";
import { profPostEndpoint } from "../endpoints";
import { Alert, Button, Spinner } from "react-bootstrap";

type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
const InnerForm = ({changeState}: innerFormType) =>{
  const [formData, setFormData] = useState<Profesional>({
    id: 0,//el backend lo asignara
    nombre: "",//es campo obligatorio para el backend
    especialidad: "",
    practicas: [],//es campo obligatorio para el backend
    imagen: "",//es campo obligatorio para el backend
    ubicacion: "",
    telefono: "",
    email: "",
    hacedomicilio: false,
    finDEsuscripcion: "",//es campo obligatorio para el backend
    horarioDEcontacto: "",//es campo obligatorio para el backend
    redsocial: ""
  });

  const [practicaInput, setPracticaInput] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    // opcional: mostrar preview
    const url = URL.createObjectURL(selectedFile);
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

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    changeState("loading")
    const formDataToSend = new FormData();
    const servicios = [formData.especialidad].concat(formData.practicas)
    const domicilio = formData.hacedomicilio ? ["hacedomicilio"] : []
    

    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("servicios", JSON.stringify(servicios));
    formDataToSend.append("ubicacion", formData.ubicacion);
    formDataToSend.append("telefono", formData.telefono);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("redsocial", formData.redsocial ? formData.redsocial : "");
    formDataToSend.append("insignias", JSON.stringify(domicilio));
    formDataToSend.append("finDeSuscripcion", formData.finDEsuscripcion);
    formDataToSend.append("horario", formData.horarioDEcontacto);

    // practicas como array
    formData.practicas.forEach((p, i) => {
      formDataToSend.append(`practicas[${i}]`, p);
    });

    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    
    const response = await fetch(profPostEndpoint, {
      method: "POST",
      body: formDataToSend,
    });

    const result = await response.json();
    if(result.nombre) {
      changeState("success")
    }
    else changeState("error")
    
  };
  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /*El sigueinte codigo es para adaptar el formData que enviaremos al formData que espera el backend ()) */


  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
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
          
          <div className="mb-3">{/* redsocial */}
            <label className="form-label">redsocial</label>
            <input
              type="redsocial"
              name="redsocial"
              className="form-control"
              value={formData.redsocial}
              onChange={handleChange}
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Perfil Profesional</summary>
        <div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario de contacto *</label>
            <input
              type="text"
              name="horarioDEcontacto"
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
              name="finDEsuscripcion"
              className="form-control"
              value={formData.finDEsuscripcion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </details>

      <button type="submit" className="btn btn-success">
        Guardar Profesional
      </button>
    </form>
  );
}



export const ProfesionalForm = () =>{
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")
  return <>
  {requestState === "standby" && <InnerForm  changeState={setRequestState}/>}
                {requestState === "error" && <Alert variant={"danger"}>Operacion fallida</Alert>}
                {requestState === "success" && <Alert  variant={"success"}>Operacion Exitosa</Alert>}
                {requestState === "loading" && <Button variant="primary" disabled>
                                                  <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                  />
                                                   Loading...
                                                </Button> }
  </>
}

