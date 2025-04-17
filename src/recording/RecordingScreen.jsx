import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import LatencyDisplay from "./LatencyDisplay";

export default function RecordingScreen() {
    const [mobileDevices, setMobileDevices] = useState([]);
    const [recording, setRecording] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [latency, setLatency] = useState(null);
    const wsRef = useRef(null);
    const pingTimestampRef = useRef(0);

    useEffect(() => {
        const ws = new WebSocket('wss://droid-api-fork-c5901914b16e.herokuapp.com');
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('Conectado ao WebSocket');
            ws.send(JSON.stringify({ event: 'PcIdentify' }));
            sendPing();
        };

        ws.onmessage = ({ data }) => {
            const msg = JSON.parse(data);
            handleWebSocketMessage(msg);
        };

        ws.onclose = () => setLatency(null);

        const pingInterval = setInterval(sendPing, 5000);

        return () => {
            clearInterval(pingInterval);
            ws.close();
        };
    }, []);

    function sendPing() {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const now = Date.now();
        pingTimestampRef.current = now;
        ws.send(JSON.stringify({ event: 'Ping' }));
    }

    const eventHandlers = {
        ConnectedDevices: setMobileDevices,
        message: data => console.log('Mensagem do servidor:', data),
        Pong: serverTs => {
            const now = Date.now();
            const rtt = now - pingTimestampRef.current;
            setLatency(rtt);
        }
    };

    function handleWebSocketMessage({ event, data }) {
        const handler = eventHandlers[event];
        if (handler) handler(data);
        else console.warn('Evento desconhecido:', event);
    }

    function handleToggleRecording() {
        const ws = wsRef.current;
        if (!recording) {
            ws.send(JSON.stringify({ event: 'StartRecord', data: selectedIds }));
        } else {
            ws.send(JSON.stringify({ event: 'StopRecord', data: selectedIds }));
            setSelectedIds([]);
        }
        setRecording(!recording);
    }

    function handleCardClick(device) {
        if (recording || device.recording) return;
        setSelectedIds(prev =>
            prev.includes(device.id)
                ? prev.filter(id => id !== device.id)
                : [...prev, device.id]
        );
    }

    return (
        <div style={{ position: 'relative', textAlign: "center", padding: "20px" }}>
            <LatencyDisplay latency={latency}/>

            <Button
                variant="contained"
                onClick={handleToggleRecording}
                disabled={selectedIds.length === 0 && !recording}
                color={recording ? "error" : "success"}
                style={{ color: "white", marginBottom: "20px" }}
            >
                {recording ? "PARAR" : "GRAVAR"}
            </Button>

            <Grid container spacing={3} justifyContent="center" style={{ paddingTop: 20, paddingLeft: 50, paddingRight: 50 }}>
                {mobileDevices.map(device => (
                    <Grid item xs={12} sm={6} md={3} key={device.id}>
                        <Card
                            onClick={() => handleCardClick(device)}
                            style={{
                                backgroundColor: selectedIds.includes(device.id) ? "#FFF9C4" : "#cfd8dc",
                                padding: "10px",
                                textAlign: "center",
                                cursor: recording || device.recording ? "not-allowed" : "pointer",
                                transition: "background-color 0.3s",
                                boxShadow: selectedIds.includes(device.id) ? "0px 0px 10px rgba(0,0,0,0.2)" : "",
                            }}
                        >
                            <CardContent style={{ padding: "8px 15px" }}>
                                <Typography variant="body2" style={{
                                    fontSize: "0.7rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}>
                                    ID: {device.id}
                                </Typography>
                                <Typography variant="body1">NOME: {device.deviceModel}</Typography>
                                <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 10 }}>
                                    <Grid item style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        padding: 20,
                                        border: "10px solid darkGray",
                                        backgroundColor: device.recording ? "#D80000" : "dimGray",
                                        animation: device.recording ? "pulse 1.5s infinite" : "none",
                                    }} />
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}