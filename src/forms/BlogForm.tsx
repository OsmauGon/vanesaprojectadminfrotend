import { useState } from "react";
import type { Blog } from "../types/types";
import { Alert, Button, Spinner } from "react-bootstrap";


type innerFormType = {
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
const InnerForm = ({changeState}: innerFormType) =>{
  const [formData, setFormData] = useState<Blog>({
    id: 0,
    idOwner: 0,
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    documentUrl: ""
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
      
    changeState("loading")
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (formData.videoUrl && formData.videoUrl?.length > 5) formDataToSend.append("videoUrl", formData.videoUrl);
    if (formData.documentUrl && formData.documentUrl?.length > 5) formDataToSend.append("documentUrl", formData.documentUrl);

    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    /* try {
      const response = await fetch(blogPostEndpoint, {
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
    } */
   
    
     for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 new-form">
      <div className="mb-3">{/* ID dueño */}
        <label className="form-label">ID dueño</label>
        <input
          type="text"
          name="idOwner"
          className="form-control"
          value={formData.idOwner}
          onChange={handleChange}
          placeholder="ID del profesional"
        />
      </div>
      <div className="mb-3">{/* titulo */}
        <label className="form-label">Titulo *</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Titulo del articulo"
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
          required
          placeholder="Descripcion del articulo"
        />
      </div>

      <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
          placeholder="Imagen del articulo"
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
          placeholder="Enlace al video"
        />
      </div>
      <div className="mb-3">{/* Documento */}
        <label className="form-label">Adjuntar documento</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Enlace al drive de descarga"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Guardar Blog
      </button>
    </form>
  );
}
export const BlogForm = () =>{
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