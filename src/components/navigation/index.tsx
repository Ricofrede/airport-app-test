import React, { useState, useEffect } from 'react'
import './index.scss'

import {
    Container,
    Grid,
} from '@mui/material';

import {
    getAirportsList,
    Airport
} from '../../api';

import {
    AirportDropdown
} from '../index'

export default function Navigation(): JSX.Element {
    const [airportList, setAirportList] = useState<Airport[]>([]);

    async function getAirports() {
        const result = await getAirportsList()
        setAirportList(result)
    }

    useEffect(() => {
        getAirports()
    }, [])

    return (
        <Container className="nav-bar" maxWidth="md">
            <Grid container spacing={2} >
                <Grid item xs={12} md={3}>
                    <div>Logo</div>
                </Grid>
                <Grid item xs={12} md={9}>
                    <AirportDropdown options={airportList} />
                </Grid>
            </Grid >
        </Container >
    )
}