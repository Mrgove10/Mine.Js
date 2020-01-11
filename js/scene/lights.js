/**
 * creates the lights in the scene
 * @param {*} scene 
 */
export function setupLights(scene) {
  scene.clearColor = BABYLON.Color3.FromHexString("#80EBFF")
  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 5, 0), scene);

  light.groundColor = new BABYLON.Color3(0.75, 0.75, 0.75);

  var light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
}
