// Normalize the vector
function normaliseVector(vec){
    var magnitude = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
    var normVec = [vec[0]/magnitude, vec[1]/magnitude, vec[2]/magnitude];
    return normVec;
}


//This algorithm is taken from the book Real Time Rendering fourth edition
function raySphereIntersection(rayStartPoint, rayNormalisedDir, sphereCentre, sphereRadius){
    //Distance between sphere origin and origin of ray
    var l = [sphereCentre[0] - rayStartPoint[0], sphereCentre[1] - rayStartPoint[1], sphereCentre[2] - rayStartPoint[2]];
    var l_squared = l[0] * l[0] + l[1] * l[1] + l[2] * l[2];
    //If this is true, the ray origin is inside the sphere so it collides with the sphere
    if(l_squared < (sphereRadius*sphereRadius)){
        return true;
    }
    //Projection of l onto the ray direction 
    var s = l[0] * rayNormalisedDir[0] + l[1] * rayNormalisedDir[1] + l[2] * rayNormalisedDir[2];
    //The spere is behind the ray origin so no intersection
    if(s < 0){
        return false;
    }
    //Squared distance from sphere centre and projection s with Pythagorean theorem
    var m_squared = l_squared - (s*s);
    //If this is true the ray will miss the sphere
    if(m_squared > (sphereRadius*sphereRadius)){
        return false;
    }
    //Now we can say that the ray will hit the sphere 
    return true;
    
}

// Calculate the desired increment to pan the camera to the boat
function calculateIncrement(myDefault, desired) {
    return (desired - myDefault) / deltaZoom;
}

// Calculate the increment to apply to camera and target to allow a smoth transition to the boat
function viewBoat(boat) {
    inView = true;
    // Reset variables
    speedY = 0;
    speedX = 0;
    document.getElementById("legend").style.display = "none";
    document.getElementById("inViewLegend").style.display = "block";

    incrCamX = calculateIncrement(cx, boat[0][0]);
    incrTargetX = calculateIncrement(target[0], boat[0][0]);
    if (boat[0][1] < 0) { 
        incrCamY = calculateIncrement(cy, (-634 + 50));
        incrTargetY = calculateIncrement(target[1], (-630 + 30));
    } else {
        incrCamY = calculateIncrement(cy, (180 + 50));
        incrTargetY = calculateIncrement(target[1], (180 + 40));
    }
    
    incrCamZ = calculateIncrement(cz, (boat[0][2] + 300));
    incrTargetZ = calculateIncrement( target[2], (boat[0][2] + 25));
}

// Turn On/Off raycast hitboxes
function ChangeDebugSetting() {
    debug = !debug;
}
