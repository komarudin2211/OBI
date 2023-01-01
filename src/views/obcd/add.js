// material-ui
import Container from '@mui/material/Container';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import {useState ,useRef} from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { setList } from '../../store/action/wtq1Actions';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Index = () => {
    const dispatch = useDispatch();

    const [barcode, setBarcode] = useState({
		number:'',
		item_code:'',
        uom_entry:''
	});

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;

		setBarcode({ ...barcode, [name]: value });
	};

    const loadList = async () => {
        const response = await axios
            .get(`/api/obcd/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data.data));
    };

    useEffect(() => {
        loadList();
    }, []);

    const handleSubmit = async (e) => {
        try {
            await axios.post("/api/obcd/add", barcode);
            location.href="/obcd-list";
        }catch(err){
            alert(err.message);
        }
    }

    return (
        <MainCard title="Barcode Add">
            <form>
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="number"
                    label="Barcode Number"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    label="Item Code"
                    name="item_code"
                    variant="outlined"
                    onChange={handleInputs}
                />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="number"
                    label="Uom Entry"
                    name="uom_entry"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <Button variant="contained" onClick={handleSubmit} sx={{m:2}} style={{float: 'right'}} color="primary">
                    SAVE
                </Button>
            </form>
        </MainCard>
    );
};

export default Index;
