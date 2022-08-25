import axios from 'axios';
import {axiosPrivate} from "../api/axios";

export class MenuService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getMenus(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return axiosPrivate.get('aplicacion/'+ id +'/menu/0',configToken).then(res => res.data).catch( error => "error");
    }
    getMenusRol(id,idRol) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

      //  return axiosPrivate.get('menu/-1/rol/'+ id +'/list',configToken).then(res => res.data);
       return axiosPrivate.get('menuRol/aplicacion/'+id+'/rol/'+idRol+'/detalle',configToken).then(res => res.data);
      //  return axiosPrivate.get('obtenerMenuRolDetalle',JSON.stringify(data1),configToken ).then(res => res.data);
    }
    postMenuRol(data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return  axiosPrivate.post('menuRol/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");

    }
    postMenu(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};

        return  axiosPrivate.post('aplicacion/'+ id +'/menu/create', JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");

    }
    getSubMenus(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
    //    console.log("id:"+ id);
        return axiosPrivate.get('submenu/listId/'+id,configToken).then(res => res.data).catch( error => "error");
    }
   /* getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }*/
    putMenu(id,data){
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.put('menu/update/'+ id, JSON.stringify(data),configToken).then(res => res.data).catch( error => "error");
    }
    deleteMenu(id) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const configToken = { headers: {"Authorization" : `Bearer ${token}`}};
        return  axiosPrivate.delete('menu/delete/'+ id,configToken).then(res => res.data).catch( error => "error");
    }

}
