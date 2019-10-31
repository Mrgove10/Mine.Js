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

    generateTerrain();
    //generateFlatTerrain();
    createGui();
    setupLights();
    var camera = setupcamera(scene);

    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    //myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    var testsphere = BABYLON.MeshBuilder.CreateSphere("testsphere", {}, scene);
    testsphere.position = new BABYLON.Vector3(2, 2, 2);
    testsphere.material = MAT_bedrock();


    function MAT_bedrock() {
        var bedrockMaterial = new BABYLON.StandardMaterial("bedrockMaterial1", scene);
        bedrockMaterial.diffuseTexture = new BABYLON.Texture("images/bedrock.png", scene);
        bedrockMaterial.freeze(); //for perfomance issues
        return bedrockMaterial;
    }

    /**
     * sets up the light
     */
    function setupLights() {
        scene.clearColor = BABYLON.Color3.FromHexString("#80EBFF")
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 5, 0), scene);
        light1.intensity = 0.75;
        //var shadowGenerator = new BABYLON.ShadowG enerator(1048, light1);
        // shadowGenerator.useBlurExponentialShadowMap = true;
    }

    /**
     * Trandforms a vectore to a mesh
     * @param {*} vector 
     * @param {*} mesh 
     */
    function vecToLocal(vector, mesh) {
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
        return v;
    }

    /**
     * Cats a ray from the camera
     */
    function castRay() {
        var origin = camera.position;

        var forward = new BABYLON.Vector3(0, 0, 1);
        forward = vecToLocal(forward, camera);

        var direction = forward.subtract(origin);
        direction = BABYLON.Vector3.Normalize(direction);

        var length = 6;

        var ray = new BABYLON.Ray(origin, direction, length);

        //for debugging
        //	let rayHelper = new BABYLON.RayHelper(ray);		
        //	rayHelper.show(scene);		

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh) {
            hit.pickedMesh.material = myMaterial;
        }
    }

    /**
     * Created all the UI elements
     */
    function createGui() {
        // GUI
        var advancedTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var createRectangle = function () {
            var rect1 = new BABYLON.GUI.Rectangle();
            rect1.width = 0.2;
            rect1.height = "40px";
            rect1.cornerRadius = 5;
            rect1.color = "Orange";
            rect1.thickness = 4;
            rect1.background = "green";
            advancedTexture.addControl(rect1);
            return rect1;
        }
        createRectangle().verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Cen,ter cross of the screen
        var cross = new BABYLON.GUI.Rectangle();
        cross.width = "20px";
        cross.height = "2px";
        cross.color = "black";
        cross.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        cross.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(cross);

        var cross1 = new BABYLON.GUI.Rectangle();
        cross1.width = "2px";
        cross1.height = "20px";
        cross1.color = "black";
        cross1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        cross1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(cross1);
    }

    /**
     * Generates a flat plane
     */
    function generateFlatTerrain() {
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                console.log("Adding cube")
                var ir = BABYLON.MeshBuilder.CreateBox("ir", {}, scene);
                ir.position = new BABYLON.Vector3(i, 0, j);
                ir.receiveShadows = true;
                ir.checkCollisions = true;
                ir.material = MAT_bedrock();
            }
        }
    }

    /**
     * Generates random terain
     */
    function generateTerrain() {

        var t = 0;
        var data = [];
        var simplex = new SimplexNoise();
        for (let x = 0; x < 25; x++) {
            data[x] = [];
            for (let y = 0; y < 25; y++) {
                data[x][y] = (simplex.noise2D(x / 16, y / 16) * 0.5 + 0.5 )*10;
            }
        }
        console.log(data);

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].length; y++) {
                var ir = BABYLON.MeshBuilder.CreateBox("ir", {}, scene);
                ir.position = new BABYLON.Vector3(x, Math.ceil(data[x][y]), y);
                ir.receiveShadows = true;
                ir.checkCollisions = true;
            }
        }



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
        camera.position = new BABYLON.Vector3(0, 5, 0);
        camera.attachControl(canvas, true);
        camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
       // camera.applyGravity = true;
        camera.checkCollisions = true;
        return camera;
    }

    scene.registerBeforeRender(function () {
        castRay();
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
