
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroProps {
  onShopClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(2.5, 0.8, 300, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 =   v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec4  j = p - 49.0 * floor(p * n_ * n_);
          vec4 x_ = floor(j * n_);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *n_ + n_/2.0;
          vec4 y = y_ *n_ + n_/2.0;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vUv = uv;
          vec3 pos = position;
          float noise = snoise(vec3(pos.xy * 0.4, uTime * 0.2)) * 0.4;
          noise += snoise(vec3(pos.zx * 0.8, uTime * 0.1)) * 0.2;
          float mouseImpact = smoothstep(5.0, 0.0, distance(pos, uMouse));
          pos += normal * (noise + mouseImpact * 0.8);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormal = normalMatrix * normal;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          vec3 lightDir2 = normalize(vec3(-1.0, -0.5, 0.5));
          float rim = pow(1.0 - dot(normal, viewDir), 4.0);
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 128.0);
          float diffuse = max(dot(normal, lightDir), 0.0) * 0.1;
          float diffuse2 = max(dot(normal, lightDir2), 0.0) * 0.05;
          vec3 baseColor = vec4(0.01, 0.01, 0.01, 1.0).rgb;
          vec3 finalColor = baseColor + (diffuse + diffuse2) + (spec * 0.8) + (rim * 0.2);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.PointLight(0xffffff, 50, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const time = clock.getElapsedTime();
      material.uniforms.uTime.value = time;
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05;
      material.uniforms.uMouse.value.set(mouse.current.x * 5, mouse.current.y * 5, 2);
      mesh.rotation.y = mouse.current.x * 0.5;
      mesh.rotation.x = -mouse.current.y * 0.5;
      mesh.rotation.z += 0.002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      <div ref={containerRef} className="absolute inset-0 z-0 scale-100" />
      
      <div className="relative z-10 text-center pointer-events-none select-none mix-blend-difference">
          <div className="flex flex-col items-center mb-10">
            <span className="text-[9px] uppercase tracking-[1.2em] text-white opacity-40 font-black mb-4">
              ENDT Archive
            </span>
          </div>

          <h2 className="text-4xl md:text-[7rem] font-black tracking-[-0.04em] leading-[0.85] text-white uppercase max-w-4xl mx-auto">
            Browse our<br/>
            <span className="font-light italic text-[0.85em] lowercase tracking-tight">latest product</span>
          </h2>

          <div className="mt-24 flex flex-col items-center">
             <button 
              onClick={(e) => { e.preventDefault(); onShopClick?.(); }}
              className="pointer-events-auto text-[10px] uppercase tracking-[1em] font-black text-white py-6 px-14 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-700"
             >
                Shop Now
             </button>
          </div>
      </div>

      {/* Hero Frame */}
      <div className="absolute inset-0 border-[20px] md:border-[60px] border-white pointer-events-none z-20" />
    </div>
  );
};

export default Hero;
