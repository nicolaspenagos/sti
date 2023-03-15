import Header from './components/Header';
import Loader from './components/Loader/Loader.jsx';

const styles = {

  subtile:"font-bold text-slate-800",
  main:"p-12",
}


function App() {
  return (
    <div>
      <Header/>
      <Loader/>
    </div>
  );
}

export default App;
