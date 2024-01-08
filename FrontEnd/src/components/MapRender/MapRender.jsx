import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
export default function MapRender() {
    const [coords, setCoords] = useState({
        lat: 16.46471351143458,
        lng: 107.59235363558183
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, []);
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
                    text: 'Bệnh viện TW huế',
                    color: 'Black',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    labelOrigin: new window.google.maps.Point(0, -20)
                }
            });
        };
        createMap();
    }, [coords]);
    return (
        <div id={"map"} style={{height: '300px', width: '50%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyBWtdLpOjUNa8muDbElTuRv614zxumeLcU'}}
                defaultZoom={18}
                center={coords}
            >
            </GoogleMapReact>
        </div>
    );
}