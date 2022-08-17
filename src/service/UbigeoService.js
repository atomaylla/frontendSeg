import axios from 'axios';
import AxiosConfiguration from "../components/AxiosConfiguration";
import {axiosPrivate} from "../api/axios";
//, configToken
/*import useAxiosPrivate from "../hooks/useAxiosPrivate";*/
export class UbigeoService {



    getUbigeo() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('tipo/3/ubigeo/list',configToken).then(res => res.data);

    }

}
