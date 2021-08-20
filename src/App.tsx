import React, {useLayoutEffect, useRef, useState} from 'react';
import './App.css';
import {CardHand3} from "./components/CardHand3";

function contains(b: DOMRect, cursorPosition: { x: number; y: number }) {
    const relX = cursorPosition.x - b.x
    const relY = cursorPosition.y - b.y
    console.log(relX, relY)
    return (relX >= 0 && relX <= b.width) && (relY >= 0 && relY <= b.height)
}

function App() {
    const [enemyHovered, setEnemyHovered] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        console.log(divRef); // { current: <h1_object> }
    })


    const isDone = (cursorPosition: {x: number, y: number}) => {
        if (divRef.current === null) {
            return false
        }
        const boundingRect = divRef.current.getBoundingClientRect()
        return contains(boundingRect, cursorPosition);
    }

    const backgroundColor = enemyHovered ? 'red' : 'green'

    return (
        <div className="App" style={{padding: '200px'}}>
            <div className="Enemy"
                 style={{backgroundColor: backgroundColor}}
                 ref={divRef}
            >aa
            </div>
            <CardHand3 vals={[1, 2, 3, 4]} isValidDropTarget={isDone}/>
        </div>
    );
}

export default App;
