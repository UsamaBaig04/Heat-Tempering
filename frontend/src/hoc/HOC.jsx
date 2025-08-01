import { render } from '@testing-library/react';
import React from 'react'

const HOC = (WrappedComponent, application, roomid, areaid, startDate, endDate ) => {
    // console.log(application,"::",roomid, "::", areaid,"::",startDate,"::",endDate,)
  return class extends React.Component{
    state = {
        data : []
    };
    componentDidMount() {
        const fetchData = async () => {
            const res = await fetch (
                `http://192.168.0.155:3000/api/user?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}&room=${roomid}`
            // "http://192.168.0.155:3000/api/user?app=LAF&startDate=2023/2/28 10:42:00&endDate=2023/2/28 23:59:59&area=2&room=10"
                );
            const json = await res.json();
            this.setState({...this.state, data:json});
        };
        fetchData();
    }
    render(){
        let {data} = this.state;

        return(
            <WrappedComponent items={data}></WrappedComponent>
        )
    }
  }
}

export default HOC