// Load the textures
function loadTextures() {
    new Promise((resolve) => {
        // Room
        var roomTextureImage = new Image();
        roomTextureImage.src = baseDir + roomTextureSrc;
        roomTextureImage.onload = function() {
            var roomTexture = gl.createTexture();
            //gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, roomTexture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, roomTextureImage); 
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.generateMipmap(gl.TEXTURE_2D);
            // Add texture to the node
            roomNode.drawInfo.textureRef.push(roomTexture);
            resolve();
        };
    }).then(() => {
        // Boat
        return new Promise((resolve) => {
            var boatTextureImage = new Image();
            boatTextureImage.src = baseDir + boatTextureSrc;
            boatTextureImage.onload = function() {
                var boatTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, boatTexture);
        
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, boatTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);

                // Add texture to the nodes
                boatOneNode.drawInfo.textureRef.push(boatTexture);
                boatTwoNode.drawInfo.textureRef.push(boatTexture);
                boatThreeNode.drawInfo.textureRef.push(boatTexture);
                boatFourNode.drawInfo.textureRef.push(boatTexture);

                resolve();
            };
        });
    }).then(() => {
        // Pedestal
        return new Promise((resolve) => {
            var pedestalTextureImage = new Image();
            pedestalTextureImage.src = baseDir + pedestalTextureSrc;
            pedestalTextureImage.onload = function() {
                var pedestalTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, pedestalTexture);
        
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pedestalTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);

                // Add texture to the nodes
                pedestalOneNode.drawInfo.textureRef.push(pedestalTexture);
                pedestalTwoNode.drawInfo.textureRef.push(pedestalTexture);
                pedestalThreeNode.drawInfo.textureRef.push(pedestalTexture);
                pedestalFourNode.drawInfo.textureRef.push(pedestalTexture);

                resolve();
            };
        });
    }).then(() => {
        // Table
        return new Promise((resolve) => {
            var tableTextureImage = new Image();
            tableTextureImage.src = baseDir + tableTextureSrc;
            tableTextureImage.onload = function() {
                var tableTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, tableTexture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tableTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                // Add texture to the node
                tableNode.drawInfo.textureRef.push(tableTexture);
                resolve();
            };
        });
    }).then(() => {
        // Shelf
        return new Promise((resolve) => {
            var shelfTextureImage = new Image();
            shelfTextureImage.src = baseDir + shelfTextureSrc;
            shelfTextureImage.onload = function() {
                var shelfTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, shelfTexture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, shelfTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                // Add texture to the node
                shelfNode.drawInfo.textureRef.push(shelfTexture);
                resolve();
            };
        });
    }).then(() => {
        // Pipes
        return new Promise((resolve) => {
            var pipesTextureImage = new Image();
            pipesTextureImage.src = baseDir + pipesTextureSrc;
            pipesTextureImage.onload = function() {
                var pipesTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, pipesTexture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pipesTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                // Add texture to the node
                pipeNode.drawInfo.textureRef.push(pipesTexture);
                shortPipeOneNode.drawInfo.textureRef.push(pipesTexture);
                shortPipeTwoNode.drawInfo.textureRef.push(pipesTexture);
                resolve();
            };
        });
    }).then(() => {
        // Vent
        return new Promise((resolve) => {
            var ventTextureImage = new Image();
            ventTextureImage.src = baseDir + ventTextureSrc;
            ventTextureImage.onload = function() {
                var ventTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, ventTexture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ventTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                // Add texture to the node
                ventNode.drawInfo.textureRef.push(ventTexture);
                resolve();
            };
        });
    }).then(() => {
        // Crates
        return new Promise((resolve) => {
            var crateTextureImage = new Image();
            crateTextureImage.src = baseDir + crateTextureSrc;
            crateTextureImage.onload = function() {
                var crateTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, crateTexture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, crateTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                // Add texture to the node
                crateRightNode.drawInfo.textureRef.push(crateTexture);
                crateLeftNode.drawInfo.textureRef.push(crateTexture);
                crateTopNode.drawInfo.textureRef.push(crateTexture);
                resolve();
            };
        });
    }).then(() => {
        // Poster
        return new Promise((resolve) => {
            var posterTextureImage = new Image();
            posterTextureImage.src = baseDir + posterTextureSrc;
            posterTextureImage.onload = function() {
                var posterTexture = gl.createTexture();
                //gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, posterTexture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, posterTextureImage); 
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                // Add texture to the node
                posterNode.drawInfo.textureRef.push(posterTexture);
                resolve();
            };
        });
    }).then(() => {
        gl.bindTexture(gl.TEXTURE_2D, null);
    });
}
