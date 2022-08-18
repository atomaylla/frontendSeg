import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class PersonaService {



    getPersonas() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('documento/9/persona/list',configToken).then(res => res.data);
    }
    getTipoCaracteristicas(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('tipo/'+id+'/contrato/list',configToken).then(res => res.data);
    }

    postPersona(idTipoDoc,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('documento/'+idTipoDoc+'/persona/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    putPersona(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('persona/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deletePersona(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('persona/delete/'+ id,configToken).then(res => res.data).catch(error => {
        });
    }

}
