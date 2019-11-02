'use strict';
import { MAT_dirt } from './js/materials/dirt.js';
import { MAT_grass } from './js/materials/grass.js';
import { MAT_bedrock } from './js/materials/bedrock.js';
import { centerCross } from './js/UI/centerCross.js';
import { setupLights } from './js/scene/lights.js';
import { createTree } from './js/generation/tree.js';
import { castRay } from './js/interactions/raycasting.js';

var mapsize = 20;
var allBlocks = [];
//see : https://www.babylonjs-playground.com/#4P4FTN#1 
// for pointer lock 
//had to do this because the basic function was not waorking for some reason
BABYLON.Engine.prototype.enterPointerlock = function () {
    if (this._renderingCanvas) {
        BABYLON.Tools.RequestPointerlock(this._renderingCanvas);
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


   // scene.debugLayer.show();
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyDownTrigger,
                parameter: 'r'
            },
            function () {
                var picked = scene.pickWithRay(castRay(scene,camera));
                console.log(picked.pickedMesh);

                //picked = null;
                picked.pickedMesh.dispose();
                picked.pickedMesh.material.dispose();
            //    picked.dispose();
            }
        )
    );

    var camera = setupcamera(scene);
    generateTerrain();
    //generateFlatTerrain();
    createGui();
    setupLights(scene);
    createTree(scene, -10, 0, -10);

    /**
     * Created all the UI elements
     */
    function createGui() {
        // GUI
        var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        centerCross(advancedTexture)
    }

    /**
     * Generates a flat plane
     */
    function generateFlatTerrain() {
        for (let i = 0; i < mapsize; i++) {
            for (let j = 0; j < mapsize; j++) {
                console.log("Adding cube")
                var ir = BABYLON.MeshBuilder.CreateBox("ir", {}, scene);
                ir.position = new BABYLON.Vector3(i, 0, j);
                //ir.receiveShadows = true;
                ir.checkCollisions = true;
                ir.material = MAT_bedrock(scene);
            }
        }
        scene.createOrUpdateSelectionOctree();
    }

    /**
     * Generates random terain whit smplex noise
     */
    function generateTerrain() {
        var cubeGrass = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
      //  cubeGrass.receiveShadows = true;
        cubeGrass.checkCollisions = true;
        cubeGrass.material = MAT_grass(scene);

        var cubeDirt = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
        //cubeDirt.receiveShadows = true;
        cubeDirt.checkCollisions = true;
        cubeDirt.material = MAT_dirt(scene);

        var t = 0;
        var data = [];
        var simplex = new SimplexNoise();
        for (let x = 0; x < mapsize; x++) {
            data[x] = [];
            for (let y = 0; y < mapsize; y++) {
                data[x][y] = (simplex.noise2D(x / 16, y / 16) * 0.5 + 0.5) * 10;
            }
        }

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].length; y++) {
               
                var height = Math.ceil(data[x][y]);
                var name = "cube#"+x+y+height;
                //top cube
               // var cubeInstanceTop = cubeGrass.createInstance(name);
               var cubeGrass = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
             //  cubeGrass.receiveShadows = true;
               cubeGrass.checkCollisions = true;
               cubeGrass.material = MAT_grass(scene);
       
               cubeGrass.position = new BABYLON.Vector3(x, height, y);
                //te cubes underneath
                for (let h = 0; h < height; h++) {
                    name = "cube#"+x+y+h;
                    //var cubeInstanceBot = cubeDirt.createInstance(name);
                    var cubeDirt = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
                  //  cubeDirt.receiveShadows = true;
                    cubeDirt.checkCollisions = true;
                    cubeDirt.material = MAT_dirt(scene);
                    cubeDirt.position = new BABYLON.Vector3(x, h, y);
                }
                /*
                  allBlocks.push({
                      x: x,
                      y: y,
                      block: cubeinstance
                  });*/
            }
        }
        scene.createOrUpdateSelectionOctree();
        console.log(allBlocks);
    }

    function currentPlayerPos() {
        var renderDistance = 15;
    /*    scene.meshes.forEach(block => {
            var a = camera.position.x - block._absolutePosition.x;
            var b = camera.position.y - block._absolutePosition.y;
            var dist = Math.sqrt(a * a + b * b);
            if (dist <= renderDistance) {
                block.isVisible = true;
            }
            else {
                block.isVisible = false;
            }
        });*/
    }

    /**
     * Set up the camera for the scene
     * @param {Scene} scene 
     */
    function setupcamera(scene) {
        var camera = new BABYLON.UniversalCamera("mainCamera", new BABYLON.Vector3(0, 0, 0), scene);
        camera.fov = 45;
        camera.minZ = 0.01;
        camera.maxZ = 1000;
        camera.speed = 0.5;
        camera.position = new BABYLON.Vector3(0, 15, 0);
        camera.attachControl(canvas, true);
        camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        // camera.applyGravity = true;
        camera.checkCollisions = true;
        return camera;
    }

    scene.registerBeforeRender(function () {
        castRay(scene,camera);
        currentPlayerPos();
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

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
