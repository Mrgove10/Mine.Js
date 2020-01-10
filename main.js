//ui
import { centerCross } from './js/UI/centerCross.js';
import { help } from './js/UI/help.js';

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


var mapsize = 20;
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
                craft(getInventory(), "woodenPickaxe");
                craft(getInventory(), "stonePickaxe"); // have to move this later
                craft(getInventory(), "ironPickaxe");
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
  /*  cam.animations = [];

    var a = new BABYLON.Animation(
        "a",
        "position.y", 30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];
    keys.push({ frame: 0, value: cam.position.y });
    keys.push({ frame: 7, value: cam.position.y + 2 });
    keys.push({ frame: 14, value: cam.position.y });
    a.setKeys(keys);

    var easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    a.setEasingFunction(easingFunction);

    cam.animations.push(a);

    scene.beginAnimation(cam, 0, 14, false);*/
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
return scene;
};

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
    console.log(scene.cameras[0].position)
    var fpsLabel = document.getElementById("fpsLabel");
    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
});

// Watch for browser/ resize events
window.addEventListener("resize", function () {
    engine.resize();
});
