import React, { useState, useEffect, useRef } from 'react';

const MapRender = () => {
    const mapRef = useRef(null);
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const searchAddress = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                setLatitude(location.lat());
                setLongitude(location.lng());
            } else {
                console.log('Không tìm thấy địa chỉ');
            }
        });
    };
    const apiKey = 'AIzaSyCEHXGM8eaEamMT4Azu2JtKNegcUvOCyDM';
    const address2 = '1600 Amphitheatre Parkway, Mountain View, CA';

// Gọi Geocoding API để lấy đối tượng địa chỉ từ chuỗi địa chỉ
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address2)}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                // Lấy tọa độ của đối tượng địa chỉ
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            } else {
                console.error('Geocoding API request failed');
            }
        })
        .catch(error => {
            console.error('Error calling Geocoding API', error);
        });
    useEffect(() => {
        if (latitude && longitude) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: latitude, lng: longitude },
                zoom: 14,
            });

            new window.google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: 'Vị trí tìm kiếm',
            });
        }
    }, [latitude, longitude]);

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ"
                />
                <button onClick={searchAddress}>Tìm kiếm</button>
            </div>
            <div ref={mapRef} style={{ height: '400px', width: '50%' }} />
            {latitude && longitude && (
                <div>
                    Kinh độ: {longitude}, Vĩ độ: {latitude}
                </div>
            )}
        </div>
    );
};

export default MapRender;