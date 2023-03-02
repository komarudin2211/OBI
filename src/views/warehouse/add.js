// material-ui
import { sha256 } from 'js-sha256';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import {useState ,useRef} from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { setList } from '../../store/action/wtq1Actions';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const Index = () => {
    const dispatch = useDispatch();

    const [warehouse, setWarehouse] = useState({
		name:''
	});

    const warehouseList = useSelector((state) => state.wtq1.list);

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;
        value = (name == 'password') ? sha256(value) : value;

		setWarehouse({ ...warehouse, [name]: value });
	};

    const loadList = async () => {
        const response = await axios
            .get(`/api/warehouse/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data));
    };

    useEffect(() => {
        loadList();
    }, []);

    const handleSubmit = async (e) => {
        try {

            await axios.post("/api/warehouse/add", warehouse);
            location.href="/warehouse-list";
        }catch(err){
            alert(err.message);
        }
    }

    return (
        <MainCard title="User Add">
            <form>
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="name"
                    label="Nama"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="pic"
                    label="Pic"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="lokasi"
                    label="Lokasi"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <Button variant="contained" onClick={handleSubmit} sx={{m:2}} style={{float: 'right'}} color="primary">
                    SAVE
                </Button>
            </form>
        </MainCard>
    );
};

export default Index;
