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
    '2018-09-19T00:00:00.000Z',
    '2018-09-20T01:30:00.000Z',
    '2018-09-21T02:30:00.000Z',
    '2018-09-22T03:30:00.000Z',
    '2018-09-23T04:30:00.000Z',
    '2018-09-24T05:30:00.000Z',
    '2018-09-25T06:30:00.000Z',
    '2018-09-26T07:30:00.000Z',
    '2018-09-27T08:30:00.000Z',
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
                    format: 'dd/MM/yyyy HH:mm', // Định dạng tiếng Việt trong tooltip
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: 'datetime',
                categories: param.dataTime,
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM yyyy',
                        day: 'dd MMM',
                        hour: 'HH:mm',
                    },
                    format: 'dd/MM/yyyy', // Định dạng tiếng Việt trên trục x
                },
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
