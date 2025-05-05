import '../App.css';
import Button from '../Components/Button';

function Home() {
  return (
    <div className="App">
      <div className="background-blur"></div>
      <header className="App-header">
        <h1>edugeetars</h1>
          <div className="button-group">
            <Button link="/Academia" text="Academia" />
            <Button link="/Tuner" text="Tuner" />
            <Button link="/Metronom" text="Metronom" />
          </div>
      </header>
    </div>
  );
}

export default Home;
