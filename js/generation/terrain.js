import { MAT_grass } from "../materials/grass.js";
import { MAT_dirt } from "../materials/dirt.js";
import { MAT_stone } from "../materials/stone.js";

/**
 * Generates random terain whit smplex noise
 */
export function generateTerrain(scene, renderDistance, mapsize, maxheight) {
    var cubeGrass = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeGrass.checkCollisions = true;
    cubeGrass.material = MAT_grass(scene);
    cubeGrass.addLODLevel(renderDistance, null);
    cubeGrass.freezeWorldMatrix();

    var cubeDirt = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeDirt.checkCollisions = true;
    cubeDirt.material = MAT_dirt(scene);
    cubeDirt.addLODLevel(renderDistance, null);
    cubeDirt.freezeWorldMatrix();

    var cubeStone = BABYLON.MeshBuilder.CreateBox("cube", {}, scene);
    cubeStone.checkCollisions = true;
    cubeStone.material = MAT_stone(scene);
    cubeStone.addLODLevel(renderDistance, null);
    cubeStone.freezeWorldMatrix();

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
            var name = "cube#" + x + height + y;
            var cubeInstanceTop = cubeGrass.createInstance(name);
            cubeInstanceTop.position = new BABYLON.Vector3(x, height, y);
            cubeInstanceTop.backFaceCulling = true;

            //the cubes underneath
            //dirt
            for (let h = 0; h < heightGrass; h++) {
                name = "cube#" + x + h + y;
                var cubeInstanceBot = cubeStone.createInstance(name);
                cubeInstanceBot.position = new BABYLON.Vector3(x, h, y);
                cubeInstanceTop.backFaceCulling = true;
            }

            //stone
            for (let h = heightGrass; h < height; h++) {
                name = "cube#" + x + h + y;
                var cubeInstanceBot = cubeDirt.createInstance(name);
                cubeInstanceBot.position = new BABYLON.Vector3(x, h, y);
                cubeInstanceTop.backFaceCulling = true;
            }
        }
    }
}