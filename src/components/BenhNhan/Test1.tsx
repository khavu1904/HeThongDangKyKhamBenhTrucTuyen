import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const workSchedule = [
    { id: 1, shift: 'Sáng', date: new Date('2024-06-21T08:00:00'), doctorId: 1 },
    { id: 2, shift: 'Chiều', date: new Date('2024-06-21T13:00:00'), doctorId: 1 },
    { id: 3, shift: 'Sáng', date: new Date('2024-06-22T08:00:00'), doctorId: 2 },
    { id: 4, shift: 'Chiều', date: new Date('2024-06-22T13:00:00'), doctorId: 2 }
];

const doctors = [
    { id: 1, name: 'Bác Sĩ A', description: 'Chuyên khoa Nội' },
    { id: 2, name: 'Bác Sĩ B', description: 'Chuyên khoa Ngoại' }
];

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setSelectedDate(date);
    };

    const handleRegisterClick = (doctorId: number) => {
        if (!selectedDate || !doctorId) {
            setError('Vui lòng chọn ngày và bác sĩ trước khi đăng ký');
            return;
        }

        const doctor = doctors.find(doc => doc.id === doctorId);
        if (!doctor) {
            setError('Bác sĩ không hợp lệ');
            return;
        }

        const doctorSchedule = workSchedule.filter(item => item.doctorId === doctorId);
        const isDateAvailable = doctorSchedule.some(item => item.date.toISOString().split('T')[0] === selectedDate);

        if (!isDateAvailable) {
            setError('Không có lịch làm việc cho ngày này');
            setAvailableSlots([]);
            return;
        }

        setError('');
        // Xử lý đăng ký khám bệnh, ví dụ gọi API hoặc thực hiện logic đăng ký tại đây
        console.log(`Đăng ký khám bệnh ngày ${selectedDate} với bác sĩ có ID ${doctorId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3 className="mb-3">Đăng ký khám bệnh</h3>
                    <div className="mb-3">
                        <label htmlFor="dateInput" className="form-label">Chọn Ngày</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateInput"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {doctors.map(doctor => (
                            <div key={doctor.id} className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{doctor.name}</h5>
                                        <p className="card-text">{doctor.description}</p>
                                        <button className="btn btn-primary" onClick={() => handleRegisterClick(doctor.id)}>Đăng ký khám bệnh</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {availableSlots.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label">Chọn Ca</label>
                            <select className="form-select">
                                {availableSlots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
