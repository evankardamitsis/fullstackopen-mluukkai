import axios from "axios";

const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request;
    return response.data;
}

const create = async personObject => {
    const request = axios.post(baseUrl, personObject)
    const response = await request;
    return response.data;
}

const update = async (id, personObject  ) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    const response = await request;
    return response.data;
}

const deletePersons = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request;
    return response.data;
}

const exportObject =  { getAll, create, update, deletePersons }

export default exportObject