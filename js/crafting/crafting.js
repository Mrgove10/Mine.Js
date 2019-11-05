export var possibleCrafts = [];
export var craftables = [
    {
        name: "stick",
        needs: {
            wood: 2,
        },
        returns: 4,
        possible: false
    },
    {
        name: "woodenPickaxe",
        needs: {
            wood: 3,
            stick: 2,
        },
        returns: 1,
        possible: false
    }
]

export function getCraftables(inventory) {
        possibleCrafts = []; //resets the posssible crafts
    craftables.forEach(element => {
        var craftFactor = 0
        //#region verification of sufficiant resources
        if (inventory.wood >= element.needs.wood) {
            craftFactor++;
        }
        if (inventory.stick >= element.needs.stick) {
            craftFactor++;
        }
        if (inventory.stone >= element.needs.stone) {
            craftFactor++;
        }
        //#endregion
        if (craftFactor == Object.keys(element.needs).length) {
            element.possible = true;
            possibleCrafts.push(element.name);
        }
        else {
            element.possible = false;
        }
    });
    return possibleCrafts;
}

export function craft(inventory, objToCraft) {
    console.log("wants to craft " + objToCraft);
    var verification = getCraftables(inventory);
    if (verification.includes(objToCraft)) {
        console.log("can craft " + objToCraft);
        var objreturn = craftables.find(x => x.name === objToCraft);
        inventory.objToCraft += objreturn.returns; //need to add the correct number here
    }
}