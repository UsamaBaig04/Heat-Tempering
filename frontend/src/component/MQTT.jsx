import React, { useEffect } from 'react'
import * as mqttActions from '../Action/mqtt';
import { connect } from 'react-redux';
import { compose } from "recompose";
import mqtt from "mqtt"

const MQTT = ({
    client,
    setClient,
    setStatus,
    setMessage,
    items,
}) => {

    const record = {
        host: 'localhost',
        clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
        port: 9001,
        username: '',
        password: ''
    };


    const url = `ws://${record.host}:${record.port}`;
    const options = {
        keepalive: 0,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 0,
        connectTimeout: 30 * 1000,
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        },
        rejectUnauthorized: false
    };
    options.clientId = record.clientId;
    options.username = record.username;
    options.password = record.password;


    const mqttConnect = (host, mqttOption) => {
        if (client) {
            if (!client.connected) {
                setStatus('Connecting');
                setClient(mqtt.connect(host, mqttOption));
            }
        } else {
            setStatus('Connecting');
            setClient(mqtt.connect(host, mqttOption));
        }
    };

    const mqttPublish = (context) => {
        if (client) {
            const { topic, qos, payload } = context;
            client.publish(topic, payload, { qos }, error => {
                if (error) {
                    console.log('Publish error: ', error);
                    return;
                }
                console.log(topic + " Published !");
            });
        }
    };

    const mqttSub = (subscription) => {
        if (client) {
            const { topic, qos } = subscription;
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                console.log(topic + " Subscribed !");
            });
        }
    };
    const mqttUnSub = (subscription) => {
        if (client) {
            const { topic } = subscription;
            client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error)
                    return
                }
                console.log(topic + " Unsubscribed !");
            });
        }
    };
    const mqttDisconnect = () => {
        if (client) {
            client.end(() => {
                console.log("disconnecting");
                mqtt.disconnect();
                setStatus('Not Connected');
            });
        }
    }

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setStatus('Connected');
                console.log("connected")
                mqttSub({
                    topic: ['SCLpublish/'],
                    qos: 0,
                });
                // mqttPublish({
                //   topic: 'SUBGRINDWELL',
                //   qos: 0,
                //   payload: JSON.stringify(data)
                // });
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() };
                setMessage(payload);
            });
        }
    }, [client]);

    useEffect(
        () => {
            mqttConnect(url, options);

        }, [])

    // console.log("items:::", items && items);

    return (
        <>

        </>
    )
}

const withConnect = compose(connect(
    state => ({
        items: state.mqtt.items,
        client: state.mqtt.client,
    }),
    {
        ...mqttActions,
    },
));

export default withConnect(MQTT);