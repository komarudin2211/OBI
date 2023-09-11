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

    const loadList = async () => {
        const response = await axios
            .get(`/api/user/list`)
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
                            name: 'Name',
                            selector: row => row.fullname,
                        }, {
                            name: 'Date',
                            selector: row => row.signUpDate,
                        }]} 
                    /> : ""
                }
            </Paper>
        </MainCard>
    );
};

export default Index;
