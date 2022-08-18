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
import {PaisService} from "../service/PaisService";


const DocumentoTipo = () => {

    let emptyAplicacion = {
        nombre: '',
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



    const editProduct = (aplicacion) => {
        //setProduct({ ...product });

        setAplicacion({ ...aplicacion });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (aplicacion) => {
        setAplicacion(aplicacion);
        setDeleteProductDialog(true);
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
                {rowData.id_pais}
            </>
        );
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Departamento</span>
                {rowData.descripcion}
            </>
        );
    }
    const provinciaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Provincia</span>
                {rowData.provincia}
            </>
        );
    }
    const distritoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Distrito</span>
                {rowData.distrito}
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
            <h5 className="m-0">Pais</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );



    const [updateList, setUpdateList] = useState(false);
    const paisService = new PaisService();
    const getData = async() =>{

        const response = paisService.getPais();
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


                    <DataTable ref={dt} value={aplicaciones} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id_aplicacion" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column field="Nombre" header="Nombre"filterField="descripcion" sortable body={nameBodyTemplate} headerStyle={{ width: '55%', minWidth: '10rem' }}></Column>

                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>

                    </DataTable>





                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(DocumentoTipo, comparisonFn);
