import {animated, config, useSprings, useTransition} from "react-spring";
import React, {useState} from "react";
import {useDrag} from "react-use-gesture";


export function CardHand2() {
    const [boxes, setBoxes] = useState([2, 3, 4]);

    const onDelete = (item: number) => {
        setBoxes(boxes.filter(x => x !== item));
    };

    const [springs, api] = useSprings(boxes.length, index => (({
        x: 0,
        y: 0,
        margin: '10px',
        width: '60px',
        backgroundColor: '#46e891',
        opacity: 1,
        config: config.stiff
    })));

    const transitions = useTransition(boxes, {
        from: {opacity: 0, transform: "translateY(-100px)", width: '100px'},
        enter: {opacity: 1, transform: "translateY(0px)"},
        leave: [{opacity: 0}, {width: '0px'}],
        config: {
            duration: 150,
        }
    });

    const bind = useDrag((state) => {
        const {args: [originalIndex], initial: initial, down, movement: [mx, my]} = state
        console.log(state)
    })


    // Bind it to a component
    return (
        <div className="boxes">
            {transitions((props, item, index) => {
                console.log(item)
                return <animated.div style={props} className="Box" {...bind(index)}>
                    <button onClick={() => onDelete(item)}>Delete</button>
                </animated.div>
            })
            }
        </div>
    )
}
