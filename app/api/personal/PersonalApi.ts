import axiosInstance from "../AxiosInstance"

export const getPersonal = async (busqueda?: string, page?: number) => {

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
        .get(`${process.env.NEXT_PUBLIC_API_URL}/personal${querySearch}`)

    return response.data
}


export const getPersonalById = async (id: number) => {
    const response = await axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/personal/${id}`)

    return response.data
}


export const createPersonal = async (alumno : PersonalCreate) => {

    const response = await axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API_URL}/personal`, alumno)
    
    return response.data
}

export const updatePersonal = async (alumno : PersonalUpdate) => {

    const response = await axiosInstance
        .put(`${process.env.NEXT_PUBLIC_API_URL}/personal`, alumno)
    
    return response.data
}


export const deletePersonal = async (id : number) =>{
    const response = await axiosInstance
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/personal/${id}`)

    return response.data
}