/**
 * Set up the camera for the scene
 * @param {Scene} scene 
 */
export function setupcamera(scene, canvas, x, y, z) {
    var camera = new BABYLON.UniversalCamera("mainCamera", new BABYLON.Vector3(0, 0, 0), scene);
    camera.fov = 45;
    camera.minZ = 0.01;
    camera.maxZ = 1000;
    camera.speed = 0.5;
    camera.position = new BABYLON.Vector3(x, y, z);
    camera.attachControl(canvas, true);
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
    camera.applyGravity = true;
    camera.checkCollisions = true;

    //Adds zqsd to be able to control the camera. only work onazerty keyboard
    camera.keysUp.push(90); // z
    camera.keysDown.push(83); // s
    camera.keysRight.push(68); //d
    camera.keysLeft.push(81); //q

    return camera;
}