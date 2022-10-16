import styles from './mui';

import {
    Box,
    Typography,
    Modal,
    FormControl
} from '@mui/material';

import {
    Airport
} from '../../api';

import useFetchAirports from '../../hooks/useFetchAirports';

import {
    AirportDropdown
} from '../index'
import { Button, CircularProgress } from '@mui/material';

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
    const { airportList, loading, error } = useFetchAirports()

    function renderStatus(): JSX.Element {
        if (loading) {
            return (
                <CircularProgress />
            )
        }

        if (error) {
            return (
                <div>{error}</div>
            )
        }

        if (!airportList.length) return <></>

        return (
            <form>
                <FormControl sx={styles.controlStyle}>
                    <Typography variant="h6" className="calculate-title">
                        Calculate Airports Distance
                    </Typography>
                </FormControl>
                <FormControl sx={styles.controlStyle}>
                    <AirportDropdown
                        choose={chooseStart}
                        options={airportList}
                        label={'Starting Airport'}
                    />
                </FormControl>
                <FormControl sx={styles.controlStyle}>
                    <AirportDropdown
                        choose={chooseEnd}
                        options={airportList}
                        label={'Ending Airport'}
                    />
                </FormControl>
                <FormControl sx={styles.controlStyle}>
                    <Button
                        onClick={() => { submit(); close(); }}
                        variant="contained">
                        Calculate
                    </Button>
                </FormControl>
            </form>
        )
    }

    return (
        <Modal
            open={isOpen}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styles.boxStyle}>
                {renderStatus()}
            </Box>
        </Modal >
    )
}