import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class GobiernoService {



    getGobierno() {
        return axiosPrivate.get('gobierno/list').then(res => res.data).catch( error => "error");
    }
    postGobierno(data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('gobierno/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    putGobierno(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('gobierno/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deleteGobierno(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('gobierno/updateDelete/'+ id,'',configToken).then(res => res.data).catch( error => "error");
    }
}
