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
import {MenuService} from "../service/MenuService";
import {AplicacionService} from "../service/AplicacionService";
import {EmailService} from "../service/EmailService";

const Menu = () => {

    let emptyMenu = {
        titulo: '',
        icono: '',
        urn: '',
        descripcion: '',
        orden: '',
        id_estado: true,

    };
    let emptySubMenu = {
        titulo: '',
        icono: '',
        urn: '',
        descripcion: '',
        orden: 0,
        padre_id: 0,
        id_estado: true,

    };
    const [count,setCount] = useState(0);
    const [countSubmenu,setCountSubmenu] = useState(0);
    const [menus, setMenus] = useState(null);
    const [subMenus, setSubMenus] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [aplicacionDialog, setAplicacionDialog] = useState(true);
    const [subMenuDialog, setSubMenuDialog] = useState(false);
    const [newSubMenuDialog, setNewSubMenuDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteSubMenuDialog, setDeleteSubMenuDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [menu, setMenu] = useState(emptyMenu);
    const [subMenu, setSubMenu] = useState(emptySubMenu);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState(true);
    const [id_aplicacion, setId_aplicacion] = useState(null);
    const [id_menu, setId_menu] = useState(null);
    const[aplicacion,setAplicacion] = useState(null);
    const menuService = new MenuService();
    const aplicacionService = new AplicacionService();
    const emailService = new EmailService();
    useEffect(() => {
        aplicacionService.getAplicacion().then(data => setAplicacion(data));
    }, []);
    useEffect(async() => {
        if(id_aplicacion != null)
            menuService.getMenus(id_aplicacion).then(data => {
                if(data == "error"){
                    const userName = localStorage.getItem("userName");
                    toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Menu ', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                    const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es aplicacion/"+ id_aplicacion +"/menu/0.Se invoco el método listar menu .Se notifico el error con el usuario "+userName;
                    emailService.getSendEmail("Módulo Menu ",mensaje);
                }else{
                    setMenus(data)
                }


            });
    }, [count]);
    useEffect(async() => {
        if(id_menu != null)
            menuService.getSubMenus(id_menu).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Sub Menu ', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es submenu/listId/"+ id_menu +".Se invoco el método listar menu .Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Sub Menu ",mensaje);
            }
                setSubMenus(data)

        });
    }, [countSubmenu]);
    const openNew = () => {
        setMenu(emptyMenu);
        setSubmitted(false);
        setProductDialog(true);

    }
    const openNewSubMenu = () => {
        setSubMenu(emptySubMenu);
        setSubmitted(false);
        setNewSubMenuDialog(true);

    }
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setSubMenuDialog(false);
        setNewSubMenuDialog(false);
    }
    const hideDialogAplicacion = () => {
       // setAplicacionDialog(false);
    }
    const hideDialogSubMenu = () => {
        setNewSubMenuDialog(false);
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    const hideDeleteSubMenuDialog = () => {
        setDeleteSubMenuDialog(false);
    }
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (menu.titulo.trim()) {
            let _menu = { ...menu };
            if (menu.id_menu) {
                const index = findIndexById(menu.id_menu);
                menuService.putMenu(menu.id_menu,_menu).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Menu ', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es menu/update/"+ menu.id_menu +".Se invoco el método actualizar menu .Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Menu ",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Menu  Actualizado', life: 3000 });
                    }
                    setMenu(data)
                    setCount(count + 1)
                });

            }
            else {

                _menu.titulo = menu.titulo
                _menu.icono = "ADMIN.ICO"
                _menu.descripcion = menu.descripcion
                _menu.urn = menu.urn
                _menu.orden = menu.orden
                _menu.id_estado = 1;

                menuService.postMenu(id_aplicacion,_menu).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Menu ', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es aplicacion/"+ id_aplicacion +"/menu/create.Se invoco el método guardar menu .Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Menu ",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Menu  Creado', life: 3000 });
                    }
                    setAplicacion(data)
                    setCount(count + 1)
                });

            }

            setProductDialog(false);
            setMenu(emptyMenu);
        }
    }
    const aceptarAplicacion= () => {
        if(id_aplicacion != null) {
        menuService.getMenus(id_aplicacion).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Menu ', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es aplicacion/"+ id_aplicacion +"/menu/0.Se invoco el método listar menu .Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Menu ",mensaje);
            }else{
                setMenus(data)
            }


        });
        setAplicacionDialog(false);
        }else{
            setAplicacionDialog(true);
        }

    }
    const saveSubMenu = () => {
        setSubmitted(true);

        if (subMenu.titulo.trim()) {
            let _subMenus = [...subMenus];
            let _subMenu = { ...subMenu };
            if (subMenu.id_menu) {
                const index = findIndexById(subMenu.id_menu);
                menuService.putMenu(subMenu.id_menu,_subMenu).then(data => {
                    setSubMenu(data)
                    setCountSubmenu(countSubmenu + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {

                _subMenu.titulo = subMenu.titulo
                _subMenu.icono = "ADMIN.ICO"
                _subMenu.descripcion= subMenu.descripcion
                _subMenu.urn = subMenu.urn
                _subMenu.orden = subMenu.orden
                _subMenu.id_estado = 1
                _subMenu.padre_id = id_menu
                menuService.postMenu(id_aplicacion,_subMenu).then(data => {
                    setSubMenu(data)
                    setCountSubmenu(countSubmenu + 1)
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setSubMenus(_subMenus);
            setSubMenuDialog(true);
            setNewSubMenuDialog(false);
            setSubMenu(emptySubMenu);
        }
    }

    const editProduct = (menu) => {
        //setProduct({ ...product });
        console.log(menu);
        setMenu({ ...menu });
        setProductDialog(true);
    }
    const dialogSubMenu = (menu) => {
        //setProduct({ ...product });
       // let _subMenus = [...subMenus];
       // let _subMenu = { ...subMenu };
        console.log("menu id"+ menu.id_menu);
        setId_menu(menu.id_menu);
       menuService.getSubMenus(menu.id_menu).then(data => setSubMenus(data));
      //  setMenu({ ...menu });
        setSubMenuDialog(true);
    }
    const editSubMenu = (subMenu) => {
        //setProduct({ ...product });
      //  setRol({ ...rol });
        console.log("subMenu");
        console.log(subMenu);
        setSubMenu({ ...subMenu });
        setNewSubMenuDialog(true);
    }
    const confirmDeleteProduct = (rol) => {
        // setProduct(product);
        setMenu(rol);
        setDeleteProductDialog(true);
    }
    const confirmDeleteSubMenu = (subMenu) => {
        // setProduct(product);
        setSubMenu(subMenu);
        setDeleteSubMenuDialog(true);
    }
    const deleteProduct = () => {
        let _rols = menus.filter(val => val.id_menu !== menu.id_menu);
        setMenus(_rols);
        setDeleteProductDialog(false);
        //   setProduct(emptyProduct);

        menuService.deleteMenu(menu.id_menu).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Menu ', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es menu/delete/"+ menu.id_menu +".Se invoco el método eliminar menu .Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Menu ",mensaje);
            }else{
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Menu  Eliminado', life: 3000 });
            }

            setCount(count + 1)
        });

        setMenu(emptyMenu);
    }
    const deleteSubMenu = () => {
        let _subMenus = subMenus.filter(val => val.id_submenu !== subMenu.id_submenu);
        setSubMenus(_subMenus);
        setDeleteSubMenuDialog(false);
        //   setProduct(emptyProduct);

        menuService.deleteMenu(subMenu.id_menu).then(response =>setCountSubmenu(countSubmenu + 1));
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'SubMenu Eliminado', life: 3000 });
        setSubMenu(emptySubMenu);
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
        let _rols = menus.filter(val => !selectedProducts.includes(val));
        setMenus(_rols);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }
/*
    const onCategoryChange = (e) => {
        let _rol = { ...menu };
        _rol['category'] = e.value;
        //   setProduct(_product);
        setMenu(_rol);
    }
*/
    const onOrdenChange = (e) =>{

        //setOrden(e.value)
        let _menu = { ...menu };
        _menu[`${'orden'}`] = e.value;

        setMenu(_menu);
        console.log(_menu);
    }
    const onOrdenChangeSubMenu = (e) =>{

        //setOrden(e.value)
        let _subMenu = { ...subMenu };
        _subMenu[`${'orden'}`] = e.value;

        setSubMenu(_subMenu);
        console.log(_subMenu);
    }
    const onEstadoChange = (e) =>{

        //setState(e.value)
        let _menu = { ...menu };
        _menu[`${'id_estado'}`] = e.value;

        setMenu(_menu);
        console.log(_menu);
    }
    const onEstadoChangeSubMenu = (e) =>{

        //setState(e.value)
        let _subMenu = { ...subMenu };
        _subMenu[`${'id_estado'}`] = e.value;

        setSubMenu(_subMenu);
        console.log(_subMenu);
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
        let _menu = { ...menu };
        _menu[`${name}`] = val;

        setMenu(_menu);
        console.log(_menu);
    }
    const onInputChangeSubMenu = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _subMenu = { ...subMenu };
        _subMenu[`${name}`] = val;

        setSubMenu(_subMenu);
        console.log(_subMenu);
    }
/*
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _rol = { ...menu };
        _rol[`${name}`] = val;

        setMenu(_rol);
    }
*/
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-danger mr-2" onClick={openNew} />

                </div>
            </React.Fragment>
        )
    }
    const leftToolbarSubMenuTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-danger mr-2" onClick={openNewSubMenu} />

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
                {rowData.id_menu}
            </>
        );
    }
    const idBodyTemplateSubMenu = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id_menu}
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
    const ordenBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.orden}
            </>
        );
    }
    const aplicacionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.id_aplicacion}
            </>
        );
    }
