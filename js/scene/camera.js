/**
 * Set up the camera for the scene
 * @param {Scene} scene 
 */
export function setupcamera(scene, canvas) {
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