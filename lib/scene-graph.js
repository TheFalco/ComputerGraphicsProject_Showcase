//
// Node definition
//
var Node = function() {
    this.children = [];
    this.localMatrix = utils.identityMatrix();
    this.worldMatrix = utils.identityMatrix();
};
  
Node.prototype.setParent = function(parent) {
    // remove us from our parent
    if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
        this.parent.children.splice(ndx, 1);
        }
    }
  
    // Add us to our new parent
    if (parent) {
        parent.children.push(this);
    }
    this.parent = parent;
};
  
Node.prototype.updateWorldMatrix = function(matrix) {
    if (matrix) {
        // a matrix was passed in so do the math
        this.worldMatrix = utils.multiplyMatrices(matrix, this.localMatrix);
    } else {
        // no matrix was passed in so just copy.
        utils.copy(this.localMatrix, this.worldMatrix);
    }
  
    // now process all the children
    var worldMatrix = this.worldMatrix;
    this.children.forEach(function(child) {
        child.updateWorldMatrix(worldMatrix);
    });
};

// Compute the scene graph 
function computeSceneGraph() {

    //
    // Define Schene Graph
    //
    roomPositionNode = new Node();

    tablePositionNode = new Node();
    tablePositionNode.localMatrix = utils.MakeTranslateMatrix(-650, -715, -250.0);   // Relative position to room

    shelfPositionNode = new Node();
    shelfPositionNode.localMatrix = utils.MakeTranslateMatrix(100, -75, -800);   // Relative position to room

    pipePositionNode = new Node();
    pipePositionNode.localMatrix = utils.MakeTranslateMatrix(-1415.0, 100, 0.0);   // Relative to room

    ventPositionNode = new Node();
    ventPositionNode.localMatrix = utils.MakeTranslateMatrix(890, -560.0, 550.0);   // Relative to room

    posterPositionNode = new Node();
    posterPositionNode.localMatrix = utils.MakeTranslateMatrix(-910, 90.0, -950.0);   // Relative to room
    
    crateRightPositionNode = new Node();
    crateRightPositionNode.localMatrix = utils.MakeTranslateMatrix(650, -950, -550);   // Relative to room
    
    crateLeftPositionNode = new Node();
    crateLeftPositionNode.localMatrix = utils.MakeTranslateMatrix(300, -950, -550);

    crateTopPositionNode = new Node();
    crateTopPositionNode.localMatrix = utils.MakeTranslateMatrix(470, -690, -550);

    shortPipeOnePositionNode = new Node();
    shortPipeOnePositionNode.localMatrix = utils.MakeTranslateMatrix(0.0, 0.0, 70);
    
    shortPipeTwoPositionNode = new Node();
    shortPipeTwoPositionNode.localMatrix = utils.MakeTranslateMatrix(0.0, 0.0, -70);

    pedestalOnePositionNode = new Node();
    pedestalOnePositionNode.localMatrix = utils.MakeTranslateMatrix(-215.0, 0.0, -25.0);   // Relative position to table

    boatOnePositionNode = new Node();
    boatOnePositionNode.localMatrix = utils.MakeTranslateMatrix(0.0, 65.0, 0.0);        // Floating over pedestal

    pedestalTwoPositionNode = new Node();
    pedestalTwoPositionNode.localMatrix = utils.MakeTranslateMatrix(215.0, 0.0, -25.0);   // Relative position to table

    boatTwoPositionNode = new Node();
    boatTwoPositionNode.localMatrix = utils.MakeTranslateMatrix(0.0, 65.0, 0.0);        // Floating over pedestal

    pedestalThreePositionNode = new Node();
    pedestalThreePositionNode.localMatrix = utils.MakeTranslateMatrix(-245.0, 190.0, -5.0);   // Relative position to table

    boatThreePositionNode = new Node();
    boatThreePositionNode.localMatrix = utils.MakeTranslateMatrix(0.0, 65.0, 0.0);        // Floating over pedestal

    pedestalFourPositionNode = new Node();
    pedestalFourPositionNode.localMatrix = utils.MakeTranslateMatrix(245.0, 190.0, -5.0);   // Relative position to table

    boatFourPositionNode = new Node();
    boatFourPositionNode.localMatrix = utils.MakeTranslateMatrix(0.0, 65.0, 0.0);        // Floating over pedestal

    // The null values in drawInfo will be assigned in runtime.
    roomNode = new Node();
    roomNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(950), utils.MakeRotateXYZMatrix(270, 90, 0))
    roomNode.drawInfo = {
        name:                       'room',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 roomTextureSrc,
        textureRef:                 [],
    }

    tableNode = new Node();
    tableNode.localMatrix = utils.MakeScaleMatrix(5.5);
    tableNode.drawInfo = {
        name:                       'table',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 tableTextureSrc,
        textureRef:                 [],
    }

    shelfNode = new Node();
    shelfNode.localMatrix = utils.MakeScaleMatrix(3);
    shelfNode.drawInfo = {
        name:                       'shelf',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 shelfTextureSrc,
        textureRef:                 [],
    }

    posterNode = new Node();
    posterNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(95), utils.MakeRotateXYZMatrix(90, 0.0, 0.0));
    posterNode.drawInfo = {
        name:                       'poster',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 posterTextureSrc,
        textureRef:                 [],
    }

    ventNode = new Node();
    ventNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(4), utils.MakeRotateXYZMatrix(180, 0, 90));
    ventNode.drawInfo = {
        name:                       'vent',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 ventTextureSrc,
        textureRef:                 [],
    }

    crateRightNode = new Node();
    crateRightNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(275), utils.MakeRotateXYZMatrix(-3, 0, 0));
    crateRightNode.drawInfo = {
        name:                       'crate',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 crateTextureSrc,
        textureRef:                 [],
    }

    crateLeftNode = new Node();
    crateLeftNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(275), utils.MakeRotateXYZMatrix(9, 0, 0));
    crateLeftNode.drawInfo = {
        name:                       'crate',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 crateTextureSrc,
        textureRef:                 [],
    }

    crateTopNode = new Node();
    crateTopNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(275), utils.MakeRotateXYZMatrix(99, 0, 0));
    crateTopNode.drawInfo = {
        name:                       'crate',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 crateTextureSrc,
        textureRef:                 [],
    }

    pipeNode = new Node();
    pipeNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(5), utils.MakeRotateXYZMatrix(0, 90, 90));
    pipeNode.drawInfo = {
        name:                       'pipe',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pipesTextureSrc,
        textureRef:                 [],
    }

    shortPipeOneNode = new Node();
    shortPipeOneNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(5), utils.MakeRotateXYZMatrix(0, 90, 90));
    shortPipeOneNode.drawInfo = {
        name:                       'shortPipe',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pipesTextureSrc,
        textureRef:                 [],
    }
    
    shortPipeTwoNode = new Node();
    shortPipeTwoNode.localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(5), utils.MakeRotateXYZMatrix(0, 90, 90));
    shortPipeTwoNode.drawInfo = {
        name:                       'shortPipe',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pipesTextureSrc,
        textureRef:                 [],
    }

    pedestalOneNode = new Node();
    pedestalOneNode.localMatrix = utils.MakeScaleMatrix(6.5);
    pedestalOneNode.drawInfo = {
        name:                       'pedestal',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pedestalTextureSrc,
        textureRef:                 [],
    }

    boatOneNode = new Node();
    defaultBoatOneLocalMatrix = boatOneNode.localMatrix = utils.MakeScaleMatrix(0.25);
    boatOneNode.drawInfo = {
        name:                       'boatOne',
        programInfo:                programOne,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 boatTextureSrc,
        textureRef:                 [],
    };

    pedestalTwoNode = new Node();
    pedestalTwoNode.localMatrix = utils.MakeScaleMatrix(6.5);
    pedestalTwoNode.drawInfo = {
        name:                       'pedestal',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pedestalTextureSrc,
        textureRef:                 [],
    }

    boatTwoNode = new Node();
    defaultBoatTwoLocalMatrix = boatTwoNode.localMatrix = utils.MakeScaleMatrix(0.25);
    boatTwoNode.drawInfo = {
        name:                       'boatTwo',
        programInfo:                programTwo,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 boatTextureSrc,
        textureRef:                 [],
    };
    
    pedestalThreeNode = new Node();
    pedestalThreeNode.localMatrix = utils.MakeScaleMatrix(6.5);
    pedestalThreeNode.drawInfo = {
        name:                       'pedestal',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pedestalTextureSrc,
        textureRef:                 [],
    }

    boatThreeNode = new Node();
    defaultBoatThreeLocalMatrix = boatThreeNode.localMatrix = utils.MakeScaleMatrix(0.25);
    boatThreeNode.drawInfo = {
        name:                       'boatThree',
        programInfo:                programThree,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 boatTextureSrc,
        textureRef:                 [],
    };
    
    pedestalFourNode = new Node();
    pedestalFourNode.localMatrix = utils.MakeScaleMatrix(6.5);
    pedestalFourNode.drawInfo = {
        name:                       'pedestal',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 pedestalTextureSrc,
        textureRef:                 [],
    }

    boatFourNode = new Node();
    defaultBoatFourLocalMatrix = boatFourNode.localMatrix = utils.MakeScaleMatrix(0.25);
    boatFourNode.drawInfo = {
        name:                       'boatFour',
        programInfo:                programFour,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        eyePositionHandle:          null,
        // Model info
        vertices:                   null,
        normals:                    null,
        texCoord:                   null,
        indices:                    null,
        textureSrc:                 boatTextureSrc,
        textureRef:                 [],
    };

    // Creaing the gererchy
    roomNode.setParent(roomPositionNode);

    // Foreground
    tablePositionNode.setParent(roomPositionNode);
    tableNode.setParent(tablePositionNode);
    // Boat 1
    pedestalOnePositionNode.setParent(tablePositionNode);
    pedestalOneNode.setParent(pedestalOnePositionNode);
    boatOnePositionNode.setParent(pedestalOnePositionNode);
    boatOneNode.setParent(boatOnePositionNode);
    // Boat 2
    pedestalTwoPositionNode.setParent(tablePositionNode);
    pedestalTwoNode.setParent(pedestalTwoPositionNode);
    boatTwoPositionNode.setParent(pedestalTwoPositionNode);
    boatTwoNode.setParent(boatTwoPositionNode);

    // Background
    shelfPositionNode.setParent(roomPositionNode);
    shelfNode.setParent(shelfPositionNode);
    // Boat 3
    pedestalThreePositionNode.setParent(shelfPositionNode);
    pedestalThreeNode.setParent(pedestalThreePositionNode);
    boatThreePositionNode.setParent(pedestalThreePositionNode);
    boatThreeNode.setParent(boatThreePositionNode);
    // Boat 4
    pedestalFourPositionNode.setParent(shelfPositionNode);
    pedestalFourNode.setParent(pedestalFourPositionNode);
    boatFourPositionNode.setParent(pedestalFourPositionNode);
    boatFourNode.setParent(boatFourPositionNode);

    // Scenary
    // Central pipe
    pipePositionNode.setParent(roomPositionNode);
    pipeNode.setParent(pipePositionNode);
    // Side Pipes
    shortPipeOnePositionNode.setParent(pipePositionNode);
    shortPipeOneNode.setParent(shortPipeOnePositionNode);
    shortPipeTwoPositionNode.setParent(pipePositionNode);
    shortPipeTwoNode.setParent(shortPipeTwoPositionNode);
    // Vent
    ventPositionNode.setParent(roomPositionNode);
    ventNode.setParent(ventPositionNode);
    // Crates
    crateRightPositionNode.setParent(roomPositionNode);
    crateRightNode.setParent(crateRightPositionNode);
    crateLeftPositionNode.setParent(roomPositionNode);
    crateLeftNode.setParent(crateLeftPositionNode);
    crateTopPositionNode.setParent(roomPositionNode);
    crateTopNode.setParent(crateTopPositionNode);
    // Poster
    posterPositionNode.setParent(roomPositionNode);
    posterNode.setParent(posterPositionNode);

    objects = [
        roomNode,
        tableNode,
        shelfNode,
        ventNode,
        pipeNode,
        crateRightNode,
        crateLeftNode,
        crateTopNode,
        posterNode,
        shortPipeOneNode,
        shortPipeTwoNode,
        pedestalOneNode,
        boatOneNode,
        pedestalTwoNode,
        boatTwoNode,
        pedestalThreeNode,
        boatThreeNode,
        pedestalFourNode,
        boatFourNode
    ];

    //---------------SceneGraph defined
}