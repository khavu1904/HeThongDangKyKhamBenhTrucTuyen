import React, { useState, useEffect } from 'react';
import '../../../css/AppLich.css';
import ScheduleTable from './ScheduleTable';
import { Container, Typography } from '@mui/material';
import BacSiDashboard from '../BacSiDashboard';
import axios, { AxiosError } from 'axios';
import { Schedule } from '../../../type/Schedule';
import { jwtDecode } from 'jwt-decode';
import { BenhNhan } from '../../../type/BenhNhan';

interface TokenPayload {
    MaNV: number;
}

const AppLich: React.FC = () => {
    const [maNV, setMaNV] = useState<number | null>(null);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [benhNhanInfo, setBenhNhanInfo] = useState<{ [key: number]: BenhNhan }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<TokenPayload>(token);
                const maNVFromToken = decodedToken.MaNV;
                setMaNV(maNVFromToken);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                if (maNV) {
                    const response = await axios.get(`https://localhost:7178/api/LichKhamBacSi/kham-benh/${maNV}`);
                    const fetchedSchedules: Schedule[] = response.data;
                    setSchedules(fetchedSchedules);

                    const validBenhNhanRequests = fetchedSchedules
                        .filter(schedule => schedule.maBenhNhan) // Ensure maBenhNhan is valid
                        .map(schedule =>
                            axios.get(`https://localhost:7178/api/BenhNhan/${schedule.maBenhNhan}`)
                        );

                    const benhNhanResponses = await Promise.all(validBenhNhanRequests);
                    const benhNhanData = benhNhanResponses.reduce((acc, res) => {
                        const benhNhan = res.data;
                        acc[benhNhan.maBN] = benhNhan;
                        return acc;
                    }, {} as { [key: number]: BenhNhan });

                    setBenhNhanInfo(benhNhanData);
                    setError(null);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    console.error('Axios error:', axiosError.message);
                    if (axiosError.response) {
                        console.error('Status:', axiosError.response.status);
                        console.error('Data:', axiosError.response.data);
                    }
                    setError('Error fetching schedule data. Please try again later.');
                } else {
                    console.error('Error fetching schedule data:', error);
                    setError('Error fetching schedule data. Please try again later.');
                }
            }
        };

        fetchSchedules();
    }, [maNV]);

    return (
        <BacSiDashboard>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Lịch Khám Bác Sĩ
                </Typography>
                {error ? (
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                ) : (
                    <ScheduleTable schedules={schedules} benhNhanInfo={benhNhanInfo} />
                )}
            </Container>
        </BacSiDashboard>
    );
};

export default AppLich;
