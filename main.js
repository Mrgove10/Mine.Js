
var setupcamera = function (scene) {
    var camera = new BABYLON.UniversalCamera("mainCamera", new BABYLON.Vector3(0, 0, 0), scene);
    camera.fov = 45;
    camera.minZ = 0.01;
    camera.maxZ = 1000;
    camera.speed = 0.5;
    camera.position = new BABYLON.Vector3(0, 5, 0);
    // camera.rotation = new BABYLON.Vector3(Math.PI / 4, Math.PI, 0); //https://doc.babylonjs.com/resources/rotation_conventions
    camera.attachControl(canvas, true);
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.applyGravity = true;
    camera.checkCollisions = true;
    return camera;
}


var generateTerrain = function () {

    var data = [];
    var simplex = new SimplexNoise();
    for (let i = 0; i < 25; i++) {
        data[i] = [];
        for (let j = 0; j < 25; j++) {
            data[i][j] = [];
            data[i][j] = simplex.noise2D(i, j) * 10;
        }
    }
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            var ir = BABYLON.MeshBuilder.CreateBox("ir", {}, scene);
            ir.position = new BABYLON.Vector3(i, Math.ceil(data[i][j]), j);
            ir.receiveShadows = true;
            ir.checkCollisions = true;
        }
    }
}

var generateFlatTerrain = function () {

    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
            var ir = BABYLON.MeshBuilder.CreateBox("ir", {}, scene);
            ir.position = new BABYLON.Vector3(i, 0, j);
            ir.receiveShadows = true;
            ir.checkCollisions = true;
        }
    }
}

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {

    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;

    //  generateTerrain();
    generateFlatTerrain();
    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    //myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    // Add lights to the scene
    var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 5, 0), scene);
    light1.intensity = 0.75;
    var shadowGenerator = new BABYLON.ShadowGenerator(1048, light1);
    shadowGenerator.useBlurExponentialShadowMap = true;

    var camera = setupcamera(scene);

    /*var box = BABYLON.Mesh.CreateBox("box", 0.1, scene);
    box.position.z = 10;
    box.parent = camera;
*/
    //scene.debugLayer.show();
   
    function vecToLocal(vector, mesh){
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;		 
    }

    function castRay(){       
        var origin = camera.position;
	
	    var forward = new BABYLON.Vector3(0,0,1);		
	    forward = vecToLocal(forward, camera);
	
	    var direction = forward.subtract(origin);
	    direction = BABYLON.Vector3.Normalize(direction);
	
	    var length = 100;
	
	    var ray = new BABYLON.Ray(origin, direction, length);

	//	let rayHelper = new BABYLON.RayHelper(ray);		
	//	rayHelper.show(scene);		

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh){
           hit.pickedMesh.scaling.y += 0.01;
           hit.pickedMesh.material = myMaterial;
	    }
    }

    scene.registerBeforeRender(function () {
        castRay();
    });

    return scene;
};

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

/*
window.addEventListener("click", function () {
    // We try to pick an object
    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    console.log(pickResult);
    pickResult.originMesh.material = myMaterial;
    
 });*/