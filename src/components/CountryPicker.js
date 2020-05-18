import React,{useEffect,useState} from 'react';
import {FormControl, NativeSelect} from '@material-ui/core';
import { fetchCountries } from '../api/index';
import styles from './CountryPicker.module.css';

const CountryPicker = ( {handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setFetchedCountries(await fetchCountries());
        }
        fetchApi();
    }, [setFetchedCountries]);
    if(!fetchedCountries){
        return 'FetchCountries Loading ...'
    }
    return(
        <div className={styles.container}>
            <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value ="">Global</option>
                {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
            </FormControl>
        </div>  
    );
}

export default CountryPicker;