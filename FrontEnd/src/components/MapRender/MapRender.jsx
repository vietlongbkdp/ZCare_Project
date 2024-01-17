import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
export default function MapRender() {
    const [coords, setCoords] = useState({
        lat: 16.4801402,
        lng: 107.5620843
    });
    const [addressSearch, setAddressSearch] = useState("My Location")
    const [address, setAddress] = useState("CodeGym Huế")
    useEffect(() => {
        const getAddressCoordinates = async () => {
            try {
                const api_key = 'AIzaSyDLAzBOtor8ODp47ZIcQNErgcuKwCQ7c_8';

                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key}`;
                const response = await axios.get(url);
                const data = response.data;

                if (data.status === 'OK') {
                    // const exactlyAddress = data.results[0].formatted_address;
                    const exactlyAddressJoin = [data.results[0].address_components[0].long_name,
                        data.results[0].address_components[1].long_name,
                        data.results[0].address_components[2].long_name,
                        data.results[0].address_components[3].long_name].join(", ")
                    const location = data.results[0].geometry.location;
                    setCoords({ lat: location.lat, lng: location.lng });
                    console.log(location.lat, location.lng)
                    setAddressSearch(exactlyAddressJoin)
                } else {
                    console.log('Không thể lấy toạ độ cho địa chỉ đã cho.');
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error);
            }
        };
        getAddressCoordinates();
    }, [address]);
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    //         setCoords({ lat: latitude, lng: longitude });
    //     });
    // }, []);
    useEffect(() => {
        const createMap = () => {
            const map = document.getElementById('map');
            const googleMap = new window.google.maps.Map(map, {
                center: coords,
                zoom: 18,
            });
            const marker = new window.google.maps.Marker({
                position: coords,
                map: googleMap,
                title: "Địa chỉ cụ thể của bệnh viện",
                label: {
                    text: addressSearch, //viết tilte địa điểm tại đây nếu cần ...
                    color: 'Black',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    labelOrigin: new window.google.maps.Point(0, -20)
                }
            });
        };
        createMap();
    }, [coords]);
    const handleSubmitSearchAddress = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setAddress(data.get('inputAddress'))
    }
    return (
        <div>
            <div id={"map"} style={{height: '300px', width: '50%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyDLAzBOtor8ODp47ZIcQNErgcuKwCQ7c_8'}}
                    defaultZoom={18}
                    center={coords}
                >
                </GoogleMapReact>
            </div>
            <Box>
                <Box
                    component="form"
                    onSubmit={(event)=>{
                        handleSubmitSearchAddress(event)
                    }
                }
                    sx={{mt: 2}}
                >
                    <TextField id="outlined-basic" label="Search..." variant="outlined" sx={{width: 300}} name={"inputAddress"}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{height: 55, width: 100, ml: 2}}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

