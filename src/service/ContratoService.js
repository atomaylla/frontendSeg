import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class ContratoService {




    getContrato() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('tipo/4/contrato/list',configToken).then(res => res.data).catch(error => "error");
    }
    postContrato(data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('tipo/4/contrato/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    putContrato(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/4/contrato/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deleteContrato(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/4/contrato/updateDelete/'+ id,'',configToken).then(res => res.data).catch( error => "error");
    }
}
