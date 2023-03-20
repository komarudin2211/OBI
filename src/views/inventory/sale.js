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
                item2.qty_sale = value;

                if(parseInt(value) > parseInt(item2.qtyStock)) {
                    item2.over = true;
                }

                if(parseInt(value) <= parseInt(item2.qtyStock)) {
                    item2.over = false;
                }
            }

            dataSatuan.push(item2)
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
            var qty = 0;
            var over = false

            for(var i=0; i < product.satuan.length;  i++){console.log(product.satuan[i])
                if(product.satuan[i].qty_sale){
                    qty = parseInt(product.satuan[i].qty_sale);
                }
                if(product.satuan[i].over){
                    over = product.satuan[i].over;
                    break;
                }

                if(qty < 0){
                    break;
                }
            }

            if(over){
                return alert("Qty melebihi stok");
            }

            if(qty < 0){
                return alert("Qty Jual harus positif");
            }

            if(qty == 0){
                return alert("Minimal qty satuan di isi satu");
            }

            await axios.post("/api/inventory/sale", product);
            location.href="/inventory-list";
        }catch(err){
            alert(err.message);
        }
    }

    const onNewScanResult = async (decodedText, decodedResult) => {
  
 
        let data = await axios.get("/api/inventory/barcode/"+decodedText);

        if(data && data.data) {console.log(data.data);
            if(data.data._id){
                setProduct(data.data);
            }
            else{
                alert(data.data.message);
            }
        }else{
            alert("barcode tidak dikenal, ", decodedText)
        }
    };

    const onNewScanError =  (err) => {
        //alert(err);
    }

    return (
        <MainCard title="Jual">
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
                        disabled="disabled"
                        name="warehouse"
                        value={product.warehouse._id}
                        onChange={handleInputs}
                    >
                        {(warehouseList) ? warehouseList.map((item) =>  <MenuItem for="rolesList" value={item._id}>{item.name}</MenuItem>) : <MenuItem for="rolesList" value="pilih">Pilih</MenuItem>}
                    </Select>
                </FormControl>
                <TextField
                    style={{ width: "40%", margin: "5px" }}
                    type="text"
                    name="expire_date"
                    variant="outlined"
                    disabled="disabled"
                    label="Expire Date"
                    value={product.expireDate}
                    step = "2"
                    onChange={handleInputs}
                />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="name"
                    label="Nama"
                    disabled="disabled"
                    value={product.product.name}
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />

                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="sublini"
                    value={product.product.sublini}
                    disabled="disabled"
                    variant="outlined"
                    onChange={handleInputs}
                />

                <br />
                <TextField
                    style={{ width: "100%", margin: "5px" }}
                    type="text"
                    name="volume"
                    value={product.product.volume}
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
                    value={product.product.sku}
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
                                error={item.over}
                                style={{ width: "100%", margin: "5px" }}
                                type="number"
                                ref={input => input && input.focus()}
                                name="qty"
                                label={"Qty "+item.name}
                                variant="outlined"
                                helperText={(item.over) ? "Jumlah melebihi stok" : ""}
                                onChange={(e) => handleInputsSatuan(e, item)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="number"
                                value={item.qtyStock}
                                name={"jml_"+(index+1)}
                                label={"Jml "+item.name}
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
                                label={"Jml Pcs"}
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