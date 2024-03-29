import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import {UsuarioService} from "../service/UsuarioService";
import {PersonaService} from "../service/PersonaService";

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: .4
        }
    ]
};

const Dashboard = (props) => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null)

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then(data => setProducts(data));
    }, []);

    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);
/*
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };*/
    const [usuarios, setUsuarios] = useState(null);
    const usuarioService = new UsuarioService();
    useEffect(() => {

        usuarioService.getUsuarios().then(data => setUsuarios(data));
    }, []);

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Usuarios</span>
                            <div className="text-900 font-medium text-xl">152</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-user text-blue-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 nuevos</span>
                    <span className="text-500">Desde la ultima visita</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Entidades</span>
                            <div className="text-900 font-medium text-xl">50</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-map-marker text-orange-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%20+ </span>
                    <span className="text-500">Desde la ultima semana</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Personas</span>
                            <div className="text-900 font-medium text-xl">284</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">20  </span>
                    <span className="text-500">nuevos registros</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Aplicaciones</span>
                            <div className="text-900 font-medium text-xl">2</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-comment text-purple-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">1 </span>
                    <span className="text-500">nuevo registro</span>
                </div>
            </div>

            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>Usuarios</h5>
                    <DataTable value={usuarios} rows={5} paginator responsiveLayout="scroll">

                        <Column field="id" header="id" sortable style={{width: '35%'}} body={(data) => data.id_usuario}/>
                        <Column field="usuario" header="Nombre" sortable style={{width: '35%'}} body={(data) => data.usuario}/>
                        <Column header="Ver" style={{width:'15%'}} body={() => (
                            <>
                                <Button icon="pi pi-search" type="button" className="p-button-text"/>
                            </>
                        )}/>
                    </DataTable>
                </div>

            </div>


        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);
