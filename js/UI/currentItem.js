export function currentItem() {
    /*  var img = new BABYLON.GUI.Image("currentitem", "images/" + currentHand + ".png")
      img.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
      img.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
      advancedTexture.addControl(img);
      return img;*/
    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = "Current item : ";
    text2.width = "450px"
    text2.height = "25px"
    text2.fontSize = 15;
    text2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text2.paddingTop = "120";
    return text2;
    // advancedTexture.addControl(text2);
}