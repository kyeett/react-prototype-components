import {animated} from '@react-spring/web'
import {config, useSprings} from "react-spring";
import {useDrag} from "react-use-gesture";
import {useState} from "react";

function color(my: number) {
    return my <= -80 ? 'blue' : '#46e891'
}

const fn = (active: boolean, originalIndex: number, mx: number, my: number) => (index: number) => {
    return active && index === originalIndex
        ? {x: mx, y: my, backgroundColor: color(my)}
        : {x: 0, y: 0, backgroundColor: '#46e891'}
}


const remover = (originalIndex: number, mx: number, my: number, onDone: () => void) => (index: number) =>
    index === originalIndex
        ? {to: [{opacity: 0},{width:'0px', margin:'0px'}], onRest: onDone}
        : {}

export function CardHand() {
    const [cards, set] = useState([1, 2, 3, 4, 5, 6,1])

    const [springs, api] = useSprings(cards.length, index => (({
        x: 0,
        y: 0,
        margin: '10px',
        width: '60px',
        backgroundColor: '#46e891',
        opacity: 1,
        config: config.stiff
    })));

    const bind = useDrag((state) => {
        const {args: [originalIndex], initial: initial, down, movement: [mx, my]} = state
        // if (done) return
        if (!down) {
            if (my < 0) {
                api.start(remover(originalIndex, mx, my, () => {
                    let c = [...cards]
                    console.log(c)
                    console.log('remove', originalIndex)
                    c.splice(originalIndex, 1)
                    console.log(c)
                    set(c)
                }))
            } else {
                api.start(fn(down, originalIndex, mx, my))
            }
            console.log('done')
            return
        }
        api.start(fn(down, originalIndex, mx, my))
    })

    console.log(cards)

    // Bind it to a component
    return (
        <div className={"outer"}>
            <div className={"inner"}>
            {springs.map((styles, index) =>
                <animated.div style={styles} key={cards[index]}
                              className={"Card"} {...bind(index)}>{cards[index]}</animated.div>
            )}
            </div>
        </div>
    )
}
