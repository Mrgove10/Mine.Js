export function currentItem(advancedTexture, currentHand) {
    var img = new BABYLON.GUI.Image("currentitem", "images/" + currentHand + ".png")
    img.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    img.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    advancedTexture.addControl(img);
    return img;
}