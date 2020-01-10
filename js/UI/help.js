export function help(advancedTexture) {
    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "press Z,Q,S,D and mouse to move around";
    text1.width = "350px"
    text1.height = "25px"
    text1.fontSize = 15;
    text1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    advancedTexture.addControl(text1);

    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = "press R to detroy blocks";
    text2.width = "350px"
    text2.height = "25px"
    text2.fontSize = 15;
    text2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text2.paddingTop = "40";
    advancedTexture.addControl(text2);

    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = "Your Goal : find X diamonds to make a secret item";
    text2.width = "350px"
    text2.height = "25px"
    text2.fontSize = 15;
    text2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text2.paddingTop = "80";
    advancedTexture.addControl(text2);

    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = "Current item :";
    text2.width = "350px"
    text2.height = "25px"
    text2.fontSize = 15;
    text2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text2.paddingTop = "120";
    advancedTexture.addControl(text2);

}