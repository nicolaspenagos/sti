import Loader from './components/Loader/Loader.jsx';
import Data from './components/Data/Data.jsx';
import React, { useState } from 'react';
export const DataContext = React.createContext();

const styles = {
  subtile: "font-bold text-slate-800",
  main: "m-20 mt-28",
  header: "bg-indigo-600 flex pl-4 items-center fixed top-0 h-16 w-full custom-shadow z-10",
  title: "font-bold text-xl text-slate-50",
  subtitle: "text-slate-300"
}

function App() {

  const [data, setData] = useState({ dataArray: [], indexA: -1, indexB: -1 });
  const [resetTrigger, setResetTrigger] = useState(0);

  const onChangeData = (newDataArray) => {
    setData((prevState) => ({dataArray: newDataArray, indexA: -1, indexB: -1}));
    setResetTrigger((trigger) => trigger + 1);
  }

  const handleSelectStudent = (index) => {
    
    if (data.indexA === index) {
      setData((prevState) => ({ ...prevState, indexA: -1 }));
    } else if (data.indexB === index) {
      setData((prevState) => ({ ...prevState, indexB: -1 }));
    } else if (data.indexA === -1) {
      setData((prevState) => ({ ...prevState, indexA: index }));
    } else {
      setData((prevState) => ({ ...prevState, indexB: index }));
    }
   
  }

  const renderData = () => {
    if (data.dataArray.length > 0) {
      return <Data handleSelectStudent={handleSelectStudent} resetTrigger={resetTrigger}/>;
    }
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title + ' mr-4'}>Spring 2</h1>
        <h2 className={styles.subtitle}>Cosine similarity</h2>
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
