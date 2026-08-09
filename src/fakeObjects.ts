//import type { Blog,Establishment, Event, MissingPost, Profesional } from "./types/types";

/* export const fakeProfesionals: Profesional[] =[
  { 
      id: 100, 
      nombre: "Dra Ana Paula Carou", 
      especialidad: "Medicina Felina", 
      ubicacion: "San Juan 2684", 
      rating: 4.8, 
      disponible: true, 
      imagen: "https://randomuser.me/api/portraits/women/32.jpg", 
      telefono: "2234386829", 
      hacedomicilio: false, 
      email: "emailfalso@gmail.com", 
      finDEsuscripcion: "Tue Sep 1 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
      practicas: ["Medicina Felina","Medicina interna de pequeños animales","Gatos"],
      horarioDEcontacto: "Lunes a Viernes de 10 a 17, Sabados de 10 a 13"
    },
    { 
      id: 1, 
      nombre: "Dr. Juan Pérez", 
      especialidad: "Medicina General", 
      ubicacion: "Santiago del Estero 1234", 
      rating: 4.8, 
      disponible: true, 
      imagen: "https://randomuser.me/api/portraits/men/32.jpg", 
      telefono: "1234567891011", 
      hacedomicilio: true, 
      email: "emailfalso@gmail.com", 
      finDEsuscripcion: "Tue Sep 1 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
      practicas: ["Medicina General","Odontologia","Dermatologia","Cirugia Veterinaria","Cardiologia","Perros","Gatos","Loros"] 
    },

  { 
    id: 2, 
    nombre: "Dra. María González", 
    especialidad: "Cirugía Veterinaria", 
    ubicacion: "Las Condes 5678", 
    rating: 4.9, 
    disponible: true, 
    imagen: "https://randomuser.me/api/portraits/women/44.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: true, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 1 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Cirugia Veterinaria","Cardiologia","Medicina General","Odontologia","Dermatologia","Perros","Gatos","Loros"] 
  },

  { 
    id: 3, 
    nombre: "Dr. Carlos López", 
    especialidad: "Odontología", 
    ubicacion: "Providencia 9101", 
    rating: 4.6, 
    disponible: false, 
    imagen: "https://randomuser.me/api/portraits/men/64.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 21 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Odontologia","Dermatologia","Cirugia Veterinaria","Cardiologia","Medicina General","Perros","Gatos","Loros"] 
  },

  { 
    id: 4, 
    nombre: "Dra. Ana Martínez", 
    especialidad: "Medicina General", 
    ubicacion: "Ñuñoa 1121", 
    rating: 4.7, 
    disponible: true, 
    imagen: "https://randomuser.me/api/portraits/women/68.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 13 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Medicina General","Odontologia","Dermatologia","Cirugia Veterinaria","Cardiologia","Perros","Gatos","Loros"] 
  },

  { 
    id: 5, 
    nombre: "Dr. Roberto Sánchez", 
    especialidad: "Dermatología", 
    ubicacion: "Vitacura 3141", 
    rating: 4.9, 
    disponible: true, 
    imagen: "https://randomuser.me/api/portraits/men/85.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue May 12 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Dermatologia","Medicina General","Odontologia","Cirugia Veterinaria","Cardiologia","Perros","Gatos","Loros"] 
  },

  { 
    id: 6, 
    nombre: "Dra. Laura Torres", 
    especialidad: "Cardiología", 
    ubicacion: "Gascon 5161", 
    rating: 4.8, 
    disponible: false, 
    imagen: "https://randomuser.me/api/portraits/women/12.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 21 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Cardiologia","Medicina General","Odontologia","Dermatologia","Cirugia Veterinaria","Perros","Gatos","Loros"] 
  },
    { 
      id: 7, 
      nombre: "Dr. Juan Pérez", 
      especialidad: "Medicina General", 
      ubicacion: "Santiago del Estero 1234", 
      rating: 4.8, 
      disponible: true, 
      imagen: "https://randomuser.me/api/portraits/men/32.jpg", 
      telefono: "1234567891011", 
      hacedomicilio: true, 
      email: "emailfalso@gmail.com", 
      finDEsuscripcion: "Tue Jul 16 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
      practicas: ["Medicina General","Odontologia","Dermatologia","Cirugia Veterinaria","Cardiologia","Perros","Gatos","Loros"] 
    },

  { 
    id: 8, 
    nombre: "Dra. María González", 
    especialidad: "Cirugía Veterinaria", 
    ubicacion: "Las Condes 5678", 
    rating: 4.9, 
    disponible: true, 
    imagen: "https://randomuser.me/api/portraits/women/44.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: true, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 16 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Cirugia Veterinaria","Cardiologia","Medicina General","Odontologia","Dermatologia","Perros","Gatos","Loros"] 
  },

  { 
    id: 9, 
    nombre: "Dr. Carlos López", 
    especialidad: "Odontología", 
    ubicacion: "Providencia 9101", 
    rating: 4.6, 
    disponible: false, 
    imagen: "https://randomuser.me/api/portraits/men/64.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 16 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Odontologia","Dermatologia","Cirugia Veterinaria","Cardiologia","Medicina General","Perros","Gatos","Loros"] 
  },

  { 
    id: 10, 
    nombre: "Dra. Ana Martínez", 
    especialidad: "Medicina General", 
    ubicacion: "Ñuñoa 1121", 
    rating: 4.7, 
    disponible: true, 
    imagen: "https://randomuser.me/api/portraits/women/68.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 16 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Medicina General","Odontologia","Dermatologia","Cirugia Veterinaria","Cardiologia","Perros","Gatos","Loros"] 
  },

  { 
    id: 11, 
    nombre: "Dr. Roberto Sánchez", 
    especialidad: "Dermatología", 
    ubicacion: "Vitacura 3141", 
    rating: 4.9, 
    disponible: true, 
    imagen: "https://randomuser.me/api/portraits/men/85.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 16 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Dermatologia","Medicina General","Odontologia","Cirugia Veterinaria","Cardiologia","Perros","Gatos","Loros"] 
  },

  { 
    id: 12, 
    nombre: "Dra. Laura Torres", 
    especialidad: "Cardiología", 
    ubicacion: "Gascon 5161", 
    rating: 4.8, 
    disponible: false, 
    imagen: "https://randomuser.me/api/portraits/women/12.jpg", 
    telefono: "1234567891011", 
    hacedomicilio: false, 
    email: "emailfalso@gmail.com", 
    finDEsuscripcion: "Tue Jul 16 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    practicas: ["Cardiologia","Medicina General","Odontologia","Dermatologia","Cirugia Veterinaria","Perros","Gatos","Loros"] 
  },

]; */
/**################################################# */
/**################################################# */
/**################################################# */
/**################################################# */

