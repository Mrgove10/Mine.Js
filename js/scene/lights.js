export function setupLights(scene) {
  scene.clearColor = BABYLON.Color3.FromHexString("#80EBFF")
  //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 5, 0), scene);
  //light.diffuse = new BABYLON.Color3(0.75, 0.75, 0.75);
  //light.specular = new BABYLON.Color3(0.75, 0.75, 0.75);
  light.groundColor = new BABYLON.Color3(0.75, 0.75, 0.75);

  //light1.intensity = 0.75;
  var light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
  //light2.intensity = 0.75;
  //var shadowGenerator = new BABYLON.ShadowG enerator(1048, light1);
  // shadowGenerator.useBlurExponentialShadowMap = true;
}
