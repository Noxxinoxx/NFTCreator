var potrace = require('potrace'),
    fs = require('fs');
var files = fs.readdirSync(__dirname + "/pngs/")

for(i = 0; i < files.length; i++) {
    var file = files[i].replace(".png", "")
    
    createsvg(files[i], file)

    
}
var parms = {
    blackOnWhite : false
}
function createsvg(files, name) {
    console.log(files)
    potrace.trace(__dirname + "/pngs/" + files, parms,function(err, svg) {
        if (err) throw err;
        fs.writeFileSync(__dirname + '/layers/' + name + '.svg', svg);
    });
}




