import React,{Component} from 'react';
import { fetchData } from './api/index';
import Card from './components/Card';
import Chart from './components/Chart';
import CountryPicker from './components/CountryPicker';
import styles from './App.module.css'
import corona from './images/image.png';

class App extends Component{
    state = {
        data:{},
       country:'',
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({ data : data});
        console.log("Data success");
        console.log(data);
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data : fetchedData , country : country});
    }
    render(){
        return(
            <div className={styles.container}>
                <h1>
                    <img src={corona} className={styles.image} alt="Corona"/>
                    <Card data = {this.state.data} />
                    <CountryPicker handleCountryChange={this.handleCountryChange}/>
                    <Chart data={this.state.data} country={this.state.country}/>
                </h1>
            </div>
        );
    }
}

export default App;
