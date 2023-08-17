import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const Box = ({ color }) => {
    const box = useRef();
    const time = useRef(0);
    const [xSpeed] = useState(() => Math.random());
    const [ySpeed] = useState(() => Math.random());
    const [scele] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
    const [position, setPosition] = useState(getInitialPosition())

    function getInitialPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        return v;
    }

    function resetPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 - 0.1, (Math.random() * 2 - 1) * 15)

        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        // setPosition(v)
        setPosition(v)
    }

    useFrame((state, delta) => {
        time.current += delta * 1.2;
        let newZ = position.z - (time.current);

        if (newZ < -10) {
            resetPosition();
            time.current = 0;
        }

        box.current.position.set(position.x, position.y, newZ)
        box.current.rotation.x += delta * xSpeed;
        box.current.rotation.y += delta * ySpeed;
    },
        [xSpeed, ySpeed, position]
    );

    return (
        <mesh ref={box} scale={scele} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    )
}

export function Boxes() {
    return <>
        {[...Array(100).keys()].map((e, i) => <Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />)}
    </>
}