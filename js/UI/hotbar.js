export function hotbar(advancedTexture) {
    var grid = new BABYLON.GUI.Grid();   
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.addColumnDefinition(100, true);
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    /*var image = new BABYLON.GUI.Image("but", "images/hotbar.png");
    image.width = 0.2;
    image.height = "50px";
    image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(image);*/
}