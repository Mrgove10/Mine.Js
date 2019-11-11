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

    var row = 0;
    var col = 0;
    //materials
    for (var prop in inventory) {
        console.log(row + col);
        createInvBlock(grid, prop, row, col, inventory);
        col++;
        if (col >= 5) {
            col = 0;
            row++;
        }
    }
}

/**
 * creates a block in the inventory
 * @param {*} grid 
 * @param {*} prop 
 * @param {*} row 
 * @param {*} col 
 * @param {*} inventory 
 */
function createInvBlock(grid, prop, row, col, inventory) {
    grid.addControl(new BABYLON.GUI.Image(prop, "images/" + prop + ".png"), row, col);
    var text = new BABYLON.GUI.TextBlock();
    text.text = inventory[prop].toString();
    text.color = "white";
    text.fontSize = 30;
    grid.addControl(text, row, col);
}