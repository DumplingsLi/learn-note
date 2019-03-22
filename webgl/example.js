(function(){
  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas')
  });
  renderer.setClearColor(0x000000);

  // scene
  const scene = new THREE.Scene();

  // camera

  //fov, aspect = width / height, near, far
  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
  camera.position.set(0, 0, 5); // 沿z轴负方向看
  scene.add(camera);

  // object
  const cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
    new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
  );

  scene.add(cube);

  renderer.render(scene, camera);
})()
