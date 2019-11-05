export function MAT_stone(scene) {
    var stoneMaterial = new BABYLON.StandardMaterial("stoneMaterial", scene);
    stoneMaterial.diffuseTexture = new BABYLON.Texture("images/stone.png", scene);
    stoneMaterial.roughness = 10;
    stoneMaterial.freeze(); //for performance issues
    return stoneMaterial;
}