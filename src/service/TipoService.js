import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class TipoService {



    getTipo() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('tipo/list',configToken).then(res => res.data);
    }
    postTipo(data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('tipo/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    putTipo(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteTipo(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/updateDelete/'+ id,'',configToken).then(res => res.data).catch(error => {
        });
    }

}
