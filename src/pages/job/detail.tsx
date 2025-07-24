import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { callFetchJobById } from "@/config/api";
import { Card, Col, Divider, Row, Skeleton, Tag, Button, Space } from "antd";
import { DollarOutlined, EnvironmentOutlined, HistoryOutlined } from "@ant-design/icons";
import { getLocationName } from "@/config/utils";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ApplyModal from "@/components/client/modal/apply.modal";
import parse from 'html-react-parser';
import { IJob } from "@/types/backend";

dayjs.extend(relativeTime);

const ClientJobDetailPage = () => {
    const [jobDetail, setJobDetail] = useState<IJob | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true);
                const res = await callFetchJobById(id);
                if (res?.data) {
                    setJobDetail(res.data);
                }
                setIsLoading(false);
            }
        };
        init();
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 8 }} />
            ) : (
                <Row gutter={[24, 24]}>
                    {jobDetail && jobDetail._id && (
                        <>
                            <Col xs={24} md={16}>
                                <Card
                                    className="shadow-sm border border-gray-300 rounded-lg"
                                    bodyStyle={{ padding: '24px' }}
                                >
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {jobDetail.name}
                                    </h1>
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="bg-gray-900 hover:bg-gray-800 text-white mb-6"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Apply Now
                                    </Button>
                                    <Divider className="my-6" />
                                    <div className="mb-6">
                                        <Space wrap>
                                            {jobDetail?.skills?.map((item, index) => (
                                                <Tag
                                                    key={`${index}-key`}
                                                    className="bg-gray-100 text-gray-800 border-none px-3 py-1 rounded-full text-sm font-medium"
                                                >
                                                    {item}
                                                </Tag>
                                            ))}
                                        </Space>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center text-gray-700">
                                            <DollarOutlined className="text-lg mr-2 text-gray-900" />
                                            <span className="text-lg">
                                                {(jobDetail.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <EnvironmentOutlined className="text-lg mr-2 text-gray-900" />
                                            <span className="text-lg">{getLocationName(jobDetail.location)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                            <HistoryOutlined className="text-lg mr-2" />
                                            <span>{dayjs(jobDetail.updatedAt).fromNow()}</span>
                                        </div>
                                    </div>
                                    <Divider className="my-6" />
                                    <div className="prose max-w-none text-gray-700">
                                        {parse(jobDetail.description)}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card
                                    className="shadow-sm border border-gray-300 rounded-lg"
                                    bodyStyle={{ padding: '24px' }}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            alt="Company Logo"
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${jobDetail.company?.logo}`}
                                            className="w-24 h-24 object-contain mb-4 rounded-lg"
                                        />
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {jobDetail.company?.name}
                                        </h2>
                                    </div>
                                </Card>
                            </Col>
                        </>
                    )}
                </Row>
            )}
            <ApplyModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                jobDetail={jobDetail}
            />
        </div>
    );
};

export default ClientJobDetailPage;