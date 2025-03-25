import '../App.css';
import Button from '../Components/Button';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hola</h1>
        <Button link="/Academia" text="Academia" />
        <Button link="/Tuner" text="Tuner" />
        <Button link="/Metronom" text="Metronom" />
      </header>
    </div>
  );
}

export default Home;
