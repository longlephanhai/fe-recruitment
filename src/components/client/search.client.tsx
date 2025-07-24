import { Button, Col, Form, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm } from '@ant-design/pro-components';
import { ConfigProvider, Typography } from 'antd';

const SearchClient = () => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        // Handle form submission
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#4b5563',
                        colorBgContainer: '#ffffff',
                        colorText: '#374151',
                        colorTextPlaceholder: '#9ca3af',
                        borderRadius: 12,
                    },
                    components: {
                        Select: {
                            selectorBg: '#ffffff',
                            optionSelectedBg: '#f3f4f6',
                            optionActiveBg: '#e5e7eb',
                            multipleItemBg: '#f3f4f6',
                            multipleItemBorderColor: '#e5e7eb',
                        },
                        Button: {
                            primaryColor: '#374151',
                            // primaryBg: '#4b5563',
                            // defaultHoverBg: '#374151',
                            // defaultHoverColor: '#ffffff',
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
                    <Row gutter={[16, 16]} align="middle">
                        <Col span={24}>
                            <Typography.Title level={3} className="!text-gray-800 !mb-4">
                                Việc Làm IT Cho Developer
                            </Typography.Title>
                        </Col>
                        <Col span={24} md={16}>
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
                                    className="w-full rounded-lg border-gray-300 bg-white text-gray-700 hover:border-gray-400 transition-all"
                                    dropdownClassName="bg-white text-gray-700"
                                />
                            </ProForm.Item>
                        </Col>
                        <Col span={24} md={6}>
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
                                    className="w-full rounded-lg border-gray-300 bg-white text-gray-700 hover:border-gray-400 transition-all"
                                    dropdownClassName="bg-white text-gray-700"
                                />
                            </ProForm.Item>
                        </Col>
                        <Col span={24} md={2}>
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                                block
                                className=" w-full font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors rounded-lg"
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </ProForm>
            </ConfigProvider>
        </div>
    );
};

export default SearchClient;