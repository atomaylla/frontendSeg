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
import {Dropdown} from "primereact/dropdown";
import {EntidadService} from "../service/EntidadService";
import {TipoUsuarioService} from "../service/TipoUsuarioService";
import {PersonaService} from "../service/PersonaService";
import {GobiernoNivelService} from "../service/GobiernoNivelService";
import {GobiernoService} from "../service/GobiernoService";


const Entidad = () => {


    let emptyEntidad = {

        nombre: '',
        id_estado: true,

    };


    const [usuarios, setUsuarios] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
   // const [usuario, setUsuario] = useState(emptyUsuario);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:false});
    const [gobierno, setGobierno] = useState();
    const[gobiernoNivel,setGobiernoNivel] = useState(null);
    const[entidads,setEntidads] = useState(null);
    const[tipoUsuario, setTipoUsuario] = useState(null);
    const [id_aplicacion, setId_aplicacion] = useState(null);
    const [id_persona, setId_persona] = useState(null);
    const [id_gobierno, setId_gobierno] = useState(null);
    const [id_gobierno_nivel, setId_gobierno_nivel] = useState(null);
    const [personas, setPersonas] = useState(null);
    const [entidad, setEntidad] = useState(emptyEntidad);
    const [count,setCount] = useState(0);
    const entidadService = new EntidadService();
    const personaService = new PersonaService();
    const gobiernoNivelService = new GobiernoNivelService();
    const gobiernoService = new GobiernoService();
    useEffect(() => {
        //  aplicacionService.getAplicacion().then(data => setAplicacion(data));
      //  entidadService.getEntidad().then(data => setUsuarios(data));
      //  personaService.getPersonas().then(data => setPersonas(data));
    }, []);
    useEffect(async() => {
        gobiernoService.getGobierno().then(data => setGobierno(data));

    }, []);





    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        // setProduct(emptyProduct);
       // setUsuario(emptyUsuario);
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

    const saveProduct = () => {
        setSubmitted(true);

        if (entidad.nombre.trim()) {
          //  let _usuarios = [...usuarios];
            let _entidad = { ...entidad};
            if (entidad.id_entidad) {

                entidadService.putEntidad(id_gobierno_nivel,entidad.id_entidad,_entidad).then(data => {
                    setEntidad(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {

                _entidad.nombre = entidad.nombre;

                _entidad.id_estado = 1;

                entidadService.postEntidad(id_gobierno_nivel,_entidad).then(data => {
                    setEntidad(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

          //  setUsuarios(_usuarios);
            setProductDialog(false);
            setEntidad(emptyEntidad);
        }
    }

    const editProduct = (rol) => {

        setEntidad({ ...rol });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (usuario) => {

        setEntidad(usuario);
        setDeleteProductDialog(true);
    }


    const deleteProduct = () => {

        entidadService.deleteEntidad(id_gobierno_nivel,entidad.id_entidad).then(response => setCount(count + 1))
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Eliminado', life: 3000 });
        setDeleteProductDialog(false);
        setEntidad(emptyEntidad);
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = '0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _usuarios = usuarios.filter(val => !selectedProducts.includes(val));
        setUsuarios(_usuarios);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
    const onPersonaChange = (e) =>{

        setId_persona(e.value);
    }
    const onEstadoChange = (e) =>{

        setState(e.value)
        let _usuario = { ...entidad };
        _usuario[`${'id_estado'}`] = e.value;

        setEntidad(_usuario);
        console.log(_usuario);
    }



    const onGobiernoChange = (e) =>{
        setId_gobierno(e.value);
        gobiernoNivelService.getGobiernoNivel(e.value).then(data => setGobiernoNivel(data));
    }
    const onGobiernoNivelChange = (e) =>{
        setId_gobierno_nivel(e.value);
      //  gobiernoNivelService.getGobiernoNivel(e.value).then(data => setGobiernoNivel(data));
    }
    const onAplicacionChange = (e) =>{

        //setSelectedAplicacion(e.value)
        //let _menu = { ...menu };
        //  _menu[`${'id_aplicacion'}`] = e.value;
        setId_aplicacion(e.value);
        //setMenu(_menu);
        // console.log(_menu);
    }
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...entidad };
        _usuario[`${name}`] = val;

        setEntidad(_usuario);
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
    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id_entidad}
            </>
        );
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Entidad</span>
                {rowData.nombre}
            </>
        );
    }

    const rolBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Rol</span>
                {rowData.rol}
            </>
        );
    }
    const aplicacionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Rol</span>
                {rowData.aplicacion}
            </>
        );
    }
    /*  const tipoUsuarioBodyTemplate = (rowData) => {
         return (
             <>
                 <span className="p-column-title">Rol</span>
                 {rowData.tipoUser}
             </>
         );
     }
      const ratingBodyTemplate = (rowData) => {
           return (
               <>
                   <span className="p-column-title">Reviews</span>
                   <Rating value={rowData.rating} readonly cancel={false} />
               </>
           );
       }
   */
    const aceptarAplicacion= () => {
        entidadService.getEntidad(id_gobierno_nivel).then(data => setEntidads(data));
        setAplicacionDialog(false);
       // setUsuario(emptyUsuario);
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge`}>{rowData.id_estado==1?"Activo":"Inactivo"}</span>
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
            <h5 className="m-0">Entidad</h5>
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

    useEffect(async() => {
        if(id_gobierno_nivel != null)
        entidadService.getEntidad(id_gobierno_nivel).then(data => setEntidads(data));
    }, [count]);

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={entidads} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>

                        <Column field="Usuario" header="Nombre" filterField="nombre"sortable body={nombreBodyTemplate} headerStyle={{ width: '50%', minWidth: '10rem' }}></Column>

                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>


                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Entidad" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>


                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={entidad.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !entidad.nombre })} />
                            {submitted && !entidad.nombre && <small className="p-invalid">Name is required.</small>}
                        </div>

                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={entidad.id_estado==1?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>
                    <Dialog visible={aplicacionDialog} style={{ width: '450px' }} header="Entidad" modal className="p-fluid" footer={aplicacionDialogFooter} onHide={hideDialogAplicacion}>
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


                    </Dialog>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {entidad && <span> Deseas  eliminar la entidad de <b>{entidad.nombre}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {entidad && <span>Are you sure you want to delete the selected products?</span>}
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

export default React.memo(Entidad, comparisonFn);
