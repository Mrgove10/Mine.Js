import { MAT_grass } from "../materials/grass.js";
import { MAT_dirt } from "../materials/dirt.js";
import { MAT_stone } from "../materials/stone.js";
import { MAT_iron } from "../materials/iron.js";
import { MAT_diamond } from "../materials/diamond.js";

import { createTree } from "./tree.js";

/**
 * Generates random terain whit simplex noise
 */
export function generateTerrain(scene, renderDistance, mapsize, maxheight) {
    //Grass
    var cubeGrass = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeGrass.checkCollisions = true;
    cubeGrass.material = MAT_grass(scene);
    cubeGrass.addLODLevel(renderDistance, null);
    cubeGrass.freezeWorldMatrix();

    //Dirt
    var cubeDirt = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeDirt.checkCollisions = true;
    cubeDirt.material = MAT_dirt(scene);
    cubeDirt.addLODLevel(renderDistance, null);
    cubeDirt.freezeWorldMatrix();

    //Stone
    var cubeStone = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeStone.checkCollisions = true;
    cubeStone.material = MAT_stone(scene);
    cubeStone.addLODLevel(renderDistance, null);
    cubeStone.freezeWorldMatrix();

    //Diamond
    var cubeDiamond = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeDiamond.checkCollisions = true;
    cubeDiamond.material = MAT_diamond(scene);
    cubeDiamond.addLODLevel(renderDistance, null);
    cubeDiamond.freezeWorldMatrix();

    //Iron
    var cubeIron = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeIron.checkCollisions = true;
    cubeIron.material = MAT_iron(scene);
    cubeIron.addLODLevel(renderDistance, null);
    cubeIron.freezeWorldMatrix();

    var data = [];
    var simplex = new SimplexNoise();
    for (let x = 0; x < mapsize; x++) {
        data[x] = [];
        for (let y = 0; y < mapsize; y++) {
            data[x][y] = (simplex.noise2D(x / 16, y / 16) * 0.5 + 0.5) * 10 + maxheight;
        }
    }

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {

            //top cubes
            var height = Math.ceil(data[x][y]);
            var heightGrass = height - 5;
            var name = "grass #" + x + "-" + height + "-" + y;
            var cubeInstanceTop = cubeGrass.createInstance(name);
            cubeInstanceTop.position = new BABYLON.Vector3(x, height, y);
            cubeInstanceTop.freezeWorldMatrix();
            cubeInstanceTop.checkCollisions = true;
            cubeInstanceTop.backFaceCulling = true;

            var tree = Math.random()
            if (tree > 0.985) {
                createTree(scene, renderDistance, x, height + 1, y)
            }

            //the cubes underneath
            //stone
            for (let h = 1; h < heightGrass; h++) {
                var diamond = Math.random()
                var iron = Math.random()

                if (iron > 0.98) {
                    name = "diamond #" + x + "-" + h + "-" + y;
                    var cubeInstanceBot = cubeIron.createInstance(name);
                }
                else if (diamond > 0.998) {
                    name = "iron #" + x + "-" + h + "-" + y;
                    var cubeInstanceBot = cubeDiamond.createInstance(name);
                }
                else {
                    name = "stone #" + x + "-" + h + "-" + y;
                    var cubeInstanceBot = cubeStone.createInstance(name);
                }
                cubeInstanceBot.position = new BABYLON.Vector3(x, h, y);
                cubeInstanceBot.backFaceCulling = true;
                cubeInstanceBot.freezeWorldMatrix();
                cubeInstanceBot.checkCollisions = true;
            }

            //dirt
            for (let h = heightGrass; h < height; h++) {
                name = "dirt #" + x + "-" + h + "-" + y;
                var cubeInstanceBot = cubeDirt.createInstance(name);
                cubeInstanceBot.position = new BABYLON.Vector3(x, h, y);
                cubeInstanceBot.freezeWorldMatrix();
                cubeInstanceBot.checkCollisions = true;
                cubeInstanceBot.backFaceCulling = true;
            }
        }
    }
}