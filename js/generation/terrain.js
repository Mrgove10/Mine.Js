import { MAT_grass } from "../materials/grass.js";
import { MAT_dirt } from "../materials/dirt.js";

/**
 * Generates random terain whit smplex noise
 */
export function generateTerrain(scene,renderDistance,mapsize) {
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

    var data = [];
    var simplex = new SimplexNoise();
    for (let x = 0; x < mapsize; x++) {
        data[x] = [];
        for (let y = 0; y < mapsize; y++) {
            data[x][y] = (simplex.noise2D(x / 16, y / 16) * 0.5 + 0.5) * 10;
        }
    }

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {

            var height = Math.ceil(data[x][y]);
            var name = "cube#" + x + height + y;
            //top cube
            var cubeInstanceTop = cubeGrass.createInstance(name);
            cubeInstanceTop.position = new BABYLON.Vector3(x, height, y);
            cubeInstanceTop.backFaceCulling = true;

            //te cubes underneath
            for (let h = 0; h < height; h++) {
                name = "cube#" + x + h + y;
                var cubeInstanceBot = cubeDirt.createInstance(name);
                cubeInstanceBot.position = new BABYLON.Vector3(x, h, y);
                cubeInstanceTop.backFaceCulling = true;
            }
        }
    }
}