import { centerCross } from './js/UI/centerCross.js';
import { setupLights } from './js/scene/lights.js';
import { castRay } from './js/interactions/raycasting.js';
import { setupcamera } from './js/scene/camera.js';
import { generateFlatTerrain } from './js/generation/bedrock.js';
import { generateTerrain } from './js/generation/terrain.js';
import { hotbar } from './js/UI/hotbar.js';
import { removeBlock } from './js/interactions/removeBlock.js';
import { showInventoryConsole, getInventory } from './js/player/inventory.js';
import { toggleInventoryUI } from './js/UI/inventory.js';
import { addBlock } from './js/interactions/addBlock.js';
import { getCraftables, craft } from './js/crafting/crafting.js';

var mapsize = 22;
var maxheight = 17;
var renderDistance = 35;

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
    var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var camera = setupcamera(scene, canvas, 9, 25, 9);

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.useGeometryIdsMap = true;
    //   scene.debugLayer.show(); //debug
    // Remove block key
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'r'
            },
            function () {
                var pickedBlock = scene.pickWithRay(castRay(camera));
                if (pickedBlock.pickedMesh != null) { // in case there is no block in front of us
                    removeBlock(pickedBlock);
                }
            }
        )
    );
    // Inventory key
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'i'
            },
            function () {
                showInventoryConsole();
              //  toggleInventoryUI(advancedTexture, getInventory());
            }
        )
    );
    // crafting key key
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'e'
            },
            function () {
                var possibleCrafts = getCraftables(getInventory());
                //ui stuff here
                craft(getInventory(), "stick"); // have to move this later
                console.log(possibleCrafts);
            }
        )
    );
    //Add block key
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'a'
            },
            function () {
                addBlock(castRay(camera));
            }
        )
    );



    createGui();
    setupLights(scene);
    generateFlatTerrain(scene, renderDistance, mapsize);
    generateTerrain(scene, renderDistance, mapsize, maxheight);
    /**
     * Created all the UI elements
     */
    function createGui() {
        // GUI
        centerCross(advancedTexture);
        hotbar(advancedTexture);
    }

    scene.registerBeforeRender(function () {
        castRay(camera);
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
