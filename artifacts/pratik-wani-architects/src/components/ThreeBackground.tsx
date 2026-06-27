import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    let renderer: import('three').WebGLRenderer | null = null;

    const init = async () => {
      try {
        const THREE = await import('three');
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const material = new THREE.MeshBasicMaterial({
          color: 0xc8a96e,
          wireframe: true,
          transparent: true,
          opacity: 0.12
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 400;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.025,
          color: 0xc8a96e,
          transparent: true,
          opacity: 0.35
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        let mouseX = 0;
        let mouseY = 0;

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          torusKnot.rotation.x += 0.001;
          torusKnot.rotation.y += 0.002;
          particlesMesh.rotation.y += 0.0005;
          camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
          camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
          camera.lookAt(scene.position);
          renderer!.render(scene, camera);
        };

        const handleMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth) * 2 - 1;
          mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        };

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer!.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          if (renderer && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          geometry.dispose();
          material.dispose();
          particlesGeometry.dispose();
          particlesMaterial.dispose();
          renderer?.dispose();
        };
      } catch {
        // WebGL not supported — CSS fallback is shown instead
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none';
        }
        return undefined;
      }
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(animationId);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      {/* CSS fallback: animated golden orbs for when WebGL is unavailable */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #c8a96e, transparent)', top: '10%', left: '20%', animationDuration: '4s' }} />
        <div className="absolute w-64 h-64 rounded-full opacity-8 animate-pulse"
          style={{ background: 'radial-gradient(circle, #c8a96e, transparent)', bottom: '20%', right: '15%', animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute w-48 h-48 rounded-full opacity-6 animate-pulse"
          style={{ background: 'radial-gradient(circle, #d4b87a, transparent)', top: '50%', right: '35%', animationDuration: '5s', animationDelay: '1s' }} />
      </div>
    </div>
  );
}
