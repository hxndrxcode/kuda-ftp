import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Typography } from '@mui/material';
import { Fragment } from 'react';

export default function Logs({ logs }) {
    return (
        <Fragment>
            {logs.map(v => {
                return (
                    <Typography variant="p">
                        <ArrowDropUpIcon />
                        <span>Balalalalala</span>
                    </Typography>
                )
            })}
        </Fragment>
    )
}