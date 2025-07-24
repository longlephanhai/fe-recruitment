import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { callLogin } from 'config/api';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';
import { useAppSelector } from '@/redux/hooks';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const callback = params?.get("callback");

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/';
        }
    }, [isAuthenticated]);

    const onFinish = async (values: any) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        setIsSubmit(false);
        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(setUserLoginInfo(res.data.user));
            message.success('Đăng nhập tài khoản thành công!');
            window.location.href = callback ? callback : '/';
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
                        <h2 className="text-3xl font-bold text-gray-900">Đăng Nhập</h2>
                        <Divider className="my-4" />
                    </div>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Email</span>}
                            name="username"
                            rules={[{ required: true, message: 'Email không được để trống!' }]}
                        >
                            <Input
                                className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                placeholder="Nhập email của bạn"
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

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmit}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md py-2"
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <Divider className="my-4">Hoặc</Divider>
                        <p className="text-center text-gray-600">
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className="text-gray-900 hover:underline font-medium">
                                Đăng Ký
                            </Link>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;