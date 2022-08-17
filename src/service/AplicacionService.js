import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class AplicacionService {

    getAplicacionUsuarios(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('usuarioAplicacion/obtenerUsuarioAplicacionDetalle/aplicacion/'+id,configToken).then(res => res.data);
    }

    getAplicacion() {
        return axiosPrivate.get('aplicacion/list').then(res => res.data);
    }
    postAplicacion(data){
          const token = JSON.parse(sessionStorage.getItem('token'));
          const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
          return  axiosPrivate.post('aplicacion/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
          });
    }
    putAplicacion(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('aplicacion/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteAplicacion(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('aplicacion/delete/'+ id,configToken).then(res => res.data).catch(error => {
        });
    }
}
