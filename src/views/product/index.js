// material-ui
import { Typography } from '@mui/material';
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
        JsBarcode(".barcode").init();
    };

    const loadList = async () => {
        const response = await axios
            .get(`/api/product/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data));
    };

    useEffect(() => {
        JsBarcode(".barcode").init();
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
                            name: 'Sublini',
                            selector: row => row.sublini,
                        }, {
                            name: 'Product Name',
                            selector: row => row.name,
                        }, {
                            name: 'Volume',
                            selector: row => row.volume,
                        }, {
                            name: 'Barcode',
                            selector: row => <svg class="barcode" ref={focusTextInput} jsbarcode-value={row.barcode} ></svg>,
                        }, {
                            name: 'Satuan',
                            selector: row => (row.satuan.length > 0) ? <div>{row.satuan.map((item) => <ol><li>Name : {item.name}</li><li>Qty : {item.jml}</li></ol>)}</div> : "kosong"
                        }]} 
                    /> : ""
                }
            </Paper>
        </MainCard>
    );
};

export default Index;
