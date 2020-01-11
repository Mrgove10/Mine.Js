/**
 * Cast a ray from the center of the camera
 * @param {*} camera 
 */
export function castRay(camera) {
    var origin = camera.position;

    var forward = new BABYLON.Vector3(0, 0, 1);
    forward = vecToLocal(forward, camera);

    var direction = forward.subtract(origin);
    direction = BABYLON.Vector3.Normalize(direction);

    var length = 6;

    var ray = new BABYLON.Ray(origin, direction, length);

    return ray;
    //for debugging
    //	let rayHelper = new BABYLON.RayHelper(ray);		
    //	rayHelper.show(scene);		
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