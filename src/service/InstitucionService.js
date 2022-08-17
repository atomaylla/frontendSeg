import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class InstitucionService {



    getInstitucion() {
        return axiosPrivate.get('institucion/list').then(res => res.data);
    }
    postInstitucion(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('institucion/tipo/6/ue/'+id+'/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    putInstitucion(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('nstitucion/id/'+id+'/tipo/6/update', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteInstitucion(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('institucion/id/'+id+'/tipo/6/updateDelete','',configToken).then(res => res.data).catch(error => {
        });
    }
}
