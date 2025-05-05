
type Alumno = {
    id: number
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    fechaNacimiento: string
    numeroControl: string
    estatus: boolean
}

type AlumnoResponse = {
    id: number
    nombre: string
    correo: string
    numeroControl: string
}

type AlumnoCreate = {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    fechaNacimiento: string
    estatus: boolean
}

type AlumnoUpdate = {
    id: number
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    fechaNacimiento: string
    estatus: boolean
}

type Personal = {
    id: number
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    fechaNacimiento: string
    numeroControl: string
    estatus: boolean
    sueldo: number, 
    tipoPersonalId: number
}

type PersonalResponse = {
    id: number
    nombre: string
    correo: string
    numeroControl: string
    sueldo: number, 
    tipoPersonalId: number
    tipoPersonal: string,
}

type PersonalCreate = {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    fechaNacimiento: string
    estatus: boolean
    sueldo: number, 
    tipoPersonalId: number
}

type PersonalUpdateData = {
    personal?: Personal
    tiposPersonal?: TipoPersonal[]
}

type PersonalUpdate = {
    id: number
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    fechaNacimiento: string
    estatus: boolean
    sueldo: number, 
    tipoPersonalId: number
}


type TipoPersonal = {
    id: number
    prefijo: string
    nombre: string
    sueldoMinimo: number,
    sueldoMaximo: number,
}

type TipoPersonalCreate = {
    prefijo: string
    nombre: string
    sueldoMinimo: number,
    sueldoMaximo: number,
}

type TipoPersonalUpdate = {
    id: number
    nombre: string
    sueldoMinimo: number,
    sueldoMaximo: number,
}

type PaginatedList<T> = {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}