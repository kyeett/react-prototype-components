import {animated} from '@react-spring/web'
import {config, useSprings} from "react-spring";
import {useDrag} from "react-use-gesture";
import {FunctionComponent, useState} from "react";

function color(my: number) {
    return my <= -80 ? 'blue' : '#46e891'
}

const fn = (isDragged: boolean, originalIndex: number, mx: number, my: number) => (index: number) => {
    if (!isDragged || index !== originalIndex) {
        return {x: 0, y: 0, backgroundColor: '#46e891'}
    }
    return {x: mx, y: my, backgroundColor: color(my)}
}


const remover = (originalIndex: number, mx: number, my: number, onDone: () => void) => (index: number) =>
    index === originalIndex
        ? {to: [{opacity: 0}, {width: '0px', margin: '0px'}], onRest: onDone}
        : {}

type SomeProps = {
    vals: number[]
    isValidDropTarget: (cursor: { x: number, y: number }) => boolean
}

export const CardHand3: FunctionComponent<SomeProps> = ({vals, isValidDropTarget}) => {

    const vals2 = vals.map((v) => ({
        val: v,
        visible: true
    }))

    const [cards, set] = useState(vals2)

    // Hide a specific card
    const hideCard = (index: number) => {
        set([
            ...cards.slice(0, index),
            {val: cards[index].val, visible: false},
            ...cards.slice(index + 1)
        ])
    }

    const [springs, api] = useSprings(cards.length, _ => (({
        x: 0,
        y: 0,
        margin: '10px',
        width: '60px',
        backgroundColor: '#46e891',
        opacity: 1,
        config: config.stiff
    })));

    const bind = useDrag((state) => {
        const {args: [originalIndex], down: isDragged, movement: [mx, my]} = state

        console.log(isDragged)
        if (!isDragged && isValidDropTarget({x: state.event.clientX, y: state.event.clientY})) {
            api.start(remover(originalIndex, mx, my, () => hideCard(originalIndex)))
            console.log('yeah')
            return
        }
        api.start(fn(isDragged, originalIndex, mx, my))
    })

    console.log(cards)

    // Bind it to a component
    return (
        <div className={"outer"}>
            {springs.map((styles, index) =>
                cards[index].visible && <animated.div style={styles}
                                                      key={cards[index].val}
                                                      className={"Card"}
                                                      {...bind(index)}
                >{cards[index].val}</animated.div>
            )}
        </div>
    )
}
