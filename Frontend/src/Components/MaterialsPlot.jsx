import React from 'react';
import { getMaterialPlotDetails } from '../APIcalls/Materials';
import BarChart from './BarChart';
import { useState, useEffect } from 'react';

export default function MaterialPlot() {

    const [xData, setXdata] = useState([])
    const [yData, setYdata] = useState([])

    useEffect(() => {
        let plotDataX = []; // dummy values
        let plotDataY = [];
        getMaterialPlotDetails().then((res) => { // worked

            res.data.map((obj) => {
                plotDataX.push(obj.Type);
                plotDataY.push(obj.Views);
            })
            setXdata(plotDataX)
            setYdata(plotDataY)

        }).catch((e) => {
            console.log(e)
        })
    }, []);

    const GeneratePlot = () => {
        // console.log(xData, yData)
        // const [data, setData] = useState({
        const data = {
            labels: xData, // x axis
            datasets: [
                {
                    label: "No of Views",
                    data: yData, // y axis
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        };

        return (
            <div style={{ width: 700 }}>
                <BarChart chartData={data} />
            </div>
        );
    }



    return (
        <div>
            <h3>Views</h3>
            {/* {setAxisData()} */}
            {GeneratePlot()}
            

        </div>
    );
}