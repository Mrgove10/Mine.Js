export function MAT_bedrock() {
    var bedrockMaterial = new BABYLON.StandardMaterial("bedrockMaterial", scene);
    bedrockMaterial.diffuseTexture = new BABYLON.Texture("images/bedrock.png", scene);
    bedrockMaterial.freeze(); //for performance issues
    return bedrockMaterial;
}