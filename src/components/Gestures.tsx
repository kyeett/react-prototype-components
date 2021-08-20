import {animated, useSpring} from '@react-spring/web'
import {config} from "react-spring";
import {useGesture} from "react-use-gesture";
import {useState} from "react";

export function Gestures() {
    const [done, setDone] = useState(false);
    const [styles, api] = useSpring(() => ({
        x: 0,
        y: 0,
        backgroundColor: '#46e891',
        opacity: 1,
        config: config.molasses
    }))

    const bind = useGesture(
        {
            onDrag: ({down, movement: [mx, my]}) => {
                console.log(done)
                if (done) return
                const color = my <= -80 ? 'blue' : '#46e891';
                if (down) {
                    api.start({x: mx, y: my, backgroundColor: color})
                } else {
                    api.start({x: 0, y: 0, backgroundColor: color})
                }
            },
            onDragStart: state => {
                console.log(done)
                console.log('drag start', state.distance)
            },
            onDragEnd: ({movement: [mx, my]}) => {
                console.log(done)
                if (done) return

                if (my <= -80) {
                    api.start({x: mx, y: my, backgroundColor: '#46e891', opacity: 0.5})
                    setDone(true)
                    console.log('set done')
                } else {
                    api.start({x: 0, y: 0, backgroundColor: '#46e891'})
                }

                console.log(done)
            },
        },
    )

    // Bind it to a component
    return (
        <div>
            <div style={{width: '100px', height: '100px', backgroundColor: 'red'}}/>
            <div>{done.toString()}</div>
            <animated.div {...bind()}
                          style={{
                              width: 80,
                              height: 80,
                              borderRadius: '10px',
                              ...styles,
                          }}
            />
        </div>
    )
}
