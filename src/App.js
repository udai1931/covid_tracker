import React,{Component} from 'react';
import Card from './components/Card';
import Chart from './components/Chart';
import CountryPicker from './components/CountryPicker';
import styles from './App.module.css'
import { fetchData } from './api';
import corona from './images/image.png';
import cx from 'classnames';

class App extends Component{
    state = {
        data:{},
       country:''
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({ data : data});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data : fetchedData , country : country});
    }
    render(){
        const {data} = this.state;
        return(
            <div className={styles.container}>
                <h1>
                    <img src={corona} className={styles.image} alt="Corona"/>
                    <Card data = {data} />
                    <CountryPicker handleCountryChange={this.handleCountryChange}/>
                    <Chart data={data} country={this.state.country}/>
                </h1>
            </div>
        );
    }
}

export default App;
