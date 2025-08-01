import React, { useRef, useEffect } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { TiExportOutline } from 'react-icons/ti'
import Chart from "react-apexcharts";

const ModalLaf = ({ setShowModal,showModal }) => {

    // export chart
    async function downloadChart(chartId) {
        // console.log(window.Apex._chartInstances);
        const chartInstance = window.Apex._chartInstances.find(
            (chart) => chart.id === chartId
        );
        // console.log("chartInstance ", chartInstance);
        const base64 = await chartInstance.chart.dataURI();
        // console.log("base 64", base64.imgURI);
        const downloadLink = document.createElement("a");
        downloadLink.href = base64.imgURI;
        downloadLink.download = "LAF.png";

        // Add the anchor element to the document
        document.body.appendChild(downloadLink);

        // Simulate a click event to initiate the download
        downloadLink.click();

        // Remove the anchor element from the document
        document.body.removeChild(downloadLink);
    }

    const series = [{
        name: "Y Axis Values",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 55, 75, 100]
    }]

    const options = {
        chart: {
            id: 'chartss',
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'LAF ANNUNCIATOR SYSTEM',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };



    const ref = useRef()
    // useEffect(() => {
    //     const checkIfClickedOutside = e => {
    //         if (ref.current && !ref.current.contains(e.target)) {
    //             setShowModal(false)
    //         }

    //     }

    //     document.addEventListener("click", checkIfClickedOutside)
    //     return () => {
    //         document.removeEventListener("click", checkIfClickedOutside)
    //     }
    // }, [showModal])
    return (
        <>
            <div className='back-shadow'>
                <div className='custom-modal' ref={ref}>
                    <div className='header'>
                        <p onClick={() => downloadChart("chartss")}><TiExportOutline /></p>
                        <p onClick={() => setShowModal(false)}><FaWindowClose /></p>
                    </div>
                    <div className='body'>
                        <div className="app" style={{ width: "100%", height: "100%" }}>
                            <div className="row" style={{ width: "100%", height: "100%" }}>
                                <div className="mixed-chart" style={{ width: "100%", height: "100%" }}>
                                    <Chart

                                        options={options}
                                        series={series}
                                        type="line"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalLaf
