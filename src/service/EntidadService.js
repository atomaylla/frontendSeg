import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class EntidadService {



    getEntidad(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('gobiernoNivel/'+ id +'/entidad/list',configToken).then(res => res.data).catch( error => "error");
    }
    postEntidad(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('gobiernoNivel/'+ id +'/entidad/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    putEntidad(id,id_entidad,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('gobiernoNivel/'+ id+'/entidad/update/'+ id_entidad, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deleteEntidad(id,id_entidad) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('gobiernoNivel/'+ id+'/entidad/updateDelete/'+ id_entidad,'',configToken).then(res => res.data).catch( error => "error");
    }

}
