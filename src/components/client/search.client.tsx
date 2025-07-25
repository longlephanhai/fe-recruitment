import { Button, Card, Col, Form, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { convertSlug, getLocationName, LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm } from '@ant-design/pro-components';
import { ConfigProvider, Typography } from 'antd';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { callFetchJob } from '@/config/api';
import { useState } from 'react';

import dayjs from 'dayjs';
import { IJob } from '@/types/backend';


const SearchClient = () => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [data, setData] = useState<IJob[]>([]);

    const onFinish = async (values: any) => {
        const query = queryString.stringify(values, { arrayFormat: 'bracket' });
        const res = await callFetchJob(query);
        if (res && res.data) {
            setData(res.data.result);
        }
    };

    const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name);
        navigate(`/job/${slug}?id=${item._id}`);
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1f2937', // gray-800
                        colorBgContainer: '#ffffff',
                        colorText: '#374151', // gray-700
                        colorTextPlaceholder: '#9ca3af', // gray-400
                        borderRadius: 8,
                    },
                    components: {
                        Select: {
                            selectorBg: '#ffffff',
                            optionSelectedBg: '#f3f4f6', // gray-100
                            optionActiveBg: '#e5e7eb', // gray-200
                            multipleItemBg: '#f3f4f6',
                            multipleItemBorderColor: '#e5e7eb',
                        },
                        Button: {
                            primaryColor: '#ffffff',

                        },
                    },
                }}
            >
                <ProForm
                    form={form}
                    onFinish={onFinish}
                    submitter={{
                        render: () => <></>,
                    }}
                >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <Row gutter={[16, 16]} align="middle">
                            <Col span={24}>
                                <Typography.Title level={3} className="!text-gray-900 !mb-4">
                                    Việc Làm IT Cho Developer
                                </Typography.Title>
                            </Col>
                            <Col xs={24} md={16}>
                                <ProForm.Item name="skills" className="mb-0">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        placeholder={
                                            <span className="flex items-center gap-2">
                                                <MonitorOutlined className="text-gray-500" />
                                                Tìm theo kỹ năng...
                                            </span>
                                        }
                                        optionLabelProp="label"
                                        options={optionsSkills}
                                        className="w-full"
                                    />
                                </ProForm.Item>
                            </Col>
                            <Col xs={24} md={6}>
                                <ProForm.Item name="location" className="mb-0">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        placeholder={
                                            <span className="flex items-center gap-2">
                                                <EnvironmentOutlined className="text-gray-500" />
                                                Địa điểm...
                                            </span>
                                        }
                                        optionLabelProp="label"
                                        options={optionsLocations}
                                        className="w-full"
                                    />
                                </ProForm.Item>
                            </Col>
                            <Col xs={24} md={2}>
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                    block
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold"
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </ProForm>

                <div className="mt-8">
                    <Typography.Title level={4} className="!text-gray-900">
                        Kết quả tìm kiếm ({data.length})
                    </Typography.Title>
                    <Row gutter={[16, 16]} className="mt-4">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        hoverable
                                        onClick={() => handleViewDetailJob(item)}
                                        className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                                        bodyStyle={{ padding: '16px' }}
                                    >
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        alt={item.company?.name || "Company Logo"}
                                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item.company?.logo}`}
                                                        className="h-12 w-12 rounded-full object-contain bg-gray-100"
                                                    />
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <EnvironmentOutlined className="mr-2 text-gray-500" />
                                                    {getLocationName(item.location)}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <ThunderboltOutlined className="mr-2 text-yellow-500" />
                                                    {(item.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Cập nhật: {dayjs(item.updatedAt).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col span={24}>
                                <p className="text-gray-500 text-center">Không tìm thấy công việc nào.</p>
                            </Col>
                        )}
                    </Row>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default SearchClient;