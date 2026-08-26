import { useState } from "react";
import type { MissingPost } from "../types/types";
import { Alert, Button, Spinner } from "react-bootstrap";
import { missingsPostEndpoint } from "../endpoints";

type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
const InnerForm = ({changeState}: innerFormType) =>{
  const [obligatorios,setObligatorios] = useState<boolean>(false)
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
          formData.contact.length === 0 ||
          file === null ){
          //alert("Verificar los datos obligatorios")
          setObligatorios(true)
          //return
        }
    changeState("loading")
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("contact", formData.contact);
    if(formData.tipo == 0) formDataToSend.append("tipo", "EXTRAVIADO");
    if(formData.tipo == 1) formDataToSend.append("tipo", "ENCONTRADO");
    if(formData.tipo == 2) formDataToSend.append("tipo", "ADOPCION");

    
    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    try {
      const response = await fetch(missingsPostEndpoint, {
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
    for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
   
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* titulo */}
        <label className="form-label">Titulo *</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          placeholder="Titulo"
        />
      </div>
      <div className="mb-3">{/* Descripcion */}
        <label className="form-label">Descripcion *</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripcion"
        />
      </div>
      <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto del posteo *</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {obligatorios && file === null && <p>⛔</p>}
      </div>
      <div className="mb-3">{/* Tipo */}
        <label className="form-label">Tipo de posteo *</label>
        <select name="tipo" id="tipo" className="form-control" onChange={handleChange}>
          <option value={0}>Perdido</option>
          <option value={1}>Encontrado</option>
          <option value={2}>En Adopcion</option>
        </select>
      </div>
      <div className="mb-3">{/* Contacto */}
        <label className="form-label">Contacto *</label>
        <input
        placeholder="Enlace de publicacion"
          type="text"
          name="contact"
          className="form-control"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        {obligatorios && formData.contact.length === 0 && <p>⛔</p>}
      </div>
      
      <button type="submit" className="btn btn-success">
        Guardar MissingPost
      </button>
    </form>
  );
}
export default function MissingPostForm() {
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

