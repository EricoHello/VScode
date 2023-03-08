window.onload = function() {
	let scene, camera, renderer, dodecahedrons, plane;
  
	init();
  
	function init() {
	  // Create a scene
	  scene = new THREE.Scene();
	  scene.background = new THREE.Color("#3d4552");
  
	  // Create a camera
	  const fov = 75;
	  const aspect = window.innerWidth / window.innerHeight;
	  const near = 0.1;
	  const far = 1000;
	  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	  camera.position.z = 5;
  
	  // Create a renderer
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  document.body.appendChild(renderer.domElement);
  
	  // Add objects to the scene
	  dodecahedrons = [];
	  for (let i = 0; i < 100; i++) {
		const geometry = new THREE.DodecahedronGeometry(0.4);
		const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
		const dodecahedron = new THREE.Mesh(geometry, material);
		scene.add(dodecahedron);
		dodecahedron.position.x = Math.floor(Math.random() * (60 - -60 + 1) - 60);
		dodecahedron.position.y = Math.floor(Math.random() * (60 - -60 + 1) - 60);
		dodecahedron.position.z = Math.floor(Math.random() * (100 - -100 + 1) - 100);
		dodecahedrons.push(dodecahedron);
	  }  
  
	  // Add event listeners
	  window.addEventListener("resize", onWindowResize);
	  window.addEventListener("wheel", onScroll);
	}
  
	function onWindowResize() {
	  // Adjust the camera and renderer size when the window is resized
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	}
  
	function onScroll(event) {
	  const delta = event.deltaY;
	  const direction = delta > 0 ? -1 : 1; // invert the direction of scroll
  
	  // Move each dodecahedron towards the camera based on the scroll direction
	  for (let i = 0; i < dodecahedrons.length; i++) {
		const dodecahedron = dodecahedrons[i];
		dodecahedron.position.z += 1 * direction;
	  }
	}
  
	function animate() {
	  requestAnimationFrame(animate);
  
	  // Animate the dodecahedrons
	  scene.traverse(function(object) {
		if (object instanceof THREE.Mesh) {
		  object.rotation.x += 0.01;
		  object.rotation.y += 0.001;
		}
	  });
  
	  renderer.render(scene, camera);
	}
  
	animate();
  };