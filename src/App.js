import './App.css';
import FeaturesList from './components/FeaturesList';
import features from './data/features';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Header />
      <FeaturesList features={features}/>
    </div>
  );
}

export default App;