/*
    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }*/

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
                <span className={`product-badge`}>{rowData.id_estado == true?"Activo":"Inactivo"}</span>
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
    const actionSubMenuTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-danger mr-2" onClick={() => editSubMenu(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteSubMenu(rowData)} />
            </div>
        );
    }
    const actionMenuTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-align-justify" className="p-button-rounded p-button-success mr-2" onClick={() => dialogSubMenu(rowData)} />

            </div>
        );
    }
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Menu</h5>
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
    const subMenuDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveSubMenu} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteSubMenuDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteSubMenuDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSubMenu} />
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

                    <DataTable ref={dt} value={menus} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No hay registros" header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Nombre" filterField="titulo" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>


                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>

                        <Column header="Sub Menu" body={actionMenuTemplate}></Column>
                        <Column header="Acciones" body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog visible={subMenuDialog} style={{ width: '650px' }} header="Sub Menu" modal className="p-fluid"  onHide={hideDialog}>
                        <Toolbar className="mb-4" left={leftToolbarSubMenuTemplate} right={rightToolbarTemplate}></Toolbar>
                        <DataTable ref={dt} value={subMenus} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                   globalFilter={globalFilter} emptyMessage="No products found."  responsiveLayout="scroll">

                            <Column field="Id" header="Id" sortable body={idBodyTemplateSubMenu} headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                            <Column field="name" header="Nombre" filterField="titulo"  sortable body={nameBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                            <Column field="name" header="Orden" sortable body={ordenBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                            <Column header="Acciones" body={actionSubMenuTemplate}></Column>
                        </DataTable>

                    </Dialog>
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Menu" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={menu.titulo} onChange={(e) => onInputChange(e, 'titulo')} required autoFocus className={classNames({ 'p-invalid': submitted && !menu.titulo })} />
                            {submitted && !menu.titulo && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="description" value={menu.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="name">URL</label>
                            <InputText id="name" value={menu.urn} onChange={(e) => onInputChange(e, 'urn')} required autoFocus className={classNames({ 'p-invalid': submitted && !menu.urn })} />
                            {submitted && !menu.url && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Orden</label>


                            <InputNumber inputId="horizontal" value={menu.orden} onValueChange={(e) => onOrdenChange(e)} showButtons buttonLayout="horizontal" step={1} min={1} max={100}
                                         decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" />
                        </div>
                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={menu.id_estado == 1?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>
                    <Dialog visible={newSubMenuDialog} style={{ width: '450px' }} header="Nuevo Sub Menu" modal className="p-fluid" footer={subMenuDialogFooter} onHide={hideDialogSubMenu}>

                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={subMenu.titulo} onChange={(e) => onInputChangeSubMenu(e, 'titulo')} required autoFocus className={classNames({ 'p-invalid': submitted && !subMenu.titulo })} />
                            {submitted && !subMenu.titulo && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="descripcion" value={subMenu.descripcion} onChange={(e) => onInputChangeSubMenu(e, 'descripcion')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="name">URL</label>
                            <InputText id="name" value={subMenu.urn} onChange={(e) => onInputChangeSubMenu(e, 'urn')} required autoFocus className={classNames({ 'p-invalid': submitted && !subMenu.urn })} />
                            {submitted && !subMenu.urn && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Orden</label>
                            <InputNumber inputId="horizontal" value={subMenu.orden} onValueChange={(e) => onOrdenChangeSubMenu(e)} showButtons buttonLayout="horizontal" step={1} min={1} max={100}
                                         decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" />
                        </div>
                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={subMenu.id_estado}
                                onChange={e =>onEstadoChangeSubMenu(e)}
                            />
                        </div>

                    </Dialog>
                    <Dialog visible={aplicacionDialog} style={{ width: '450px' }} header="Menu" modal className="p-fluid" footer={aplicacionDialogFooter} onHide={hideDialogAplicacion}>


                        <div className="field">
                            <label htmlFor="name">Aplicación</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={id_aplicacion}
                                options={aplicacion}
                                onChange={e =>
                                    onAplicacionChange(e)

                                }
                                optionValue="id_aplicacion"
                                optionLabel="nombre"
                                placeholder='Seleccione aplicación'
                            />
                        </div>


                    </Dialog>
                    <Dialog visible={deleteSubMenuDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteSubMenuDialogFooter} onHide={hideDeleteSubMenuDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {subMenu && <span> Deseas  eliminar el sub menu de <b>{subMenu.titulo}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {menu && <span> Deseas  eliminar el  menu de <b>{menu.titulo}</b>?</span>}
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
