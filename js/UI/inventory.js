var active = false;
export function toggleInventoryUI(advancedTexture) {
    //https://doc.babylonjs.com/how_to/gui
    var grid = new BABYLON.GUI.Grid();
    grid.width = "350px";
    grid.height = "200px";
    grid.addColumnDefinition(0.5, true);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);

    //  grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    // grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.background = "black";
   
 /*   active = !active;
    if (active == true) {
        grid.ena .addControl(grid);

    else if(active == false){
        advancedTexture.addControl(grid);

    }*/
    var image = new BABYLON.GUI.Image("dirt", "images/dirt.png");
    //   image.width = 0.2;
    //  image.height = "50px";
    grid.addControl(image, 0, 0);

    var rect = new BABYLON.GUI.Rectangle();
    rect.background = "green";
    rect.thickness = 0;
    grid.addControl(rect, 0, 1);


}