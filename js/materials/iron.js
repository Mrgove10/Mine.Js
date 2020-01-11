/**
 * Iron material
 * @param {*} scene 
 */
export function MAT_iron(scene) {
    var ironMaterial = new BABYLON.StandardMaterial("ironMaterial", scene);
    ironMaterial.diffuseTexture = new BABYLON.Texture("images/iron.png", scene);
    ironMaterial.roughness = 10;
    ironMaterial.freeze(); //for performance issues
    return ironMaterial;
}