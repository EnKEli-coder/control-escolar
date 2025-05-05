import axiosInstance from "../AxiosInstance"

export const getAlumnos = async (busqueda?: string, page?: number) => {

    let querySearch = ""
    let count = 1

    if(busqueda){
        querySearch += "?Search="+busqueda
        count++
    }

    if(page){
        querySearch = count > 1 ? querySearch+"&" : "?"
        querySearch += "Page=" +page+"&PageSize=10"
    }

    const response = await axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/alumnos${querySearch}`)

    return response.data
}


export const getAlumnoById = async (id: number) => {
    const response = await axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/alumnos/${id}`)

    return response.data
}


export const createAlumno = async (alumno : AlumnoCreate) => {

    const response = await axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API_URL}/alumnos`, alumno)
    
    return response.data
}

export const updateAlumno = async (alumno : AlumnoUpdate) => {

    const response = await axiosInstance
        .put(`${process.env.NEXT_PUBLIC_API_URL}/alumnos`, alumno)
    
    return response.data
}


export const deleteAlumno = async (id : number) =>{
    const response = await axiosInstance
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/alumnos/${id}`)

    return response.data
}