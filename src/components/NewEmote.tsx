import React, {FunctionComponent} from 'react';
import {animated, AnimationResult, config, Controller, SpringValue, useSpring} from 'react-spring'

type NewEmoteProps = {
    toggle: boolean
}


function getLog(result: AnimationResult, spring: Controller | SpringValue) {
    console.log(result.value, spring.id);
}

// export const NewEmote: FunctionComponent<NewEmoteProps> = ({}) => {
//     const items = [{opacity: 0, height: 1},{opacity: 0, height: 1},{opacity: 0, height: 1}]
//     const transitions = useTransition(items, {
//         from: { opacity: 0 },
//         enter: { opacity: 1 },
//         leave: { opacity: 0 },
//         config: { tension: 220, friction: 120, duration: 1000 },
//         trail: 500,
//         onRest: result => console.log(result),
//     })
//
//
//     return transitions(({opacity}, item) => (
//         <animated.div style={{opacity}}>
//             { opacity }
//         </animated.div>
//     ))
// }

export const NewEmote: FunctionComponent<NewEmoteProps> = ({}) => {
    const styles = useSpring({
        loop: true,
        from: {rotateZ: 0, backgroundColor: '#000', borderRadius: 40},
        to: [
            {rotateZ: 180, backgroundColor: '#46e891', borderRadius: 2},
            {rotateZ: 360, backgroundColor: '#000', borderRadius: 40}
        ],
        config: config.slow,
    })

    return (
        <animated.div
            style={{
                width: 80,
                height: 80,
                // backgroundColor: '#46e891',
                ...styles,
            }}
        />
    )
}
