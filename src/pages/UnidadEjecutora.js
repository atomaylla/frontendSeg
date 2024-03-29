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
import {UnidadEjecutoraService} from "../service/UnidadEjecutoraService";
import {Dropdown} from "primereact/dropdown";
import {GobiernoNivelService} from "../service/GobiernoNivelService";
import {GobiernoService} from "../service/GobiernoService";
import {EntidadService} from "../service/EntidadService";
import {EmailService} from "../service/EmailService";


const UnidadEjecutora = () => {

    let emptyUnidadEjecutora = {
        nombre: '',
        id_estado: true
    };

    const [aplicaciones, setAplicaciones] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [gobierno, setGobierno] = useState();
    const[gobiernoNivel,setGobiernoNivel] = useState(null);
    const[entidad,setEntidad] = useState(null);
    const[unidadEjecutora,setUnidadEjecutora] = useState(emptyUnidadEjecutora);
    const[unidadEjecutoras,setUnidadEjecutoras] = useState(null);
    const [id_gobierno, setId_gobierno] = useState(null);
    const [id_gobierno_nivel, setId_gobierno_nivel] = useState(null);
    const [id_entidad, setId_entidad] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:0});
    const useDeleteAplicacion = useState(null);
    const gobiernoNivelService = new GobiernoNivelService();
    const gobiernoService = new GobiernoService();
    const entidadService = new EntidadService();
    const emailService = new EmailService();
    const [count,setCount] = useState(0);
    const openNew = () => {
        setUnidadEjecutora(emptyUnidadEjecutora);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const hideDialogAplicacion = () => {

        setAplicacionDialog(false);
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const aceptarAplicacion= () => {

        unidadEjecutoraService.getUnidadEjecutora(id_entidad).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Unidad Ejecutora', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es entidad/"+ id_entidad +"/unidadEjecutora/list/.Se invoco el método listar unidad ejecutora.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Unidad Ejecutora",mensaje);
            }else{
                setUnidadEjecutoras(data)
            }


        });
        setAplicacionDialog(false);

    }
    const saveProduct = async() => {

        setSubmitted(true);

        if (unidadEjecutora.nombre.trim()) {

          //  let _aplicaciones = [...aplicaciones];
            let _unidadEjecutora = { ...unidadEjecutora };
            if (unidadEjecutora.id_unidad_ejecutora) {

            //    const index = findIndexById(aplicacion.id_aplicacion);

                //_aplicaciones[index] = _aplicacion;
                unidadEjecutoraService.putUnidadEjecutora(id_entidad,unidadEjecutora.id_unidad_ejecutora,_unidadEjecutora).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Unidad Ejecutora', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es entidad/"+ id_entidad +"/unidadEjecutora/update/"+ unidadEjecutora.id_unidad_ejecutora+".Se invoco el método guardar unidad ejecutora.Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Unidad Ejecutora",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Unidad Ejecutora Modificada', life: 3000 });
                    }
                    setUnidadEjecutora(data)
                    setCount(count + 1)
                });

            }
            else {

                _unidadEjecutora.nombre = unidadEjecutora.nombre;

                _unidadEjecutora.id_estado = 1;

                    unidadEjecutoraService.postUnidadEjecutora(id_entidad,_unidadEjecutora).then(data => {
                        if(data == "error"){
                            const userName = localStorage.getItem("userName");
                            toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Unidad Ejecutora', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                            const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es entidad/"+ id_entidad +"/unidadEjecutora/create.Se invoco el método guardar unidad ejecutora.Se notifico el error con el usuario "+userName;
                            emailService.getSendEmail("Módulo Unidad Ejecutora",mensaje);
                        }else{
                            toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Unidad Ejecutora Creada', life: 3000 });
                        }
                        setUnidadEjecutora(data)
                        setCount(count + 1)
                    });



            }

            //   setUpdateList(updateList);
            setProductDialog(false);
            setUnidadEjecutora(emptyUnidadEjecutora);
        }
    }

    const editProduct = (aplicacion) => {
        //setProduct({ ...product });

        setUnidadEjecutora({ ...aplicacion });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (aplicacion) => {
        setUnidadEjecutora(aplicacion);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        // let _usuarios = aplicaciones.filter(val => val.id_aplicacion !== aplicacion.id_aplicacion);
        //setAplicaciones(_usuarios);



        unidadEjecutoraService.deleteUnidadEjecutora(id_entidad,unidadEjecutora.id_unidad_ejecutora).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Unidad Ejecutora', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es entidad/"+ id_entidad +"/unidadEjecutora/updateDelete/"+ unidadEjecutora.id_unidad_ejecutora+".Se invoco el método eliminar unidad ejecutora.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Unidad Ejecutora",mensaje);
            }else{
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Unidad Ejecutora Eliminada', life: 3000 });
            }

            setCount(count + 1)
        });

        setDeleteProductDialog(false);
        setUnidadEjecutora(emptyUnidadEjecutora);
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


    const onGobiernoChange = (e) =>{
        setId_gobierno(e.value);
        gobiernoNivelService.getGobiernoNivel(e.value).then(data => setGobiernoNivel(data));
    }
    const onGobiernoNivelChange = (e) =>{
        setId_gobierno_nivel(e.value);
        entidadService.getEntidad(e.value).then(data => setEntidad(data));
        //  gobiernoNivelService.getGobiernoNivel(e.value).then(data => setGobiernoNivel(data));
    }
    const onEntidadChange = (e) =>{
        setId_entidad(e.value);
       // entidadService.getEntidad(e.value).then(data => setEntidad(data));
        //  gobiernoNivelService.getGobiernoNivel(e.value).then(data => setGobiernoNivel(data));
    }
    const onEstadoChange = (e) =>{

        setState(e.value)
        let _aplicacion = { ...unidadEjecutora };
        _aplicacion[`${'id_estado'}`] = e.value;

        setUnidadEjecutora(_aplicacion);
        console.log(_aplicacion);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...unidadEjecutora };
        _usuario[`${name}`] = val;

        setUnidadEjecutora(_usuario);
        console.log(_usuario);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _usuario = { ...unidadEjecutora };
        _usuario[`${name}`] = val;

        setUnidadEjecutora(_usuario);
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
                {rowData.id_unidad_ejecutora}
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
            <h5 className="m-0">Unidad Ejecutora</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const aplicacionDialogFooter = (
        <>
            <Button label="Aceptar" icon="pi pi-check" className="p-button-text" onClick={aceptarAplicacion} />
        </>
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
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );
    const [updateList, setUpdateList] = useState(false);
    const unidadEjecutoraService = new UnidadEjecutoraService();
    const getData = async() =>{

        const response = unidadEjecutoraService.getUnidadEjecutora();
        return response;
    }

    useEffect(async() => {
        console.log("ingreso list");
        getData().then(data => setAplicaciones(data));

    }, []);
    useEffect(async() => {
        gobiernoService.getGobierno().then(data => setGobierno(data));

    }, []);
    useEffect(async() => {
        if(id_entidad != null)
            unidadEjecutoraService.getUnidadEjecutora(id_entidad).then(data => setUnidadEjecutoras(data));
    }, [count]);
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={unidadEjecutoras} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id_aplicacion" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column field="Nombre" header="Nombre" filterField="nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '50%', minWidth: '10rem' }}></Column>


                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Aplicación" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={unidadEjecutora.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !unidadEjecutora.nombre })} />
                            {submitted && !unidadEjecutora.nombre && <small className="p-invalid">Ingresar Nombre</small>}
                        </div>


                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={(unidadEjecutora.id_estado == 1)?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>
                    <Dialog visible={aplicacionDialog} style={{ width: '450px' }} header="Unidad Ejecutora" modal className="p-fluid" footer={aplicacionDialogFooter} onHide={hideDialogAplicacion}>
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

                        <div className="field">
                            <label htmlFor="name">Gobierno Nivel</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_gobierno_nivel}
                                options={gobiernoNivel}
                                onChange={e =>
                                    onGobiernoNivelChange(e)

                                }
                                optionValue="id_gobierno_nivel"
                                optionLabel="nombre"
                                placeholder='Seleccione Gobierno Nivel'
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Entidad</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_entidad}
                                options={entidad}
                                onChange={e =>
                                    onEntidadChange(e)

                                }
                                optionValue="id_entidad"
                                optionLabel="nombre"
                                placeholder='Seleccione Entidad'
                            />
                        </div>

                    </Dialog>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {unidadEjecutora && <span> Deseas  eliminar la unidad ejecutora <b>{unidadEjecutora.nombre}</b>?</span>}
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

export default React.memo(UnidadEjecutora, comparisonFn);
