import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';
import {InputSwitch} from "primereact/inputswitch";
import {Dropdown} from "primereact/dropdown";
import {RolService} from "../service/RolService";
import {AplicacionService} from "../service/AplicacionService";

const Rol = () => {



    let emptyRol = {
        titulo: '',
        descripcion: '',
        id_estado: true,

    };
    //const [products, setProducts] = useState(null);
    const [count,setCount] = useState(0);
    const [rols, setRols] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [menuDialog, setMenuDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [id_aplicacion, setId_aplicacion] = useState(null);
    const [rol, setRol] = useState(emptyRol);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState(true);
    const[aplicacion,setAplicacion] = useState(null);

    const [selectedAplicacion, setSelectedAplicacion] = useState("");
    const cities = [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" }
    ];
    const rolService = new RolService();
    const aplicacionService = new AplicacionService();
    useEffect(() => {
        aplicacionService.getAplicacion().then(data => setAplicacion(data));
    }, []);

    useEffect(async() => {
        if(id_aplicacion != null)rolService.getRols(id_aplicacion).then(data => setRols(data));


    }, [count]);
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const openAplicacion = () =>{
        setAplicacionDialog(true);
    }
    const openNew = () => {
       // setProduct(emptyProduct);


        const aplicacionService = new AplicacionService();
        aplicacionService.getAplicacion().then(data => setAplicacion(data));

        setRol(emptyRol);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setMenuDialog(false);
    }
    const hideDialogAplicacion = () => {

       // setAplicacionDialog(false);
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const aceptarAplicacion= () => {


        if(id_aplicacion != null) {
            rolService.getRols(id_aplicacion).then(data => setRols(data));
            setAplicacionDialog(false);
            setRol(emptyRol);
        }else{
            setAplicacionDialog(true);
        }



    }
    const saveProduct = () => {
        setSubmitted(true);
        const rolService = new RolService();
        if (rol.titulo) {
            let _rols = [...rols];
            let _rol = { ...rol };
            if (rol.id) {
                const index = findIndexById(rol.id);

              //  _rols[index] = _rol;
                rolService.putRol(rol.id_rol,_rol).then(data => {
                    setRol(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
             //   _rol.id = createId();
                _rol.titulo = rol.titulo
                _rol.id_aplicacion = rol.id_aplicacion
                _rol.id_estado = 1
              //  _rol.id_estado = rol.id_estado
              //  _rols.push(_rol);
                rolService.postRol(id_aplicacion,_rol).then(data => {
                    setAplicacion(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol Creado', life: 3000 });
                console.log("grabar");
            }
            console.log("aplicacion: "+ id_aplicacion);

            rolService.getRols(id_aplicacion).then(data => setRols(data));
           // setRols(_rols);
            setProductDialog(false);
            setRol(emptyRol);
        }
    }

    const editProduct = (rol) => {
        console.log("-----");
        console.log(rol);
        //setProduct({ ...product });
    //    setSelectedAplicacion(rol.id_aplicacion);
        const aplicacionService = new AplicacionService();
        aplicacionService.getAplicacion().then(data => setAplicacion(data));
        setRol({ ...rol });
        setProductDialog(true);
    }
    const editMenu = (rol) => {
        //setProduct({ ...product });
        setRol({ ...rol });

        setMenuDialog(true);
    }
    const confirmDeleteProduct = (rol) => {
       // setProduct(product);
        setRol(rol);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {

        setDeleteProductDialog(false);

        rolService.deleteRol(rol.id_rol).then(response =>setCount(count + 1));
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Rol Eliminado', life: 3000 });
        setRol(emptyRol);

    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < rols.length; i++) {
            if (rols[i].id === id) {
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
        let _rols = rols.filter(val => !selectedProducts.includes(val));
        setRols(_rols);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _rol = { ...rol };
        _rol['category'] = e.value;
     //   setProduct(_product);
        setRol(_rol);
    }
   const onAplicacionChange = (e) =>{
       setId_aplicacion(e.value);
   }
    const onEstadoChange = (e) =>{

        setState(e.value)
        let _rol = { ...rol };
        _rol[`${'id_estado'}`] = e.value;

        setRol(_rol);
        console.log(_rol);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _rol = { ...rol };
        _rol[`${name}`] = val;

        setRol(_rol);
        console.log(_rol);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _rol = { ...rol };
        _rol[`${name}`] = val;

        setRol(_rol);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-danger mr-2" onClick={openNew} />
                    <Button label="Aplicacion" icon="pi pi-eye" className="p-button-success mr-2" onClick={openAplicacion} />
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

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id_rol}
            </>
        );
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.titulo}
            </>
        );
    }
    const aplicacionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.descripcion}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }

  /*  const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readonly cancel={false} />
            </>
        );
    }
*/
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge `}>{rowData.id_estado==1?"Activo":"Inactivo"}</span>
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
    const actionMenuTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-align-justify" className="p-button-rounded p-button-success mr-2" onClick={() => editMenu(rowData)} />

            </div>
        );
    }
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Rol</h5>
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
    const aplicacionDialogFooter = (
        <>

            <Button label="Aceptar" icon="pi pi-check" className="p-button-text" onClick={aceptarAplicacion} />
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


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={rols} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No hay registros" header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>

                        <Column field="Aplicaci??n" header="Descripci??n" sortable body={aplicacionBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>

                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>

                        <Column header="Menu" body={actionMenuTemplate}></Column>
                        <Column header="Acciones" body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog visible={menuDialog} style={{ width: '650px' }} header="Menu" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <label htmlFor="descripcion">Seleccionar</label><br/>
                                <InputTextarea id="descripcion"  onChange={(e) => onInputChange(e, 'descripcion')} required rows={13} cols={120} />
                            </div>
                            <div className="field-radiobutton col-6">
                                <label htmlFor="descripcion">Seleccionados</label><br/>
                                <InputTextarea id="descripcion"  onChange={(e) => onInputChange(e, 'descripcion')} required rows={13} cols={120} />
                            </div>

                        </div>

                    </Dialog>
                    <Dialog visible={aplicacionDialog} style={{ width: '450px' }} header="Rol" modal className="p-fluid" footer={aplicacionDialogFooter} onHide={hideDialogAplicacion}>


                        <div className="field">
                            <label htmlFor="name">Aplicaci??n</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_aplicacion}
                                options={aplicacion}
                                onChange={e =>
                                    onAplicacionChange(e)

                                }
                                optionValue="id_aplicacion"
                                optionLabel="nombre"
                                placeholder='Seleccione aplicaci??n'
                            />
                        </div>


                    </Dialog>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Rol" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>



                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={rol.titulo} onChange={(e) => onInputChange(e, 'titulo')} required autoFocus className={classNames({ 'p-invalid': submitted && !rol.titulo })} />
                            {submitted && !rol.titulo && <small className="p-invalid">Ingresar nombre</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripci??n</label>
                            <InputTextarea id="description" value={rol.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={rol.id_estado==1?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmaci??n" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {rol && <span> Deseas  eliminar el rol de <b>{rol.titulo}</b>?</span>}
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

export default React.memo(Rol, comparisonFn);
