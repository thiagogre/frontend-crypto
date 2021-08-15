import { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Table as TableMUI,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
} from '@material-ui/core';

import { useTranslate } from '../hooks/useTranslate';
import { AllCoinsResponse } from '../models';
import { api, url } from '../api/config';
import { useApplicationContext } from '../context';
import { Types } from '../context/types';

import { Title } from '../components/Title';

type TableProps = {
    coins: AllCoinsResponse;
};

const useStyles = makeStyles(theme => ({
    container: {
        padding: 20,
    },
    formGroup: {
        margin: '16px 0',
    },
    textField: {
        margin: '4px 0',
    },
    box: {
        margin: '16px 0',
    },
    alert: { background: theme.palette.success.main },
}));

const useStylesTable = makeStyles({
    tableContainer: {
        marginTop: 20,
    },
    table: {
        minWidth: 650,
    },
    tableTitle: {
        fontWeight: 'bold',
        maxWidth: 0,
    },
    tableTotalRow: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

const CoinsTable: React.FC<TableProps> = ({ coins }) => {
    const classes = useStylesTable();
    const { state } = useApplicationContext();
    const { translate } = useTranslate(state.app.language);

    const createData = (
        asset: string,
        price: number,
        free: number,
        value: number,
    ) => {
        return { asset, price, free, value };
    };

    const rows = coins.prices.coinPrices.map(coin =>
        createData(coin.asset, coin.price, coin.free, coin.value),
    );

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <TableMUI className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableTitle} align="left">
                            {translate('ASSET')}
                        </TableCell>
                        <TableCell className={classes.tableTitle} align="left">
                            {translate('PRICE')}&nbsp;($)
                        </TableCell>
                        <TableCell className={classes.tableTitle} align="left">
                            {translate('QUANTITY_FREE')}
                        </TableCell>
                        <TableCell className={classes.tableTitle} align="left">
                            {translate('VALUE')}&nbsp;($)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.asset}>
                            <TableCell component="th" scope="row">
                                {row.asset}
                            </TableCell>
                            <TableCell align="left">
                                {row.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="left">{row.free}</TableCell>
                            <TableCell align="left">
                                {row.value.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableTotalRow}>
                            {translate('TOTAL')}
                        </TableCell>
                        <TableCell align="left" />
                        <TableCell align="left" />
                        <TableCell
                            align="left"
                            className={classes.tableTotalRow}>
                            {coins.prices.totalAssetUSD.toFixed(2)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </TableMUI>
        </TableContainer>
    );
};
export const Table: React.FC = () => {
    const classes = useStyles();
    const { dispatch, state } = useApplicationContext();

    const [coins, setCoins] = useState<AllCoinsResponse | null>(null);

    const getCoins = async () => {
        try {
            dispatch({
                type: Types.SetLoading,
                payload: true,
            });

            const { data } = await api.get(`${url.API_COINS}/all?type=SPOT`);
            setCoins(data);

            dispatch({
                type: Types.SetLoading,
                payload: false,
            });
        } catch (e) {
            dispatch({
                type: Types.SetLoading,
                payload: false,
            });

            const { status, data, statusText } = e.response;

            dispatch({
                type: Types.SetFeedback,
                payload: {
                    visible: true,
                    message: `${status} - ${data.error || statusText}`,
                    type: 'error',
                },
            });
        }
    };

    useEffect(() => {
        state.user.credentials?.current && getCoins();
    }, [state.user.credentials]);

    return (
        <Container maxWidth="md">
            <Grid container direction="column" className={classes.container}>
                <Title>Binance</Title>
                {coins && <CoinsTable coins={coins} />}
            </Grid>
        </Container>
    );
};
