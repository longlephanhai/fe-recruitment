import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ICompany } from "@/types/backend";
import { callFetchCompanyById } from "@/config/api";
import parse from 'html-react-parser';
import { Col, Divider, Row, Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const ClientCompanyDetailPage = (props: any) => {
    const [companyDetail, setCompanyDetail] = useState<ICompany | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const id = params?.get("id");

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true);
                const res = await callFetchCompanyById(id);
                if (res?.data) {
                    setCompanyDetail(res.data);
                }
                setIsLoading(false);
            }
        };
        init();
    }, [id]);

    return (
        <div className="py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                {isLoading ? (
                    <Skeleton active paragraph={{ rows: 8 }} className="rounded-lg" />
                ) : (
                    companyDetail && companyDetail._id && (
                        <Row gutter={[32, 32]} className="text-gray-700">
                            <Col span={24} md={16}>
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-6">{companyDetail.name}</h1>
                                    <div className="flex items-center text-gray-600 mb-6">
                                        <EnvironmentOutlined style={{ color: '#58aaab', marginRight: 8 }} />
                                        <span className="text-sm">{companyDetail?.address}</span>
                                    </div>
                                    <Divider className="my-6 border-gray-200" />
                                    <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                                        {parse(companyDetail?.description ?? "")}
                                    </div>
                                </div>
                            </Col>
                            <Col span={24} md={8}>
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full flex flex-col items-center justify-center">
                                    <div className="mb-6">
                                        <img
                                            alt={companyDetail.name}
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${companyDetail?.logo}`}
                                            className="h-40 w-40 object-contain rounded-lg bg-gray-100 p-3 shadow-md transition-all duration-300 hover:shadow-lg"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{companyDetail?.name}</h3>
                                    <p className="text-sm text-gray-500 text-center">Công ty hàng đầu</p>
                                </div>
                            </Col>
                        </Row>
                    )
                )}
            </div>
        </div>
    );
};

export default ClientCompanyDetailPage;