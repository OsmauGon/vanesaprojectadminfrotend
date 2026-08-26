import { useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import type { Servicio } from "../types/types";
import { servPostEndpoint } from "../endpoints";

type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
const InnerForm = ({changeState}: innerFormType) =>{
  
  const [obligatorios,setObligatorios] = useState<boolean>(false)
  const [formData, setFormData] = useState<Servicio>({
    id: 0,//el backend lo asignara
    nombre: "",//es campo obligatorio para el backend
    topico: "",
    descripcion: "",
    telefono: "",
    contacto: "",
    finDeSuscripcion: "",//es campo obligatorio para el backend
    redSocial: "",
    clase: "SERVICIO",
    notas: []
  });
  const [notasInput, setNotasInput] = useState("");
  const addNota = () => {
    if (notasInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        notas: [...(prev.notas ?? []), notasInput.trim()],
      }));
      setNotasInput("");
    }
  };

  const removeNota = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notas: prev.notas?.filter((_, i) => i !== index),
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    // opcional: mostrar preview
    const url = URL.createObjectURL(selectedFile);
    setFormData((prev) => ({ ...prev, imagen: url }));
  }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(
          formData.nombre.length === 0 || 
          formData.finDeSuscripcion.length === 0 || 
          formData.topico.length === 0 ||
          formData.contacto.length === 0 ||
          file === null 
          ){
          alert("Verificar los datos obligatorios")
          setObligatorios(true)
          return
        }
    changeState("loading")
    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("contacto", formData.contacto);
    formDataToSend.append("telefono", formData.telefono);
    formDataToSend.append("contacto", formData.contacto);
    formDataToSend.append("redSocial", formData.redSocial);
    formDataToSend.append("finDeSuscripcion", formData.finDeSuscripcion);
    
    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    /*for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
    */
    try {
      const response = await fetch(servPostEndpoint, {
      method: "POST",
      body: formDataToSend,
      });
      const result = await response.json();
      if(result.message === "EXITO") {
        changeState("success")
      }
    } catch (error) {
      changeState("error")
      console.log("Error detectado: ", error)
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <details>
        <summary>Perfil Personal</summary>
        <div>
          <div className="mb-3">{/* NOMBRE */}
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre del profesional"
            />
            {obligatorios && formData.nombre.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* IMAGEN */}
            <label className="form-label">Foto de perfil *</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
            {obligatorios && file === null && <p>⛔</p>}
          </div>

          <div className="mb-3">{/* Topico */}
            <label className="form-label">Topico</label>
            <input
              type="text"
              name="topico"
              className="form-control"
              value={formData.topico}
              onChange={handleChange}
              placeholder="Tema del servicio"
              required
            />
            {obligatorios && formData.nombre.length === 0 && <p>⛔</p>}
          </div>
    
          <div className="mb-3">{/* Descripcion */}
            <label className="form-label">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              className="form-control"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripcion del servicio"
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
              placeholder="2236666666"
            />
          </div>

          <div className="mb-3">{/* Contacto */}
            <label className="form-label">Contacto *</label>
            <input
              type="text"
              name="contacto"
              className="form-control"
              value={formData.contacto}
              onChange={handleChange}
              placeholder="nombre de responsable a cargo"
              required
            />
            {obligatorios && formData.contacto.length === 0 && <p>⛔</p>}
          </div>
            
        <div className="mb-3">{/* Tipo */}
          <label className="form-label">Tipo de posteo *</label>
          <select name="clase" id="clase" className="form-control" onChange={handleChange}>
            <option value="SERVICIO">SERVICIO</option>
            <option value="PRODUCTO">PRODUCTO</option>
          </select>
        </div>
          <div className="mb-3">{/* redsocial */}
            <label className="form-label">Red Social</label>
            <input
              type="redsocial"
              name="redSocial"
              className="form-control"
              value={formData.redSocial}
              onChange={handleChange}
              placeholder="@Instagram-link"
            />
          </div>
          <div className="mb-3">{/* Notas */}
            <label className="form-label">Notas</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. Dr. Estaban Quito"
                type="text"
                className="form-control"
                value={notasInput}
                onChange={(e) => setNotasInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNota}
              >
                Agregar
              </button>
            </div>
          </div>
          <div className="d-flex flex-wrap">{/* CONJUNTO DE NOTAS */}
              {formData.notas.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removeNota(i)}
                  ></button>
                </span>
              ))}
          </div>
          <div className="mb-3">{/* Limite de Suscripcion */}
            <label className="form-label">Limite de suscripcion</label>
            <input
              type="date"
              name="finDeSuscripcion"
              className="form-control"
              value={formData.finDeSuscripcion}
              onChange={handleChange}
              required
            />
            {obligatorios && formData.finDeSuscripcion.length === 0 && <p>⛔</p>}
          </div>
        </div>
      </details>

      <button type="submit" className="btn btn-success">
        Guardar Servicio
      </button>
    </form>
  );
}



export const ServiciosForm = () =>{
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

