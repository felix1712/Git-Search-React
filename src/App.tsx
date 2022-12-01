import Layout from './components/Layout/Layout';
import ServiceProvider from "./Contexts/ServiceContext";
import ToasterProvider from './Contexts/ToasterContext';
import SearchProvider from './Contexts/SearchContext';

function App() {
  return (
    <ToasterProvider>
      <ServiceProvider>
        <SearchProvider>
          <Layout />
        </SearchProvider>
      </ServiceProvider>
    </ToasterProvider>
  );
}

export default App;
