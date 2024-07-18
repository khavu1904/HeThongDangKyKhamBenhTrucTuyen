import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type SignUpModalProps = {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: React.ChangeEventHandler<FormControlElement>;
    model: {
        hoTenBN: string;
        diaChi: string;
        cmnD_CCCD: string;
        sdt: string;
        ngaySinh: string;
        gioiTinh: string;
        maBHYT: string;
        danToc: string;
        ngheNghiep: string;
        email: string;
        anhDaiDien: string;
        password: string;
        maQuyen: number;
    };
};

const SignUpModal: React.FC<SignUpModalProps> = ({
    show,
    handleClose,
    handleSubmit,
    handleInputChange,
    model
}) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Đăng ký</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Title>
                    <span style={{ color: 'red', fontSize: '13px' }}>
                        Lưu ý * là thông tin bắt buộc
                    </span>
                </Modal.Title>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Họ và tên<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="hoTenBN"
                                value={model.hoTenBN}
                                onChange={handleInputChange}
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Số điện thoại<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="sdt"
                                value={model.sdt}
                                onChange={handleInputChange}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Ngày sinh<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="date"
                                name="ngaySinh"
                                value={model.ngaySinh}
                                onChange={handleInputChange}
                                placeholder="Nhập ngày sinh"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>CCCD/CMND<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="cmnD_CCCD"
                                value={model.cmnD_CCCD}
                                onChange={handleInputChange}
                                placeholder="Nhập CCCD/CMND"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Địa chỉ<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            name="diaChi"
                            value={model.diaChi}
                            onChange={handleInputChange}
                            placeholder="Nhập địa chỉ"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Email<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={model.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email"
                            required
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Nghề nghiệp</Form.Label>
                            <Form.Control
                                type="text"
                                name="ngheNghiep"
                                value={model.ngheNghiep}
                                onChange={handleInputChange}
                                placeholder="Nhập nghề nghiệp"
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Mật khẩu<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={model.password}
                                onChange={handleInputChange}
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Mã BHYT</Form.Label>
                            <Form.Control
                                type="text"
                                name="maBHYT"
                                value={model.maBHYT}
                                onChange={handleInputChange}
                                placeholder="Nhập mã bảo hiểm y tế"
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Giới tính<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Select
                                name="gioiTinh"
                                value={model.gioiTinh}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn...</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Dân tộc<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="danToc"
                                value={model.danToc}
                                onChange={handleInputChange}
                                placeholder="Nhập dân tộc"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Hình ảnh đại diện</Form.Label>
                        <Form.Control
                            type="text"
                            name="anhDaiDien"
                            value={model.anhDaiDien}
                            onChange={handleInputChange}
                            placeholder="Nhập URL hình ảnh"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMaQuyen" style={{ display: 'none' }}>
                        <Form.Control
                            type="hidden"
                            name="maQuyen"
                            value="1"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SignUpModal;
