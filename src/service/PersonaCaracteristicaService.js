import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class PersonaCaracteristicaService {




    getPersonaCaracteristica() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('personaCaracteristica/list',configToken).then(res => res.data);
    }
    postPersonaCaracteristica(idper,idtipo,idcar,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('personaCaracteristica/persona/2/tipo/4/caracteristica/4/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    putPersonaCaracteristica(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/4/contrato/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deletePersonaCaracteristica(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/4/contrato/updateDelete/'+ id,'',configToken).then(res => res.data).catch(error => {
        });
    }
}