/* export const fakeEstablishments: Establishment[] = [
  { 
    id: 1,
    nombre: "El club de las mascotas",
    especialidades: ["Medicina General"],
    ubicacion: "Santiago del Estero 1234",
    disponible: true,
    imagen: "img/elclub.jpg",
    telefono:["22343868291"],
    email: "emailfalsogmail.com",
    latitud: 12,
    longitud: 123456789,
    profesionalesVinculados: ["Juan Perez","Sebastian Stan","Idris Elba"],
    horario: "Lunes a Viernes de 10 a 17, Sabados de 10 a 13",
    tienelaboratorio: false,
    tienepetshop: true,
    tienepeluqueria: false,
    tienequirofano: false,
    finDEsuscripcion: "",
    serviciosNOfiltrables: [
    ]
    //otro atributo
 },
  { 
    id: 100,
    nombre: "Animal care",
    especialidades: ["Medicina Felina"],
    ubicacion: "San Juan 2684",
    disponible: true,
    imagen: "img/elclub.jpg",
    telefono:["2234386829"],
    email: "emailfalsogmail.com",
    latitud: -37.999198,
    longitud: -57.569344,
    profesionalesVinculados: ["Ana Paula Carou"],
    horario: "07 a 18",
    tienelaboratorio: true,
    tienepetshop: true,
    tienepeluqueria: true,
    tienequirofano: true,
    finDEsuscripcion: "Tue Sep 1 2026 19:11:55 GMT-0300 (Argentina Standard Time)",
    serviciosNOfiltrables: [
      "Internacion",
  "Medicina Felina",
  "Clinica quirúrgica de tejidos blandos",
  "Medicina interna de pequeños animales",
  "Castracion",
  "Farmacia veterinaria"
    ]
    //otro atributo
 },
  { 
    id: 2,
    nombre: "Animales Sueltos",
    especialidades: ["Cirugía Veterinaria"],
    ubicacion: "Las Condes 5678",
    disponible: true,
    imagen: "img/animalessueltos.jpg",
    telefono:["1234567891011"],
    email: "emailfalsogmail.com",
    latitud: 123456789,
    longitud: 123456789,
   
   profesionalesVinculados: ["Juan Perez","Sebastian Stan","Idris Elba"],
   horario: "07 a 18",
   tienequirofano: true,
   tienelaboratorio: true,
   tieneinternacion: true,
   finDEsuscripcion: "", 
   serviciosNOfiltrables: [
  "Laboratorio de análisis clinicos",
  "Diagnóstico por imágenes ( rx y ecografía)",
  "Banco de Sangre y medicina transfusional",
  "Farmacia veterinaria"
    ]
   //otro atributo
     },
  { 
    id: 3,
    nombre: "All Pets",
    especialidades: ["Odontología"],
    ubicacion: "Providencia 9101",
    disponible: true,
    imagen: "img/allpets.png",
    telefono:["1234567891011"],
    email: "emailfalsogmail.com",
    latitud: 123456789,
    longitud: 123456789,
   
   profesionalesVinculados: ["Juan Perez","Sebastian Stan","Idris Elba"],
   horario: "07 a 18",
   tienepetshop: true,
   finDEsuscripcion: "", 
   serviciosNOfiltrables: [
      "Jugueteria canina",
      "Farmacia veterinaria"
    ]
   //otro atributo
     },
  { 
    id: 4,
    nombre: "Kidogo",
    especialidades: ["Medicina General"],
    ubicacion: "Ñuñoa 1121",
    disponible: true,
    imagen: "img/kidogo.jpg",
    telefono:["1234567891011"],
    email: "emailfalsogmail.com",
    latitud: 123456789,
    longitud: 123456789,
   
   profesionalesVinculados: ["Juan Perez","Sebastian Stan","Idris Elba"],
   horario: "07 a 18",
   tienepeluqueria: true,
   tienepetshop: true,
   finDEsuscripcion: "", 
   serviciosNOfiltrables: [
    "Clínica médica",
    "Medicina felina",
    "Farmacia veterinaria"
      ]
   //otro atributo
     },
  { 
    id: 5,
    nombre: "Maule Sur",
    especialidades: ["Dermatología"],
    ubicacion: "Vitacura 3141",
    disponible: true,
    imagen: "img/maulesur.png",
    telefono:["1234567891011"],
    email: "emailfalsogmail.com",
    latitud: 123456789,
    longitud: 123456789,
   
   profesionalesVinculados: ["Juan Perez","Sebastian Stan","Idris Elba"],
   horario: "07 a 18",
   tienelaboratorio: true,
   tienepetshop: true,
   finDEsuscripcion: "", 
   serviciosNOfiltrables: [
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
   //otro atributo
     },
  { 
    id: 6,
    nombre: "Vet-Can",
    especialidades: ["Cardiología"],
    ubicacion: "Gascon 5161",
    disponible: false,
    imagen: "img/vetcan.png",
    telefono:["1234567891011"],
    email: "emailfalsogmail.com",
    latitud: 123456789,
    longitud: 123456789,
    profesionalesVinculados: ["John Wick", "Cindy Campbell", "Pedro Pascal"], 
    horario: "07 a 18",
    haceurgencias: true,
    tienelaboratorio: true,
    finDEsuscripcion: "",
    serviciosNOfiltrables: [
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
    //otro atributo
    },
    
]; */
/**################################################# */
/**################################################# */
/**################################################# */
/**################################################# */
/* export const fakeMissingPosts: MissingPost[] = [
  {
    
    id: 1,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIeQg4joKUmXRR18S2P-oy6DSzeowr7AyLZ71BiFra78R9WB_YeP8M6JV&s=10",
    contact: "https://www.instagram.com/p/DY1QAHqkroU/?utm_source=ig_web_button_share_sheet",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum y todo lo demas que no me acuerdo porque esta escrito en latin",
    tipo: 0

  },
  {
    
    id: 2,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIeQg4joKUmXRR18S2P-oy6DSzeowr7AyLZ71BiFra78R9WB_YeP8M6JV&s=10",
    contact: "https://www.instagram.com/p/DY1QAHqkroU/?utm_source=ig_web_button_share_sheet",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum y todo lo demas que no me acuerdo porque esta escrito en latin",
    tipo: 0

  },
  {
    
    id: 3,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIeQg4joKUmXRR18S2P-oy6DSzeowr7AyLZ71BiFra78R9WB_YeP8M6JV&s=10",
    contact: "https://www.instagram.com/p/DY1QAHqkroU/?utm_source=ig_web_button_share_sheet",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum y todo lo demas que no me acuerdo porque esta escrito en latin",
    tipo: 0

  },
  {
    
    id: 4,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIeQg4joKUmXRR18S2P-oy6DSzeowr7AyLZ71BiFra78R9WB_YeP8M6JV&s=10",
    contact: "https://www.instagram.com/p/DY1QAHqkroU/?utm_source=ig_web_button_share_sheet",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum y todo lo demas que no me acuerdo porque esta escrito en latin",
    tipo: 0

  },
  {
    
    id: 5,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIeQg4joKUmXRR18S2P-oy6DSzeowr7AyLZ71BiFra78R9WB_YeP8M6JV&s=10",
    contact: "https://www.instagram.com/p/DY1QAHqkroU/?utm_source=ig_web_button_share_sheet",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum y todo lo demas que no me acuerdo porque esta escrito en latin",
    tipo: 0

  },
  {
    
    id: 6,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIeQg4joKUmXRR18S2P-oy6DSzeowr7AyLZ71BiFra78R9WB_YeP8M6JV&s=10",
    contact: "https://www.instagram.com/p/DY1QAHqkroU/?utm_source=ig_web_button_share_sheet",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum y todo lo demas que no me acuerdo porque esta escrito en latin",
    tipo: 0

  },
] */
/**################################################# */
/**################################################# */
/**################################################# */
/**################################################# */
/* export const fackeBlogs :Blog[] = [
    {
    id: 1,
    idOwner: 1,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 12,
    idOwner: 12,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 13,
    idOwner: 13,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 14,
    idOwner: 14,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 15,
    idOwner: 15,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 16,
    idOwner: 16,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 17,
    idOwner: 17,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     },
    {
    id: 18,
    idOwner: 18,
    title: "string",
    description: "string",
    documentUrl: "string",
    imageUrl: "string",
    videoUrl: "string",
    state: "able"
     }
] */

