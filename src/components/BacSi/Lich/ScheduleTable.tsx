import React, { useState } from 'react';
import { Schedule } from '../../../type/Schedule';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi'; // Import Vietnamese locale if needed
import { BenhNhan } from '../../../type/BenhNhan';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Grid,
    Typography,
} from '@mui/material';

const localizer = momentLocalizer(moment);

interface ScheduleTableProps {
    schedules: Schedule[];
    benhNhanInfo: { [key: number]: BenhNhan };
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedules, benhNhanInfo }) => {
    const [selectedEvent, setSelectedEvent] = useState<Schedule | null>(null);
    const [open, setOpen] = useState(false);

    const events = schedules.map((schedule) => {
        const startDateTime = moment(`${schedule.ngayKham} ${schedule.gioBatDau}`, 'YYYY-MM-DD HH:mm:ss').toDate();
        const endDateTime = moment(`${schedule.ngayKham} ${schedule.gioKetThuc}`, 'YYYY-MM-DD HH:mm:ss').toDate();

        return {
            ...schedule,
            title: `${schedule.buoi} - ${schedule.tenPhongKham}`,
            start: startDateTime,
            end: endDateTime,
        };
    });

    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectedBenhNhan = selectedEvent ? benhNhanInfo[selectedEvent.maBenhNhan] : null;

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
                onSelectEvent={handleSelectEvent}
            />

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Thông tin lịch khám</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {selectedEvent && (
                                <div>
                                    <Typography variant="subtitle1">
                                        <strong>Buổi:</strong> {selectedEvent.buoi}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Ngày Khám:</strong> {moment(selectedEvent.ngayKham).format('DD/MM/YYYY')}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Giờ Bắt Đầu:</strong> {selectedEvent.gioBatDau}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Giờ Kết Thúc:</strong> {selectedEvent.gioKetThuc}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Tên phòng khám:</strong> {selectedEvent.tenPhongKham}
                                    </Typography>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {selectedBenhNhan && (
                                <div>
                                    <Typography variant="subtitle1">
                                        <strong>Họ tên bệnh nhân:</strong> {selectedBenhNhan.hoTenBN}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Số điện thoại:</strong> {selectedBenhNhan.sdt}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Email:</strong> {selectedBenhNhan.email}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <strong>Ghi chú:</strong> {selectedEvent?.ghiChu}
                                    </Typography>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ScheduleTable;
