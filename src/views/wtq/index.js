// material-ui
import { Typography } from '@mui/material';
import DataTable from 'react-data-table-component';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';

import React, { useEffect } from 'react';
import axios from 'axios';
import { setList } from '../../store/action/wtq1Actions';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';

const Index = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = React.useState(false);
    const wq1List = useSelector((state) => state.wtq1.list);

    const loadList = async () => {
        const response = await axios
            .get(`/api/wtq1/list`)
            .then((res) => res)
            .catch((err) => err.response);

        console.log('response ', response);
        dispatch(setList(response.data.data));
    };

    useEffect(() => {
        loadList();
    }, []);

    const columns = [{
        name: 'Item Code',
        selector: row => row.ItemCode,
    }];
    
    return (
        <MainCard title="WTQ 1">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {wq1List ? 
                    <DataTable
                        pagination
                        data={wq1List}
                        columns={[{
                            name: 'Item Code',
                            selector: row => row.ItemCode,
                        }, {
                            name: 'Description',
                            selector: row => row.Dscription
                        }, {
                            name: 'Qty',
                            selector: row => row.Quantity,
                        }, {
                            name: 'Uom Code',
                            selector: row => row.UomCode
                        }, {
                            name: 'Ship Date',
                            selector: row => row.ShipDate,
                        }, {
                            name: 'Doc Date',
                            selector: row => row.DocDate
                        }]}
                    /> : ""
                }
            </Paper>
        </MainCard>
    );
};

export default Index;
