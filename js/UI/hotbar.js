export function hotbar(advancedTexture) {
    var image = new BABYLON.GUI.Image("but", "images/hotbar.png");
    image.width = 0.2;
    image.height = "50px";
    image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(image);
}