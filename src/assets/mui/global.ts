const styles = {
    newDistanceBox: {
        display: 'block',
        height: '36px',
        margin: '0px 20px'
    },
    newDistanceButton: {
        display: 'block',
        width: 'fit-content'
    },
    labelDistanceBox: {
        backgroundColor: 'black',
        color: 'white',
        width: 'fit-content',
        margin: '10px 20px'
    },
    labelDistanceText: {
        display: 'block',
        width: 'max-content',
        margin: '0 auto',
        'line-height': '100%',
        position: 'relative',
        top: '20%'
    },
    upperBox: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: 'calc(var(--vh, 1vh) * 14)' // '14vh'

    }
}

export default styles