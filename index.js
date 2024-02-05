const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync, fstat } = require('fs');
const sharp = require('sharp');
var fs = require("fs")
//body color 
//eyes
//skin tone
//eyebrows
//glasses
//hair
//hat
//mothr thing
//accesoeices 1, 2, 

const takenNames = {};
const takenFaces = {};
let idx = 20;

function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}
function randElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomName() {
    const adjectives = 'fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical'.split(' ');
    const names = 'aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis'.split(' ');

    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name = `${randAdj}-${randName}`;


    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}



function combine() {
    const BaseColor = randInt(0)
    const BaseNFT = randInt(0);
    const Shirt = randInt(11);
    const skincolor = randInt(4);
    const a = randInt(3);
    const glass = randInt(10); 
    const hat = randInt(10); 
    //const hair = randInt(0); 
    const beard = randInt(9); 
    const eyes = randInt(8); 
    //const eyeborws = randInt(0); 
    const Mouth = randInt(3)
    

    const BaseColorfile = __dirname + "/pngs/BaseColor0.png"
    const BaseNFTfile = __dirname + "/pngs/BaseNFT0.png"
    const Shirtfile = __dirname + "/pngs/Shirt" + Shirt + ".png"
    const Skincolorfile = __dirname + "/pngs/Skin" + skincolor + ".png"
    const afile = __dirname + "/pngs/Accessory" + a + ".png"
    const glassfile = __dirname + "/pngs/Glasses" + glass + ".png"
    const hatfile = __dirname + "/pngs/Hat" + hat + ".png"
    const beardfile = __dirname + "/pngs/Beard" + beard + ".png"
    //const hairfile = __dirname + "/pngs/Shirt" + hair + ".png"
    const eyesfile = __dirname + "/pngs/Eyes" + eyes + ".png"
    //const eyeborwsfile = __dirname + "/pngs/Skin" + eyeborws + ".png"
    const mouth = __dirname + "/pngs/Mouth" + Mouth + ".png"
    


    var h = [BaseColorfile,BaseNFTfile,mouth, Shirtfile, Skincolorfile,eyesfile,glassfile,hatfile,beardfile, afile]
    var g = []

    for(i = 0; i < h.length; i++) {
        if(fs.existsSync(h[i])) {
            g.push(h[i])
        }
    }

    return g;
}
function createImage(idx) {
    // 18,900 combinations

    const { Canvas, Image } = require("canvas");
    const name = getRandomName()


    var m = require("merge-images")

    m(combine(), {
        Canvas: Canvas,
        Image: Image
    }).then(b64 => {
        b64 = b64.replace("data:image/png;base64,", "")
        fs.writeFileSync(__dirname + "/out/" + idx + ".png", b64, "base64", function(err) {
            console.log(err)
        })
    }) 
    //we need to add rearety of every attribute;
    const meta = {
        name,
        description: `A drawing of ${name.split('-').join(' ')}`,
        image: `${idx}.png`,
        attributes: [
            { 
                
            }
        ]
    }

    writeFileSync(`./out/${idx}.json`, JSON.stringify(meta))
    //svgToPng(idx)



}


// Create dir if not exists
if (!existsSync('./out')) {
    mkdirSync('./out');
}

// Cleanup dir before each run
readdirSync('./out').forEach(f => rmSync(`./out/${f}`));


do {
    createImage(idx);
    idx--;
} while (idx >= 0);
