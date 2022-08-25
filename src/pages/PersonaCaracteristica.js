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
import {TipoService} from "../service/TipoService";
import personaCaracteristica from "./PersonaCaracteristica";
import {PersonaCaracteristicaService} from "../service/PersonaCaracteristicaService";
import {PersonaService} from "../service/PersonaService";
import {EmailService} from "../service/EmailService";


const PersonaCaracteristica = () => {

    let emptyTipo = {
        nombre: '',
        id_estado: true
    };
    let emptyPersonaCaracteristica = {
        id_persona: '',
        id_tipo:'',
        id_caracteristica: '',
    };
    const [gobiernoNivels, setGobiernoNivels] = useState(null);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [tipo, setTipo] = useState(emptyTipo);
    const [personaCaracteristica, setPersonaCaracteristica] = useState(emptyPersonaCaracteristica);
    const [personaCaracteristicas, setPersonaCaracteristicas] = useState(null);
    const [tipoCaracteristicas, setTipoCaracteristicas] = useState(null);

    const [personas, setPersonas] = useState(null);
    const [id_persona, setId_persona] = useState(null);
    const [id_tipo, setId_tipo] = useState(null);
    const [id_tipoCaracteristica, setId_tipoCaracteristica] = useState(null);
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
        setPersonaCaracteristica(emptyPersonaCaracteristica);

      //  setSubmitted(false);
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

       setSubmitted(false);
        console.log("eee");
        console.log(personaCaracteristica);
        if (personaCaracteristica.id_persona=='' ) {

           // let _aplicaciones = [...gobiernoNivels];
            let _aplicacion = { ...personaCaracteristica };
            if (personaCaracteristica.id_caracteristica == '') {


                    personaCaracteristicaService.postPersonaCaracteristica(id_persona,id_tipo,id_tipoCaracteristica).then(data => {

                        if(data == "error"){
                            const userName = localStorage.getItem("userName");
                            toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona Caracteristica', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                            const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es personaCaracteristica/persona/"+id_persona+"/tipo/"+id_tipo+"/caracteristica/"+id_tipoCaracteristica+"/create.Se invoco el método modificar persona caracteristica.Se notifico el error con el usuario "+userName;
                            emailService.getSendEmail("Módulo Persona Caracteristica",mensaje);
                        }else{
                            toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Persona Caracterisitica Creado', life: 3000 });
                        }
                        setPersonaCaracteristica(data)
                        setCount(count + 1)
                    });







            }
            else {

                personaCaracteristicaService.putPersonaCaracteristica(id_tipo,personaCaracteristica.id_gobierno_nivel,_aplicacion).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona Caracteristica', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es tipo/4/contrato/update/"+personaCaracteristica.id_gobierno_nivel+".Se invoco el método modificar persona caracteristica.Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Persona Caracteristica",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Persona Caracterisitica Actualizado', life: 3000 });
                    }

                    setPersonaCaracteristica(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicación Actualizado', life: 3000 });


            }


            setProductDialog(false);
            setPersonaCaracteristica(emptyPersonaCaracteristica);
        }
    }

    const editProduct = (aplicacion) => {
   console.log(aplicacion);
setId_persona(aplicacion.id_persona);
setId_tipoCaracteristica(aplicacion.id_caracteristica);
        setPersonaCaracteristica({ ...aplicacion });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (aplicacion) => {
        setPersonaCaracteristica(aplicacion);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {

        personaCaracteristicaService.deletePersonaCaracteristica(personaCaracteristica.id_persona,id_tipo,personaCaracteristica.id_caracteristica).then(data => {

            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona Caracteristica', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es personaCaracteristica/persona/"+id_persona+"/tipo/"+id_tipo+"/caracteristica/"+id_tipoCaracteristica+"/delete.Se invoco el método eliminar persona caracteristica.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Persona Caracteristica",mensaje);
            }else{
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Persona Caracterisitica Eliminada', life: 3000 });
            }

            setCount(count + 1)
        });

        setDeleteProductDialog(false);
        setPersonaCaracteristica(emptyPersonaCaracteristica);
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
        personaService.getPersonas().then(data => setPersonas(data));
        personaService.getTipoCaracteristicas(id_tipo).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es tipo/"+id_tipo+"/contrato/list.Se invoco el método listar  persona caracteristica.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Persona",mensaje);
            }
            setTipoCaracteristicas(data)

        });

        if(id_tipo != null) {
            personaCaracteristicaService.getPersonaCaracteristica().then(data => {

                if(data == "error"){
                    const userName = localStorage.getItem("userName");
                    toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona Caracteristica', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                    const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es personaCaracteristica/list.Se invoco el método listar persona caracteristica.Se notifico el error con el usuario "+userName;
                    emailService.getSendEmail("Módulo Persona Caracteristica",mensaje);
                }else{
                    setPersonaCaracteristicas(data)
                }


            });
            setAplicacionDialog(false);
            setPersonaCaracteristica(emptyPersonaCaracteristica);
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
        let _gobiernoNivel = { ...personaCaracteristica };
        _gobiernoNivel[`${'id_estado'}`] = e.value;

        setPersonaCaracteristica(_gobiernoNivel);
        console.log(_gobiernoNivel);
    }
    const onPersonaChange = (e) =>{

        setId_persona(e.value);
    }
    const onTipoCaracteristicaChange = (e) =>{

        setId_tipoCaracteristica(e.value);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...personaCaracteristica };
        _usuario[`${name}`] = val;

        setPersonaCaracteristica(_usuario);
        console.log(_usuario);
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
                {rowData.id_persona}
            </>
        );
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.id_tipo}
            </>
        );
    }
    const nameCaracBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.id_caracteristica}
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
/*<Button icon="pi pi-pencil" className="p-button-rounded p-button-danger mr-2" onClick={() => editProduct(rowData)} />*/
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">

                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Persona Caracteristica</h5>
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




    const aplicacionDialogFooter = (
        <>

            <Button label="Aceptar" icon="pi pi-check" className="p-button-text" onClick={aceptarGobierno} />
        </>
    );

    const hideDialogAplicacion = () => {

        setAplicacionDialog(false);
    }

    const onTipoChange = (e) =>{
        setId_tipo(e.value);
    }
    const tipoService = new TipoService();
    const personaCaracteristicaService = new PersonaCaracteristicaService();
    const personaService = new PersonaService();
    useEffect(async() => {
        console.log("ingreso list");
        tipoService.getTipo().then(data => setTipo(data));
    }, []);
    useEffect(async() => {
        if(id_tipo != null)
           personaCaracteristicaService.getPersonaCaracteristica().then(data => setPersonaCaracteristicas(data));
    }, [count]);
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={personaCaracteristicas} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id_aplicacion" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id Persona" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column field="Nombre" header="Id Tipo" sortable body={nameBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>

                        <Column field="Nombre" header="Id Caracteristica" sortable body={nameCaracBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>


                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Persona Caracteristica" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Persona</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_persona}
                                options={personas}
                                onChange={e =>
                                    onPersonaChange(e)

                                }
                                optionValue="id_persona"
                                optionLabel="nombres"
                                placeholder='Seleccione Persona'
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Caracteristica</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_tipoCaracteristica}
                                options={tipoCaracteristicas}
                                onChange={e =>
                                    onTipoCaracteristicaChange(e)

                                }
                                optionValue="id_contrato"
                                optionLabel="descripcion"
                                placeholder='Seleccione Persona'
                            />
                        </div>


                    </Dialog>
                    <Dialog visible={aplicacionDialog} style={{ width: '450px' }} header="Persona Caracteristica" modal className="p-fluid" footer={aplicacionDialogFooter} onHide={hideDialogAplicacion}>


                        <div className="field">
                            <label htmlFor="name">Tipo</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_tipo}
                                options={tipo}
                                onChange={e =>
                                    onTipoChange(e)

                                }
                                optionValue="id_tipo"
                                optionLabel="descripcion"
                                placeholder='Seleccione Tipo'
                            />
                        </div>


                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {personaCaracteristica && <span> Deseas  eliminar persona caracteristica ?</span>}
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

export default React.memo(PersonaCaracteristica, comparisonFn);
