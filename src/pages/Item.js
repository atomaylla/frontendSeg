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

const Item = () => {
    /*let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };*/
    let emptyRol = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    //const [products, setProducts] = useState(null);
    const [rols, setRols] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [subMenuDialog, setSubMenuDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    // const [product, setProduct] = useState(emptyProduct);
    const [rol, setRol] = useState(emptyRol);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:false});
    const[apli, setApli] = useState({
        citySelectItems: [
            { label: 'MENU', value: 'MENU' },
            { label: 'SUB MENU', value: 'SUB MENU' },

        ],
        city: ''
    });
    useEffect(() => {
        //   const productService = new ProductService();
        //    productService.getProducts().then(data => setProducts(data));

        const rolService = new RolService();
        rolService.getRols().then(data => setRols(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        // setProduct(emptyProduct);
        setRol(emptyRol);
        setSubmitted(false);
        setProductDialog(true);

    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setSubMenuDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (rol.name.trim()) {
            let _rols = [...rols];
            let _rol = { ...rol };
            if (rol.id) {
                const index = findIndexById(rol.id);

                _rols[index] = _rol;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _rol.id = createId();
                _rol.image = 'product-placeholder.svg';
                _rols.push(_rol);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            // setProducts(_products);
            setProductDialog(false);
            //setProduct(emptyProduct);
        }
    }

    const editProduct = (rol) => {
        //setProduct({ ...product });
        setRol({ ...rol });
        setProductDialog(true);
    }
    const editMenu = (rol) => {
        //setProduct({ ...product });
        setRol({ ...rol });
        setSubMenuDialog(true);
    }
    const confirmDeleteProduct = (rol) => {
        // setProduct(product);
        setRol(rol);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _rols = rols.filter(val => val.id !== rol.id);
        setRols(_rols);
        setDeleteProductDialog(false);
        //   setProduct(emptyProduct);
        setRol(emptyRol);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _rol = { ...rol };
        _rol[`${name}`] = val;

        setRol(_rol);
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
                {rowData.id}
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
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
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
            <h5 className="m-0">Item</h5>

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
                               globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>


                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>

                        <Column header="Sub Menu" body={actionMenuTemplate}></Column>
                        <Column header="Acciones" body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog visible={subMenuDialog} style={{ width: '550px' }} header="Sub Menu" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <DataTable ref={dt} value={rols} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                   globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">

                            <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                            <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                            <Column header="Acciones" body={actionBodyTemplate}></Column>
                        </DataTable>

                    </Dialog>
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Nuevo Item" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Tipo Item</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={apli.city}
                                options={apli.citySelectItems}
                                onChange={e => {
                                    setApli({ city: e.value });
                                }}
                                placeholder='Seleccione Tipo'
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={rol.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !rol.name })} />
                            {submitted && !rol.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="description" value={rol.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="name">URL</label>
                            <InputText id="name" value={rol.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !rol.name })} />
                            {submitted && !rol.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Orden</label>
                            <InputText id="name" value={rol.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !rol.name })} />
                            {submitted && !rol.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={state.checked1}
                                onChange={e => setState({ checked1: e.value })}
                            />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {rol && <span> Deseas  eliminar el rol de <b>{rol.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {rol && <span>Are you sure you want to delete the selected products?</span>}
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

export default React.memo(Item, comparisonFn);
