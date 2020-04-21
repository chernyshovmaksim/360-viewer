import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls;
let geometry, material, mesh;

init();
animate();


function init() {

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 200);
    camera.position.set(1,0,0);

    scene = new THREE.Scene();

    let blueTexture = new THREE.TextureLoader().load( './../images/360.jpg' );
    geometry = new THREE.SphereGeometry( 50, 32, 32 );
    material = new THREE.MeshBasicMaterial( {
        map: blueTexture,
        side: THREE.DoubleSide
    } );

    mesh = new THREE.Mesh(geometry, material);





    scene.add(mesh);




    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);



    controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = -0.2;

    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
