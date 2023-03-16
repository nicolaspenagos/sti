import Loader from './components/Loader/Loader.jsx';
import Data from './components/Data/Data.jsx';
import React, { useState } from 'react';
export const DataContext = React.createContext();

const styles = {
  subtile: "font-bold text-slate-800",
  main: "m-20 mt-28",
  header: "bg-indigo-600 flex pl-4 items-center fixed top-0 h-16 w-full shadow",
  title: "font-bold text-xl text-slate-50",
  subtitle: "text-slate-300"
}

function App() {

  const [data, setData] = useState([]);

  const onChangeData = (newData) => {
    setData(newData);
  }

  const renderData = () => {
    if(data.length>0){
      return  <Data/>;
    }
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title + ' mr-4'}>Spring 2</h1>
        <h2 className={styles.subtitle}>Recommendation algorithm</h2>
      </header>
      <main className={styles.main}>
        <DataContext.Provider value={data}>
          <Loader onChangeData={onChangeData} />
          {renderData()}
        </DataContext.Provider>
      </main>

    </>
  );
}
 
export default App;
