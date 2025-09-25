import './App.css'
import Card from './components/Card.tsx'

function App() {

  return (
    <div className='page'>
      <Card title="BTC Dominance">
        <p>This is where the BTC chart will go later.</p>
      </Card>

      <Card title="Fear & Greed">
        <p>Here we’ll put the gauge chart.</p>
      </Card>

      <Card title="TOTAL3ES / ETH">
        <p>Here we'll put the ratio number.</p>
      </Card>

    </div>
      
  );
};

export default App