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
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';

const Index = () => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
		name:''
	});

    const [listSatuan, setListSatuan] = useState([{id:0}]);
    const [satuan, setSatuan] = useState({});
    const [password, setPassword] = useState(true);


    const rolesList = useSelector((state) => state.wtq1.list);

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;
        value = (name == 'password') ? sha256(value) : value;

		setProduct({ ...product, [name]: value });
	};

    const handleInputsSatuan = (e) => {
		let name, value;
        value = e.target.value;
		var arr = e.target.name.split("_");
        var dataSatuan = [];

        console.log(arr[0], arr[1], value);

        if(satuan[arr[1]]) {
            satuan[arr[1]][arr[0]] = value
        }
        else{
            satuan[arr[1]] = {};
            satuan[arr[1]][arr[0]] = value
        }

        setSatuan(satuan);
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
            var arrSatuan = [];
            for(var key in satuan){
                arrSatuan.push(satuan[key]);
            }

            product['satuan'] = arrSatuan;

            await axios.post("/api/product/add", product);
            location.href="/product-list";
        }catch(err){
            alert(err.message);
        }
    }

    const changeSatuan = async(type, id, data) => {
        if(type == 'delete') {
            var arr = []
            data.map((item) => {
                if(item.id != id){
                    arr.push(item)
                }
            });

            setListSatuan(arr);
        }
        else{
            setListSatuan( arr => [...arr, {id: Date.now()}]);
        }
    }

    const handleMouseDownPassword =  async(e) => {
        console.log("anu");
    }

    return (
        <MainCard title="Product Add">
            <form>
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="sublini"
                    label="Sublini"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="volume"
                    label="Valume"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="barcode"
                    label="Barcode"
                    variant="outlined"
                    onChange={handleInputs}
                />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="sku"
                    label="SKU"
                    variant="outlined"
                    onChange={handleInputs}
                />
                {listSatuan.map((item, index) => (
                    <Grid key={item.id} container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="text"
                                name={"name_"+(index+1)}
                                label={"Satuan "+(index+1)}
                                variant="outlined"
                                onChange={handleInputsSatuan}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="number"
                                name={"jml_"+(index+1)}
                                label={"Qty "+(index+1)}
                                variant="outlined"
                                onChange={handleInputsSatuan}
                            />
                        </Grid>
                        {(index == 0) ?
                            (<Grid item xs={2}>
                                <Fab size="medium" color="secondary" aria-label="add">
                                    <AddIcon onClick={() => changeSatuan()} />
                                </Fab>
                            </Grid>) : (<Grid item xs={2}>
                                <Fab size="medium" color="secondary" aria-label="add">
                                    <CloseIcon onClick={() => changeSatuan("delete", item.id, listSatuan)} />
                                </Fab>
                            </Grid>)
                        }
                    </Grid>)
                    )
                }
                <br />

                <Button variant="contained" onClick={handleSubmit} sx={{m:2}} style={{float: 'right'}} color="primary">
                    SAVE
                </Button>
            </form>
        </MainCard>
    );
};

export default Index;
