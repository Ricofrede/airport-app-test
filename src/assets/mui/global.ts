const styles = {
    newDistanceBox: {
        display: 'block',
        margin: 'calc(var(--vh, 1vh) * 1)', // 1vh
        height: 'calc(var(--vh, 1vh) * 5)' // 5vh
    },
    newDistanceButton: {
        display: 'block',
        width: 'fit-content',
        margin: '0 auto'
    },
    labelDistanceBox: {
        backgroundColor: 'black',
        color: 'white',
        width: 'fit-content',
        margin: 'calc(var(--vh, 1vh) * 1) auto', // 1vh auto
        height: 'calc(var(--vh, 1vh) * 5)' // 5vh
    },
    labelDistanceText: {
        display: 'block',
        width: 'max-content',
        margin: '0 auto',
        'line-height': '100%',
        position: 'relative',
        top: '20%'
    }
}

export default styles