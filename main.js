var generateBedrock = function () {
    var mapx = 10;
    var mapy = 10;
    for (let i = 0; i < mapx; i++) {
        for (let j = 0; j < mapy; j++) {
            var cube = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
            cube.position = new BABYLON.Vector3(i, 0, j);
        }
    }
}

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.UniversalCamera("ORTHOGRAPHIC_CAMERA", new BABYLON.Vector3(5, 10, 0) , scene);
    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    generateBedrock();

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
    var map = {}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    
    scene.registerAfterRender(function () {

        if ((map["w"] || map["W"])) {
            sphere.position.z += 0.1;
        };

        if ((map["z"] || map["Z"])) {
            sphere.position.z -= 0.1;
        };

        if ((map["a"] || map["A"])) {
            sphere.position.x -= 0.1;
        };

        if ((map["s"] || map["S"])) {
            sphere.position.x += 0.1;
        };

    });

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




