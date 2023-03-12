// material-ui
import { sha256 } from 'js-sha256';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import {useState} from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { setList } from '../../store/action/wtq1Actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

import Html5QrcodePlugin from "./qrScanner";

const Index = () => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const warehouseList = useSelector((state) => state.wtq1.list);

    const handleInputs = (e) => {
		let name, value;
		name = e.target.name;
		value = (e.target.files) ? e.target.files[0] : e.target.value;
        value = (name == 'password') ? sha256(value) : value;

		setProduct({ ...product, [name]: value });
	};

    const handleInputsSatuan = (e, item) => {
		let name, value;
        value = e.target.value;
		var arr = e.target.name.split("_");
        var dataSatuan = [];

        product.satuan.map(item2 => {
            if(item2._id == item._id){
                item["jmlStock"] = value * item.jml;
                item["perkalian"] = item.jml;
                item["qtyStock"] = value;

                dataSatuan.push(item)
            }
            else{
                dataSatuan.push(item2)
            }
        });

        product.satuan = dataSatuan;

        setProduct({ ...product, satuan: dataSatuan});
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
            if(!product.warehouse){
                return alert('Gudang harus dipilih');
            }

            if(!product.expire_date){
                return alert('Tanggal expire harus dipilih');
            }

            var qty = 0;

            for(var i=0; i < product.satuan.length;  i++){
                if(product.satuan[i].qtyStock){
                    qty = product.satuan[i].qtyStock;
                }
            }

            if(qty == 0){
                return alert("Minimal qty satuan di isi satu");
            }

            await axios.post("/api/inventory/add", product);
            location.href="/inventory-list";
        }catch(err){
            alert(err.message);
        }
    }

    const onNewScanResult = async (decodedText, decodedResult) => {
        // handle decoded results here
 
        let data = await axios.get("/api/product/barcode/"+decodedText);

        if(data && data.data) {
            setProduct(data.data);
        }else{
            alert("barcode tidak dikenal, ", decodedText)
        }
       
        Html5QrcodePlugin.stop().then((ignore) => {
            alert("stop");
            // QR Code scanning is stopped.
        }).catch((err) => {
            alert("error");
        });
    };

    const onNewScanError =  (err) => {
        //alert(err);
    }

    return (
        <MainCard title="Product Add">
            <Html5QrcodePlugin
                fps={10}
                qrbox={{width: 300, height: 100}}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
                qrCodeErrorCallback={onNewScanError}
            />

            {(product) ? <form >
                <FormControl fullWidth style={{ width: "100%", margin: "5px" }}>
                    <InputLabel id="demo-simple-select-label">Gudang</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gudang"
                        name="warehouse"
                        onChange={handleInputs}
                    >
                        {(warehouseList) ? warehouseList.map((item) =>  <MenuItem for="rolesList" value={item._id}>{item.name}</MenuItem>) : <MenuItem for="rolesList" value="pilih">Pilih</MenuItem>}
                    </Select>
                </FormControl>
                <TextField
                    style={{ width: "40%", margin: "5px" }}
                    type="date"
                    name="expire_date"
                    variant="outlined"
                    step = "2"
                    onChange={handleInputs}
                />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="name"
                    disabled="disabled"
                    value={product.name}
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="sublini"
                    value={product.sublini}
                    disabled="disabled"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="volume"
                    value={product.volume}
                    disabled="disabled"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="sku"
                    disabled="disabled"
                    value={product.sku}
                    variant="outlined"
                    onChange={handleInputs}
                />
                {(product && product.satuan)  ? product.satuan.map((item, index) => (
                    <Grid key={item.id} container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="text"
                                value={item.name}
                                name={"name_"+(index+1)}
                                label={"Satuan "+(index+1)}
                                variant="outlined"
                                disabled="disabled"
                                onChange={handleInputsSatuan}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="number"
                                ref={input => input && input.focus()}
                                name={"qty_"+(index+1)}
                                label={"Qty "+(index+1)}
                                variant="outlined"
                                onChange={(e) => handleInputsSatuan(e, item)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="number"
                                value={item.jml}
                                name={"jml_"+(index+1)}
                                label={"Per "+item.name}
                                variant="outlined"
                                disabled="disabled"
                                onChange={handleInputsSatuan}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="number"
                                value={item.jmlStock}
                                name={"jml_"+(index+1)}
                                variant="outlined"
                                disabled="disabled"
                                onChange={handleInputsSatuan}
                            />
                        </Grid>
                    </Grid>)
                    ) : ""
                }
                <br />

                <Button variant="contained" onClick={handleSubmit} sx={{m:2}} style={{float: 'right'}} color="primary">
                    SAVE
                </Button>
            </form> :""}
        </MainCard>
    );
};

export default Index;
