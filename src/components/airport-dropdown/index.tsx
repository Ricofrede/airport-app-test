import styles from './mui';

import {
    Airport
} from '../../api';

import {
    Autocomplete,
    Box,
    TextField
} from '@mui/material';

interface AirportDropdownProps {
    label: string
    options: Airport[]
    choose: (airport: Airport | null) => void
}

export default function AirportDropdown({
    label,
    options,
    choose
}: AirportDropdownProps): JSX.Element {

    return (
        <Autocomplete
            getOptionLabel={(option) => `${option.name} (${option.iata_code})`}
            onChange={(event: any, newValue: Airport | null) => {
                choose(newValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={styles.autocomplete}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name} ({option.iata_code})
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    )
}