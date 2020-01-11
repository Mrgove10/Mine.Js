//ui
import { centerCross } from './js/UI/centerCross.js';
import { help } from './js/UI/help.js';
import { timerText } from './js/UI/timer.js';

//scene
import { setupLights } from './js/scene/lights.js';
import { setupcamera } from './js/scene/camera.js';

//interactions
import { castRay } from './js/interactions/raycasting.js';
import { removeBlock } from './js/interactions/removeBlock.js';
import { addBlock } from './js/interactions/addBlock.js';

//generation
import { generateFlatTerrain } from './js/generation/bedrock.js';
import { generateTerrain } from './js/generation/terrain.js';

//player
import { showInventoryConsole, getInventory } from './js/player/inventory.js';

//crafting
import { getCraftables, craft } from './js/crafting/crafting.js';

var mapsize = 22;
var maxheight = 17;
var renderDistance = 10;
var currentHand = "hand"
var gravity = -1 // earth gravity = 9.81
//see : https://www.babylonjs-playground.com/#4P4FTN#1 
// for pointer lock 
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {
    var scene = new BABYLON.Scene(engine, true, {
        stencil: true
    });
    var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var camera = setupcamera(scene, canvas, 9, 30, 9);

    scene.gravity = new BABYLON.Vector3(0, gravity, 0);
    scene.collisionsEnabled = true; //Activates colisions in the scene
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.useGeometryIdsMap = true;

    //   scene.debugLayer.show(); //debug layer

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
                var possibleCrafts = getCraftables(getInventory());
                if (craft(getInventory(), "woodenPickaxe")) {
                    currentHand = "woodenPickaxe"
                }
                else if (craft(getInventory(), "stonePickaxe")) {
                    currentHand = "stonePickaxe"
                }
                else if (craft(getInventory(), "ironPickaxe")) {
                    currentHand = "ironPickaxe"
                }

                console.log("current hand : " + currentHand)
                console.log("possible crafts:");
                console.log(possibleCrafts);
                console.log("inventory :");
                console.log(getInventory());
            }
        )
    );

    //Add block key
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                parameter: 'r'
            },
            function () {
                addBlock(castRay(camera));
            }
        )
    );
    //Spacekey
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
    setupLights(scene);
    generateFlatTerrain(scene, renderDistance, mapsize); //generates the bedrock
    generateTerrain(scene, renderDistance, mapsize, maxheight); //generates the terrain

    /**
     * Created all the UI elements
     */
    function createGui() {
        help(advancedTexture);
        centerCross(advancedTexture);

        //  hotbar(advancedTexture);
        //  toggleInventoryUI(advancedTexture)
    }

    scene.registerBeforeRender(function () {
        castRay(camera);
        if (camera.position.y <= -10) {
            engine.exitPointerlock();
            camera.position = new BABYLON.Vector3(9, 30, 9);
        }
    });

    //pointer lock
    scene.onPointerUp = function () {
        if (!document.pointerLockElement) {
            engine.enterPointerlock();
        }
        else {
            engine.exitPointerlock();
        }
    }
    /*
        var i = 0;
        var handle = window.setInterval(() => {
            i++;
            var v = timerText(advancedTexture);
            v.text = i;
        }, 1000);
    */
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
