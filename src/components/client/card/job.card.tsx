import { callFetchJob } from '@/config/api';
import { LOCATION_LIST, convertSlug, getLocationName } from '@/config/utils';
import { IJob } from '@/types/backend';
import { EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Col, Empty, Pagination, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface IProps {
    showPagination?: boolean;
}

const JobCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchJob();
    }, [current, pageSize, filter, sortQuery]);

    const fetchJob = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchJob(query);
        if (res && res.data) {
            setDisplayJob(res.data.result);
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

    const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name);
        navigate(`/job/${slug}?id=${item._id}`);
    };

    return (
        <div className="py-8">
            <div className="container mx-auto">
                <Spin spinning={isLoading} tip="Loading..." size="large">
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <div className={`flex ${isMobile ? 'flex-col items-start' : 'items-center justify-between'}`}>
                                <h2 className="text-2xl font-bold text-gray-900">Công Việc Mới Nhất</h2>
                                {!showPagination && (
                                    <Link to="job" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        Xem tất cả
                                    </Link>
                                )}
                            </div>
                        </Col>

                        {displayJob?.map((item) => (
                            <Col key={item._id} xs={24} sm={12} md={12}>
                                <Card
                                    size="small"
                                    title={null}
                                    hoverable
                                    onClick={() => handleViewDetailJob(item)}
                                    className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-center p-6 space-x-6">
                                        <div className="flex-shrink-0">
                                            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                <img
                                                    alt={item.company?.name || "Company Logo"}
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.company?.logo}`}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-semibold text-gray-900 truncate">{item.name}</h3>
                                            <div className="flex flex-col gap-2 mt-2">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <EnvironmentOutlined style={{ color: '#58aaab', marginRight: 6 }} />
                                                    {getLocationName(item.location)}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <ThunderboltOutlined style={{ color: 'orange', marginRight: 6 }} />
                                                    {(item.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                                                </p>
                                                <p className="text-sm text-gray-500">{dayjs(item.updatedAt).fromNow()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}

                        {(!displayJob || (displayJob && displayJob.length === 0)) && !isLoading && (
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

export default JobCard;