
type UserContact = {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
}
export const posiblesservicios: string[] = [
  "Clínica médica",
  "Clinica quirúrgica de tejidos blandos",
  "Cirugia cardiotoraxica",
  "Cirugía laparoscópica",
  "Laboratorio de análisis clinicos",
  "Diagnóstico por imágenes ( rx y ecografía)",
  "Medicina felina",
  "Banco de Sangre y medicina transfusional",
  "Farmacia veterinaria"
]
export interface Profesional {
  id: number;
  nombre: string;// nombre del profesional
  especialidad: string; // especialidad medica
  practicas: string[];//especies, practicas, conocimientos
  imagen?: string;// url de la foto de perfil
  ubicacion: string;//contacto
  telefono: string;//contacto
  email: string;//contacto
  hacedomicilio: boolean;// para filtrar si hace visitas a domicilio
  horarioDEcontacto: string; //para que la gente sepa en que horario llamarlo
  finDEsuscripcion: string;//algunos profesionales no ejercen dentro de un establecimiento
  redsocial?: string;
  contacto?: UserContact;
  rating?: number;
  disponible?: boolean;
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
type EstablishmentContact = {
  email: string;
  phone: string;
  latitud?: number;
  longitud?: number;
  address: string;
  city: string;
  state: string;
  country: string;
}
type EstablishmentService = {
  tienequirofano: boolean;// pa servicios
  tienelaboratorio: boolean;// pa servicios
  tieneinternacion: boolean;// pa servicios
  haceurgencias: boolean;// pa servicios
  tienepeluqueria: boolean;// pa servicios
  tienepetshop: boolean;// pa servicios
}
type EstablishmentHours = {
  days: string[];
  opening: string;
  closing: string;
}
export interface Establishment {
    id: number;
  nombre: string;// nombre del profesional
  imagen: string;// url de la foto de perfil
  horario: string;
    horarios?: EstablishmentHours;
  profesionalesVinculados: string[];
  especialidades: string[]; // especialidad medica
  practicas?: string[];//especies,practicas, conocimientos

    contacto?: EstablishmentContact
  ubicacion: string;//contacto
  telefono: string[];//contacto
  email: string;//contacto
  latitud: number;
  longitud: number;

    servicios?: EstablishmentService;
    serviciosNOfiltrables: string[]
  tienequirofano?: boolean;// pa servicios
  tienelaboratorio?: boolean;// pa servicios
  tieneinternacion?: boolean;// pa servicios
  haceurgencias?: boolean;// pa servicios
  tienepeluqueria?: boolean;// pa servicios
  tienepetshop?: boolean;// pa servicios

  
  finDEsuscripcion: string;
  redsocial: string;
  insignias: string[]
  disponible?: boolean;
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

export interface MissingPost {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  location?: string;
  contact: string;
  createdAt?: Date;
  tipo: 0 | 1 | 2// 0:"extraviado" 1:"encontrado" 2:"adopcion"
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export type Blog ={
    id: number,
    idOwner: number,
    title: string,
    description: string,
    documentUrl?: string,//Porque puede o no tener para descargar
    imageUrl?: string,//Porque puede o no tener para ver
    videoUrl?: string,//Porque puede o no tener para ver
    state?: "able"  | "disable" | "standby" 
}
export interface Cita {
  id: number;
  titulo: string;
  fecha: string;
  hora: string;
  tipo: string;
  profesional: string;

  ubicacion: string;
  publicacion: string;
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
export interface Event {
    id: number;
    titulo: string;//titulo del evento
    fecha: string;//fecha o fechas en las que dure el evento
    hora: string;//horario de inicio
    tipo: string;//tema del evento 'consulta' | 'vacuna' | 'cirujia';
    responsable: string;// persona u organismo responsable
    ubicacion: string;//ubicacion del evento
    contacto: string;//un link de la publicacion
}