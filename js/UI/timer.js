export function timerText(advancedTexture) {
    var timertext = new BABYLON.GUI.TextBlock();
    timertext.text = "Press Z,Q,S,D and mouse to move around";
    timertext.width = "350px"
    timertext.height = "25px"
    timertext.fontSize = 15;
    timertext.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    timertext.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(timertext);
    return timertext;
}
