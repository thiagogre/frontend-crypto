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
    IconButton,
    Collapse,
    makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

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
                        <TableCell className={classes.tableTitle}>
                            {translate('ASSET')}
                        </TableCell>
                        <TableCell className={classes.tableTitle} align="right">
                            {translate('PRICE')}&nbsp;($)
                        </TableCell>
                        <TableCell className={classes.tableTitle} align="right">
                            {translate('QUANTITY_FREE')}
                        </TableCell>
                        <TableCell className={classes.tableTitle} align="right">
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
                            <TableCell align="right">
                                {row.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">{row.free}</TableCell>
                            <TableCell align="right">
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
                        <TableCell align="right" />
                        <TableCell align="right" />
                        <TableCell
                            align="right"
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

    const [feedback, setFeedback] = useState({ isVisible: false, message: '' });
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
            setFeedback({
                isVisible: true,
                message: `${status} - ${data.error || statusText}`,
            });
        }
    };

    useEffect(() => {
        state.user.credentials?.current && getCoins();
    }, [state.user.credentials]);

    return (
        <Container maxWidth="md">
            <Collapse in={feedback.isVisible} timeout={0}>
                <Alert
                    variant="standard"
                    severity="error"
                    color="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setFeedback({
                                    isVisible: false,
                                    message: '',
                                });
                            }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    {feedback.message}
                </Alert>
            </Collapse>
            <Grid container direction="column" className={classes.container}>
                <Title>Binance</Title>
                {coins && <CoinsTable coins={coins} />}
            </Grid>
        </Container>
    );
};
