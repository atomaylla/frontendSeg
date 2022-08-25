import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {InputSwitch} from "primereact/inputswitch";

import {GobiernoNivelService} from "../service/GobiernoNivelService";
import {Dropdown} from "primereact/dropdown";
import {GobiernoService} from "../service/GobiernoService";
import {EmailService} from "../service/EmailService";


const GobiernoNivel = () => {

    let emptyGobierno = {
        nombre: '',
        id_estado: true
    };
    let emptyGobiernoNivel = {
        nombre: '',
        id_estado: true
    };
    const [gobiernoNivels, setGobiernoNivels] = useState(null);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [gobierno, setGobierno] = useState(emptyGobierno);
    const [gobiernoNivel, setGobiernoNivel] = useState(emptyGobiernoNivel);
    const [id_gobierno, setId_gobierno] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:0});
    const useDeleteAplicacion = useState(null);
    const emailService = new EmailService();
    const [count,setCount] = useState(0);
    const openNew = () => {
        setGobiernoNivel(emptyGobiernoNivel);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = async() => {

        setSubmitted(true);

        if (gobiernoNivel.nombre.trim()) {

            let _aplicaciones = [...gobiernoNivels];
            let _aplicacion = { ...gobiernoNivel };
            if (gobiernoNivel.id_gobierno_nivel) {

                const index = findIndexById(gobiernoNivel.id_gobierno_nivel);


                gobiernoNivelService.putAplicacion(id_gobierno,gobiernoNivel.id_gobierno_nivel,_aplicacion).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Gobierno Nivel', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es gobierno/"+ id_gobierno +"/gobiernoNivel/update"+gobiernoNivel.id_gobierno_nivel+".Se invoco el método modificar gobierno nivel.Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Gobierno Nivel",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Gobierno Nivel Actualizado', life: 3000 });
                    }
                    setGobiernoNivel(data)
                    setCount(count + 1)
                });

            }
            else {

                _aplicacion.nombre = gobiernoNivel.nombre;

                _aplicacion.id_estado = 1;

                    gobiernoNivelService.postGobiernoNivel(id_gobierno,_aplicacion).then(data => {
                        if(data == "error"){
                            const userName = localStorage.getItem("userName");
                            toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Gobierno Nivel', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                            const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es gobierno/"+ id_gobierno +"/gobiernoNivel/create.Se invoco el método guardar gobierno nivel.Se notifico el error con el usuario "+userName;
                            emailService.getSendEmail("Módulo Gobierno Nivel",mensaje);
                        }else{
                            toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Gobierno Nivel Creado', life: 3000 });
                        }
                        setGobiernoNivel(data)
                        setCount(count + 1)
                    });

            }


            setProductDialog(false);
            setGobiernoNivel(emptyGobiernoNivel);
        }
    }

    const editProduct = (aplicacion) => {


        setGobiernoNivel({ ...aplicacion });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (aplicacion) => {
        setGobiernoNivel(aplicacion);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {

        gobiernoNivelService.deleteAplicacion(id_gobierno,gobiernoNivel.id_gobierno_nivel).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Gobierno Nivel', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es gobierno/"+ id_gobierno +"/gobiernoNivel/updateDelete/"+gobiernoNivel.id_gobierno_nivel+".Se invoco el método eliminar gobierno nivel.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Gobierno Nivel",mensaje);
            }else{
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Gobierno Nivel Eliminado', life: 3000 });
            }

            setCount(count + 1)
        });

        setDeleteProductDialog(false);
        setGobiernoNivel(emptyGobiernoNivel);
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < gobiernoNivels.length; i++) {
            if (gobiernoNivels[i].id_aplicacion === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    const aceptarGobierno= () => {


        if(id_gobierno != null) {
            gobiernoNivelService.getGobiernoNivel(id_gobierno).then(data => {
                if(data == "error"){
                    const userName = localStorage.getItem("userName");
                    toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Gobierno Nivel', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                    const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es gobierno/"+ id_gobierno +"/gobiernoNivel/list.Se invoco el método listar gobierno nivel.Se notifico el error con el usuario "+userName;
                    emailService.getSendEmail("Módulo Gobierno Nivel",mensaje);
                }else{
                    setGobiernoNivels(data)
                }


            });
            setAplicacionDialog(false);
            setGobiernoNivel(emptyGobiernoNivel);
        }else{
            setAplicacionDialog(true);
        }



    }


    const deleteSelectedProducts = () => {
        let _usuarios = gobiernoNivels.filter(val => !selectedProducts.includes(val));
        setGobiernoNivels(_usuarios);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }


    const onEstadoChange = (e) =>{

        setState(e.value)
        let _gobiernoNivel = { ...gobiernoNivel };
        _gobiernoNivel[`${'id_estado'}`] = e.value;

        setGobiernoNivel(_gobiernoNivel);
        console.log(_gobiernoNivel);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...gobiernoNivel };
        _usuario[`${name}`] = val;

        setGobiernoNivel(_usuario);
        console.log(_usuario);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _usuario = { ...gobiernoNivel };
        _usuario[`${name}`] = val;

        setGobiernoNivel(_usuario);
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
                {rowData.id_gobierno_nivel}
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


    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge`}>{(rowData.id_estado == 1)?"Activo":"Inactivo"}</span>
            </>
        )
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
            <h5 className="m-0">Gobierno Nivel</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );


    const gobiernoNivelService = new GobiernoNivelService();

    const aplicacionDialogFooter = (
        <>

            <Button label="Aceptar" icon="pi pi-check" className="p-button-text" onClick={aceptarGobierno} />
        </>
    );

    const hideDialogAplicacion = () => {

         setAplicacionDialog(false);
    }

    const onGobiernoChange = (e) =>{
        setId_gobierno(e.value);
    }
    const gobiernoService = new GobiernoService();
    useEffect(async() => {
        console.log("ingreso list");
        gobiernoService.getGobierno(id_gobierno).then(data => setGobierno(data));
    }, []);
    useEffect(async() => {
        if(id_gobierno != null)
        gobiernoNivelService.getGobiernoNivel(id_gobierno).then(data => setGobiernoNivels(data));
    }, [count]);
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={gobiernoNivels} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id_aplicacion" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column field="Nombre" header="Nombre" filterField="nombre"sortable body={nameBodyTemplate} headerStyle={{ width: '55%', minWidth: '10rem' }}></Column>


                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Gobierno Nivel" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={gobiernoNivel.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !gobiernoNivel.nombre })} />
                            {submitted && !gobiernoNivel.nombre && <small className="p-invalid">Ingresar Nombre</small>}
                        </div>



                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={(gobiernoNivel.id_estado == 1)?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>
                    <Dialog visible={aplicacionDialog} style={{ width: '450px' }} header="Gobierno" modal className="p-fluid" footer={aplicacionDialogFooter} onHide={hideDialogAplicacion}>


                        <div className="field">
                            <label htmlFor="name">Gobierno</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_gobierno}
                                options={gobierno}
                                onChange={e =>
                                    onGobiernoChange(e)

                                }
                                optionValue="id_gobierno"
                                optionLabel="nombre"
                                placeholder='Seleccione gobierno'
                            />
                        </div>


                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {gobiernoNivel && <span> Deseas  eliminar la aplicación  <b>{gobiernoNivel.nombre}</b>?</span>}
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

export default React.memo(GobiernoNivel, comparisonFn);
