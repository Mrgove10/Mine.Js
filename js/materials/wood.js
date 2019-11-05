export function MAT_wood(scene) {
    var woodMaterial = new BABYLON.StandardMaterial("woodMaterial", scene);
    woodMaterial.diffuseTexture = new BABYLON.Texture("images/wood.png", scene);
    woodMaterial.roughness = 10;
    woodMaterial.freeze(); //for performance issues
    return woodMaterial;
}