
import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import type { Establishment } from '../types/types';
import { useState } from 'react';
type ModalProps = {
    obj: Establishment | null;
    show: boolean;
    hide: (val: boolean) => void
}
type FormProps ={
  props: Establishment| null
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}





const EstablishmentEditForm = ({props, changeState}: FormProps)=> {
  const [formData, setFormData] = useState<Establishment>({
    id: (props && props.id) ? props?.id : 0,
    nombre: (props && props.id) ? props?.nombre : "",
    especialidades: props ? props.especialidades : [],
    imagen: props ? props.imagen : "",
    ubicacion: props ? props.ubicacion : "",
    telefono: props ? props.telefono : [],
    email: props ? props.email : "",

    finDEsuscripcion: props ? props.finDEsuscripcion : "",
    horario: props ? props.horario : "",
    serviciosNOfiltrables: props ? props.serviciosNOfiltrables : [],
    profesionalesVinculados: props ? props.profesionalesVinculados : [],
    latitud: (props && props.latitud) ? props?.latitud : 0,
    longitud: (props && props.longitud) ? props?.longitud : 0,
    tienequirofano: props ? props.tienequirofano : false,
    tienelaboratorio: props ? props.tienelaboratorio : false,
    tieneinternacion: props ? props.tieneinternacion : false,
    haceurgencias: props ? props.haceurgencias : false,
    tienepeluqueria: props ? props.tienepeluqueria : false,
    tienepetshop: props ? props.tienepetshop : false,
  });

  const [practicaInput, setPracticaInput] = useState("");
  const [profesionalInput, setProfesionalInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [especialidadInput, setEspecialidadInput] = useState("");

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleCheckboxQuirofano = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, tienequirofano: e.target.checked }));
    };
    const handleCheckboxLaboratorio = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, tienelaboratorio: e.target.checked }));
    };
    const handleCheckboxInternacion = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, tieneinternacion: e.target.checked }));
    };
    const handleCheckboxUrgencias = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, haceurgencias: e.target.checked }));
    };
    const handleCheckboxPeluqueria = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, tienepeluqueria: e.target.checked }));
    };
    const handleCheckboxPetshop = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, tienepetshop: e.target.checked }));
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
          serviciosNOfiltrables: [...(prev.serviciosNOfiltrables ?? []), practicaInput.trim()],
        }));
        setPracticaInput("");
      }
    };
    const removePractica = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        practicas: prev.serviciosNOfiltrables?.filter((_, i) => i !== index),
      }));
    };
    const addPhone = () => {
      if (phoneInput.trim() !== "") {
        setFormData((prev) => ({
          ...prev,
          serviciosNOfiltrables: [...(prev.serviciosNOfiltrables ?? []), phoneInput.trim()],
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

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeState("loading")
    setTimeout(()=> changeState("success"), 3000)
    console.log("Nuevo profesional:", formData);
    // Aquí podrías hacer un POST al backend
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
          <div className="mb-3">{/* Horario de atencion */}
            <label className="form-label">Horario del establecimiento *</label>
            <input
            placeholder="Ej. De lunes a viernes de 16 a 23"
              type="text"
              name="horario"
              className="form-control"
              value={formData.horario}
              onChange={handleChange}
              required
            />
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
              {formData.serviciosNOfiltrables?.map((p, i) => (
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
          <div className="mb-3">{/* Limite de suscripcion */}
            <label className="form-label">Limite de suscripcion *</label>
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
      <details>
        <summary>Servicios</summary>
        <div>
          
          <div className="form-check mb-3">{/* Tiene Quirofano */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.tienequirofano}
              onChange={handleCheckboxQuirofano}
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
              checked={formData.tienelaboratorio}
              onChange={handleCheckboxLaboratorio}
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
              checked={formData.tieneinternacion}
              onChange={handleCheckboxInternacion}
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
              checked={formData.haceurgencias}
              onChange={handleCheckboxUrgencias}
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
              checked={formData.tienepeluqueria}
              onChange={handleCheckboxPeluqueria}
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
              checked={formData.tienepetshop}
              onChange={handleCheckboxPetshop}
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















export const ModalDEestablecimiento = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")
  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.obj?.nombre}</Modal.Title>
        </Modal.Header>
         <Modal.Body>
                {requestState === "standby" && <EstablishmentEditForm props={props.obj} changeState={setRequestState}/>}
                {requestState === "error" && <Alert  variant={"danger"}>This is a {"danger"} alert—check it out!</Alert>}
                {requestState === "success" && <Alert  variant={"success"}>This is a {"success"} alert—check it out!</Alert>}
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
          </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-danger" onClick={()=> {setRequestState("standby");props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}