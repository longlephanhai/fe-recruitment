import { Row, Col } from 'antd';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <Row gutter={[24, 24]} className="text-gray-700">
                    <Col xs={24} sm={12} md={6}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Về Chúng Tôi</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-blue-600 transition-colors">Giới thiệu</a></li>
                            <li><a href="/contact" className="hover:text-blue-600 transition-colors">Liên hệ</a></li>
                            <li><a href="/careers" className="hover:text-blue-600 transition-colors">Tuyển dụng</a></li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hỗ trợ</h3>
                        <ul className="space-y-2">
                            <li><a href="/faq" className="hover:text-blue-600 transition-colors">Câu hỏi thường gặp</a></li>
                            <li><a href="/terms" className="hover:text-blue-600 transition-colors">Điều khoản sử dụng</a></li>
                            <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</a></li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ</h3>
                        <p className="text-sm">Email: support@gmail.com</p>
                        <p className="text-sm">Điện thoại: +84 123 456 789</p>
                        <p className="text-sm">Địa chỉ: 123 Đường ABC, TP. HCM</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theo dõi chúng tôi</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3.006a9.717 9.717 0 01-2.828.775 4.924 4.924 0 002.163-2.723 9.755 9.755 0 01-3.127 1.194 4.92 4.92 0 00-8.384 4.482A13.936 13.936 0 011.67 2.992a4.928 4.928 0 001.525 6.557A4.893 4.893 0 01.963 9.5v.062a4.924 4.924 0 003.949 4.827 4.917 4.917 0 01-2.223.085 4.93 4.93 0 004.575 3.42 9.889 9.889 0 01-6.114 2.107 13.977 13.977 0 007.548 2.212c9.057 0 14.009-7.503 14.009-14.008 0-.213-.005-.426-.014-.637A9.975 9.975 0 0023 3.006z"/>
                                </svg>
                            </a>
                            <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.026-3.06-1.872-3.06-1.872 0-2.158 1.461-2.158 2.972v5.692h-3v-11h2.875v1.525h.041c.4-.753 1.376-1.547 2.824-1.547 3.019 0 3.579 1.994 3.579 4.588v6.434z"/>
                                </svg>
                            </a>
                        </div>
                    </Col>
                </Row>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Dev. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;