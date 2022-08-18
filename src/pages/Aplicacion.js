import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {InputSwitch} from "primereact/inputswitch";
import {AplicacionService} from "../service/AplicacionService";
import {Checkbox} from "primereact/checkbox";
import {UsuarioService} from "../service/UsuarioService";





const Aplicacion = () => {
    let emptyStateMenuRol = {
        MasterChecked: false,
        ListMenuRol: usuarios,
        SelectedList: [],
    };
    let emptyAplicacion = {
        nombre: '',
        descripcion: '',
        version: '',
        uri: '',
        id_estado: true
    };
    const [stateMenuRol,setStateMenuRol] = useState(emptyStateMenuRol);
    const [aplicaciones, setAplicaciones] = useState(null);
    const [usuarios, setUsuarios] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [usuarioAplicacions, setUsuarioAplicacions] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [aplicacion, setAplicacion] = useState(emptyAplicacion);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [id_aplicacion, setId_aplicacion] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:0});
    const useDeleteAplicacion = useState(null);

    const [count,setCount] = useState(0);

    const aplicacionService = new AplicacionService();
    const usuarioService = new UsuarioService();
    const openNew = () => {
        setAplicacion(emptyAplicacion);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const hideUsuarioDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const deleteUsuario = () => {
        const _usuarios = [];
        // console.log(stateMenuRol.ListMenuRol);
        let tempList = stateMenuRol.ListMenuRol;
        tempList.map((user) => {
            //  console.log(user);
            if (user.id_estado === "1") {
                _usuarios.push({ "id_usuario" : user.id_usuario, "id_aplicacion": id_aplicacion});
                //  console.log(user);
            }

            //return user;
        });

         console.log(_usuarios);
        usuarioService.deleteUsuarioAplicacion(_usuarios).then(data => setUsuarioAplicacions(data));




    }

    const saveUsuario = () => {
        const _usuarios = [];
        // console.log(stateMenuRol.ListMenuRol);
        let tempList = stateMenuRol.ListMenuRol;
        tempList.map((user) => {
            //  console.log(user);
            if (user.id_estado === "1") {
                _usuarios.push({ "id_usuario" : user.id_usuario, "id_aplicacion": id_aplicacion});
                //  console.log(user);
            }

            //return user;
        });

        // console.log(_menuRols);
        usuarioService.postUsuarioAplicacion(_usuarios).then(data => setUsuarioAplicacions(data));
        setUsuarioDialog(false);
        // let _menuRols = { ...menuRols };
    /*    const _usuarios = [];

        let _usuario = { ...usuario };

        for (var i = 0; i < selectedProducts.length; i++){

            var obj = selectedProducts[i];
            for (var key in obj){
                var value = obj[key];

                if(key === "id_menu"){
                    _usuarios.push({ "id_menu" : value, "id_rol": id_rol});
                }

            }


        }

        console.log(_menuRols);*/
      /*  menuService.postMenuRol(_menuRols).then(data => setMenuRols(data));*/
        setUsuarioDialog(false);
        //  setProductDialog(false);
    }
    const saveProduct = async() => {

        setSubmitted(true);

        if (aplicacion.nombre.trim()) {

            let _aplicaciones = [...aplicaciones];
            let _aplicacion = { ...aplicacion };
            if (aplicacion.id_aplicacion) {

                const index = findIndexById(aplicacion.id_aplicacion);

                //_aplicaciones[index] = _aplicacion;
                aplicacionService.putAplicacion(aplicacion.id_aplicacion,_aplicacion).then(data => {
                    setAplicacion(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicación Actualizado', life: 3000 });
            }
            else {

                _aplicacion.nombre = aplicacion.nombre;
                _aplicacion.descripcion = aplicacion.descripcion;
                _aplicacion.version = aplicacion.version;
                _aplicacion.uri = aplicacion.uri;
                _aplicacion.id_estado = 1;
                try {
                 aplicacionService.postAplicacion(_aplicacion).then(data => {
                     setAplicacion(data)
                     setCount(count + 1)
                 });
            }
        catch(err) {
                console.log(err);
            }
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicación Creada', life: 3000 });
            }

           //   setUpdateList(updateList);
            setProductDialog(false);
            setAplicacion(emptyAplicacion);
        }
    }

    const editProduct = (aplicacion) => {
        //setProduct({ ...product });

        setAplicacion({ ...aplicacion });
        setProductDialog(true);
    }
    const editUsuario = (aplicacion) => {
        //setProduct({ ...product });
        setAplicacion({ ...aplicacion });
        setId_aplicacion(aplicacion.id_aplicacion);
      //  const objMenuRol = [{"rol": rol.id_rol, "aplicacion":id_aplicacion}];
        aplicacionService.getAplicacionUsuarios(aplicacion.id_aplicacion).then(data => {
            setUsuarios(data);
            setStateMenuRol({
                ListMenuRol: data,
            });

        });
        setUsuarioDialog(true);
    }
    const confirmDeleteProduct = (aplicacion) => {
        setAplicacion(aplicacion);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
       // let _usuarios = aplicaciones.filter(val => val.id_aplicacion !== aplicacion.id_aplicacion);
        //setAplicaciones(_usuarios);



        aplicacionService.deleteAplicacion(aplicacion.id_aplicacion).then(response => setCount(count + 1));
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicación Eliminada', life: 3000 });
        setDeleteProductDialog(false);
        setAplicacion(emptyAplicacion);
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < aplicaciones.length; i++) {
            if (aplicaciones[i].id_aplicacion === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _usuarios = aplicaciones.filter(val => !selectedProducts.includes(val));
        setAplicaciones(_usuarios);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _usuario = { ...aplicacion };
        _usuario['category'] = e.value;
        //   setProduct(_product);
        setAplicacion(_usuario);
    }
    const onEstadoChange = (e) =>{

        setState(e.value)
        let _aplicacion = { ...aplicacion };
        _aplicacion[`${'id_estado'}`] = e.value;

        setAplicacion(_aplicacion);
        console.log(_aplicacion);
    }
    const onMasterCheck =(e) =>{
        console.log(stateMenuRol);
        let tempList = stateMenuRol.ListMenuRol;

        // Check/ UnCheck All Items
        tempList.map((user) => (user.id_estado = e.target.checked==true?1:0));

        setStateMenuRol({
            MasterChecked: e.target.checked,
            ListMenuRol: tempList,
            SelectedList: stateMenuRol.ListMenuRol.filter((e) => e.selected),
        });
    }
    const onItemCheck=(e, item)=> {
        console.log(e.target.checked);
        let tempList = stateMenuRol.ListMenuRol;
        tempList.map((user) => {
            if (user.id_usuario === item.id_usuario) {
                user.id_estado = e.target.checked==true?'1':'0';
                //  console.log(item);
            }

            //return user;
        });
        const totalItems = stateMenuRol.ListMenuRol.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        // Update State
        setStateMenuRol({
            MasterChecked: totalItems === totalCheckedItems,
            ListMenuRol: tempList,
            SelectedList: stateMenuRol.ListMenuRol.filter((e) => e.selected),
        });

    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...aplicacion };
        _usuario[`${name}`] = val;

        setAplicacion(_usuario);
        console.log(_usuario);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _usuario = { ...aplicacion };
        _usuario[`${name}`] = val;

        setAplicacion(_usuario);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-danger mr-2" onClick={openNew} />

                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }


    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id_aplicacion}
            </>
        );
    }
    const usuarioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.usuario}
            </>
        );
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.nombre}
            </>
        );
    }
    const versionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Version</span>
                {rowData.version}
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge`}>{(rowData.id_estado == 1)?"Activo":"Inactivo"}</span>
            </>
        )
    }
    const actionUsuarioTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-align-justify" className="p-button-rounded p-button-success mr-2" onClick={() => editUsuario(rowData)} />

            </div>
        );
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-danger mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Aplicación</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => {
                    console.log(e.target.value);
                    setGlobalFilter(e.target.value)
                }} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const usuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Eliminar" icon="pi pi-times" className="p-button-text" onClick={deleteUsuario} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveUsuario} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );
    const [updateList, setUpdateList] = useState(false);

    const getData = async() =>{

        const response = aplicacionService.getAplicacion();
        return response;
    }
    const isSelected =(item) =>{
        return item.id_estado ==1?true:false;
    }
    useEffect(async() => {
        console.log("ingreso list");
       getData().then(data => setAplicaciones(data));

    }, [count]);

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={aplicaciones} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id_aplicacion" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column field="Nombre" header="Nombre" filterField="nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>

                        <Column field="Nombre" header="Versión" sortable body={versionBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>

                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column header="Usuario" body={actionUsuarioTemplate}></Column>
                        <Column header="Acciones" body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Aplicación" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={aplicacion.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !aplicacion.nombre })} />
                            {submitted && !aplicacion.nombre && <small className="p-invalid">Ingresar Nombre</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="descripcion" value={aplicacion.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Versión</label>
                            <InputText id="name" value={aplicacion.version} onChange={(e) => onInputChange(e, 'version')} required autoFocus className={classNames({ 'p-invalid': submitted && !aplicacion.nombre })} />
                            {submitted && !aplicacion.version && <small className="p-invalid">Ingresar Versión</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">URI</label>
                            <InputText id="name" value={aplicacion.uri} onChange={(e) => onInputChange(e, 'uri')} required autoFocus className={classNames({ 'p-invalid': submitted && !aplicacion.nombre })} />
                            {submitted && !aplicacion.nombre && <small className="p-invalid">Ingresar Uri</small>}
                        </div>

                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={(aplicacion.id_estado == 1)?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {aplicacion && <span> Deseas  eliminar la aplicación  <b>{aplicacion.nombre}</b>?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={usuarioDialog} style={{ width: '650px' }} header="Usuarios" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideUsuarioDialog}>
                        <div className="formgrid grid">


                            <DataTable ref={dt} value={usuarios} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                       dataKey="id_menu" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                       globalFilter={globalFilter} emptyMessage="No products found." responsiveLayout="scroll">

                                <Column
                                    sortable={false}
                                    header={
                                        <Checkbox
                                            checked={stateMenuRol.MasterChecked}
                                            onChange={(e) => onMasterCheck(e)}
                                        />
                                    }
                                    body={ (rowData, column) => (
                                        <Checkbox name={rowData.id_estado} onChange={(e) => onItemCheck(e, rowData)} checked={isSelected(rowData)} />

                                    ) }
                                    style={{width: '10%'}}
                                />
                                <Column field="name" header="Nombres" sortable body={usuarioBodyTemplate} headerStyle={{ width: '50%', minWidth: '10rem' }}></Column>

                            </DataTable>

                        </div>

                    </Dialog>

                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Aplicacion, comparisonFn);
