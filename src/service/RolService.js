import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class RolService {

    putRol(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('rol/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }

    getRols(id) {
       const token = JSON.parse(sessionStorage.getItem('token'));


          const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
         console.log("token dddd");
         console.log(configToken);
        // return axios.get('assets/demo/data/rols.json').then(res => res.data.data);*/
        return axiosPrivate.get('aplicacion/'+ id +'/rol/list',configToken).then(res => res.data);
    }

    postRol(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('aplicacion/'+ id +'/rol/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteRol(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('rol/delete/'+ id,configToken).then(res => res.data).catch(error => {
        });
    }
}
