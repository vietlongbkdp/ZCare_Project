import React from 'react';
import GooglePlacesAutocomplete  from 'react-google-places-autocomplete';

export default function MapRender() {
    const handleChange = (event) => {
        console.log(event.value.formatted_address);
        console.log(event.target)
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyD-eZIvHdlxaE95FVme1m_J11BFJTfKmPU"
                onSelect={(event) => {
                    handleChange(event);
                }}
            />
        </div>
    );
}