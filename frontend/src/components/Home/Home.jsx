import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './Home.css';

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountElement = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4; 
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountElement.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;
    loader.load(
      '/models/scene.gltf', 
      (gltf) => {
        model = gltf.scene;
        model.scale.set(3, 3, 3);

        model.position.y = -0.5;

        model.traverse((child) => {
          if (child.isMesh && (child.name === 'Plane' || child.name === 'Ground')) {
            child.visible = false;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );

    let angle = 0;
    let direction = 1;
    const maxAngle = 0.5;

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        angle += 0.005 * direction;
        if (angle > maxAngle) direction = -1;
        else if (angle < -maxAngle) direction = 1;
        model.rotation.y = angle;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="home-container">
      <div className="three-container" ref={mountRef} />

      <div className="overlay-content">
        <h1>Welcome to the Task Management System</h1>
        <p>Manage tasks, track deadlines, collaborate in real-time, and more!</p>
      </div>

      <div className="sidebar">
        <Link to="/login" className="home-btn">Login</Link>
        <Link to="/signup" className="home-btn">Sign Up</Link>
      </div>
    </div>
  );
}
