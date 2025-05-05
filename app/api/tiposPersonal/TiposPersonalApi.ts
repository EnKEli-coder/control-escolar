import axiosInstance from "../AxiosInstance"

export const getTiposPersonal = async (busqueda?: string, page?: number) => {

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
        .get(`${process.env.NEXT_PUBLIC_API_URL}/tipos-personal${querySearch}`)

    return response.data
}


export const getTipoPersonalById = async (id: number) => {
    const response = await axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/tipos-personal/item/${id}`)

    return response.data
}

export const getAllTiposPersonal = async () => {
    const response = await axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/tipos-personal/all`)

    return response.data
}


export const createTipoPersonal = async (tipoPersonal : TipoPersonalCreate) => {

    const response = await axiosInstance
        .post(`${process.env.NEXT_PUBLIC_API_URL}/tipos-personal`, tipoPersonal)
    
    return response.data
}

export const updateTipoPersonal = async (tipoPersonal : TipoPersonalUpdate) => {

    const response = await axiosInstance
        .put(`${process.env.NEXT_PUBLIC_API_URL}/tipos-personal`, tipoPersonal)
    
    return response.data
}


export const deleteTipoPersonal = async (id : number) =>{
    const response = await axiosInstance
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/tipos-personal/${id}`)

    return response.data
}