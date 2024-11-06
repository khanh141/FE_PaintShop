import React, { useState } from 'react';
import './Card.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, LayoutGroup } from 'framer-motion';
import { UilTimes } from '@iconscout/react-unicons';
import Chart from 'react-apexcharts';

const Card = ({ id, ...props }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <LayoutGroup>
            {expanded ? (
                <ExpandedCard
                    param={props}
                    setExpanded={() => setExpanded(false)}
                    layoutId={`expandableCard-${id}`} // Sử dụng id duy nhất
                />
            ) : (
                <CompactCard
                    param={props}
                    setExpanded={() => setExpanded(true)}
                    layoutId={`expandableCard-${id}`} // Sử dụng id duy nhất
                />
            )}
        </LayoutGroup>
    );
};

const convertToVietnamTime = (utcDateStr) => {
    const date = new Date(utcDateStr);
    date.setHours(date.getHours() + 7);
    return date.toISOString();
};

// Cập nhật lại mảng categories với múi giờ Việt Nam
const vietnamCategories = [
    '2024-11-01T00:00:00.000Z',
    '2024-11-02T01:30:00.000Z',
    '2024-11-03T02:30:00.000Z',
    '2024-11-04T03:30:00.000Z',
    '2024-11-05T04:30:00.000Z',
    '2024-11-06T05:30:00.000Z',
    '2024-11-07T06:30:00.000Z',
    '2024-11-07T07:30:00.000Z',
    '2024-11-08T08:30:00.000Z',
];
// ].map(convertToVietnamTime);

// Compact Card
function CompactCard({ param, setExpanded, layoutId }) {
    const Png = param.png;

    return (
        <motion.div
            className="CompactCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId={layoutId}
            onClick={setExpanded}
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png />
                <span>{param.value} VND</span>
                <span>Trong 1 tuần qua</span>
            </div>
        </motion.div>
    );
}

// Expanded Card
function ExpandedCard({ param, setExpanded, layoutId }) {
    console.log(param.dataTime);

    const data = {
        options: {
            chart: {
                type: 'area',
                height: 'auto',
            },
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.35,
            },
            fill: {
                colors: ['#fff'],
                type: 'gradient',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                colors: ['white'],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy HH:mm',
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: 'datetime',
                categories: param.dataTime,
                // tickAmount: param.dataTime.length,
                min: new Date(param.dataTime[0]).getTime(),
                max: new Date(
                    param.dataTime[param.dataTime.length - 1]
                ).getTime(),
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        return date.toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        });
                    },
                    show: true,
                    style: {
                        colors: ['#000'],
                        fontSize: '12px',
                    },
                },
                endOnTick: true, // Đảm bảo trục x dừng ở điểm cuối cùng
            },
        },
    };

    return (
        <motion.div
            className="ExpandedCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId={layoutId}
        >
            <div
                style={{
                    alignSelf: 'flex-end',
                    cursor: 'pointer',
                    color: 'white',
                }}
            >
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>
            <div className="chartContainer">
                <Chart
                    options={data.options}
                    series={param.series}
                    type="area"
                />
            </div>
            <span>Trong 1 tuần qua</span>
        </motion.div>
    );
}

export default Card;
