import { useState } from "react";
import type { Establishment } from "../types/types";
import { Alert, Button, Spinner } from "react-bootstrap";
import {vetesPostEndpoint } from "../endpoints";

type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
const InnerForm = ({changeState}: innerFormType)=> {
  const [obligatorios,setObligatorios] = useState<boolean>(false)
  const [formData, setFormData] = useState<Establishment>({
    id: 0,
    nombre: "",
    ubicacion: "",
    telefono: [],
    email: "",
    servicios: [],
    finDeSuscripcion: "",
    horario: "",
    profesionalesVinculados: [],
    latitud: "",
    longitud: "",
    redSocial: "",
    insignias: [],
    imagen: "",
    notas: []
  });

  const [practicaInput, setPracticaInput] = useState("");
  const [notasInput, setNotasInput] = useState("");
  const [profesionalInput, setProfesionalInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [especialidadInput, setEspecialidadInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [badges, setBadges] = useState<string[]>([])
  const badgeCollector = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    /*esta funcion es para agregar o quitar la insignia de correspondiente del establecimiento */
    const {id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: e.target.value }));
    if(value) setBadges((prev) => [ ...prev,id ]);
    else setBadges(badges.filter(item => item !=id))
    
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const addPractica = () => {
    if (practicaInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        servicios: [...(prev.servicios ?? []), practicaInput.trim()],
      }));
      setPracticaInput("");
    }
  };

  const removePractica = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.servicios?.filter((_, i) => i !== index),
    }));
  };

  const addPhone = () => {
    if (phoneInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        telefono: [...(prev.telefono ?? []), phoneInput.trim()],
      }));
      setPhoneInput("");
    }
  };

  const removePhone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.telefono?.filter((_, i) => i !== index),
    }));
  };
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

  const addProf = () => {
    if (profesionalInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        profesionalesVinculados: [...(prev.profesionalesVinculados ?? []), profesionalInput.trim()],
      }));
      setProfesionalInput("");
    }
  };

  const removeProf = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.profesionalesVinculados?.filter((_, i) => i !== index),
    }));
  };
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
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
          formData.horario.length === 0 || 
          formData.ubicacion.length === 0 || 
          especialidadInput.length === 0 ||
          file === null ){
          //alert("Verificar los datos obligatorios")
          setObligatorios(true)
          //return
        }
        changeState("loading")
        const formDataToSend = new FormData();
        const servicios = [especialidadInput].concat(formData.servicios)
        //const domicilio = formData.hacedomicilio ? ["hacedomicilio"] : []
        
    
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("servicios", JSON.stringify(servicios));
        formDataToSend.append("ubicacion", formData.ubicacion);
        formDataToSend.append("telefono", JSON.stringify(formData.telefono));
        formDataToSend.append("notas", JSON.stringify(formData.notas));
        formDataToSend.append("email", formData.email);
        formDataToSend.append("redSocial", formData.redSocial ? formData.redSocial : "");
        formDataToSend.append("insignias", JSON.stringify(badges));
        formDataToSend.append("finDeSuscripcion", formData.finDeSuscripcion);
        formDataToSend.append("horario", formData.horario);
        formDataToSend.append("profesionalesVinculados", JSON.stringify(formData.profesionalesVinculados));
        formDataToSend.append("latitud", formData.latitud);
        formDataToSend.append("longitud", formData.longitud);
    
        
    
        // imagen como archivo
        if (file) {
          formDataToSend.append("imagen", file);
        }
        
        try {
          const response = await fetch(vetesPostEndpoint, {
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
  
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  /* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      
      <details>
        <summary>Perfil del Establecimiento</summary>
        <div>
          <div className="mb-3">{/* NOMBRE */}
            <label className="form-label">Nombre *</label>
            <input
            placeholder="Ej. VetLove"
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            {obligatorios && formData.nombre.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de edificio *</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
          
        />
        
            {obligatorios && file === null && <p>⛔</p>}
        
            {obligatorios && formData.nombre.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario del establecimiento *</label>
            <input
            placeholder="Ej. De lunes a viernes de 16 a 23 / A convenir"
              type="text"
              name="horario"
              className="form-control"
              value={formData.horario}
              onChange={handleChange}
              required
            />
            
            {obligatorios && formData.horario.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* UBICACION */}
            <label className="form-label">Ubicación *</label>
            <input
            placeholder="Ej. Tejedor 1234"
              type="text"
              name="ubicacion"
              className="form-control"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
            
            {obligatorios && formData.ubicacion.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* latitud */}
            <label className="form-label">Latitud</label>
            <input
              type="text"
              name="latitud"
              className="form-control"
              value={formData.latitud}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* longitud */}
            <label className="form-label">Longitud</label>
            <input
              type="text"
              name="longitud"
              className="form-control"
              value={formData.longitud}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* Telefono */}
            <label className="form-label">Telefonos</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. 22312345678, 2234941010, etc."
                type="text"
                className="form-control"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addPhone}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE Telefonos */}
              {formData.telefono?.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removePhone(i)}
                  ></button>
                </span>
              ))}
          </div>
          <div className="mb-3">{/* EMAIL */}
            <label className="form-label">Email</label>
            <input
            placeholder="Ej. vetlove@gmail.com"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">{/* Red Social */}
            <label className="form-label">Red Social</label>
            <input
            placeholder="Ej. vetlove@gmail.com"
              type="text"
              name="redSocial"
              className="form-control"
              value={formData.redSocial}
              onChange={handleChange}
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Perfil Profesional</summary>
        <div>
          
          <div className="mb-3">{/* ESPECIALIDAD */}
            <label className="form-label">Especialidad *</label>
            <input
              placeholder="Ej. Medicina General"
              type="text"
              name="especialidades"
              className="form-control"
              value={especialidadInput}
              onChange={(e) => setEspecialidadInput(e.target.value)}
              required
            />
            
            {obligatorios && especialidadInput.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* Servicios no filtrables*/}
            <label className="form-label">Servicios</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. Farmacia, Reptiles, etc."
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
          <div>{/* CONJUNTO DE SERVICIOS */}
              {formData.servicios?.map((p, i) => (
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
          <div className="mb-3">{/* Profesionales Vinculados */}
            <label className="form-label">Profesionales Vinculados</label>
            <div className="input-group mb-2">
              <input
              placeholder="Ej. Dr. Estaban Quito"
                type="text"
                className="form-control"
                value={profesionalInput}
                onChange={(e) => setProfesionalInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addProf}
              >
                Agregar
              </button>
            </div>
          </div>
          <div>{/* CONJUNTO DE PROFESIONALES */}
              {formData.profesionalesVinculados.map((p, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {p}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => removeProf(i)}
                  ></button>
                </span>
              ))}
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
          <div className="mb-3">{/* Limite de suscripcion */}
            <label className="form-label">Limite de suscripcion *</label>
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
      <details>
        <summary>Insignias</summary>
        <div>
          
          <div className="form-check mb-3">{/* Tiene Quirofano */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienequirofano")}
               onChange={badgeCollector}
              id="tienequirofano"
            />
            <label className="form-check-label" htmlFor="tienelaboratorio">
              Tiene Quirofano
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Laboratorio */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienelaboratorio")}
              onChange={badgeCollector}
              id="tienelaboratorio"
            />
            <label className="form-check-label" htmlFor="tienelaboratorio">
              Tiene Laboratorio
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Internacion */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tieneinternacion")}
              onChange={badgeCollector}
              id="tieneinternacion"
            />
            <label className="form-check-label" htmlFor="tieneinternacion">
              Tiene Internacion
            </label>
          </div>
          <div className="form-check mb-3">{/* Hace Urgencias */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("haceurgencias")}
              onChange={badgeCollector}
              id="haceurgencias"
            />
            <label className="form-check-label" htmlFor="haceurgencias">
              Hace Urgencias
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Peluqueria */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienepeluqueria")}
              onChange={badgeCollector}
              id="tienepeluqueria"
            />
            <label className="form-check-label" htmlFor="tienepeluqueria">
              Tiene Peluqueria
            </label>
          </div>
          <div className="form-check mb-3">{/* Tiene Petshop */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("tienepetshop")}
              onChange={badgeCollector}
              id="tienepetshop"
            />
            <label className="form-check-label" htmlFor="tienepetshop">
              Tiene Petshop
            </label>
          </div>
        </div>
      </details>

      <button type="submit" className="btn btn-success">
        Guardar Establecimiento
      </button>
    </form>
  );
}
export const EstablishmentForm  = () =>{
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
