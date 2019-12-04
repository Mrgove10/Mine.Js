import { inventory } from '../player/inventory.js';

/**
 * shows the inventory
 * @param {*} advancedTexture 
 * @param {*} inventory 
 */
export function toggleInventoryUI(advancedTexture) {
    //https://doc.babylonjs.com/how_to/gui
    var grid = new BABYLON.GUI.Grid();

    grid.height = 0.1;
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addRowDefinition(1);

    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.background = "gray";
    advancedTexture.addControl(grid);
    var row = 0;
    var col = 0;
    for (var prop in inventory) {
        createInvBlock(grid, prop, row, col, inventory);
        col++;
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
export function createInvBlock(grid, prop, row, col, inventory) {
    grid.addControl(new BABYLON.GUI.Image(prop, "images/" + prop + ".png"), row, col);
    var text = new BABYLON.GUI.TextBlock();
    text.text = inventory[prop].toString();
    text.color = "white";
    text.fontSize = 30;
    grid.addControl(text, row, col);
}