import { useEffect, useRef } from "react";
import * as THREE from "three";

const vert = /* glsl */ `
uniform float uTime;
uniform vec2  uMouse;
uniform float uScroll;
varying float vH;
varying float vDist;

float field(vec2 p, float t) {
  float h = 0.0;
  h += sin(p.x * 0.24 + t * 0.45) * 0.70;
  h += sin(p.y * 0.31 - t * 0.33) * 0.55;
  h += sin((p.x + p.y) * 0.17 + t * 0.26) * 0.45;
  h += sin(length(p * 0.5) * 0.9 - t * 0.7) * 0.28;
  return h;
}

void main() {
  vec3 p = position;
  float h = field(p.xy, uTime);

  float d = distance(p.xy, uMouse);
  h += exp(-d * d * 0.012) * sin(d * 0.75 - uTime * 2.2) * 1.35;

  p.z += h + uScroll * 1.4;
  vH = h;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const frag = /* glsl */ `
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uFade;
varying float vH;
varying float vDist;

void main() {
  float t = clamp(vH * 0.45 + 0.5, 0.0, 1.0);
  vec3 c = mix(uColA, uColB, t);
  float far  = smoothstep(62.0, 14.0, vDist);
  float near = smoothstep(2.0, 9.0, vDist);
  float a = far * near * (0.10 + t * 0.58) * uFade;
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}
`;

/**
 * Ember topography: a wireframe terrain that ripples under the cursor,
 * with a drifting ember haze above it. Reduced motion gets one static frame.
 */
export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isCoarse,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarse ? 1.5 : 2));
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
    camera.position.set(0, 3.4, 12);

    // ---- terrain ----
    const SEG = isCoarse ? 72 : 132;
    const plane = new THREE.PlaneGeometry(90, 62, SEG, Math.round(SEG * 0.7));
    const gridGeo = new THREE.WireframeGeometry(plane);
    plane.dispose();

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uFade: { value: 0 },
      uColA: { value: new THREE.Color("#7a2a06") },
      uColB: { value: new THREE.Color("#ffb877") },
    };

    const gridMat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const terrain = new THREE.LineSegments(gridGeo, gridMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.set(0, -2.6, -14);
    scene.add(terrain);

    // ---- ember haze ----
    const COUNT = isCoarse ? 320 : 700;
    const pos = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 46;
      pos[i * 3 + 1] = Math.random() * 16 - 3;
      pos[i * 3 + 2] = -Math.random() * 40 + 6;
      seeds[i] = Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext("2d")!;
    const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,190,130,0.6)");
    g.addColorStop(1, "rgba(255,120,30,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    const dustMat = new THREE.PointsMaterial({
      size: 0.13,
      map: sprite,
      color: 0xffa766,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ---- horizon glow ----
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 18),
      new THREE.MeshBasicMaterial({
        color: 0xff6a1a,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    glow.position.set(0, 0.5, -34);
    scene.add(glow);

    // ---- interaction ----
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const clock = new THREE.Clock();

    if (reduced) {
      uniforms.uFade.value = 1;
      uniforms.uTime.value = 2.4;
      dustMat.opacity = 0.5;
      renderer.render(scene, camera);
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        const t = clock.getElapsedTime();
        uniforms.uTime.value = t;
        uniforms.uFade.value = Math.min(1, t / 2.2);
        dustMat.opacity = Math.min(0.55, t / 4);

        mx += (tx - mx) * 0.045;
        my += (ty - my) * 0.045;

        const s =
          window.scrollY /
          Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        uniforms.uScroll.value = s;
        uniforms.uMouse.value.set(mx * 26, -my * 16 - 6);

        const p = dustGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < COUNT; i++) {
          const y = p.getY(i) + 0.004 + seeds[i] * 0.008;
          p.setY(i, y > 13 ? -3 : y);
          p.setX(i, p.getX(i) + Math.sin(t * 0.4 + seeds[i] * 9) * 0.004);
        }
        p.needsUpdate = true;

        camera.position.x = mx * 1.6;
        camera.position.y = 3.4 - my * 0.9 + s * 3.2;
        camera.position.z = 12 + s * 4;
        camera.lookAt(0, 0.2 - s * 0.6, -16);

        renderer.render(scene, camera);
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      gridGeo.dispose();
      gridMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      sprite.dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      renderer.dispose();
      if (canvas.parentElement === mount) mount.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
