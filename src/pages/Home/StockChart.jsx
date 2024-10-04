import { Button } from "@/components/ui/button";
import { jwtTokenStr } from "@/constants";
import { getCoinMarketData } from "@/store/Coin/action";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Yearly Time Series",
        label: "1 Year",
        value: 365
    }
]

const StockChart = ({coinId}) => {
    const [activeLabel, setActiveLabel] = useState(timeSeries[0].label);
    const { coinMarketData } = useSelector(store => store.coin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searies = [{
        data: coinMarketData?.data ?? []
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

    const getDays = () => {
      if (activeLabel === "1 Day") 
        return 1;
      else if (activeLabel === "1 Week")
        return 7;
      else if (activeLabel === "1 Month")
        return 30;
      else 
        return 365;
    }
    useEffect(() => {
      dispatch(getCoinMarketData(coinId, getDays(), localStorage.getItem(jwtTokenStr), navigate));
    }, [coinId, activeLabel]);
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