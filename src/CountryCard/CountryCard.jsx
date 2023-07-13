import React, { useState } from 'react';
import '../index.css';




const CountryCard = (props) => {

    const country = props.country;
    // const index = props.index;
    const regionFilter = props.regionFilter;
    const navigateToCountryDetailPage = props.navigateToCountryDetailPage;
    const numberWithCommas = props.numberWithCommas;
    const colorScheme = props.colorScheme;

    return (
        <div className="country-card active" 
            data-color-scheme={colorScheme}
            data-visible={ (regionFilter == country.region || regionFilter == '') ? "true" : "false"}
            onClick={() => navigateToCountryDetailPage(country)}>
            <div className="country-flag">

            <img src={country.flags.svg}></img>
            </div>
            <div className="country-card__text">
                <div className="country-name">{country.name.common}</div>
                <div className="country-info">
                    <div className="country-population flex-container">
                        <div className="info-label population-label">Population: </div>
                        <div className="info-content population-number">{numberWithCommas(country.population)}</div>
                    </div>
                    <div className="country-region flex-container">
                        <div className="info-label">Region:</div>
                        <div className="info-content">{country.region}</div>
                    </div>
                    <div className="country-capital flex-container">
                        <div className="info-label">Capital:</div>
                        <div className="info-content">{country.capital}</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CountryCard;