import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class MenuService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getMenus(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('aplicacion/'+ id +'/menu/0',configToken).then(res => res.data);
    }
    postMenu(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return  axiosPrivate.post('aplicacion/'+ id +'/menu/create', JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });

    }
    getSubMenus(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
    //    console.log("id:"+ id);
        return axiosPrivate.get('submenu/listId/'+id,configToken).then(res => res.data);
    }
    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
    putMenu(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('menu/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch(error => {
        });
    }
    deleteMenu(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('menu/delete/'+ id,configToken).then(res => res.data).catch(error => {
        });
    }

}
