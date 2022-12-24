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
                            name: 'No',
                            selector: (row, meta) => meta+1
                        },{
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
                {/* <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>No.</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Item Code</strong>
                                </TableCell>
                                
                                <TableCell>
                                    <strong>Description</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Qty</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Uom Code</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>ShipDate</strong>
                                </TableCell>
                                <TableCell align="right">
                                    <strong>Action</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wq1List &&
                                wq1List.map(
                                    (item, index) => (
                                            <TableRow hover role="checkbox" key="index">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{item.ItemCode}</TableCell>
                                                <TableCell>{item.Dscription}</TableCell>
                                                <TableCell>{item.Qunatity}</TableCell>
                                                <TableCell>{item.UomCode}</TableCell>
                                                <TableCell>{item.ShipDate}</TableCell>
                                                <TableCell align="right">
                                                    <button type="button" title="View" className="btn btn-round btn-success btn-sm">
                                                        <i className="feather icon-eye"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title="Update"
                                                        onClick={() => edit(item)}
                                                        className="btn btn-round btn-warning btn-sm ml-1"
                                                    >
                                                        <i className="feather icon-upload"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleClickOpen(item)}
                                                        type="button"
                                                        title="Delete"
                                                        className="btn btn-round btn-danger btn-sm ml-1"
                                                    >
                                                        <i className="feather icon-trash"></i>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer> */}
                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Jumlah per halaman"
                /> */}
            </Paper>
        </MainCard>
    );
};

export default Index;
