import './App.css'
import BtcDominanceBar from './components/BtcDominanceBar'
import Card from './components/Card';

function App() {
  return (
    <div className="page">
      <div className="btc-card">
        <Card title="BTC Dominance">
          <BtcDominanceBar dominance={56.5} />
        </Card>
      </div>

      <div className="others-card">
        <Card title="Fear & Greed">
          <p>Here we’ll put the gauge chart.</p>
        </Card>

        <Card title="TOTAL3ES / ETH">
          <p>Here we'll put the ratio number.</p>
        </Card>
      </div>
    </div>
  )
}

export default App;
