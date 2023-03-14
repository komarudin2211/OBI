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
        JsBarcode(".barcode").options({width:2}).init();
    };

    const loadList = async () => {
        const response = await axios
            .get(`/api/history/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data));
    };

    useEffect(() => {
        loadList();
    }, []);
    
console.log("aia", wq1List)
    return (
        <MainCard title="History List">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {wq1List ? 
                    <DataTable
                        pagination
                        data={wq1List}
                        columns={[{
                            name: 'Name',
                            selector: row => row.pic
                        }, {
                            name: 'Type',
                            selector: row => row.type
                        }, {
                            width:"20%",
                            name: 'Descripsi',
                            selector: row => (row.text.data.satuan) ? row.text.data.satuan.map((item) => (item.qtyStock) ? (<div>{row.text.type} <b>{item.qtyStock}</b> {item.name}</div>) : '') : row.text.data.toString()
                        }, {
                            name :'Date',
                            selector: row => row.createDate,
                        }]} 
                    /> : ""
                }
            </Paper>
        </MainCard>
    );
};

export default Index;
