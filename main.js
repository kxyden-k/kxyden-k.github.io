import './style.css'

import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Variables used for moon rotating formula
const r = 10;
let theta = 0;
const dTheta = 2 * Math.PI / 1000;

// Creating scenes, camera and  renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),

});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);


const controls = new OrbitControls(camera, renderer.domElement);

//Creation of all geometry's and textures

const earthTexture = new THREE.TextureLoader().load('images/earth_texture.jpg');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: earthTexture,
    })
);

earth.position.setZ(30);
earth.position.setX(-10);
scene.add(earth);

const cloudTexture = new THREE.TextureLoader().load('images/clouds.jpg');

const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(3.1, 32, 32),
    new THREE.MeshPhongMaterial( {
        map: cloudTexture,
        transparent: true,
        opacity: 0.1
    })
);
clouds.position.setZ(30);
clouds.position.setX(-10);

scene.add(clouds)

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 32, 32),
    new THREE.MeshPhongMaterial( {
        map: moonTexture,
    })
);
moon.position.setZ(30);
scene.add(moon);

const sunTexture = new THREE.TextureLoader().load('images/sun.jpg');

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshPhongMaterial( {
        map: sunTexture,
    })
);

scene.add(sun);

const mercuryTexture = new THREE.TextureLoader().load('images/mercury.jpg');

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(1.3, 32, 32),
    new THREE.MeshPhongMaterial( {
        map: mercuryTexture,
    })
);
mercury.position.setX(10);
mercury.position.setZ(8);
scene.add(mercury);


const venusTexture = new THREE.TextureLoader().load('images/venus.jpg');

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 32, 32),
    new THREE.MeshPhongMaterial( {
        map: venusTexture,
    })
);
venus.position.setX(-5);
venus.position.setZ(15);
scene.add(venus);




// Animate function triggers animation loop
// Gives planet rotation
function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += .00055;
    clouds.rotation.y -= .00025;

    venus.rotation.y += 0.0003;

    mercury.rotation.y += 0.0006;

    theta += dTheta;
    moon.position.x = r * Math.cos(theta) - 10;
    moon.position.z = r * Math.sin(theta) + 30;
    

    controls.update();

    renderer.render(scene, camera);
}

// Adds star's geometry
function addStar() {
    const geometry = new THREE.SphereGeometry(0.20, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    earth.rotation.y += 0.05;
    venus.rotation.y += 0.02;
    mercury.rotation.y += 0.03;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0008;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

animate();