function computeModelData(object) {
    object.drawInfo.vertices = models[object.drawInfo.name].vertices;
    object.drawInfo.indices = models[object.drawInfo.name].indices;
    object.drawInfo.normals = models[object.drawInfo.name].vertexNormals;
    object.drawInfo.texCoord = models[object.drawInfo.name].textures;
}

function createBuffers(object) {
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Vertices
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(object.drawInfo.positionAttributeLocation);
    gl.vertexAttribPointer(object.drawInfo.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // Normlas
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.normals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(object.drawInfo.normalAttributeLocation);
    gl.vertexAttribPointer(object.drawInfo.normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // Textures Coord
    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.texCoord), gl.STATIC_DRAW);
    gl.vertexAttribPointer(object.drawInfo.uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(object.drawInfo.uvLocation);
    
    // Indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.drawInfo.indices), gl.STATIC_DRAW); 
    return vao;
}

var main = function() {

    // Global Spot light  (for Room and scenary)
    var positionLight = [-100.0, 900.0, -100.0];
    var pointLightColor = [1.0, 1.0, 0.98];
    
    // Create scene graph
    computeSceneGraph();

    // Add event Listerners
    window.addEventListener('keyup', keyFunctionUp, false);
    window.addEventListener('keydown', keyFunctionDown, false);
    window.addEventListener("mouseup", myOnMouseUp);

    // Save loactions
    objects.forEach(function (object) {
        gl.useProgram(object.drawInfo.programInfo);
        object.drawInfo.eyePositionHandle = gl.getUniformLocation(object.drawInfo.programInfo, 'eyePosition');
        object.drawInfo.positionAttributeLocation = gl.getAttribLocation(object.drawInfo.programInfo, "inPosition");  
        object.drawInfo.normalAttributeLocation = gl.getAttribLocation(object.drawInfo.programInfo, "inNormal"); 
        object.drawInfo.uvLocation = gl.getAttribLocation(object.drawInfo.programInfo, "a_uv");
        object.drawInfo.matrixLocation = gl.getUniformLocation(object.drawInfo.programInfo, "matrix");
        object.drawInfo.textLocation = gl.getUniformLocation(object.drawInfo.programInfo, "sampler");
        object.drawInfo.normalMatrixPositionHandle = gl.getUniformLocation(object.drawInfo.programInfo, 'nMatrix');
        object.drawInfo.vertexMatrixPositionHandle = gl.getUniformLocation(object.drawInfo.programInfo, 'pMatrix');
    });
   
    // Load models details
    objects.forEach(function(object) {

        computeModelData(object);
    });
    
    //
    // Create buffers
    //
    objects.forEach(function (object) {

        object.drawInfo.vertexArray = createBuffers(object);

        // End binding sequence
        gl.bindVertexArray(null);
    });

    //
    //  Save lights Locations
    //
    objects.forEach(function (object) {
        gl.useProgram(object.drawInfo.programInfo);
        if (object.drawInfo.name.includes("boat")) {
            // Shaders for boats
            linkShaders(boatIdx, object);
            if (boatIdx < 3) {
                boatIdx++;
            } else {
                boatIdx = 0;
            }
        } else {
            // Shaders for direct light for room and scenary
            materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
            lightPositionHandle = gl.getUniformLocation(program, 'lightPosition');
            lightColorHandle = gl.getUniformLocation(program, 'lightColor');
        }
    });
    //
    // Load and Bind textures
    //
    loadTextures();

    //
    // Main render loop
    //
    requestAnimationFrame(drawScene);


    // Initialization debug variables, buffers, etc.
    var numIdx = initSphere();
    var sphereWorldMatrix = [
        utils.MakeWorld( -865.0, -650, -275.5, 0.0, 0.0, 0.0, 1.0),
        utils.MakeWorld(-435.0, -650, -275.5, 0.0, 0.0, 0.0, 1.0),
        utils.MakeWorld(-145.0, 170, -805.5, 0.0, 0.0, 0.0, 1.0),
        utils.MakeWorld(345.0, 170, -805.5, 0.0, 0.0, 0.0, 1.0)
    ]
    for (i = 0; i < sphereWorldMatrix.length; i++) {
        debugPositionAttributeLocation[i] = gl.getAttribLocation(program, "inPosition"); 
        debugMatrixLocation[i]  = gl.getUniformLocation(program, "matrix");
        // Vaos
        debugVao[i] = gl.createVertexArray();
        gl.bindVertexArray(debugVao[i]);
        debugPositionBuffer[i]= gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, debugPositionBuffer[i]);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(debugPositionAttributeLocation[i]);
        gl.vertexAttribPointer(debugPositionAttributeLocation[i], 3, gl.FLOAT, false, 0, 0);

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW); 
    }
    ////-----------------------------------------------


    function animate() {
        if (deltaT == 360) {
            deltaT = 0;
        }
        
        // Floating boat animation
        boatOneNode.localMatrix = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
            utils.MakeTranslateMatrix(0.0, Math.cos(utils.degToRad(deltaT))/2, 0.0), 
            utils.MakeRotateYMatrix(0.35)),
            boatOneNode.localMatrix),
            utils.MakeTranslateMatrix(0.0,-Math.cos(utils.degToRad(deltaT))/2, 0.0));

        boatTwoNode.localMatrix = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
            utils.MakeTranslateMatrix(0.0, Math.cos(utils.degToRad(deltaT))/2, 0.0), 
            utils.MakeRotateYMatrix(0.35)),
            boatTwoNode.localMatrix),
            utils.MakeTranslateMatrix(0.0,-Math.cos(utils.degToRad(deltaT))/2, 0.0));
                    
        boatThreeNode.localMatrix = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
            utils.MakeTranslateMatrix(0.0, Math.cos(utils.degToRad(deltaT))/2, 0.0), 
            utils.MakeRotateYMatrix(0.35)),
            boatThreeNode.localMatrix),
            utils.MakeTranslateMatrix(0.0,-Math.cos(utils.degToRad(deltaT))/2, 0.0));
                    
        boatFourNode.localMatrix = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(
            utils.MakeTranslateMatrix(0.0, Math.cos(utils.degToRad(deltaT))/2, 0.0), 
            utils.MakeRotateYMatrix(0.35)),
            boatFourNode.localMatrix),
            utils.MakeTranslateMatrix(0.0,-Math.cos(utils.degToRad(deltaT))/2, 0.0));
        deltaT++;
        
        // Increment the coordinates to pan the camera to the desired location
        if (inView && incr < deltaZoom) {
            // Reset moving variables
            speedX = 0.0;
            speedY = 0.0;
            keys = [];

            // Move camera and target
            cx += incrCamX;
            cy += incrCamY;
            cz += incrCamZ;
            target[0] += incrTargetX;
            target[1] += incrTargetY;
            target[2] += incrTargetZ;
            incr++;
        } else {
            // Look around animation while !inView
            if ((target[1] + speedY * 2.5 <= 85) && (target[1] + speedY * 2.5 >= -305)) {
                target[1] += speedY*2.5;
            }
            if ((target[0] + speedX * 2.5 >= -280) && (target[0] + speedX*2.5 <= 330)) {
                target[0] += speedX*2.5;
            }
        } 
        // Look around animation while inView
        if (inView && incrViewY != 0) {
            if (viewingBoat <=2) {
                if (cy + incrViewY*2.5 >= -670 && cy+incrViewY*2.5 <=-360) {
                    cy+= incrViewY*2.5;
                }
            } else {
                if (cy+incrViewY*2.5 >= 190 && cy+incrViewY*2.5 <= 510) {
                    cy+= incrViewY*2.5;
                }
            }

            
        }
        // Boring spinning animation (just spinning, no floating)
        //boatOneNode.localMatrix = utils.multiplyMatrices(utils.MakeRotateYMatrix(0.35), boatOneNode.localMatrix);
    }

    function drawScene() {
        // Clear
        gl.clearColor(0.85, 0.85, 0.85, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        boatIdx = 0;
        
        // Compute the perspective matrix
        var aspect = gl.canvas.width / gl.canvas.height;
        perspectiveMatrix = utils.MakePerspective(60.0, aspect, 1, 5000.0);
        
        // Compute the camera matrix using look at function.
        var cameraPosition = [cx, cy, cz];
        var up = [0.0, 1.0, 0.0];
        var cameraMatrix = utils.LookAt(cameraPosition, target, up);
        viewMatrix = utils.invertMatrix(cameraMatrix);
        
        // Performe animations
        animate();

        // Update all world matrices in the scene graph
        roomPositionNode.updateWorldMatrix();
    
        // Save interactable objects positions [x, y, z, r]
        var count = 0;
        objects.forEach(function(object){ 
            if (object.drawInfo.name.includes('boat')) {
                interactableObjects[count] = [[object.worldMatrix[3], object.worldMatrix[7], object.worldMatrix[11]], 500];
                count++;
            }
        });

        // Compute all the matrices for rendering
        objects.forEach(function(object) {
        
            gl.useProgram(object.drawInfo.programInfo);
            
            var eyePos = [cx, cy, cz];
            
            var projMatrix = utils.multiplyMatrices(viewMatrix, object.worldMatrix);
            projMatrix = utils.multiplyMatrices(perspectiveMatrix, projMatrix);
            var normalMatrix = utils.invertMatrix(utils.transposeMatrix(object.worldMatrix));
            gl.uniformMatrix4fv(object.drawInfo.matrixLocation, gl.FALSE, utils.transposeMatrix(projMatrix));
            gl.uniformMatrix4fv(object.drawInfo.normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
            gl.uniformMatrix4fv(object.drawInfo.vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(object.worldMatrix));
            gl.uniform3fv(object.drawInfo.eyePositionHandle, eyePos);

            if (object.drawInfo.name.includes("boat")) {
                // Shaders for boats
                assignShaders(boatIdx, object.drawInfo.programInfo);
                if (boatIdx < 3) {
                    boatIdx++;
                } else {
                    boatIdx = 0;
                }
            } else {
                // Shaders for point light for room and scenary
                gl.uniform3fv(materialDiffColorHandle, [1.0, 1.0, 1.0]);
                gl.uniform3fv(lightColorHandle,  pointLightColor);
                gl.uniform3fv(lightPositionHandle,  positionLight);
            }


            // Render the Texture
            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, object.drawInfo.textureRef[0]);
            gl.uniform1i(object.drawInfo.textLocation, 0);
            //------------------------------

            gl.bindVertexArray(object.drawInfo.vertexArray);

            gl.drawElements(gl.TRIANGLES, object.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0 );
        
        });


        // Debug: Show the raycast hit-boxes
        if (debug) {
            for (i = 0; i < sphereWorldMatrix.length; i++) {
                gl.disable(gl.CULL_FACE);
                gl.useProgram(program);
                var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, sphereWorldMatrix[i]);
                var projectionNNMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
                gl.uniformMatrix4fv(debugMatrixLocation[i], gl.FALSE, utils.transposeMatrix(projectionNNMatrix));
                gl.bindVertexArray(debugVao[i]);
                gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0 );
                gl.enable(gl.CULL_FACE);
            }
        }
        //------------------------------------

        window.requestAnimationFrame(drawScene);
    }

    window.requestAnimationFrame(drawScene);

}

