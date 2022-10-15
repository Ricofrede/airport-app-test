import React, { useState, useEffect } from 'react'
import './index.scss'

import {
    Box,
    Typography,
    Modal,
    FormControl
} from '@mui/material';


import {
    getAirportsList,
    Airport
} from '../../api';

import {
    AirportDropdown
} from '../index'
import { Button } from '@mui/material';

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    'max-width': 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const controlStyle = {
    margin: '20px auto',
    display: 'block',
    'max-width': 'max-content',
}

interface NavigationProps {
    isOpen: boolean
    close: () => void
    chooseStart: (airport: Airport | null) => void
    chooseEnd: (airport: Airport | null) => void
    submit: () => void
}

export default function Navigation({
    isOpen,
    close,
    chooseStart,
    chooseEnd,
    submit
}: NavigationProps): JSX.Element {
    const [airportList, setAirportList] = useState<Airport[]>([]);

    async function getAirports() {
        const result = await getAirportsList()
        setAirportList(result)
    }

    useEffect(() => {
        getAirports()
    }, [])

    return (
        <Modal
            open={isOpen}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                <form>
                    <FormControl sx={controlStyle}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Calculate Airports Distance
                        </Typography>
                    </FormControl>
                    <FormControl sx={controlStyle}>
                        <AirportDropdown
                            choose={chooseStart}
                            options={airportList}
                            label={'Starting Airport'}
                        />
                    </FormControl>
                    <FormControl sx={controlStyle}>
                        <AirportDropdown
                            choose={chooseEnd}
                            options={airportList}
                            label={'Ending Airport'}
                        />
                    </FormControl>
                    <FormControl sx={controlStyle}>
                        <Button
                            onClick={() => { submit(); close(); }}
                            variant="contained">
                            Calculate
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Modal >
    )
}