export function toggleInventoryUI(advancedTexture, inventory) {
    //https://doc.babylonjs.com/how_to/gui
    var grid = new BABYLON.GUI.Grid();
    grid.width = 0.45;
    grid.height = 0.45;
    grid.addColumnDefinition(0.2);
    grid.addColumnDefinition(0.2);
    grid.addColumnDefinition(0.2);
    grid.addColumnDefinition(0.2);
    grid.addColumnDefinition(0.2);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);

    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.background = "gray";
    advancedTexture.addControl(grid);

    //materials
    createInvBlock(grid, inventory, "dirt", 0, 0);
  /*  grid.addControl(new BABYLON.GUI.Image("grass", "images/grass.png"), 0, 1);
    grid.addControl(new BABYLON.GUI.Image("wood", "images/wood.png"), 0, 2);
    grid.addControl(new BABYLON.GUI.Image("leaf", "images/leaf.png"), 0, 3);
    grid.addControl(new BABYLON.GUI.Image("stone", "images/stone.png"), 0, 4);
    grid.addControl(new BABYLON.GUI.Image("iron", "images/iron.png"), 1, 0);
    grid.addControl(new BABYLON.GUI.Image("diamond", "images/diamond.png"), 1, 1);
/*

    //drag and drop
    //https://www.babylonjs-playground.com/#XCPP9Y#134

    /* var rect = new BABYLON.GUI.Rectangle();
    rect.background = "green";
    rect.thickness = 0;
    grid.addControl(rect, 0, 1);*/
}

function createInvBlock(grid, inventory, name, row, col) {
    grid.addControl(new BABYLON.GUI.Image(name, "images/" + name + ".png"), row, col);

    console.log(name);
    var text = new BABYLON.GUI.TextBlock();
    text.text = inventory.name.toString().toString();
    text.color = "white";
    text.fontSize = 30;
    grid.addControl(text, row, col);

}