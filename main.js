'use strict';
import { MAT_dirt } from './js/materials/dirt.js';
import { MAT_grass } from './js/materials/grass.js';
import { MAT_wood } from './js/materials/wood.js';
import { MAT_leaf } from './js/materials/leaf.js';
import { centerCross } from './js/UI/centerCross.js';
import { setupLights } from './js/scene/lights.js';
//import { createTree } from './js/generation/tree.js';
import { castRay } from './js/interactions/raycasting.js';
import { setupcamera } from './js/scene/camera.js';
import { generateFlatTerrain } from './js/generation/bedrock.js';
import { generateTerrain } from './js/generation/terrain.js';


var mapsize = 10;
var allBlocks = [];
var renderDistance = 20;
//see : https://www.babylonjs-playground.com/#4P4FTN#1 
// for pointer lock 
//had to do this because the basic function was not waorking for some reason
BABYLON.Engine.prototype.enterPointerlock = function () {
    if (this._rendering) {
        BABYLON.Tools.RequestPointerlock(this._rendering);
    }
}

BABYLON.Engine.prototype.exitPointerlock = function () {
    BABYLON.Tools.ExitPointerlock();
}


BABYLON.Tools.RequestPointerlock = function (element) {
    element.requestPointerLock = element.requestPointerLock || (element).msRequestPointerLock || (element).mozRequestPointerLock || (element).webkitRequestPointerLock;
    if (element.requestPointerLock) {
        element.requestPointerLock();
    }
}

BABYLON.Tools.ExitPointerlock = function (element) {
    let anyDoc = document; // as any;
    document.exitPointerLock = document.exitPointerLock || anyDoc.msExitPointerLock || anyDoc.mozExitPointerLock || anyDoc.webkitExitPointerLock;

    if (document.exitPointerLock) {
        document.exitPointerLock();
    }
}

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.useGeometryIdsMap = true;
    // scene.debugLayer.show();
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'r'
            },
            function () {
                var picked = scene.pickWithRay(castRay(scene, camera));
                console.log(picked.pickedMesh);

                //picked = null;
                picked.pickedMesh.dispose();
                picked.pickedMesh.material.dispose();
                //    picked.dispose();
            }
        )
    );

    var camera = setupcamera(scene, canvas);
    generateTerrain(scene, renderDistance, mapsize);
    createGui();
    setupLights(scene);
    generateFlatTerrain(scene, renderDistance, mapsize);


    var cubeWood = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeWood.checkCollisions = true;
    cubeWood.material = MAT_wood(scene);
    cubeWood.freezeWorldMatrix();

    var cubeLeaf = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeLeaf.checkCollisions = true;
    cubeLeaf.material = MAT_leaf(scene);
    cubeLeaf.freezeWorldMatrix();

    var barkHeigh = 6;
    //lv1  = 5x5
    //lv2 = 5x5
    //lv3 = 3x3
    //lv 4 = cross


    for (let i = 0; i < barkHeigh; i++) {
        var bb = cubeLeaf.createInstance("i");
        bb.position = new BABYLON.Vector3(-5, i, -5);
    }

    for (let i = 0; i < barkHeigh; i++) {
        var bb = cubeWood.createInstance("i");
        bb.position = new BABYLON.Vector3(-4, i, -4);
    }

    /**
     * Created all the UI elements
     */
    function createGui() {
        // GUI
        var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        centerCross(advancedTexture)
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
});

// Watch for browser/ resize events
window.addEventListener("resize", function () {
    engine.resize();
});
