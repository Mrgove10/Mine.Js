import { centerCross } from './js/UI/centerCross.js';
import { setupLights } from './js/scene/lights.js';
import { castRay } from './js/interactions/raycasting.js';
import { setupcamera } from './js/scene/camera.js';
import { generateFlatTerrain } from './js/generation/bedrock.js';
import { generateTerrain } from './js/generation/terrain.js';
import { hotbar } from './js/UI/hotbar.js';
import { removeBlock } from './js/interactions/removeBlock.js';

var mapsize = 25;
var maxheight = 17;
var renderDistance = 35;
var numberOfTrees = 3;

//see : https://www.babylonjs-playground.com/#4P4FTN#1 
// for pointer lock 
//had to do this because the basic function was not waorking for some reason
function initPointerLock(canvas, camera) {
    // On click event, request pointer lock
    canvas.addEventListener("click", function (evt) {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }, false);

    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function (event) {
        var controlEnabled = (
            document.mozPointerLockElement === canvas
            || document.webkitPointerLockElement === canvas
            || document.msPointerLockElement === canvas
            || document.pointerLockElement === canvas);
        // If the user is already locked
        if (!controlEnabled) {
            camera.detachControl(canvas);
        } else {
            camera.attachControl(canvas);
        }
    };

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
}

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {
    var scene = new BABYLON.Scene(engine, true, {
        stencil: true
    });
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.useGeometryIdsMap = true;
    //   scene.debugLayer.show(); //debug
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'r'
            },
            function () {
                var pickedBlock = scene.pickWithRay(castRay(scene, camera));
                if (pickedBlock.pickedMesh != null) { // in case there is no block in front of us
                    removeBlock(pickedBlock);
                }
            }
        )
    );

    var camera = setupcamera(scene, canvas, 9, 25, 9);
    createGui();
    setupLights(scene);
    generateFlatTerrain(scene, renderDistance, mapsize);
    generateTerrain(scene, renderDistance, mapsize, maxheight, numberOfTrees);

    /**
     * Created all the UI elements
     */
    function createGui() {
        // GUI
        var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        centerCross(advancedTexture);
        hotbar(advancedTexture);
    }

    scene.registerBeforeRender(function () {
        castRay(scene, camera);
    });

    scene.onPointerUp = function () {
        if (!document.pointerLockElement) {
            engine.enterPointerlock();
        }
        else {
            engine.exitPointerlock();
        }
    }

    scene.useGuseGeometryIdsMap = true;

    return scene;
};

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
    var fpsLabel = document.getElementById("fpsLabel");
    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
});

// Watch for browser/ resize events
window.addEventListener("resize", function () {
    engine.resize();
});
