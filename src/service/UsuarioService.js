import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class UsuarioService {



    getUsuarios() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('usuario/list',configToken).then(res => res.data).catch( error => "error");
    }
    postUsuario(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.post('persona/'+ id +'/usuario/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    putUsuario(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('usuario/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    postUsuarioAplicacion(data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return  axiosPrivate.post('usuarioAplicacion/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");

    }
    deleteUsuarioAplicacion(data) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('usuarioAplicacion/delete', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deleteUsuario(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('usuario/delete/'+ id,configToken).then(res => res.data).catch( error => "error");
    }

}
