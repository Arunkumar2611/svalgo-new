import CustomCard from '../../components/Card/CustomCard'
import CustomLineChart from '../../components/Chart/CustomLineChart'

const DsoChart = () => {
    const data = [
        {
            date: "Nov 01, 2024",
            upper: 600,
            lower: 400,
        },
        {
            date: "Nov 08, 2024",
            upper: 670,
            lower: 430,
        },
        {
            date: "Nov 15, 2024",
            upper: 720,
            lower: 450,
        },
        {
            date: "Nov 22, 2024",
            upper: 750,
            lower: 460,
        },
        {
            date: "Nov 29, 2024",
            upper: 770,
            lower: 470,
        },
        {
            date: "Dec 06, 2024",
            upper: 780,
            lower: 480,
        },
        {
            date: "Dec 13, 2024",
            upper: 800,
            lower: 490,
        },
        {
            date: "Dec 20, 2024",
            upper: 900,
            lower: 540,
        },
    ];
    return (
        <CustomCard
            titleAsText="DSO trends"
            main={
                <CustomLineChart data={data} lines={[
                    { dataKey: "upper", stroke: "#FF5733", strokeWidth: 4, label: "Upper Bound" },
                    { dataKey: "lower", stroke: "#33B5FF", strokeWidth: 4, label: "Lower Bound" },
                ]} />
            }
        />
    )
}

export default DsoChart