export function MAT_leaf(scene) {
    var leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseTexture = new BABYLON.Texture("images/leaf.png", scene);
    leafMaterial.roughness = 10;
    leafMaterial.freeze(); //for performance issues
    return leafMaterial;
}