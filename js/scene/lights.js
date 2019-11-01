export function setupLights(scene) {
    scene.clearColor = BABYLON.Color3.FromHexString("#80EBFF")
    //    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 5, 0), scene);
    light1.intensity = 0.75;
    //var shadowGenerator = new BABYLON.ShadowG enerator(1048, light1);
    // shadowGenerator.useBlurExponentialShadowMap = true;
}
