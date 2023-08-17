import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, CubeCamera, Environment } from "@react-three/drei";
import Ground from "./Ground";
import Car from './Car';
import Ring from './Ring';

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach={"background"} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Ring />
      <spotLight
        color={[1, 0.25, .1]}
        intensity={100}
        angel={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 1, 1]}
        intensity={100}
        angel={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
    </>
  )
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;