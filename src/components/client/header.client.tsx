import { useState, useEffect } from 'react';
import { CodeOutlined, ContactsOutlined, DashOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Dropdown, MenuProps, Space, message, Typography } from 'antd';
import { Menu, ConfigProvider } from 'antd';
import { FaBuilding, FaDev, FaHome } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { callLogout } from '@/config/api';
import { setLogoutAction } from '@/redux/slice/accountSlide';
import ManageAccount from './modal/manage.account';


const Header = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    const user = useAppSelector(state => state.account.user);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [current, setCurrent] = useState('home');
    const location = useLocation();
    const [openManageAccount, setOpenManageAccount] = useState(false);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location]);

    const items: MenuProps['items'] = [
        {
            label: <Link to={'/'}>Trang Chủ</Link>,
            key: '/',
            icon: <FaHome />,
        },
        {
            label: <Link to={'/job'}>Việc Làm IT</Link>,
            key: '/job',
            icon: <CodeOutlined />,
        },
        {
            label: <Link to={'/company'}>Top Công ty IT</Link>,
            key: '/company',
            icon: <FaBuilding />,
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        setOpenMobileMenu(false);
    };

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const itemsDropdown: MenuProps['items'] = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenManageAccount(true)}
            >Quản lý tài khoản</label>,
            key: 'manage-account',
            icon: <ContactsOutlined />,
        },
        {
            label: <Link to={"/admin"}>Trang Quản Trị</Link>,
            key: 'admin',
            icon: <DashOutlined />,
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ];

    const itemsMobiles = [...items, ...itemsDropdown];

    return (
        <div className="bg-[#18181b] border-b border-[#27272a] shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <FaDev
                            className="text-2xl text-zinc-200 hover:text-zinc-400 transition-colors cursor-pointer"
                            onClick={() => navigate('/')}
                            title="DevCareer"
                        />
                        <Typography.Title level={4} className="!text-zinc-200 !m-0 hidden md:block">
                            DevCareer
                        </Typography.Title>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#ffffff',
                                    colorBgContainer: 'transparent',
                                    colorText: '#d4d4d8',
                                    colorBgTextHover: '#ffffff',
                                    controlItemBgActive: '#27272a',
                                },
                                components: {
                                    Menu: {
                                        itemHoverBg: '#27272a',
                                        itemSelectedBg: '#27272a',
                                        itemSelectedColor: '#ffffff',
                                        itemBg: 'transparent',
                                    },
                                },
                            }}
                        >
                            <Menu
                                onClick={onClick}
                                selectedKeys={[current]}
                                mode="horizontal"
                                items={items}
                                className="bg-transparent border-0"
                            />
                        </ConfigProvider>

                        {/* Auth Section */}
                        <div className="flex items-center">
                            {isAuthenticated ? (
                                <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                    <Space className="cursor-pointer hover:bg-[#27272a] p-2 rounded transition-colors">
                                        <span className="text-zinc-200 font-medium">Welcome, {user?.name}</span>
                                        <Avatar className="bg-[#3f3f46]">
                                            {user?.name?.substring(0, 2)?.toUpperCase()}
                                        </Avatar>
                                    </Space>
                                </Dropdown>
                            ) : (
                                <Link to="/login" className="text-zinc-200 font-medium hover:text-white transition-colors">
                                    Đăng Nhập
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <MenuFoldOutlined
                            className="text-xl text-zinc-200 hover:text-white transition-colors"
                            onClick={() => setOpenMobileMenu(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                title={<span className="text-zinc-200 font-semibold">DevCareer</span>}
                placement="right"
                onClose={() => setOpenMobileMenu(false)}
                open={openMobileMenu}
                styles={{
                    header: { background: '#18181b', borderBottom: '1px solid #27272a' },
                    body: { background: '#1f1f23', padding: 0 },
                }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#ffffff',
                            colorBgContainer: '#1f1f23',
                            colorText: '#d4d4d8',
                        },
                        components: {
                            Menu: {
                                itemHoverBg: '#27272a',
                                itemSelectedBg: '#27272a',
                                itemSelectedColor: '#ffffff',
                                itemBg: '#1f1f23',
                            },
                        },
                    }}
                >
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="vertical"
                        items={itemsMobiles}
                        className="border-0"
                    />
                </ConfigProvider>
            </Drawer>

            {/* Manage Account Modal */}
            <ManageAccount
                open={openManageAccount}
                onClose={() => setOpenManageAccount(false)}
            />
        </div>
    );
};

export default Header;