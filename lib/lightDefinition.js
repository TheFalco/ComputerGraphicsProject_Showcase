// Convert decimal to Hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// Convert RGB to Hex
function rgbToHex(color) {
    let r = Math.floor(color[0]*255);
    let g = Math.floor(color[1]*255);
    let b = Math.floor(color[2]*255);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Update the values on the lights object, only for the active boat
function updatePreferences(reference, newValue) {
    lights.forEach(function (light) {
        if (light.boat == activeBoat.boat) {
            light[reference] = newValue
        }
    });
}

// Set which is the active boat
function changeActiveBoat(selection) {
    lights.forEach( function (light) {
        if (light.boat == selection) {
            activeBoat = light;
        }
    });
    updateGUI();
}

// Change displayed blocks for first selection (Type, Ambient, Diffuse, Specular)
function changeLightGeneralSelection(selection) {
    generalSelection.forEach( function(general) {
        if (selection == general) {
            document.getElementById(general).style.display = "block";
        } else {
            document.getElementById(general).style.display = "none";
        }
    });

}

// Change displayed blocked if TYPE is selected
function changeLightType(selection) {
    typeSelection.forEach( function(type) {
        if (selection == type) {
            document.getElementById(type).style.display = "block";
        } else {
            document.getElementById(type).style.display = "none";
        }
    });

    // Update values
    updatePreferences("lightType", selection.substring(4));
}

// Change displayed blocks if AMBIENT is selected
function changeLightAmbient(selection) {
    ambientSelection.forEach( function(ambient) {
        if (selection == ambient) {
            document.getElementById(ambient).style.display = "block";
        } else {
            document.getElementById(ambient).style.display = "none";
        }
    });

    // Update values
    updatePreferences("lightAmbient", selection.substring(7));
}

// Change displayed blocks if DIFFUSE is selected
function changeLightDiffuse(selection) {

    diffuseSelection.forEach( function(diffuse) {
        if (selection == diffuse) {
            document.getElementById(diffuse).style.display = "block";
        } else {
            document.getElementById(diffuse).style.display = "none";
        }
    });

    // Update values
    updatePreferences("lightDiffuse", selection.substring(7));
}

// Change displayed blocked if SPECULAR is selected
function changeLightSpecular(selection) {
    specularSelection.forEach( function(specular) {
        if (selection == specular) {
            document.getElementById(specular).style.display = "block";
        } else {
            document.getElementById(specular).style.display = "none";
        }
    });

    // Update values
    updatePreferences("lightSpecular", selection.substring(8));
}

function changeDropdown(value) {
    // Debug
    //console.log(value);
}

// Save new color
function setColor(color, objectReference) {
    R = parseInt(color.substring(1,3), 16) / 255;
    G = parseInt(color.substring(3,5), 16) / 255;
    B = parseInt(color.substring(5,7), 16) / 255;

    updatePreferences(objectReference, [R, G, B]);
}

// Save new slider's value
function setSlider(value, objectReference) {
    updatePreferences(objectReference, value);
}

// Set all the GUIs parameter to match .json input file
function updateGUI() {
    let value;
    // Cycle all attributes
    for ( var name in (activeBoat)) {
        value = activeBoat[name];
        if (name != "boat") {
            // LightXXX are special case, we jave to consider them separatly
            if (name == "lightType") {
                document.getElementById(name).value = ("type" + value);
                changeLightType("type" + value);
            } else if (name == "lightAmbient") {
                document.getElementById(name).value = ("ambient" + value);
                changeLightAmbient("ambient" + value);
            } else if (name == "lightDiffuse") {
                document.getElementById(name).value = ("diffuse" + value);
                changeLightDiffuse("diffuse" + value);
            } else if (name == "lightSpecular") {
                document.getElementById(name).value = ("specular" + value);
                changeLightSpecular("specular" + value);
            } else if (name.includes("Color")) {
                // Colors needs to be transformed
                document.getElementById(name).value = rgbToHex(value);
            } else if (!name.includes("spotTheta") && !name.includes("spotPhi")){
            // Set all available sliders (spotTheta and spotPhi sliders are not available)
            document.getElementById(name).value = value;
            }
        }
    }
}

// Init function
function initiLight() {
    // Load the .json file
    var request = new XMLHttpRequest();
    request.open("GET",baseDir + "data/lights.json", false);
    request.send(null);
    lights = JSON.parse(request.responseText);

    activeBoat = lights[0];

    // Match the GUI to the loaded file
    updateGUI();  

    // Reset boat dropdown
    document.getElementById("lightBoat").value = "boatOne"; 
}
