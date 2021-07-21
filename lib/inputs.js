// For looking around (both inView and !inView) we assign a speed, that is used in animate()
// to increase/decrese the position of the camera. Doing so we obtain a smooth movement.

function keyFunctionDown(e) {
    // If we are not in viewBoat, we can look around
    if (!inView) {   
        if (!(keys.includes(e.keyCode))) {
            keys.push(e.keyCode);
            switch(e.keyCode) {
                case 65:    // A
                    speedX-= 1;
                    break;
                case 68:    // D
                    speedX+= 1;
                    break;
                case 87:    // W
                    speedY+=1;
                    break;
                case 83:    // S
                    speedY-=1;
                    break;
            }
        }
    }
    // From inView, we can move up and down the camera around the ship
    else if (inView) { 
        if (!(keys.includes(e.keyCode))) {
            keys.push(e.keyCode);
            switch(e.keyCode) {
                case 27:    // Escape
                    // Exit from viewBoat: reset cameraView, target and variables
                    target = [0.0, 0.0, 0.0];
                    cx = defaultCamX;
                    cy = defaultCamY;
                    cz = defaultCamZ;
                    incr = 0.0;
                    inView = false;
                    incrViewY = 0;
                    keys = [];

                    // Change the text of the help-box
                    document.getElementById("legend").style.display = "block";
                    document.getElementById("inViewLegend").style.display = "none";
                    break;
                case 81:    // Q
                    incrViewY+=1;
                    break;
                case 69:    // E
                    incrViewY-=1;
                    break;
            }
        }
    }
}


function keyFunctionUp(e) {
    if (!inView) {
        if (keys.includes(e.keyCode)) {
            for( var i = 0; i < keys.length; i++){
                if ( keys[i] === e.keyCode) { 
                    keys.splice(i, 1); 
                }
            }
            switch (e.keyCode) {
                case 65:    // A
                    speedX += 1;
                    break;
                case 68:    // D
                    speedX -= 1;
                    break;
                case 87:    // W
                    speedY -= 1;
                    break;
                case 83:    // S
                    speedY += 1;
                    break;
            }
        }
    } else if (inView) {
        if (keys.includes(e.keyCode)) {
            for( var i = 0; i < keys.length; i++){
                if ( keys[i] === e.keyCode) { 
                    keys.splice(i, 1); 
                }
            }
            switch (e.keyCode) {
                case 81:    // Q
                    incrViewY -= 1;
                    break;
                case 69:    // E
                    incrViewY += 1;
                    break;
            }
        }
    }
};

function myOnMouseUp(ev){
    if (!inView) {
        //This is a way of calculating the coordinates of the click in the canvas taking into account its possible displacement in the page
        var top = 0.0, left = 0.0;
        canvas = gl.canvas;
        while (canvas && canvas.tagName !== 'BODY') {
            top += canvas.offsetTop;
            left += canvas.offsetLeft;
            canvas = canvas.offsetParent;
        }
        var x = ev.clientX - left;
        var y = ev.clientY - top;
            
        //Here we calculate the normalised device coordinates from the pixel coordinates of the canvas
        var normX = (2*x)/ gl.canvas.width - 1;
        var normY = 1 - (2*y) / gl.canvas.height;

        //We need to go through the transformation pipeline in the inverse order so we invert the matrices
        var projInv = utils.invertMatrix(perspectiveMatrix);
        var viewInv = utils.invertMatrix(viewMatrix);
        
        //Find the point (un)projected on the near plane, from clip space coords to eye coords
        //z = -1 makes it so the point is on the near plane
        //w = 1 is for the homogeneous coordinates in clip space
        var pointEyeCoords = utils.multiplyMatrixVector(projInv, [normX, normY, -1, 1]);

        //This finds the direction of the ray in eye space
        //Formally, to calculate the direction you would do dir = point - eyePos but since we are in eye space eyePos = [0,0,0] 
        //w = 0 is because this is not a point anymore but is considered as a direction
        var rayEyeCoords = [pointEyeCoords[0], pointEyeCoords[1], pointEyeCoords[2], 0];

        
        //We find the direction expressed in world coordinates by multipling with the inverse of the view matrix
        var rayDir = utils.multiplyMatrixVector(viewInv, rayEyeCoords);
        var normalisedRayDir = normaliseVector(rayDir);
        //The ray starts from the camera in world coordinates
        var rayStartPoint = [cx, cy, cz];
        //We iterate on all the objects in the scene to check for collisions
        for(i = 0; i < interactableObjects.length; i++){
            var hit = raySphereIntersection(rayStartPoint, normalisedRayDir, interactableObjects[i][0], 150);
            if(hit){
                viewingBoat = i+1;
                viewBoat(interactableObjects[i]);
            }
        }
    }
}
