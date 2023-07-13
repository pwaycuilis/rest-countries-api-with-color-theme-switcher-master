import { useState, useEffect } from 'react'
import axios from 'axios';
import CountryCard from './CountryCard/CountryCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faMagnifyingGlass, faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


document.body.dataset.colorScheme = "Dark";


function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState(null);
  const [fetchURL, setFetchURL] = useState('https://restcountries.com/v3.1/all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState('false');
  const [currentPage, setCurrentPage] = useState('homepage');
  const [colorScheme, setColorScheme] = useState('Dark');
  const [regionFilter, setRegionFilter] = useState('');

  const [selectedCountry, setselectedCountry] = useState({});



  useEffect(() => {
    // const bodyElement = document.body;
    // bodyElement.setAttribute('data-color-scheme', {colorScheme})

    const fetchData = async () => {
      try {
        // const response = await axios.get('https://restcountries.com/v3.1/all');
        const response = await axios.get(fetchURL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const filteredData = searchQuery ? data.filter(item =>
    item.name.common.toLowerCase().includes(searchQuery.toLowerCase()) 
  ) : 
  data;

  const toggleColorScheme = () => {

    // const currentColorScheme = colorScheme;
    // console.log("toggle color scheme")
    if (colorScheme == "Dark") {
      setColorScheme("Light");
      document.body.dataset.colorScheme="Light";
    } else if (colorScheme == "Light") {
      setColorScheme("Dark");
      document.body.dataset.colorScheme="Dark";
    } else {
      // console.log("color scheme error");
    }

  }


  const handleInputChange = (event) => {


    setSearchQuery(event.target.value);

  }



  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleDropdownClick = () => {
    // let isVisible = dropdownVisible === "true" ? "false" : "true";
    if (dropdownVisible == "true") {
      setDropdownVisible(["false"]);
    } else if (dropdownVisible == "false") {
      setDropdownVisible(["true"])
    } else {
      console.log('dropdown error');
    }

  }

  const filterByRegion = (region) => {
    // console.log({region})
    setRegionFilter(region);
  }

  const navigateToHomepage = () => {
    setCurrentPage("homepage");
  }

  const navigateToCountryDetailPage = (country) => {
    setCurrentPage("detail");
    setselectedCountry(country);
  }

  const parseNativeName = () => {

    // console.log(selectedCountry);
    const nativeNamesObj = selectedCountry.name.nativeName;

    const languages = Object.keys(nativeNamesObj);

    const nativeNames =[]

    languages.forEach(language => {
      const fullNameOfLanguage = selectedCountry.languages[language];
      nativeNames.push(nativeNamesObj[language].common + " (" + fullNameOfLanguage + ")");
    })

    
    // console.log({nativeNames});

    return nativeNames.join(', ');



  }

  const parseCurrencies = () => {
    const currenciesObj = selectedCountry.currencies;

    const currencies = Object.keys(currenciesObj);

    const currencyNames = [];
    const currencySymbols = [];
    currencies.forEach(currency => {
      currencyNames.push(currenciesObj[currency].name)
      currencySymbols.push(currenciesObj[currency].symbol);
    });

    return currencyNames.join(', ');

  }
  
  const parseLanguages = () => {
    const languagesObj = selectedCountry.languages;
    const languages = Object.keys(languagesObj);

    const languageNames = [];
    languages.forEach(language => {
      languageNames.push(languagesObj[language])
    })

    return languageNames.join(', ');
  }

  const parseBorders = () => {
    const borderCountries = selectedCountry.borders ? selectedCountry.borders : null;

    if (!borderCountries) return;
    // const borderCountryNames = []
    const borderCountryObjs = [];

    borderCountries.forEach(borderCountry => {
      const targetCountry = data.find(country => country.cca3 == borderCountry)
      // console.log(targetCountry.name.common);
      borderCountryObjs.push(targetCountry);
      // borderCountryNames.push(targetCountry.name.common);
    })

    return borderCountryObjs;
    // console.log({borderCountryNames})
    // return borderCountryNames;
  }

  return (
    <> 
      <header className="flex-container space-between" data-color-scheme={colorScheme}> 
        <div className="header-text">Where in the world?</div>
        <div className="theme-toggle flex-container active"
          onClick={() => toggleColorScheme()}>
          <div className="theme-icon">
            <FontAwesomeIcon icon={ colorScheme == "Dark" ? faMoon : faSun} />
          </div>
          <div className="theme-text">{colorScheme} Mode</div>
        </div>
      </header>

      <main data-color-scheme={colorScheme}>
        <div className="homepage" 
          data-visible={currentPage == "homepage" ? "true" : "false"}>
          <div className="nav-tools">
            <div className="search-bar" data-color-scheme={colorScheme}>
              <form>
                <button className="search-bar__submit"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

                <input
                  className="search-bar__input"
                  type="text"
                  name="name"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search for a country..."
                />
              </form>
              

            </div>

            <div className="filter-container" data-color-scheme={colorScheme}>
              <div className="filter-dropdown__button flex-container space-between active"
                onClick={() => handleDropdownClick()}>
                <div className="button-text"> {regionFilter ? regionFilter : "Filter By Region"}</div>
                <div className="button-icon"><FontAwesomeIcon icon={faAngleDown} /></div>
                </div>
              <div className="filter-dropdown__content" data-visible={dropdownVisible}>
                <div className="dropdown-item active"
                  onClick={() => filterByRegion("Africa")}>Africa</div>

                <div className="dropdown-item active"
                  onClick={() => filterByRegion("Americas")}>Americas</div>
                <div className="dropdown-item active"
                  onClick={() => filterByRegion("Asia")}>Asia</div>
                <div className="dropdown-item active"
                  onClick={() => filterByRegion("Europe")}>Europe</div>
                <div className="dropdown-item active"
                  onClick={() => filterByRegion("Oceania")}>Oceania</div>
                
                <div className="dropdown-item active" data-visible={regionFilter ? "true" : "false"}
                  onClick={() => filterByRegion("")}>
                    Reset filter
                </div>
              </div>
            </div>
          </div>
    

          {filteredData ? (
            <div className="country-cards__container flex-container">
          
              {filteredData.map( (item, i) => (
                <CountryCard key={i} country={item} regionFilter={regionFilter} 
                  navigateToCountryDetailPage={navigateToCountryDetailPage} numberWithCommas={numberWithCommas}
                  colorScheme={colorScheme} />
              ))}

            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {currentPage == "detail" ? (

        
          <div className="detail-page" 
            data-color-scheme={colorScheme}
            data-visible={currentPage == "homepage" ? "false" : "true"}>
              <button className="back-button active flex-container"
                onClick={() => navigateToHomepage()}>
                  <div className="button-icon"><FontAwesomeIcon icon={faArrowLeft} /></div>
                  <div className="button-text">Back</div>
                  
                </button>
              
              <div className="detail__country-flag country-flag">
                <img src={selectedCountry.flags.svg}></img>
              </div>
              <div className="detail__country-name country-name">
                {selectedCountry.name.common}
              </div>

              <div className="country-detail__sub-container 
              country-detail__sub-container--1">
                <div className="native-name flex-container">
                  <div className="info-label">Native Name(s):</div>
                  <div className="info-content">
                    {parseNativeName()}
                  </div>
                </div>
              

                <div className="country-population flex-container">
                  <div className="info-label">Population:</div>
                  <div className="info-content">{numberWithCommas(selectedCountry.population)}</div>
                </div>

                <div className="country-region flex-container">
                  <div className="info-label">Region:</div>
                  <div className="info-content">{selectedCountry.region}</div>
                </div>

                <div className="country-sub-region flex-container">
                  <div className="info-label">Sub Region:</div>
                  <div className="info-content">{selectedCountry.subregion}</div>
                </div>

                <div className="country-capital flex-container">
                  <div className="info-label">Capital:</div>
                  <div className="info-content">{selectedCountry.capital}</div>
                </div>
              </div>

              <div className="country-detail__sub-container 
              country-detail__sub-container--2">
                <div className="country__top-level-domain flex-container">
                  <div className="info-label">Top Level Domain:</div>
                  <div className="info-content">{selectedCountry.tld[0]}</div>
                </div>

                <div className="country-currencies flex-container">
                  <div className="info-label">Currencies:</div>
                  <div className="info-content">{parseCurrencies()}</div>
                </div>

                <div className="country-languages flex-container">
                  <div className="info-label">Languages:</div>
                  <div className="info-content">{parseLanguages()}</div>
                </div>
              </div>

              <div className="country-detail__borders-container">
                <div className="info-label">Border Countries:</div>
                <div className="border-country-buttons__container info-content flex-container">
                  {parseBorders() ? parseBorders().map( (borderCountryObj, i) => 
                  ( <button key={i} className="border-country-button active"
                      data-color-scheme={colorScheme} onClick={() => navigateToCountryDetailPage(borderCountryObj)}>{borderCountryObj.name.common}</button> )
                  ) : <div>None</div>}

                </div>
              </div>
          </div>


          ) :
          <p></p>
        }
      </main>

    </>
  )
}

export default App
