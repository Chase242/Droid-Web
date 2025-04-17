import React from 'react';
import { Box, Typography } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import { green, amber, red, grey } from '@mui/material/colors';

export default function LatencyDisplay({ latency }) {
    const getLatencyColor = () => {
        if (latency == null) return grey[600];
        if (latency <= 200) return green[500];
        if (latency <= 300) return amber[500];
        return red[500];
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'transparent',        // fundo transparente
                p: 1,
                borderRadius: 1,
                // boxShadow: 1,                // opcional: pode remover se não quiser sombra
                textAlign: 'right'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <WifiIcon sx={{ color: getLatencyColor(), mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: getLatencyColor(), fontWeight: 'bold' }}>
                    {latency != null ? `${latency} ms` : '—'}
                </Typography>
            </Box>
        </Box>
    );
}