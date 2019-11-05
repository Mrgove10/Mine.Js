export function MAT_diamond(scene) {
    var diamondMaterial = new BABYLON.StandardMaterial("diamondMaterial", scene);
    diamondMaterial.diffuseTexture = new BABYLON.Texture("images/diamond.png", scene);
    diamondMaterial.roughness = 10;
    diamondMaterial.freeze(); //for performance issues
    return diamondMaterial;
}