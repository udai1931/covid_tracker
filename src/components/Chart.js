import React,{useState, useEffect} from 'react';
import { fetchDailyData } from '../api/index'
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

var chartColors = {
    color1: 'rgba(0, 0, 255, 0.5)',
    color2: 'rgba(0, 255, 0, 0.5)',
    color3: 'rgba(255, 0, 0, 0.5)'
  };

const Chart = ({data, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
        setDailyData(await fetchDailyData());
        };
        fetchApi();
    }, []);

    if(!data){
        return 'Data Loading...'
    }
    
    const lineChart = (
        dailyData? 
        (<Line 
            data = {{
                labels : dailyData.map(({date}) => date),
                datasets : [{
                    data : dailyData.map(({confirmed}) => confirmed),
                    label : 'Infected',
                    borderColor : '#3333ff',
                    fill : true
                }, {
                    data : dailyData.map(({deaths}) => deaths),
                    label : 'Deaths',
                    borderColor : 'red',
                    backgroundColor : 'rgba(255, 0, 0, 0.5)',
                    fill : true
                }]
            }}
        />):
        <h1>Loading....</h1>
    );

    const barChar = (
        data.confirmed?
        (<Bar 
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets: [{
                    label : 'People',
                    backgroundColor : [chartColors.color1,chartColors.color2,chartColors.color3] ,
                    data : [data.confirmed.value, data.recovered.value, data.deaths.value],
                }]
            }}
            options={{
                legend: {display : false},
                title : {display : true, text: `Current state in ${country}`}
            }}
        />):
        null
    )
    if(!data.confirmed){
        return 'Loading Chart';
    }
    return(
        <div className={styles.container}>
            {country?barChar:lineChart}
        </div>
    );
}

export default Chart;