/**################################################# */
/**################################################# */
/**################################################# */
/**################################################# */
/* export const citasIniciales: Event[] = [
  { id: 10, titulo: "Quirofano Movil", fecha: "2026-07-20", hora: "8:00", tipo: "castracion", responsable: "Salud MGP",ubicacion: "Sede Zoonosis y Bienestar animal - Canesa y Guanahani", contacto: "@saludmgp" },
  { id: 11, titulo: "Quirofano Movil", fecha: "2026-07-21", hora: "8:00", tipo: "castracion", responsable: "Salud MGP",ubicacion: "Sede Zoonosis y Bienestar animal - Canesa y Guanahani", contacto: "@saludmgp" },
  { id: 12, titulo: "Quirofano Movil", fecha: "2026-07-22", hora: "8:00", tipo: "castracion", responsable: "Salud MGP",ubicacion: "Sede Zoonosis y Bienestar animal - Canesa y Guanahani", contacto: "@saludmgp" },
  { id: 13, titulo: "Quirofano Movil", fecha: "2026-07-23", hora: "8:00", tipo: "castracion", responsable: "Salud MGP",ubicacion: "Sede Zoonosis y Bienestar animal - Canesa y Guanahani", contacto: "@saludmgp" },
  { id: 14, titulo: "Quirofano Movil", fecha: "2026-07-24", hora: "8:00", tipo: "castracion", responsable: "Salud MGP",ubicacion: "Sede Zoonosis y Bienestar animal - Canesa y Guanahani", contacto: "@saludmgp" },
  { id: 1, titulo: "Vacunacion Antirrabica", fecha: "2026-07-23", hora: "10:00", tipo: "consulta", responsable: "Dr. Juan Pérez",contacto: "", ubicacion: "" },
  { id: 1, titulo: "Revisión General", fecha: "2026-01-15", hora: "10:00", tipo: "consulta", responsable: "Dr. Juan Pérez",contacto: "", ubicacion: "" },
  { id: 1, titulo: "Revisión General", fecha: "2026-01-15", hora: "10:00", tipo: "consulta", responsable: "Dr. Juan Pérez",contacto: "", ubicacion: "" },
  { id: 2, titulo: "Vacuna Antirrábica", fecha: "2026-02-15", hora: "11:30", tipo: "vacuna", responsable: "Dra. María González",contacto: "", ubicacion: "" },
  { id: 3, titulo: "Limpieza Dental", fecha: "2026-03-20", hora: "14:00", tipo: "cirujia", responsable: "Dr. Carlos López",contacto: "", ubicacion: "" },
  { id: 4, titulo: "Chequeo Mensual", fecha: "2026-04-25", hora: "09:00", tipo: "consulta", responsable: "Dr. Roberto Sánchez",contacto: "", ubicacion: "" },
]; */