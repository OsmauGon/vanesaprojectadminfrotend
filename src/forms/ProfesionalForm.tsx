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
    finDeSuscripcion: "",//es campo obligatorio para el backend
    horario: "",//es campo obligatorio para el backend
    redSocial: "",
    insignias: [],
    notas: []
  });
  const [practicaInput, setPracticaInput] = useState("");
  const [notasInput, setNotaInput] = useState("");
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
  const addNota = () => {
    if (notasInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        notas: [...(prev.notas ?? []), notasInput.trim()],
      }));
      setNotaInput("");
    }
  };
  const removeNota = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notas: prev.notas?.filter((_, i) => i !== index),
    }));
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
    const servicios = [formData.especialidad].concat(formData.practicas)
    

    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("servicios", JSON.stringify(servicios));
    formDataToSend.append("notas", JSON.stringify(formData.notas));
    formDataToSend.append("ubicacion", formData.ubicacion);
    formDataToSend.append("telefono", formData.telefono);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("redSocial", formData.redSocial);
    formDataToSend.append("insignias", JSON.stringify(badges));
    formDataToSend.append("finDeSuscripcion", formData.finDeSuscripcion);
    formDataToSend.append("horario", formData.horario);

    // practicas como array
    formData.practicas.forEach((p, i) => {
      formDataToSend.append(`practicas[${i}]`, p);
    });

    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    /*for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);*/
    try {
      const response = await fetch(profPostEndpoint, {
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
          </div>
          <div className="mb-3">{/* IMAGEN */}
            <label className="form-label">Foto de perfil </label>
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
              placeholder="Direccion del profesional"
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

          <div className="mb-3">{/* EMAIL */}
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="profesional@hotmail.com"
            />
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
        </div>
      </details>
      <details>
        <summary>Perfil Profesional</summary>
        <div>
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario de contacto </label>
            <input
              type="text"
              name="horario"
              className="form-control"
              value={formData.horario}
              onChange={handleChange}
              placeholder="Lunes a Viernes de 9 a 19"
            />
          </div>
          <div className="mb-3">{/* ESPECIALIDAD */}
            <label className="form-label">Especialidad *</label>
            <input
              type="text"
              name="especialidad"
              className="form-control"
              value={formData.especialidad}
              onChange={handleChange}
              required
              placeholder="Especialidad principal"
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
                placeholder="Otras especialidades"
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
          <div className="d-flex flex-wrap">{/* CONJUNTO DE PRACTICAS */}
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
          <div className="mb-3">{/* Notas */}
            <label className="form-label">Notas</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={notasInput}
                onChange={(e) => setNotaInput(e.target.value)}
                placeholder="Notas"
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
          <div className="d-flex flex-wrap">{/* CONJUNTO DE Notas */}
              {formData.notas?.map((p, i) => (
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
            <label className="form-label">Limite de suscripcion *</label>
            <input
              type="date"
              name="finDeSuscripcion"
              className="form-control"
              value={formData.finDeSuscripcion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </details>
      <details>
        <summary>Insignias</summary>
        <div>
          <div className="form-check mb-3">{/* HACE DOMICILIO */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("hacedomicilio")}
              onChange={badgeCollector}
              id="hacedomicilio"
            />
            <label className="form-check-label" htmlFor="hacedomicilio">
              Hace visitas a domicilio
            </label>
          </div>
        </div>
          <div className="form-check mb-3">{/* HACE URGENCIAS */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={badges.includes("haceurgencias")}
              onChange={badgeCollector}
              id="haceurgencias"
            />
            <label className="form-check-label" htmlFor="haceurgencias">
              Hace visitas a urgencias
            </label>
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

