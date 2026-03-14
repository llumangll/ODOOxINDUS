import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

// ─── Floating Box ───────────────────────────────────────────────
function FloatingBox({ position, size = 0.4, speed = 0.3, color = '#c4956a' }: {
  position: [number, number, number]; size?: number; speed?: number; color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    ref.current.rotation.y = t * speed * 0.3;
    ref.current.rotation.x = Math.sin(t * speed * 0.2 + offset) * 0.1;
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

// ─── Warehouse Rack ─────────────────────────────────────────────
function WarehouseRack({ position }: { position: [number, number, number] }) {
  const frameColor = '#3a3a5c';
  const shelfColor = '#2a2a4a';

  return (
    <group position={position}>
      {/* Vertical posts */}
      {[[-0.9, 0, 0], [0.9, 0, 0], [-0.9, 0, -0.4], [0.9, 0, -0.4]].map((pos, i) => (
        <mesh key={`post-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 3, 0.06]} />
          <meshStandardMaterial color={frameColor} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Shelves */}
      {[0.5, 1.2, 1.9].map((y, i) => (
        <group key={`shelf-${i}`}>
          <mesh position={[0, y, -0.2]}>
            <boxGeometry args={[1.9, 0.04, 0.5]} />
            <meshStandardMaterial color={shelfColor} metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Boxes on shelves */}
          {Array.from({ length: 2 + Math.floor(Math.random() * 2) }).map((_, j) => (
            <mesh key={`box-${i}-${j}`} position={[
              -0.5 + j * 0.55 + (Math.random() * 0.2 - 0.1),
              y + 0.15 + Math.random() * 0.05,
              -0.2
            ]}>
              <boxGeometry args={[
                0.25 + Math.random() * 0.15,
                0.2 + Math.random() * 0.1,
                0.25 + Math.random() * 0.1
              ]} />
              <meshStandardMaterial
                color={['#c4956a', '#a0845e', '#d4a574', '#8b7355'][Math.floor(Math.random() * 4)]}
                roughness={0.7}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// ─── Conveyor Belt ──────────────────────────────────────────────
function ConveyorBelt() {
  const beltRef = useRef<THREE.Mesh>(null!);
  const boxRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    boxRefs.current.forEach((box, i) => {
      if (box) {
        box.position.x = ((t * 0.3 + i * 2.5) % 8) - 4;
      }
    });
  });

  return (
    <group position={[0, 0.15, 2]}>
      {/* Belt surface */}
      <mesh ref={beltRef} position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.08, 0.6]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Belt legs */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={`leg-${i}`} position={[x, -0.07, 0]}>
          <boxGeometry args={[0.08, 0.16, 0.5]} />
          <meshStandardMaterial color="#3a3a5c" metalness={0.5} />
        </mesh>
      ))}
      {/* Moving packages */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`pkg-${i}`}
          ref={(el) => { if (el) boxRefs.current[i] = el; }}
          position={[-3 + i * 2.5, 0.2, 0]}
        >
          <boxGeometry args={[0.35, 0.25, 0.3]} />
          <meshStandardMaterial color="#c4956a" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Scanner Beam ───────────────────────────────────────────────
function ScannerBeam() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cycle = (t % 6) / 6; // 6-second cycle
    ref.current.position.x = -1.5 + cycle * 3;
    ref.current.scale.y = 0.8 + Math.sin(t * 8) * 0.2;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = cycle < 0.8 ? 0.6 : 0;
  });

  return (
    <mesh ref={ref} position={[0, 1, 2]}>
      <planeGeometry args={[0.02, 1.5]} />
      <meshBasicMaterial color="#14b8a6" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── Glow Lines (stock movement paths) ──────────────────────────
function GlowLines() {
  const lines: [number, number, number][][] = useMemo(() => [
    [[-3, 0.6, 0], [0, 0.3, 2]],
    [[3, 1, -1], [0, 0.3, 2]],
    [[-3, 1.5, -1], [3, 1, -1]],
  ], []);

  return (
    <group>
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#14b8a6"
          lineWidth={1}
          transparent
          opacity={0.25}
        />
      ))}
    </group>
  );
}

// ─── Data Particles ─────────────────────────────────────────────
function DataParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] = (pos[i * 3 + 1] + 0.003) % 5;
      pos[i * 3] += Math.sin(t + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#0f766e" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// ─── Main Scene ─────────────────────────────────────────────────
function WarehouseScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#8bbab0" />
      <directionalLight position={[5, 8, 3]} intensity={0.4} color="#99f6e4" castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.5} color="#14b8a6" distance={12} />
      <pointLight position={[4, 2, -2]} intensity={0.3} color="#0f766e" distance={10} />

      {/* Floor grid */}
      <gridHelper args={[20, 30, '#1e1e3a', '#1a1a30']} position={[0, 0, 0]} />

      {/* Warehouse racks */}
      <WarehouseRack position={[-3, 0, -1]} />
      <WarehouseRack position={[3, 0, -1]} />
      <WarehouseRack position={[-3, 0, -3]} />
      <WarehouseRack position={[3, 0, -3]} />

      {/* Conveyor belt */}
      <ConveyorBelt />

      {/* Scanner beam */}
      <ScannerBeam />

      {/* Floating boxes */}
      {[
        [-2, 2.5, 1], [1.5, 3, -2], [-1, 3.5, -1], [3, 2.8, 1],
        [-4, 2, -2], [0, 4, 0], [2, 3.2, -3], [-1.5, 2.8, 3],
      ].map((pos, i) => (
        <Float key={i} speed={0.5 + Math.random() * 0.5} floatIntensity={0.3} rotationIntensity={0.2}>
          <FloatingBox
            position={pos as [number, number, number]}
            size={0.2 + Math.random() * 0.25}
            speed={0.2 + Math.random() * 0.3}
            color={['#c4956a', '#a0845e', '#d4a574'][i % 3]}
          />
        </Float>
      ))}

      {/* Glow lines */}
      <GlowLines />

      {/* Data particles */}
      <DataParticles count={50} />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// ─── Exported Component ─────────────────────────────────────────
export function Inventory3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2e 50%, #0a0a1a 100%)' }}
      >
        <fog attach="fog" args={['#0a0a1a', 5, 18]} />
        <WarehouseScene />
      </Canvas>
    </div>
  );
}
