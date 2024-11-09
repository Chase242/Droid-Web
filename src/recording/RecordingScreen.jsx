import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Card, CardContent, Button } from "@mui/material";

function RecordingScreen() {
    const [mobileDevices, setMobileDevices] = useState([]);
    const [recording, setRecording] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        // Estabelece a conexão com o WebSocket quando o componente é montado
        ws.current = new WebSocket('wss://droid-api-fork-c5901914b16e.herokuapp.com'); // Substitua PORT pela porta correta

        ws.current.onopen = () => {
            console.log('Conectado ao WebSocket');
            // Identifica-se como PC
            ws.current.send(JSON.stringify({ event: 'PcIdentify' }));
        };

        ws.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            handleWebSocketMessage(data);
        };

        ws.current.onclose = () => {
            console.log('Desconectado do WebSocket');
        };

        // Limpa a conexão quando o componente é desmontado
        return () => {
            ws.current.close();
        };
    }, []);

    // Mapeamento de eventos para seus manipuladores correspondentes
    const eventHandlers = {
        'ConnectedDevices': (eventData) => {
            setMobileDevices(eventData);
        },
        'message': (eventData) => {
            console.log('Mensagem do servidor:', eventData);
        },
        // Você pode adicionar mais manipuladores de eventos aqui, se necessário
    };

    const handleWebSocketMessage = (data) => {
        const { event, data: eventData } = data;
        const handler = eventHandlers[event];

        if (handler) {
            handler(eventData);
        } else {
            console.warn('Evento desconhecido:', event);
        }
    };

    const handleToggleRecording = () => {
        if (!recording) {
            // Envia o comando para iniciar a gravação nos dispositivos selecionados
            ws.current.send(JSON.stringify({
                event: 'StartRecord',
                data: selectedIds
            }));
        } else {
            // Envia o comando para parar a gravação nos dispositivos selecionados
            ws.current.send(JSON.stringify({
                event: 'StopRecord',
                data: selectedIds
            }));
            setSelectedIds([]); // Limpa os IDs selecionados ao parar
        }
        setRecording(!recording);
    };

    const handleCardClick = (device) => {
        if (recording || device.recording) return; // Bloqueia a seleção se a gravação estiver ativa
        setSelectedIds((prevSelected) =>
            prevSelected.includes(device.id)
                ? prevSelected.filter((selectedId) => selectedId !== device.id)
                : [...prevSelected, device.id]
        );
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Button
                variant="contained"
                onClick={handleToggleRecording}
                disabled={selectedIds.length === 0 && !recording} // Desabilita o botão se nenhum cartão estiver selecionado
                color={recording ? "error" : "success"}
                style={{
                    color: "white",
                    marginBottom: "20px",
                }}
            >
                {recording ? "PARAR" : "GRAVAR"}
            </Button>

            <Grid 
                container 
                spacing={3} 
                justifyContent="center" 
                style={{ paddingTop: 20, paddingLeft: 50, paddingRight: 50 }}
            >
                {mobileDevices.map((device) => (
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
                                <Typography 
                                    variant="body2" 
                                    style={{
                                        fontSize: "0.7rem",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    ID: {device.id}
                                </Typography>
                                <Typography variant="body1">NOME: {device.deviceModel}</Typography>
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ marginTop: 10 }}
                                >
                                    <Grid
                                        item
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: "50%",
                                            padding: 20,
                                            border: "10px solid darkGray",
                                            backgroundColor: device.recording ? "#D80000" : "dimGray",
                                            animation: device.recording ? "pulse 1.5s infinite" : "none",
                                        }}
                                    />
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* CSS para efeito pulsante */}
            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.2); opacity: 0.7; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
}

export default RecordingScreen;