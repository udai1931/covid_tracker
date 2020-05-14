import React,{useEffect,useState} from 'react';
import {FormControl, NativeSelect, StylesProvider} from '@material-ui/core';
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
    return(
        <div className={styles.container}>
            <FormControl className={StylesProvider.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value ="">Global</option>
                {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
            </FormControl>
        </div>  
    )
}

export default CountryPicker;