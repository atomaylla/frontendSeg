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


const Aplicacion = () => {

    let emptyAplicacion = {
        nombre: '',
        descripcion: '',
        version: '',
        uri: '',
        id_estado: true
    };

    const [aplicaciones, setAplicaciones] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [aplicacion, setAplicacion] = useState(emptyAplicacion);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:0});
    const useDeleteAplicacion = useState(null);

    const [count,setCount] = useState(0);
    const openNew = () => {
        setAplicacion(emptyAplicacion);
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
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicaci??n Actualizado', life: 3000 });
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
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicaci??n Creada', life: 3000 });
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

    const confirmDeleteProduct = (aplicacion) => {
        setAplicacion(aplicacion);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
       // let _usuarios = aplicaciones.filter(val => val.id_aplicacion !== aplicacion.id_aplicacion);
        //setAplicaciones(_usuarios);



        aplicacionService.deleteAplicacion(aplicacion.id_aplicacion).then(response => setCount(count + 1));
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Aplicaci??n Eliminada', life: 3000 });
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
            <h5 className="m-0">Aplicaci??n</h5>
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
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );
    const [updateList, setUpdateList] = useState(false);
    const aplicacionService = new AplicacionService();
    const getData = async() =>{

        const response = aplicacionService.getAplicacion();
        return response;
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
                        <Column field="Nombre" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>

                        <Column field="Nombre" header="Versi??n" sortable body={versionBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>

                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Aplicaci??n" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={aplicacion.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !aplicacion.nombre })} />
                            {submitted && !aplicacion.nombre && <small className="p-invalid">Ingresar Nombre</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripci??n</label>
                            <InputTextarea id="descripcion" value={aplicacion.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Versi??n</label>
                            <InputText id="name" value={aplicacion.version} onChange={(e) => onInputChange(e, 'version')} required autoFocus className={classNames({ 'p-invalid': submitted && !aplicacion.nombre })} />
                            {submitted && !aplicacion.version && <small className="p-invalid">Ingresar Versi??n</small>}
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

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmaci??n" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {aplicacion && <span> Deseas  eliminar la aplicaci??n  <b>{aplicacion.nombre}</b>?</span>}
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
