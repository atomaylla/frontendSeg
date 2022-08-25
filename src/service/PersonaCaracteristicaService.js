import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class PersonaCaracteristicaService {




    getPersonaCaracteristica() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('personaCaracteristica/list',configToken).then(res => res.data).catch( error => "error");
    }
    postPersonaCaracteristica(idper,idtipo,idcar,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('personaCaracteristica/pddersona/'+idper+'/tipo/'+idtipo+'/caracteristica/'+idcar+'/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    putPersonaCaracteristica(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('tipo/4/contrato/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deletePersonaCaracteristica(idper,idtipo,idcar) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('personaCaracteristica/persona/'+idper+'/tipo/'+idtipo+'/caracteristica/'+idcar+'/delete/',configToken).then(res => res.data).catch( error => "error");
    }
}
