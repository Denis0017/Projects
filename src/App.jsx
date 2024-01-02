import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './MyComponents/Header';
import Documentation from './MyComponents/Documentation';
import About from './MyComponents/About';
import Bubblechart from './MyComponents/Bubblechart';
import WordCloudChart from './MyComponents/WordCloudChart';
import BarChart from './MyComponents/BartChart';
import Sunburstchart from "./MyComponents/SunburstChart";
import LineChart from "./MyComponents/Linechart";
import BoxPlot from "./MyComponents/BoxPlot";
import { Footer } from './MyComponents/Footer';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterChange = (filteredData) => {
    console.log('Filtered Data:', filteredData);
  };

  return (
    <div className="App">
      <Router>
        <Header title="CareerCompass" searchBar={false} /> 

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <h3>Popular Topics</h3>
                  <WordCloudChart topics={data.map(item => item.topic)} />
                </div>
                <div>
                  <h3>Country which is hyped</h3>
                  <Bubblechart data={data} />
                </div>
                <div>
                  <h3>Intensity</h3>
                  <BarChart data={data} />
                </div>
                <div>
                  <h3>Country under region</h3>
                  <Sunburstchart data={data} />
                </div>
                <div>
                  <h3>Data which added and published for a particular year</h3>
                  <LineChart data={data} />
                </div>
                <div>
                  <h3>Likelihood with respect to sector</h3>
                  <BoxPlot data={data} />
                </div>
                </>
            }
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/Documentation"
            element={<Documentation data={data} onFilterChange={handleFilterChange} />}
          />
        </Routes> 

        <Footer />
      </Router>
    </div>
  );
};

export default App;