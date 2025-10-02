import './App.css'
import Card from './components/Card.tsx'

function App() {

  return (
    <body>
      <div className='page'>

        <div className='btc-card'>
          <Card title="BTC Dominance">
          <p>This is where the BTC chart will go later.</p>
        </Card>
        </div>

        <div className='others-card'>
          <div>
            <Card title="Fear & Greed">
              <p>Here we’ll put the gauge chart.</p>
            </Card>
          </div>  
          <div>
            <Card title="TOTAL3ES / ETH">
              <p>Here we'll put the ratio number.</p>
            </Card>
          </div>
        </div>

      </div>
    </body>
      
  );
};

export default App