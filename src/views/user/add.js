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

    const [user, setUser] = useState({
		name:''
	});

    const rolesList = useSelector((state) => state.wtq1.list);

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;
        value = (name == 'password') ? sha256(value) : value;

		setUser({ ...user, [name]: value });
	};

    const loadList = async () => {
        const response = await axios
            .get(`/api/roles/list`)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setList(response.data));
    };

    useEffect(() => {
        loadList();
    }, []);

    const handleSubmit = async (e) => {
        try {

            await axios.post("/api/user/add", user);
            location.href="/user-list";
        }catch(err){
            alert(err.message);
        }
    }
console.log(rolesList);
    return (
        <MainCard title="User Add">
            <form>
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="fullname"
                    label="Fullname"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="re-password"
                    name="re-password"
                    label="Re-passowrd"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Roles"
                        name="roles"
                        onChange={handleInputs}
                    >
                        {(rolesList) ? rolesList.map((item) =>  <MenuItem for="rolesList" value={item._id}>{item.name}</MenuItem>) : <MenuItem for="rolesList" value="pilih">Pilih</MenuItem>}
                    </Select>
                </FormControl>

                <br />

                <Button variant="contained" onClick={handleSubmit} sx={{m:2}} style={{float: 'right'}} color="primary">
                    SAVE
                </Button>
            </form>
        </MainCard>
    );
};

export default Index;