var init = async function() {

    var path = window.location.pathname;
    var page = path.split("/").pop();
    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir+"shaders/"; 

    // Init canvas and gl
    canvas = document.getElementById("canvas");
    gl = canvas.getContext('webgl2');
    
    if(!gl) {
        alert('Your browser does not support WebGL 2.0');
    }

    //
    // General setup
    //
    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    //
    // Create shaders & program
    //
    // Program for room and scenary
    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
    var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

    program = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    // Program for boat 1
    await utils.loadFiles([shaderDir + 'Boat1/vs.glsl', shaderDir + 'Boat1/fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
    programOne = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    // Program for boat 2
    await utils.loadFiles([shaderDir + 'Boat2/vs.glsl', shaderDir + 'Boat2/fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
    programTwo = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    // Program for boat 3
    await utils.loadFiles([shaderDir + 'Boat3/vs.glsl', shaderDir + 'Boat3/fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
    programThree = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    // Program for boat 4
    await utils.loadFiles([shaderDir + 'Boat4/vs.glsl', shaderDir + 'Boat4/fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
    programFour = utils.createProgram(gl, vertexShader, fragmentShader);
    });    
      
    //
    // Load models
    //
    var roomModelSerialized = await utils.get_objstr(roomModelSrc);
    roomModel = new OBJ.Mesh(roomModelSerialized);

    var pedestalModelSerialized = await utils.get_objstr(pedestalModelSrc);
    pedestalModel = new OBJ.Mesh(pedestalModelSerialized);
    
    var tableModelSerialized = await utils.get_objstr(tableModelSrc);
    tableModel = new OBJ.Mesh(tableModelSerialized);
    
    var posterModelSerialized = await utils.get_objstr(posterModelSrc);
    posterModel = new OBJ.Mesh(posterModelSerialized);

    var ventModelSerialized = await utils.get_objstr(ventModelSrc);
    ventModel = new OBJ.Mesh(ventModelSerialized);
    
    var crateModelSerialized = await utils.get_objstr(crateModelSrc);
    crateModel = new OBJ.Mesh(crateModelSerialized);

    var pipeModelSerialized = await utils.get_objstr(pipeModelSrc);
    pipeModel = new OBJ.Mesh(pipeModelSerialized);
    
    var shortPipeModelSerialized = await utils.get_objstr(shortPipeModelSrc);
    shortPipeModel = new OBJ.Mesh(shortPipeModelSerialized);
    
    var shelfModelSerialized = await utils.get_objstr(shelfModelSrc);
    shelfModel = new OBJ.Mesh(shelfModelSerialized);
    
    var boatModelSerialized = await utils.get_objstr(boatModelSrc);
    boatModel = new OBJ.Mesh(boatModelSerialized);
    
    // Add loaded models to help variable
    models["room"] = roomModel;
    models["table"] = tableModel;
    models["poster"] = posterModel;
    models["vent"] = ventModel;
    models["crate"] = crateModel;
    models["pipe"] = pipeModel;
    models["shortPipe"] = shortPipeModel;
    models["shelf"] = shelfModel;
    models["pedestal"] = pedestalModel;
    models["boatOne"] = models["boatTwo"] = models["boatThree"] = models["boatFour"] = boatModel;

    // Initialize lights
    initiLight();

    main();
}

window.onload = init;