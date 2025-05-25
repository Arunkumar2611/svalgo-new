// import React from "react";
import AROutstandingChart from "../../components/Chart/AROutstandingChart";
import CustomCard from "../../components/Card/CustomCard";

const ARChart = () => {
    return (
        <CustomCard
            titleAsText="AR Outstanding in %"
            main={<AROutstandingChart />}
        />
    );
};

export default ARChart;
