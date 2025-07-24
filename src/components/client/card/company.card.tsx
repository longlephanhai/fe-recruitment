import { callFetchCompany } from '@/config/api';
import { convertSlug } from '@/config/utils';
import { ICompany } from '@/types/backend';
import { Card, Col, Divider, Empty, Pagination, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';

interface IProps {
    showPagination?: boolean;
}

const CompanyCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompany();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCompany = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchCompany(query);
        if (res && res.data) {
            setDisplayCompany(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const handleOnchangePage = (pagination: { current: number, pageSize: number }) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
    };

    const handleViewDetailJob = (item: ICompany) => {
        if (item.name) {
            const slug = convertSlug(item.name);
            navigate(`/company/${slug}?id=${item._id}`);
        }
    };

    return (
        <div className="py-8">
            <div className="container mx-auto">
                <Spin spinning={isLoading} tip="Loading..." size="large">
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <div className={`flex ${isMobile ? 'flex-col items-start' : 'items-center justify-between'}`}>
                                <h2 className="text-2xl font-semibold text-gray-900">Nhà Tuyển Dụng Hàng Đầu</h2>
                                {!showPagination && (
                                    <Link to="company" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        Xem tất cả
                                    </Link>
                                )}
                            </div>
                        </Col>

                        {displayCompany?.map((item) => (
                            <Col key={item._id} xs={24} sm={12} md={6}>
                                <Card
                                    onClick={() => handleViewDetailJob(item)}
                                    hoverable
                                    className="h-[400px] rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                                    cover={
                                        <div className="h-56 flex items-center justify-center bg-gray-50 p-4">
                                            <img
                                                alt={item.name}
                                                src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.logo}`}
                                                className="max-h-40 max-w-full object-contain rounded-md mx-auto"
                                            />
                                        </div>
                                    }
                                >
                                    <Divider className="my-3 border-gray-300" />
                                    <h3 className="text-center text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                                </Card>
                            </Col>
                        ))}

                        {(!displayCompany || (displayCompany && displayCompany.length === 0)) && !isLoading && (
                            <Col span={24}>
                                <Empty description="Không có dữ liệu" className="py-12" />
                            </Col>
                        )}
                    </Row>
                    {showPagination && (
                        <div className="mt-10 flex justify-center">
                            <Pagination
                                current={current}
                                total={total}
                                pageSize={pageSize}
                                responsive
                                showSizeChanger
                                onChange={(p: number, s: number) => handleOnchangePage({ current: p, pageSize: s })}
                                className="text-gray-700"
                            />
                        </div>
                    )}
                </Spin>
            </div>
        </div>
    );
};

export default CompanyCard;