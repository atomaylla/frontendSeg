import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";

export class GobiernoNivelService {



    getGobiernoNivel(id) {
        return axiosPrivate.get('gobierno/'+ id +'/gobiernoNivel/list').then(res => res.data);
    }
    postGobiernoNivel(id,data){

        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('gobierno/'+ id +'/gobiernoNivel/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    putAplicacion(id,idGobiernoNivel,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('gobierno/'+ id +'/gobiernoNivel/update/'+ idGobiernoNivel, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteAplicacion(id, idGobiernoNivel) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('gobierno/'+ id +'/gobiernoNivel/updateDelete/'+ idGobiernoNivel,'',configToken).then(res => res.data).catch(error => {
        });
    }
}
