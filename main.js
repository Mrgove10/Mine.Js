
var setupcamera = function (scene) {
    var camera = new BABYLON.UniversalCamera("mainCamera", new BABYLON.Vector3(0, 0, 0), scene);
    camera.fov = 45;
    camera.minZ = 0.1;
    camera.maxZ = 1000;
    camera.position = new BABYLON.Vector3(0, 5, 0);
    // camera.rotation = new BABYLON.Vector3(Math.PI / 4, Math.PI, 0); //https://doc.babylonjs.com/resources/rotation_conventions
    camera.attachControl(canvas, true);
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.applyGravity = true;
camera.checkCollisions = true;
    return camera;
}


var generateTerrain = function () {

    var data =[];
    var simplex = new SimplexNoise();
    for (let i = 0; i < 25; i++) {
        data[i] = [];
        for (let j = 0; j < 25; j++) {
            data[i][j] = [];
           data[i][j] = simplex.noise2D(i, j)*10;
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

var generateFlatTerrain= function () {

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

    var player = BABYLON.MeshBuilder.CreateCylinder("player", { height: 0.2 }, scene);
    player.position = new BABYLON.Vector3(0, .2, 0);
    player.material = myMaterial;

    var map = {}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    //she is executed after the initial rendering
    scene.registerAfterRender(function () {

        if ((map["s"] || map["S"])) {
            player.position.z += 0.1;
        };

        if ((map["z"] || map["Z"])) {
            player.position.z -= 0.1;
        };

        if ((map["d"] || map["D"])) {
            player.position.x -= 0.1;
        };

        if ((map["q"] || map["Q"])) {
            player.position.x += 0.1;
        };

    });

    // Add lights to the scene
    var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 5, 0), scene);
    light1.intensity = 0.75;
    var shadowGenerator = new BABYLON.ShadowGenerator(1048, light1);
    shadowGenerator.addShadowCaster(player);
    shadowGenerator.useBlurExponentialShadowMap = true;

    var camera = setupcamera(scene, player);
    scene.debugLayer.show();
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