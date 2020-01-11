/**
 * function to create the center cross
 * @param {*} advancedTexture 
 */
export function centerCross(advancedTexture) {
    var cross = new BABYLON.GUI.Rectangle();
    cross.width = "20px";
    cross.height = "2px";
    cross.color = "black";
    cross.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    cross.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(cross);

    var cross1 = new BABYLON.GUI.Rectangle();
    cross1.width = "2px";
    cross1.height = "20px";
    cross1.color = "black";
    cross1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    cross1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(cross1);
}