import { useState } from "react";
import type { Publicidad } from "../types/types";
import { Alert, Button, Spinner } from "react-bootstrap";
import { publiPostEndpoint } from "../endpoints";

type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
const InnerForm = ({changeState}: innerFormType) =>{
  const [obligatorios,setObligatorios] = useState<boolean>(false)
  const [formData, setFormData] = useState<Publicidad>({
    id: 0,//el backend lo asignara
    titulo: "",//es campo obligatorio para el backend
    contacto: "",
    imageUrlChico: "",//es campo obligatorio para el backend
    finDeSuscripcion: "",//es campo obligatorio para el backend
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          formData.titulo.length === 0 || 
          formData.finDeSuscripcion.length === 0 || 
          formData.contacto.length === 0 || 
          file === null ){
          //alert("Verificar los datos obligatorios")
          setObligatorios(true)
          //return
        }
    changeState("loading")
    const formDataToSend = new FormData();
    formDataToSend.append("titulo", formData.titulo);
    formDataToSend.append("finDeSuscripcion", formData.finDeSuscripcion);
    formDataToSend.append("contacto", formData.contacto);


    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }/*
    for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 5000);
    */
    try {
      const response = await fetch(publiPostEndpoint, {
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
   
          <div className="mb-3">{/* titulo */}
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="nombre publicidad"
            />
            {obligatorios && formData.titulo.length === 0 && <p>⛔</p>}
          </div>
          <div className="mb-3">{/* contacto */}
            <label className="form-label">Contacto *</label>
            <input
              type="text"
              name="contacto"
              className="form-control"
              value={formData.contacto}
              onChange={handleChange}
              required
              placeholder="contacto de publicidad"
            />
            {obligatorios && formData.contacto.length === 0 && <p>⛔</p>}
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
      <button type="submit" className="btn btn-success">
        Guardar Publicidad
      </button>
    </form>
  );
}



export const PublicidadForm = () =>{
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