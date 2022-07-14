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
import {UsuarioService} from "../service/UsuarioService";
import {AplicacionService} from "../service/AplicacionService";
import {RolService} from "../service/RolService";
import {TipoUsuarioService} from "../service/TipoUsuarioService";
import {PersonaService} from "../service/PersonaService";


const Menu = () => {


    let emptyUsuario = {

        usuario: '',
        password: '',
        id_estado: true,

    };


    const [usuarios, setUsuarios] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [usuario, setUsuario] = useState(emptyUsuario);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:false});
    const[aplicacion,setAplicacion] = useState(null);
    const[rols,setRols] = useState(null);
    const[tipoUsuario, setTipoUsuario] = useState(null);
    const [id_aplicacion, setId_aplicacion] = useState(null);
    const [id_persona, setId_persona] = useState(null);
    const [personas, setPersonas] = useState(null);
    const [count,setCount] = useState(0);
    const usuarioService = new UsuarioService();
    const personaService = new PersonaService();
    useEffect(() => {
      //  aplicacionService.getAplicacion().then(data => setAplicacion(data));
        usuarioService.getUsuarios().then(data => setUsuarios(data));
        personaService.getPersonas().then(data => setPersonas(data));
    }, []);

    useEffect(async() => {
        usuarioService.getUsuarios().then(data => setUsuarios(data));
    }, [count]);

/*
    const rolService = new RolService();
    rolService.getRols().then(data => setRols(data));*/

    const tipoUsuarioService = new TipoUsuarioService();
    tipoUsuarioService.getTipoUsuario().then(data => setTipoUsuario(data));

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        // setProduct(emptyProduct);
        setUsuario(emptyUsuario);
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

        if (usuario.usuario.trim()) {
            let _usuarios = [...usuarios];
            let _usuario = { ...usuario };
            if (usuario.id) {

                usuarioService.putUsuario(usuario.id_usuario,_usuario).then(data => {
                    setUsuario(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {

                _usuario.usuario = usuario.usuario
                _usuario.password = usuario.password
                _usuario.id_estado = "1"

                usuarioService.postUsuario(id_persona,_usuario).then(data => {
                    setAplicacion(data)
                    setCount(count + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

             setUsuarios(_usuarios);
            setProductDialog(false);
            setUsuario(emptyUsuario);
        }
    }

    const editProduct = (rol) => {

        setUsuario({ ...rol });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (usuario) => {

        setUsuario(usuario);
        setDeleteProductDialog(true);
    }


    const deleteProduct = () => {
        let _usuarios = usuarios.filter(val => val.id !== usuario.id);
        setUsuarios(_usuarios);
        setDeleteProductDialog(false);
        //   setProduct(emptyProduct);
        usuarioService.deleteUsuario(usuario.id_usuario).then(response => setCount(count + 1))

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Eliminado', life: 3000 });
    setUsuario(emptyUsuario);
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
        let _usuario = { ...usuario };
        _usuario[`${'id_estado'}`] = e.value;

        setUsuario(_usuario);
        console.log(_usuario);
    }
    const onRolChange = (e) =>{


        let _usuario = { ...usuario };
        _usuario[`${'rol'}`] = e.value;

        setUsuario(_usuario);
        console.log(_usuario);
    }
    const onTipoUsuarioChange = (e) =>{


        let _usuario = { ...usuario };
        _usuario[`${'tipoUser'}`] = e.value;

        setUsuario(_usuario);
        console.log(_usuario);
    }
    const onCategoryChange = (e) => {
        let _usuario = { ...usuario };
        _usuario['category'] = e.value;
        //   setProduct(_product);
        setUsuario(_usuario);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        _usuario[`${name}`] = val;

        setUsuario(_usuario);
        console.log(_usuario);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _usuario = { ...usuario };
        _usuario[`${name}`] = val;

        setUsuario(_usuario);
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
   /* const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    }
*/
    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id_usuario}
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

    const usuarioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Usuario</span>
                {rowData.usuario}
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
            <h5 className="m-0">Usuario</h5>
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

    const aceptarAplicacion= () => {
        usuarioService.getUsuarios(id_aplicacion).then(data => setRols(data));
        setAplicacionDialog(false);
        setUsuario(emptyUsuario);
    }
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={usuarios} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>

                        <Column field="Usuario" header="Usuario" sortable body={usuarioBodyTemplate} headerStyle={{ width: '30%', minWidth: '10rem' }}></Column>

                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '30%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>


                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
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
                            <label htmlFor="name">Usuario</label>
                            <InputText id="name" value={usuario.usuario} onChange={(e) => onInputChange(e, 'usuario')} required autoFocus className={classNames({ 'p-invalid': submitted && !usuario.usuario })} />
                            {submitted && !usuario.usuario && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Password</label>
                            <InputText id="name" type="password" value={usuario.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !usuario.password })} />
                            {submitted && !usuario.password && <small className="p-invalid">Name is required.</small>}
                        </div>

                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={usuario.id_estado==1?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {usuario && <span> Deseas  eliminar el usuario de <b>{usuario.usuario}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {usuario && <span>Are you sure you want to delete the selected products?</span>}
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

export default React.memo(Menu, comparisonFn);
