//ui
import { centerCross } from './js/UI/centerCross.js';
import { help } from './js/UI/help.js';
import { currentItem } from './js/UI/currentItem.js'

//scene
import { setupLights } from './js/scene/lights.js';
import { setupcamera } from './js/scene/camera.js';

//interactions
import { castRay } from './js/interactions/raycasting.js';
import { removeBlock } from './js/interactions/removeBlock.js';

//generation
import { generateFlatTerrain } from './js/generation/bedrock.js';
import { generateTerrain } from './js/generation/terrain.js';

//player
import { getInventory } from './js/player/inventory.js';

//crafting
import { getCraftables, craft } from './js/crafting/crafting.js';

var mapsize = 22;
var maxheight = 17;
var renderDistance = 15;
export var currentHand = "hand";
var gravity = -1; // earth gravity = 9.81

var startX = 9;
var startY = 35;
var startZ = 9;

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {
    var scene = new BABYLON.Scene(engine, true, {
        stencil: true
    });

    scene.gravity = new BABYLON.Vector3(0, gravity, 0);
    scene.collisionsEnabled = true; //Activates colisions in the scene
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.useGeometryIdsMap = true;

    var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var camera = setupcamera(scene, canvas, startX, startY, startZ);

    //   scene.debugLayer.show(); //debug layer
    // for the pointer lock see : https://www.babylonjs-playground.com/#219IXL#15
    //We start without being locked.
    var isLocked = false;

    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {

        //true/false check if we're locked, faster than checking pointerlock on each single click.
        if (!isLocked) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }

        //continue with shooting requests or whatever :P
        //evt === 0 (left mouse click)
        //evt === 1 (mouse wheel click (not scrolling))
        //evt === 2 (right mouse click)
    };

    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function () {
        var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;

        // If the user is already locked
        if (!controlEnabled) {
            camera.detachControl(canvas);
            isLocked = false;
        } else {
            camera.attachControl(canvas);
            isLocked = true;
        }
    };

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);



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
                    removeBlock(pickedBlock, currentHand);
                }
                if (getInventory().woodenPickaxe == 0) {
                    if (craft(getInventory(), "woodenPickaxe")) {
                        currentHand = "woodenPickaxe"
                    }
                } if (getInventory().stonePickaxe == 0) {
                    if (craft(getInventory(), "stonePickaxe")) {
                        currentHand = "stonePickaxe"
                    }
                } if (getInventory().ironPickaxe == 0) {
                    if (craft(getInventory(), "ironPickaxe")) {
                        currentHand = "ironPickaxe"
                    }
                }
            }
        )
    );
    //jump key
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                parameter: 'a'
            },
            function () {
                cameraJump();
            }
        )
    );

    var cameraJump = function () {
        var cam = scene.cameras[0];
        cam.position.y += 2;
    }

    createGui();
    var ci = currentItem()
    advancedTexture.addControl(ci);
    setupLights(scene);
    generateFlatTerrain(scene, renderDistance, mapsize); //generates the bedrock
    generateTerrain(scene, renderDistance, mapsize, maxheight); //generates the terrain
    /**
     * Created all the UI elements
     */
    function createGui() {
        help(advancedTexture);
        centerCross(advancedTexture);
    }

    /**
     * Things that should happen before the render
     */
    scene.registerBeforeRender(function () {
        castRay(camera);

        switch (currentHand) {
            case "woodenPickaxe":
                ci.text = "Current item : Wooden Pickaxe";
                break;
            case "stonePickaxe":
                ci.text = "Current item : Stone Pickaxe";
                break;
            case "ironPickaxe":
                ci.text = "Current item : Iron Pickaxe";
                break;
            case "hand":
                ci.text = "Current item : Bare hands";
                break;
        }
        if (camera.position.y <= -15) { // if we drop from the map, place us back to the top of the map
            camera.position = new BABYLON.Vector3(startX, startY, startZ);
        }
    });

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
