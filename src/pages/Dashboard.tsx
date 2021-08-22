import { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

import { useTranslate } from '../hooks/useTranslate';
import { AllCoinsResponse } from '../models';
import { api, url } from '../api/config';
import { useApplicationContext } from '../context';
import { Types } from '../context/types';

import { Title } from '../components/Title';
import { PieChartComponent } from '../components/charts/Pie';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 20,
        height: '80vh',
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

export const Dashboard: React.FC = () => {
    const classes = useStyles();
    const { dispatch, state } = useApplicationContext();

    const [coins, setCoins] = useState<AllCoinsResponse | null>(null);

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const createData = (id: string, value: number) => {
        return { id, value };
    };

    const pieData = coins?.prices.coinPrices.map(coin =>
        createData(coin.asset, Number(coin.value.toFixed(3))),
    );

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
            <Grid container className={classes.container}>
                <Title>Binance</Title>
                {pieData && (
                    <PieChartComponent data={pieData} colors={colors} />
                )}
            </Grid>
        </Container>
    );
};
