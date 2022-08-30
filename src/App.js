import './index.scss';
import {useState} from "react";

function App() {
    const [counter, setCounter] = useState(0);
    const increment = () => {
        setCounter(prevState => prevState + 1);
    }
    const decrement = () => {
        setCounter(prevState => prevState - 1);
    }
    const reset = () => {
        setCounter(0);
    }
    return (
        <div className="App">
            <div>
                <h2>Счетчик:</h2>
                <h1>{counter}</h1>
                <button className="minus" onClick={decrement}>- Минус</button>
                <button className="plus" onClick={increment}>Плюс +</button>
                <button className="reset" onClick={reset}>Сброс</button>
            </div>
        </div>
    );
}

export default App;
