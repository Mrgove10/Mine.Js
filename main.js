var setupcamera = function (scene) {
    var camera = new BABYLON.FreeCamera("mainCamera", new BABYLON.Vector3(0, 0, 0), scene);
    /*var distance = 205;
    var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width;

   /* camera.orthoLeft = -distance / 2;
    camera.orthoRight = distance / 2;
    camera.orthoBottom = camera.orthoLeft * aspect;
    camera.orthoTop = camera.orthoRight * aspect;*/
    camera.fov = 45;
    camera.minZ = 0.1;
    camera.maxZ = 1000;
    //  camera.attachControl(canvas, true); //remove, only for debugging


    /*  var axis = new BABYLON.Vector3(0, 1, 0);
      var angle = Math.PI;
      var quaternion = new BABYLON.Quaternion.RotationAxis(axis, angle);
      camera.rotationQuaternion = quaternion;*/
    camera.position = new BABYLON.Vector3(0, 10, 10);
    camera.rotation = new BABYLON.Vector3(Math.PI / 4, Math.PI, 0); //https://doc.babylonjs.com/resources/rotation_conventions

    return camera;
}

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine


var createScene = function () {
    var scene = new BABYLON.Scene(engine);

   

    var floor = BABYLON.MeshBuilder.CreateBox("floor", { height: 0.25, width: 10, depth: 10 }, scene);
    floor.position = new BABYLON.Vector3(0, 0, 0);
    floor.receiveShadows = true;

    var player = BABYLON.MeshBuilder.CreateSphere("player", {}, scene);
    player.position = new BABYLON.Vector3(0, 1, 0)

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
     var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
     var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
     shadowGenerator.getShadowMap().renderList.push(player);

    var camera = setupcamera(scene, player);
    scene.debugLayer.show();
    return scene;
};
/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});




