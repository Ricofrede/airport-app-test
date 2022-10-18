import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';

import {
    Airport
} from '../../api';

import styles from './mui';

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        top: (style.top as number) + LISTBOX_PADDING
    };

    return (
        <Typography
            component="li"
            {...dataSet[0]}
            style={inlineStyle}
        >
            {dataSet[1]}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData: React.ReactChild[] = [];
    (children as React.ReactChild[]).forEach(
        (item: React.ReactChild & { children?: React.ReactChild[] }) => {
            itemData.push(item);
            itemData.push(...(item.children || []));
        },
    );

    const itemCount = itemData.length;
    const itemSize = 70;

    const getChildSize = (child: React.ReactChild) => {
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                    style={{ overflowX: 'hidden' }}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

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
    const myOptions = options.map(option => `${option.name} (${option.iata_code})`)

    return (
        <Autocomplete
            id="airports-dropdown"
            onChange={(event: any, newValue: String | null) => {
                const iataCodeMatch = newValue?.match(/\((.*?)\)/)
                const iataCode = iataCodeMatch?.[1]

                const newChosen = options.find(option => {
                    if (option.iata_code === iataCode) {
                        return true
                    }
                }) || null

                choose(newChosen);
            }}
            sx={styles.autocomplete}
            ListboxComponent={ListboxComponent}
            options={myOptions}
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option) => [props, option] as React.ReactNode}
            renderGroup={(params) => params as unknown as React.ReactNode}
        />
    );
}
