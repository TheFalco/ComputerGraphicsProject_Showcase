// Convert string variables to float values
function typeToFloat(type) {
    if (type == "direct" || type == "ambient" || type == "lambert" || type == "phong") {
        return 0.0;
    } else if (type == "point" || type == "hemispheric" || type == "toon" || type == "blinn") {
        return 1.0;
    } else if (type == "spot" || type == "toonPhong") {
        return 2.0;
    } else if (type == "toonBlinn") {
        return 3.0;
    } else {
        // Default case = none
        return 9.0;
    }
}

// Save the location of shader's uniforms
function linkShaders(idx, boat) {
    boatLightLocation[idx].lightType = gl.getUniformLocation(boat.drawInfo.programInfo, 'lightType');
    boatLightLocation[idx].lightAmbient = gl.getUniformLocation(boat.drawInfo.programInfo, 'lightAmbient');
    boatLightLocation[idx].lightDiffuse = gl.getUniformLocation(boat.drawInfo.programInfo, 'lightDiffuse');
    boatLightLocation[idx].lightSpecular = gl.getUniformLocation(boat.drawInfo.programInfo, 'lightSpecular');

    boatLightLocation[idx].directColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'directColor');
    boatLightLocation[idx].pointColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'pointColor');
    boatLightLocation[idx].spotColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotColor');
    boatLightLocation[idx].ambientColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'ambientColor');
    boatLightLocation[idx].ambientLowerColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'ambientLowerColor');
    boatLightLocation[idx].ambientUpperColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'ambientUpperColor');
    boatLightLocation[idx].lambertColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'lambertColor');
    boatLightLocation[idx].toonColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonColor');
    boatLightLocation[idx].phongColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'phongColor');
    boatLightLocation[idx].blinnColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'blinnColor');
    boatLightLocation[idx].toonPColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonPColor');
    boatLightLocation[idx].toonBColor = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonBColor');

    boatLightLocation[idx].directDir = gl.getUniformLocation(boat.drawInfo.programInfo, 'directDir');
    boatLightLocation[idx].pointPos = gl.getUniformLocation(boat.drawInfo.programInfo, 'pointPos');
    boatLightLocation[idx].pointDecay = gl.getUniformLocation(boat.drawInfo.programInfo, 'pointDecay');
    boatLightLocation[idx].pointTargetG = gl.getUniformLocation(boat.drawInfo.programInfo, 'pointTargetG');
    boatLightLocation[idx].spotPosY = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotPosY');
    boatLightLocation[idx].spotDecay = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotDecay');
    boatLightLocation[idx].spotTargetG = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotTargetG');
    boatLightLocation[idx].spotDir = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotDir');
    boatLightLocation[idx].spotConeIn = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotConeIn');
    boatLightLocation[idx].spotConeOut = gl.getUniformLocation(boat.drawInfo.programInfo, 'spotConeOut');
    boatLightLocation[idx].hemisphericDir = gl.getUniformLocation(boat.drawInfo.programInfo, 'hemisphericDir');
    boatLightLocation[idx].lambertTexture = gl.getUniformLocation(boat.drawInfo.programInfo, 'lambertTexture');
    boatLightLocation[idx].toonTexture = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonTexture');
    boatLightLocation[idx].toonThr = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonThr');
    boatLightLocation[idx].phongShiny = gl.getUniformLocation(boat.drawInfo.programInfo, 'phongShiny');
    boatLightLocation[idx].blinnShiny = gl.getUniformLocation(boat.drawInfo.programInfo, 'blinnShiny');
    boatLightLocation[idx].toonPThr = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonPThr');
    boatLightLocation[idx].toonBThr = gl.getUniformLocation(boat.drawInfo.programInfo, 'toonBThr');
}

// Extend color to vec4
function extendColor(color) {
    let out = new Float32Array([color[0], color[1], color[2], 1.0]); 
    return out;
}

