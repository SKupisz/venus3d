import React, {useRef} from "react";
import {OrbitControls, Stars} from "@react-three/drei";
import {useLoader, useFrame} from "@react-three/fiber";
import {TextureLoader} from "three";
import * as THREE from "three";

import VenusDefaultMap from "../assets/venus.jpg";
import VenusCloudsMap from "../assets/venus_clouds.jpg";

const Venus = (props) => {

    const cloudsRef = useRef();
    const venusRef = useRef();

    const [venusDefault, venusClouds] = useLoader(TextureLoader, [
        VenusDefaultMap, VenusCloudsMap
    ])

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();

        venusRef.current.rotation.y = 0.94*elapsedTime;
        cloudsRef.current.rotation.y = 0.94*elapsedTime;

        venusRef.current.position.x = 1.4*Math.sin(2*Math.PI*(elapsedTime/7));
        cloudsRef.current.position.x = 1.4*Math.sin(2*Math.PI*(elapsedTime/7));
        venusRef.current.position.z = 1.4*Math.cos(2*Math.PI*(elapsedTime/7));
        cloudsRef.current.position.z = 1.4*Math.cos(2*Math.PI*(elapsedTime/7));
    })

    return <>
    <spotLight position={[2,0,2]} color = "#fff"/>
    <Stars fade={true} count={2000} radius={300} depth={60}
        factor={6} saturation={0.2}/>
    <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.002, 32, 32]}/>
        <meshPhongMaterial map={venusClouds} transparent={true} depthWrite={true}
            opacity={0.4} side = {THREE.DoubleSide}/>
    </mesh>
    <mesh ref={venusRef}>
        <sphereGeometry args={[1,32,32]}/>
        <meshStandardMaterial map={venusDefault} metalness={0.4}
            roughness={0.8}/>
        <OrbitControls enableZoom={true} zoomSpeed={0.4} enablePan={true}
            panSpeed={0.5} enableRotation={true} rotateSpeed={0.5}/>
    </mesh>
    </>
};

export default Venus;