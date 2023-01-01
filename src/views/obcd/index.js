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
            .get(`/api/obcd/list`)
            .then((res) => res)
            .catch((err) => err.response);

        console.log('response ', response);
        dispatch(setList(response.data.data));
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
                            name: 'Barcode',
                            selector: row => <svg class="barcode" ref={focusTextInput} jsbarcode-value={row.BcdCode} ></svg>
                        
                        }, {
                            name: 'Item Code',
                            selector: row => row.ItemCode,
                        }, {
                            name: 'Uom Entry',
                            selector: row => row.UomEntry,
                        }, {
                            name: 'Update date',
                            selector: row => row.UpdateDate,
                        }]} 
                    /> : ""
                }
            </Paper>
        </MainCard>
    );
};

export default Index;
