export function help(advancedTexture) {
    var text1 = new BABYLON.GUI.TextBlock();
    text1.color = "press R to detroy blocks";
    text1.fontSize = 24;
    text1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    advancedTexture.addControl(text1);
}