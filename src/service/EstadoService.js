import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class EstadoService {



    getEstado() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('estado/list/',configToken).then(res => res.data);
    }
    postEstado(data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('estado/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    putEstado(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('estado/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteEstado(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('estado/updateDelete/'+ id,'',configToken).then(res => res.data).catch(error => {
        });
    }

}
