// material-ui
import { sha256 } from 'js-sha256';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import {useState ,useRef} from 'react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setList } from '../../store/action/wtq1Actions';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

const Index = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({});

    const [productDetail, setProductDetail] = useState(null);

    const [listSatuan, setListSatuan] = useState([{id:0}]);
    const [satuan, setSatuan] = useState({});
    const [password, setPassword] = useState(true);


    const rolesList = useSelector((state) => state.wtq1.list);

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;
        value = (name == 'password') ? sha256(value) : value;

		setProductDetail({ ...productDetail, [name]: value });
	};

    const handleInputsSatuan = (e, item) => {
		let name, value;
        value = e.target.value;
		var arr = e.target.name.split("_");
        var dataSatuan = [];

        // if(satuan[arr[1]]) {
        //     satuan[arr[1]][arr[0]] = value
        // }
        // else{
        //     satuan[arr[1]] = {};
        //     satuan[arr[1]][arr[0]] = value
        // }
        productDetail.satuan.map(item2 => {
            if(item2._id == item._id){
                item[arr[0]] = value;
                dataSatuan.push(item)
            }
            else{
                dataSatuan.push(item2)
            }
        });

        productDetail.satuan = dataSatuan;
        


        console.log("apa ya", item[arr[0]], arr);

        setProductDetail({ ...productDetail, satuan: dataSatuan});
	};

    const loadList = async () => {
        const response = await axios
            .get(`/api/product/`+id)
            .then((res) => res)
            .catch((err) => err.response);

        dispatch(setProductDetail(response.data));
        dispatch(setListSatuan(response.data.satuan));
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

            await axios.post("/api/product/"+id, productDetail);
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

    console.log("detail => ", productDetail);

    return (
        
        <MainCard title="Product Edit">
            { productDetail ? 
                <form>
                    <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="text"
                        name="name"
                        value={productDetail.name}
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
                        value={productDetail.sublini}
                        variant="outlined"
                        onChange={handleInputs}
                    />

                    <br />
                    <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="text"
                        name="volume"
                        label="Valume"
                        value={productDetail.volume}
                        variant="outlined"
                        onChange={handleInputs}
                    />

                    <br />
                    <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="text"
                        name="barcode"
                        label="Barcode"
                        value={productDetail.barcode}
                        variant="outlined"
                        onChange={handleInputs}
                    />
                    <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="text"
                        name="sku"
                        label="SKU"
                        value={productDetail.sku}
                        variant="outlined"
                        onChange={handleInputs}
                    />
                    {productDetail.satuan.map((item, index) => (
                        <Grid key={item._id} container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    style={{ width: "100%", margin: "5px" }}
                                    type="text"
                                    name={"name_"+(index+1)}
                                    label={"Satuan "+(index+1)}
                                    value={item.name}
                                    variant="outlined"
                                    onChange={(e) => handleInputsSatuan(e, item)}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    style={{ width: "100%", margin: "5px" }}
                                    type="number"
                                    name={"jml_"+(index+1)}
                                    label={"Qty "+(index+1)}
                                    value={item.jml}
                                    variant="outlined"
                                    onChange={(e) => handleInputsSatuan(e, item)}
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
                </form> : 'Loading...'
            }
        </MainCard>
    );
};

export default Index;
