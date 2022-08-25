import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class UnidadEjecutoraService {



    getUnidadEjecutora(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('entidad/'+ id +'/unidadEjecutora/list',configToken).then(res => res.data).catch( error => "error");

    }
    postUnidadEjecutora(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('entidad/'+ id +'/unidadEjecutora/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    putUnidadEjecutora(id,id_unidad_ejecutora,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('entidad/'+ id +'/unidadEjecutora/update/'+ id_unidad_ejecutora, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deleteUnidadEjecutora(id,id_unidad_ejecutora) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('entidad/'+ id +'/unidadEjecutora/updateDelete/'+ id_unidad_ejecutora,'',configToken).then(res => res.data).catch( error => "error");
    }
}
