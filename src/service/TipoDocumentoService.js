import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class TipoDocumentoService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getTipoDocumento() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('documentoTipo/list',configToken).then(res => res.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}