// Assign the value to the uniform
function assignShaders(idx, prog) {

    gl.useProgram(prog);
 
    // Helper Variables
    gl.uniform1f(boatLightLocation[idx].lightType, typeToFloat(lights[idx].lightType));
    gl.uniform1f(boatLightLocation[idx].lightAmbient, typeToFloat(lights[idx].lightAmbient));
    gl.uniform1f(boatLightLocation[idx].lightDiffuse, typeToFloat(lights[idx].lightDiffuse));
    gl.uniform1f(boatLightLocation[idx].lightSpecular, typeToFloat(lights[idx].lightSpecular));
    
    // Colors
    gl.uniform4fv(boatLightLocation[idx].directColor, extendColor(lights[idx].directColor));
    gl.uniform4fv(boatLightLocation[idx].pointColor, extendColor(lights[idx].pointColor));
    gl.uniform4fv(boatLightLocation[idx].spotColor, extendColor(lights[idx].spotColor));
    gl.uniform4fv(boatLightLocation[idx].ambientColor, extendColor(lights[idx].ambientColor));
    gl.uniform4fv(boatLightLocation[idx].ambientLowerColor, extendColor(lights[idx].ambientLowerColor));
    gl.uniform4fv(boatLightLocation[idx].ambientUpperColor, extendColor(lights[idx].ambientUpperColor));
    gl.uniform4fv(boatLightLocation[idx].lambertColor, extendColor(lights[idx].lambertColor));
    gl.uniform4fv(boatLightLocation[idx].toonColor, extendColor(lights[idx].toonColor));
    gl.uniform4fv(boatLightLocation[idx].phongColor, extendColor(lights[idx].phongColor));
    gl.uniform4fv(boatLightLocation[idx].blinnColor, extendColor(lights[idx].blinnColor));
    gl.uniform4fv(boatLightLocation[idx].toonPColor, extendColor(lights[idx].toonPColor));
    gl.uniform4fv(boatLightLocation[idx].toonBColor, extendColor(lights[idx].toonBColor));

    // Other variables
    let dir = [Math.sin(utils.degToRad(lights[idx].directTheta))*Math.sin(utils.degToRad(lights[idx].directPhi)),
    Math.cos(utils.degToRad(lights[idx].directTheta)),
    Math.sin(utils.degToRad(lights[idx].directTheta))*Math.cos(utils.degToRad(lights[idx].directPhi))];
    gl.uniform3fv(boatLightLocation[idx].directDir,dir);

    gl.uniform3f(boatLightLocation[idx].pointPos, lights[idx].pointPosX*100, lights[idx].pointPosY*100, lights[idx].pointPosZ*100);
    gl.uniform1f(boatLightLocation[idx].pointDecay, lights[idx].pointDecay);
    gl.uniform1f(boatLightLocation[idx].pointTargetG, lights[idx].pointTargetG*400);
    gl.uniform1f(boatLightLocation[idx].spotPosY, lights[idx].spotPosY);
    gl.uniform1f(boatLightLocation[idx].spotDecay, lights[idx].spotDecay);
    gl.uniform1f(boatLightLocation[idx].spotTargetG, lights[idx].spotTargetG);

    dir = [Math.sin(utils.degToRad(lights[idx].spotTheta))*Math.sin(utils.degToRad(lights[idx].spotPhi)),
    Math.cos(utils.degToRad(lights[idx].spotTheta)),
    Math.sin(utils.degToRad(lights[idx].spotTheta))*Math.cos(utils.degToRad(lights[idx].spotPhi))];
    gl.uniform3fv(boatLightLocation[idx].spotDir, dir);

    gl.uniform1f(boatLightLocation[idx].spotConeIn, lights[idx].spotConeIn);
    gl.uniform1f(boatLightLocation[idx].spotConeOut, lights[idx].spotConeOut);

    gl.uniform3f(boatLightLocation[idx].hemisphericDir,
        Math.sin(utils.degToRad(lights[idx].hemisphericTheta))*Math.sin(utils.degToRad(lights[idx].hemisphericPhi)),
        Math.cos(utils.degToRad(lights[idx].hemisphericTheta)),
        Math.sin(utils.degToRad(lights[idx].hemisphericTheta))*Math.cos(utils.degToRad(lights[idx].hemisphericPhi)));
        
    gl.uniform1f(boatLightLocation[idx].lambertTexture, lights[idx].lambertTexture/100);
    gl.uniform1f(boatLightLocation[idx].toonTexture, lights[idx].toonTexture/100);
    gl.uniform1f(boatLightLocation[idx].toonThr, lights[idx].toonThr);
    gl.uniform1f(boatLightLocation[idx].phongShiny, lights[idx].phongShiny);
    gl.uniform1f(boatLightLocation[idx].blinnShiny, lights[idx].blinnShiny);
    gl.uniform1f(boatLightLocation[idx].toonPThr, lights[idx].toonPThr);
    gl.uniform1f(boatLightLocation[idx].toonBThr, lights[idx].toonBThr);
}

// Download lights as .json file
function DownloadLights() {
    var data = "text/json; charset=utf-8," + encodeURIComponent(JSON.stringify(lights));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'lights.json';
    a.innerHTML = ': download JSON';

    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
}

// Load lights as .json file
function loadFile() {
    var input, file, fr;
    if (typeof window.FileReader!== 'function') {
        return;
    }
    input = document.getElementById('fileinput');
    if (!input.files[0]) {
        alert("Plese select a file before clicking 'Load'");
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }
}

// Save loaded lights, reset active boat and match GUI to datum
function receivedText(e) {
    let lines = e.target.result;
    lights = JSON.parse(lines);
    changeActiveBoat('boatOne');
    updateGUI();
    
    // Reset boat dropdown
    document.getElementById("lightBoat").value = "boatOne";
}