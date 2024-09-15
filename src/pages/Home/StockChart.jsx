import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        label: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        label: "1 Month",
        value: 30
    }
]

const StockChart = () => {
    const [activeLabel, setActiveLabel] = useState(timeSeries[0].label);
    const data = {
        "prices": [
          [
            1711843200000,
            69702.3087473573
          ],
          [
            1711929600000,
            71246.9514406015
          ],
          [
            1711983682000,
            68887.7495158568
          ]
        ],
        "market_caps": [
          [
            1711843200000,
            1370247487960.09
          ],
          [
            1711929600000,
            1401370211582.37
          ],
          [
            1711983682000,
            1355701979725.16
          ]
        ],
        "total_volumes": [
          [
            1711843200000,
            16408802301.8374
          ],
          [
            1711929600000,
            19723005998.215
          ],
          [
            1711983682000,
            30137418199.6431
          ]
        ]
    }
    const searies = [{
        data: data.prices
    }]
    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6
        },
        color: ["#758AA2"],
        markers: {
            colors: ["#fff"],
            strokeColor: "#fff",
            size: 0,
            strokeWidth: 1,
            style: "hollow"
        },
        tooltip: {
            theme: "dark"
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: "#47535E",
            strokeDashArray: 4,
            show: true
        }
    }
    return (
        <div>
            <div className="space-x-3 flex p-3">
               {timeSeries.map((item) => (
                <Button 
                    className="rounded-full"
                    key={item.label}
                    variant={activeLabel === item.label ? "" : "outline"}
                    onClick={() => setActiveLabel(item.label)}
                >
                    {item.label}
                </Button>
               ))} 
            </div>
            <div id="chart-timelines">
                <ReactApexChart 
                    options={options}
                    series={searies}
                    type="area"
                    height={450}
                />
            </div>
        </div>
    )
};

export default StockChart;