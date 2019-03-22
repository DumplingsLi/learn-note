(function(){
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  // left, right, top, bottom, near, far
  // (left - right) / (top - bottom) = 400/300
  const camera = new THREE.OrthographicCamera(-2, 2, -1.5, 1.5, 1, 10);
  camera.position.set(4, -3, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  const cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
  }));

  scene.add(cube);

  renderer.render(scene, camera);
})();
