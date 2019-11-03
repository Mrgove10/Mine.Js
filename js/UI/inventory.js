export function toggleInventoryUI(advancedTexture, inventory) {
    //https://doc.babylonjs.com/how_to/gui
    var grid = new BABYLON.GUI.Grid();
    grid.width = 0.4;
    grid.height = 0.4;
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
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);

    /* grid.addColumnDefinition(0.5);
     grid.addColumnDefinition(0.5);
     grid.addColumnDefinition(100, true);
     grid.addRowDefinition(0.5);
     grid.addRowDefinition(0.5);*/

    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.background = "gray";
    advancedTexture.addControl(grid);

    // This rect will be on first row and second column
    var rect = new BABYLON.GUI.Rectangle();
    rect.background = "green";
    rect.thickness = 0;
    grid.addControl(rect, 0, 1);

    // This rect will be on second row and third column
    rect = new BABYLON.GUI.Rectangle();
    rect.background = "red";
    rect.thickness = 0;
    grid.addControl(rect, 1, 2);

    var image = new BABYLON.GUI.Image("dirt", "images/dirt.png");
    //   image.width = 0.2;
    //  image.height = "50px";
    grid.addControl(image, 0, 5);

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = inventory.dirt.toString();
    text1.color = "white";
    text1.fontSize = 24;
    grid.addControl(text1,0,5); 
    
    //drag and drop
   //https://www.babylonjs-playground.com/#XCPP9Y#134

    /* var rect = new BABYLON.GUI.Rectangle();
    rect.background = "green";
    rect.thickness = 0;
    grid.addControl(rect, 0, 1);*/
}
