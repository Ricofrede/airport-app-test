import React, { useState } from 'react'
import './index.scss'

import {
    Airport
} from '../../api';

import {
    Autocomplete,
    Box,
    TextField
} from '@mui/material';

interface AirportDropdownProps {
    options: Airport[]
}

export default function AirportDropdown({ options }: AirportDropdownProps): JSX.Element {
    const [value, setValue] = useState<Airport | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    return (

        <Autocomplete
            value={value}
            onChange={(event: any, newValue: Airport | null) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name} ({option.iata_code})
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
    )
}