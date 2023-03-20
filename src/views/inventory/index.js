// material-ui

import DataTable from 'react-data-table-component';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';

import React, { useEffect } from 'react';
import axios from 'axios';
import { setList } from '../../store/action/wtq1Actions';

import Paper from '@mui/material/Paper';
var JsBarcode = require('jsbarcode');

const Index = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = React.useState(false);
    const wq1List = useSelector((state) => state.wtq1.list);

    const focusTextInput = () => {
        JsBarcode(".barcode").options({width:2}).init();
    };

    const loadList = async () => {
        const response = await axios
            .get(`/api/inventory/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data));
    };

    useEffect(() => {
        loadList();
    }, []);
    

    return (
        <MainCard title="Barcode List">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {wq1List ? 
                    <DataTable
                        pagination
                        data={wq1List}
                        columns={[{
                            name: 'Product name',
                            selector: row => (row.product) ? row.product.name : 'kosong',
                        }, {
                            name: 'Gudang',
                            selector: row => (row.warehouse) ? row.warehouse.name : 'kosong',
                        }, {
                            name: 'Qty',
                            grow: 2,
                            selector: row => (row.satuan && row.satuan.length > 0) ? <div>{row.satuan.map((item) =>  <ul>
                                <li>{(item.qtyStock == item.jmlStock) ? (<><b>{(item.jmlStock) ? item.jmlStock : 0}</b> Pcs</>) : (<><b>{(item.qtyStock) ? item.qtyStock : 0}</b> {item.name} / <b>{item.jmlStock}</b> Pcs</>)}</li>
                            </ul>)}</div> : "kosong"
                        }, {
                            name :' Expire Date',
                            selector: row => row.expireDate
                        }, {
                            name: 'Action',
                            selector: row => (<a href={"product-edit/"+row._id}>edit</a>)
                        }]} 
                    /> : ""
                }
            </Paper>
        </MainCard>
    );
};

export default Index;
