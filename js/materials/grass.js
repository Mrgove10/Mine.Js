export function MAT_grass(scene) {
    var grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);
    grassMaterial.diffuseTexture = new BABYLON.Texture("images/grass.png", scene);
    grassMaterial.roughness = 10;
    grassMaterial.freeze(); //for performance issues
    return grassMaterial;
}