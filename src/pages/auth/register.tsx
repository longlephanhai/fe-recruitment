import { Button, Divider, Form, Input, Row, Select, message, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from 'config/api';

const { Option } = Select;

// Define IUser interface
interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    address: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values: IUser) => {
        const { name, email, password, age, gender, address } = values;
        setIsSubmit(true);
        const res = await callRegister(name, email, password as string, +age, gender, address);
        setIsSubmit(false);
        if (res?.data?._id) {
            message.success('Đăng ký tài khoản thành công!');
            navigate('/login');
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto bg-white shadow-sm border border-gray-300 rounded-lg p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Đăng Ký Tài Khoản</h2>
                        <Divider className="my-4" />
                    </div>
                    <Form<IUser>
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Họ tên</span>}
                            name="name"
                            rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                        >
                            <Input
                                className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                placeholder="Nhập họ tên"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Email</span>}
                            name="email"
                            rules={[{ required: true, message: 'Email không được để trống!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                        >
                            <Input
                                className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                placeholder="Nhập email"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Mật khẩu</span>}
                            name="password"
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                        >
                            <Input.Password
                                className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Tuổi"
                            name="age"
                            rules={[{ required: true, message: 'Tuổi không được để trống!' }]}
                        >
                            <Input type='number' />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giới tính</span>}
                            name="gender"
                            rules={[{ required: true, message: 'Giới tính không được để trống!' }]}
                        >
                            <Select
                                className="rounded-md"
                                placeholder="Chọn giới tính"
                                allowClear
                            >
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Địa chỉ</span>}
                            name="address"
                            rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
                        >
                            <Input
                                className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                placeholder="Nhập địa chỉ"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmit}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md py-2"
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                        <Divider className="my-4">Hoặc</Divider>
                        <p className="text-center text-gray-600">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-gray-900 hover:underline font-medium">
                                Đăng Nhập
                            </Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;