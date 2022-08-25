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
import {Calendar} from "primereact/calendar";
import {PersonaService} from "../service/PersonaService";
import {AplicacionService} from "../service/AplicacionService";
import {TipoDocumentoService} from "../service/TipoDocumentoService";
import {SexoService} from "../service/SexoService";
import { addLocale } from 'primereact/api';
import {EmailService} from "../service/EmailService";

const Persona = () => {

    let emptyPersona = {

        numero: '',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nac: '',
        sexo: '',
        id_estado: true,

    };


    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;


    const [date3, setDate3] = useState(null);


    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    let invalidDates = [today];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    const dateTemplate = (date) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }

        return date.day;
    }
    const [idSexo, setIdSexo] = useState(null);
    const [idTipoDocumento, setIdTipoDocumento] = useState(null);
    const [personas, setPersonas] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [persona, setPersona] = useState(emptyPersona);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const[state,setState]= useState({checked1:false});
    const[aplicacion,setAplicacion] = useState(null);
    const[tipoDocumento, setTipoDocumento] = useState(null);
    const[sexo, setSexo] = useState(null);
    const [count,setCount] = useState(0);
    const personaService = new PersonaService();
    const tipoDocumentoService = new TipoDocumentoService();
    const sexoService = new SexoService();
    const emailService = new EmailService();
    useEffect(() => {

        personaService.getPersonas().then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es documento/9/persona/list.Se invoco el método guardar persona.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Persona",mensaje);
            }else{
                setPersonas(data)
            }


        });
        tipoDocumentoService.getTipoDocumento().then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es documentoTipo/list.Se invoco el método listar tipo documento.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Persona",mensaje);
            }
            setTipoDocumento(data)

        });
        sexoService.getSexo().then(data => setSexo(data));
    }, []);

    useEffect(async() => {

        personaService.getPersonas().then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es documento/9/persona/list.Se invoco el método guardar persona.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Persona",mensaje);
            }else{
                setPersonas(data)
            }


        });
    }, [count]);

    const openNew = () => {

        setPersona(emptyPersona);
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

    const saveProduct = () => {
        setSubmitted(true);

        if (persona.nombres.trim()) {
            let _personas = [...personas];
            let _persona = { ...persona };
            if (persona.id_persona) {

                personaService.putPersona(persona.id_persona,_persona).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es persona/update/"+persona.id_persona+".Se invoco el método actualizar persona.Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Persona",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Unidad Persona', life: 3000 });
                    }
                    setPersona(data)
                    setCount(count + 1)
                });

            }
            else {

                _persona.numero = persona.numero
                _persona.nombres = persona.nombres
                _persona.apellido_paterno = persona.apellido_paterno
                _persona.apellido_materno = persona.apellido_materno
                _persona.fecha_nac = persona.fecha_nac
                _persona.sexo = persona.sexo
                _persona.id_estado = "1"

                personaService.postPersona(idTipoDocumento,_persona).then(data => {
                    if(data == "error"){
                        const userName = localStorage.getItem("userName");
                        toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                        const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es documento/"+idTipoDocumento+"/persona/create.Se invoco el método guardar persona.Se notifico el error con el usuario "+userName;
                        emailService.getSendEmail("Módulo Persona",mensaje);
                    }else{
                        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Unidad Persona', life: 3000 });
                    }
                    setPersona(data)
                    setCount(count + 1)
                });

            }

             setPersonas(_personas);
            setProductDialog(false);
            setPersona(emptyPersona);
        }
    }

    const editProduct = (persona) => {
        setIdTipoDocumento(persona.id_documento)
        setIdSexo(persona.sexo);
        setPersona({ ...persona });

        setProductDialog(true);
    }

    const confirmDeleteProduct = (usuario) => {
        // setProduct(product);
        setPersona(usuario);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _usuarios = personas.filter(val => val.id_persona !== persona.id_persona);
        setPersonas(_usuarios);
        setDeleteProductDialog(false);
        //   setProduct(emptyProduct);
        personaService.deletePersona(persona.id_persona).then(data => {
            if(data == "error"){
                const userName = localStorage.getItem("userName");
                toast.current.show({ severity: 'warn', summary: 'Alerta Módulo Persona', detail: 'Existe inconvenientes en la aplicación,se ha notificado con un correo a soporte para su solución', life: 5000 });
                const mensaje = "Se describe el problema ocurrido en el sistema de seguridad. El servicio afectado es persona/delete/"+persona.id_persona+".Se invoco el método eliminar persona.Se notifico el error con el usuario "+userName;
                emailService.getSendEmail("Módulo Persona",mensaje);
            }else{
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Persona Eliminada', life: 3000 });
            }

            setCount(count + 1)
        });

        setPersona(emptyPersona);

    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < personas.length; i++) {
            if (personas[i].id_persona === id) {
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
        let _usuarios = personas.filter(val => !selectedProducts.includes(val));
        setPersonas(_usuarios);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _usuario = { ...persona };
        _usuario['category'] = e.value;
        //   setProduct(_product);
        setPersona(_usuario);
    }

    const onInputChange = (e, name) => {

        const val = (e.target && e.target.value) || '';

        let _usuario = { ...persona };
        _usuario[`${name}`] = val;

        setPersona(_usuario);
    }
    const onInputChangeCalendar = (e, name) => {

        const val = formatDate(e.target.value);
          console.log(val);
        let _usuario = { ...persona };
        _usuario[`${name}`] = val;

        setPersona(_usuario);
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const onEstadoChange = (e) =>{

        setState(e.value)
        let _persona = { ...persona };
        _persona[`${'id_estado'}`] = e.value;

        setPersona(_persona);
        console.log(_persona);
    }
    const onTipoDocumentoChange = (e) =>{

     //   setSelectedAplicacion(e.value)
       // let _persona = { ...persona };
      //  _persona[`${'id_documento'}`] = e.value;
        console.log(e.value);
        setIdTipoDocumento(e.value);
      //  setPersona(_persona);
      //  console.log(_persona);
    }
    const onSexoChange = (e) =>{

        //   setSelectedAplicacion(e.value)
        let _persona = { ...persona };
        _persona[`${'sexo'}`] = e.value;

        setPersona(_persona);
       // console.log(_persona);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _usuario = { ...persona };
        _usuario[`${name}`] = val;

        setPersona(_usuario);
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
                <span className="p-column-title">Nombres</span>
                {rowData.nombres}
            </>
        );
    }
    const tipoDocumentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombres</span>
                {rowData.id_documento}
            </>
        );
    }
    const nroDocumentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombres</span>
                {rowData.numero}
            </>
        );
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
            <h5 className="m-0">Persona</h5>
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

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={personas} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={globalFilter} emptyMessage="No hay registros" header={header} responsiveLayout="scroll">

                        <Column field="Id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>

                        <Column field="Nombre" header="Nro Documento" sortable body={nroDocumentoBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="Nombre" header="Nombre" filterField="nombres" sortable body={nameBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                        <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Persona" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Tipo Documento</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={idTipoDocumento}
                                options={tipoDocumento}
                                onChange={e =>
                                    onTipoDocumentoChange(e)

                                }
                                optionValue="id_documento"
                                optionLabel="descripcion"
                                placeholder='Seleccione Tipo Documento'
                            />
                        </div>

                        <div className="field">
                                    <label htmlFor="name">Numero Documento</label>
                                    <InputText id="name" value={persona.numero} onChange={(e) => onInputChange(e, 'numero')} required autoFocus className={classNames({ 'p-invalid': submitted && !persona.numero })} />
                                    {submitted && !persona.numero && <small className="p-invalid">Ingresar Numero Documento</small>}

                        </div>
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={persona.nombres} onChange={(e) => onInputChange(e, 'nombres')} required autoFocus className={classNames({ 'p-invalid': submitted && !persona.nombres })} />
                            {submitted && !persona.nombres && <small className="p-invalid">Ingresar Nombre</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Apellido Paterno</label>
                            <InputText id="name" value={persona.apellido_paterno} onChange={(e) => onInputChange(e, 'apellido_paterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !persona.apellido_paterno })} />
                            {submitted && !persona.apellido_paterno && <small className="p-invalid">Ingresar Apellido Paterno</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Apellido Materno</label>
                            <InputText id="name" value={persona.apellido_materno} onChange={(e) => onInputChange(e, 'apellido_materno')} required autoFocus className={classNames({ 'p-invalid': submitted && !persona.apellido_materno })} />
                            {submitted && !persona.apellido_materno && <small className="p-invalid">Ingresar Apellido Materno</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Fecha Nacimiento</label>
                            <Calendar id="name" dateFormat='dd/mm/yy' value={persona.fecha_nac} onChange={(e) => onInputChangeCalendar(e, 'fecha_nac')} showIcon />

                        </div>
                        <div className="field">
                            <label htmlFor="name">Sexo</label>
                            <Dropdown
                                style={{ width: 405 }}
                                value={idSexo}
                                options={sexo}
                                onChange={e =>
                                    onSexoChange(e)

                                }
                                optionValue="id"
                                optionLabel="nombre"
                                placeholder='Seleccione Sexo'
                            />
                        </div>
                        <div className="field">
                            <label className="mb-3">Estado</label>
                            <InputSwitch
                                checked={persona.id_estado==1?true:false}
                                onChange={e =>onEstadoChange(e)}
                            />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {persona && <span> Deseas  eliminar  a la persona de <b>{persona.nombres}</b>?</span>}
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

export default React.memo(Persona, comparisonFn);
