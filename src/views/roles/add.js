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

    const [roles, setRoles] = useState({
		name:''
	});

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;

		setRoles({ ...roles, [name]: value });
	};

    const loadList = async () => {
        const response = await axios
            .get(`/api/roles/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data.data));
    };

    useEffect(() => {
        loadList();
    }, []);

    const handleSubmit = async (e) => {
        try {
            await axios.post("/api/roles/add", roles);
            location.href="/roles-list";
        }catch(err){
            alert(err.message);
        }
    }

    return (
        <MainCard title="Roles Add">
            <form>
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="name"
                    label="Roles Name"
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
