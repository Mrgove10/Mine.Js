export function MAT_dirt(scene) {
    var dirtMaterial = new BABYLON.StandardMaterial("dirtMaterial", scene);
    dirtMaterial.diffuseTexture = new BABYLON.Texture("../../images/dirt.png", scene);
    dirtMaterial.freeze(); //for performance issues
    return dirtMaterial;
}