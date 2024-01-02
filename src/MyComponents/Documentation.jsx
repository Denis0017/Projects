import React, { useState, useEffect } from 'react';

const styles = {
  filterContainer: {
    height: '560px',
    margin: '5px',
    overflow: 'auto',
    padding: '10px',
    
  },
  heading: {
    marginBottom: '5px',
    marginRight: '5px',
    marginLeft: '5px',
    marginTop: '5px',
  },
  label: {
    marginRight: '10px',
  },
  checkboxContainer: {
    height: '60px',
    margin: '5px',
    overflow: 'auto',
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap',
  },
  Checkbox: {
    marginBottom: '1px',
  },

  DataWindow: {
    height: '650px',
    outline: '2px solid black',
    borderRadius: '10px',
    margin: '5px',
    display: 'flex', 
  },
  filteredData: {
    height: '560px',
    width: 'calc(100% - 220px)',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    margin: 'auto',
    position: 'relative',
    flex: '2', 
  },
};

export default function Documentation({ data, onFilterChange }) {
  const [filteredData, setFilteredData] = useState(data);
  const [endYears, setEndYears] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [pestles, setPestles] = useState([]);
  const [sources, setSources] = useState([]);
  const [countries, setCountries] = useState([]);

  const [selectedEndYears, setSelectedEndYears] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPestles, setSelectedPestles] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    setEndYears([...new Set(data.map(item => item.end_year))]);
    setTopics([...new Set(data.map(item => item.topic))]);
    setSectors([...new Set(data.map(item => item.sector))]);
    setRegions([...new Set(data.map(item => item.region))]);
    setPestles([...new Set(data.map(item => item.pestle))]);
    setSources([...new Set(data.map(item => item.source))]);
    setCountries([...new Set(data.map(item => item.country))]);

    setFilteredData(data);
  }, [data]);

  const applyFilters = () => {
    let filteredResult = filteredData;

    if (selectedEndYears.length) {
      filteredResult = filteredResult.filter(item => selectedEndYears.includes(item.end_year));
    }
    if (selectedTopics.length) {
      filteredResult = filteredResult.filter(item => selectedTopics.includes(item.topic));
    }
    if (selectedSectors.length) {
      filteredResult = filteredResult.filter(item => selectedSectors.includes(item.sector));
    }
    if (selectedRegions.length) {
      filteredResult = filteredResult.filter(item => selectedRegions.includes(item.region));
    }
    if (selectedPestles.length) {
      filteredResult = filteredResult.filter(item => selectedPestles.includes(item.pestle));
    }
    if (selectedSources.length) {
      filteredResult = filteredResult.filter(item => selectedSources.includes(item.source));
    }
    if (selectedCountries.length) {
      filteredResult = filteredResult.filter(item => selectedCountries.includes(item.country));
    }

    setFilteredData(filteredResult);
    onFilterChange(filteredResult);
  };


  return (
    <div style={styles.DataWindow}>
      
      <div style={{ flex: '1' }}>
        <h2>Filters</h2>
        <div style={styles.filterContainer}> 
        <label style={styles.label}>End Year</label>
        <div style={styles.checkboxContainer}>
          {endYears.map(year => (
            <div key={year} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`endYear-${year}`}
                value={year}
                checked={selectedEndYears.includes(year)}
                onChange={() => {
                  setSelectedEndYears(prevSelected => {
                    if (prevSelected.includes(year)) {
                      return prevSelected.filter(selectedYear => selectedYear !== year);
                    } else {
                      return [...prevSelected, year];
                    }
                  });
                }}
              />
              <label htmlFor={`endYear-${year}`}>{year}</label>
            </div>
          ))}
        </div>

        <label style={styles.label}>Topic</label>
        <div style={styles.checkboxContainer}>
          {topics.map(topic => (
            <div key={topic} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`topic-${topic}`}
                value={topic}
                checked={selectedTopics.includes(topic)}
                onChange={() => {
                  setSelectedTopics(prevSelected => {
                    if (prevSelected.includes(topic)) {
                      return prevSelected.filter(selectedTopic => selectedTopic !== topic);
                    } else {
                      return [...prevSelected, topic];
                    }
                  });
                }}
              />
              <label htmlFor={`topic-${topic}`}>{topic}</label>
            </div>
          ))}
        </div>

        <label style={styles.label}>sector</label>
        <div style={styles.checkboxContainer}>
          {sectors.map(sector => (
            <div key={sector} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`sector-${sector}`}
                value={sector}
                checked={selectedSectors.includes(sector)}
                onChange={() => {
                  setSelectedSectors(prevSelected => {
                    if (prevSelected.includes(sector)) {
                      return prevSelected.filter(selectedSector => selectedSector !== sector);
                    } else {
                      return [...prevSelected, sector];
                    }
                  });
                }}
              />
              <label htmlFor={`sector-${sector}`}>{sector}</label>
            </div>
          ))}
        </div>

        <label style={styles.label}>Region</label>
        <div style={styles.checkboxContainer}>
          {regions.map(region => (
            <div key={region} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`region-${region}`}
                value={region}
                checked={selectedRegions.includes(region)}
                onChange={() => {
                  setSelectedRegions(prevSelected => {
                    if (prevSelected.includes(region)) {
                      return prevSelected.filter(selectedRegion => selectedRegion !== region);
                    } else {
                      return [...prevSelected, region];
                    }
                  });
                }}
              />
              <label htmlFor={`region-${region}`}>{region}</label>
            </div>
          ))}
        </div>

        <label style={styles.label}>pestle</label>
        <div style={styles.checkboxContainer}>
          {pestles.map(pestle => (
            <div key={pestle} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`pestle-${pestle}`}
                value={pestle}
                checked={selectedPestles.includes(pestle)}
                onChange={() => {
                  setSelectedPestles(prevSelected => {
                    if (prevSelected.includes(pestle)) {
                      return prevSelected.filter(selectedPestle => selectedPestle !== pestle);
                    } else {
                      return [...prevSelected, pestle];
                    }
                  });
                }}
              />
              <label htmlFor={`pestle-${pestle}`}>{pestle}</label>
            </div>
          ))}
        </div>

        <label style={styles.label}>source</label>
        <div style={styles.checkboxContainer}>
          {sources.map(source => (
            <div key={source} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`source-${source}`}
                value={source}
                checked={selectedSources.includes(source)}
                onChange={() => {
                  setSelectedSources(prevSelected => {
                    if (prevSelected.includes(source)) {
                      return prevSelected.filter(selectedSource => selectedSource !== source);
                    } else {
                      return [...prevSelected, source];
                    }
                  });
                }}
              />
              <label htmlFor={`source-${source}`}>{source}</label>
            </div>
          ))}
        </div>

        <label style={styles.label}>countrie</label>
        <div style={styles.checkboxContainer}>
          {countries.map(countrie => (
            <div key={countrie} style={styles.Checkbox}>
              <input
                type="checkbox"
                id={`countrie-${countrie}`}
                value={countrie}
                checked={selectedCountries.includes(countrie)}
                onChange={() => {
                  setSelectedCountries(prevSelected => {
                    if (prevSelected.includes(countrie)) {
                      return prevSelected.filter(selectedCountrie => selectedCountrie !== countrie);
                    } else {
                      return [...prevSelected, countrie];
                    }
                  });
                }}
              />
              <label htmlFor={`countrie-${countrie}`}>{countrie}</label>
            </div>
          ))}
        </div>
        
        </div>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div style={styles.filteredData}>
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}