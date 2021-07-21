// Contains all the global variables.

// Program
var gl;
var baseDir;
var shaderDir;
var program;
var programOne;
var programTwo;
var programThree;
var programFour;

// Camera
var cx = 0.0;
var cy = 400.0;
var cz = 1000.0;
var defaultCamX = 0.0;
var defaultCamY = 400.0;
var defaultCamZ = 1000.0;
var target = [0.0, 0.0, 0.0];
var keys = [];

// Camera Movement
var deltaT = 0;
var inView = false;
var deltaZoom = 50;
var incrCamX, incrCamY, incrCamZ;
var incrTargetX, incrTargetY, incrTargetZ;
var speedX = 0.0;
var speedY = 0.0;
var incrViewY = 0.0;
var incr = 0;

//
// Models Vars
//

var models = {};

// Boat
var boatModel;
var boatModelSrc = 'models/Boat.obj';
var boatTextureSrc = 'models/textures/boat_diffuse.bmp';

// Room
var roomModel;
var roomModelSrc = 'models/roomNew.obj';
var roomTextureSrc = 'models/textures/roomNew.jpg'; 

// Pedestal
var pedestalModel;
var pedestalModelSrc = 'models/pedestal.obj';
var pedestalTextureSrc = 'models/textures/pedestal.png'; 

// Table
var tableModel;
var tableModelSrc = 'models/table.obj';
var tableTextureSrc = 'models/textures/table.png'; 

// Shelf
var shelfModel;
var shelfModelSrc = 'models/shelf.obj';
var shelfTextureSrc = 'models/textures/shelf.png'; 

// Pipes
var pipeModel;
var shortPipeModel;
var pipeModelSrc = 'models/scenary/pipe.obj';
var shortPipeModelSrc = 'models/scenary/shortPipe.obj';
var pipesTextureSrc = 'models/textures/scenary/pipes.jpg'; 

// Poster
var posterModel;
var posterModelSrc = 'models/scenary/poster.obj';
var posterTextureSrc = 'models/textures/scenary/poster.jpeg';

// Vent
var ventModel;
var ventModelSrc = 'models/scenary/vent.obj';
var ventTextureSrc = 'models/textures/scenary/vent.jpg';

// Crate
var crateModel;
var crateModelSrc = 'models/scenary/crate.obj';
var crateTextureSrc = 'models/textures/scenary/crate.jpg';
//--------------------------------

// Matrices
var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);
var perspectiveMatrix;
var viewMatrix;

//
// Scene Graph
//
var objects;

var roomPositionNode;
var roomNode;
var tablePositionNode;
var tableNode;
var shelfPositionNode;
var shelfNode;
var pipesPositionNode;
var pipesNode;
// Pedestals
var pedestalOnePositionNode;
var pedestalOneNode;
var pedestalTwoPositionNode;
var pedestalTwoNode;
var pedestalThreePositionNode;
var pedestalThreeNode;
var pedestalFourPositionNode;
var pedestalFourNode;
// Boats
var boatOnePositionNode;
var boatOneNode;
var boatTwoPositionNode;
var boatTwoNode;
var boatThreePositionNode;
var boatThreeNode;
var boatFourPositionNode;
var boatFourNode;

var defaultBoatOneLocalMatrix;
var defaultBoatTwoLocalMatrix;
var defaultBoatThreeLocalMatrix;
var defaultBoatFourLocalMatrix;
var interactableObjects = new Array();

// Debug
var debug = false;
var debugPositionAttributeLocation = [];
var debugMatrixLocation = [];
var debugVao = [];
var debugPositionBuffer = [];

// Lights
var materialDiffColorHandle;
var lightColorHandle;
var lights = [];
var activeBoat;
var boatIdx = 0;
var viewingBoat;

var generalSelection = [
    "type",
    "ambient",
    "diffuse",
    "specular"
];
var typeSelection = [
    "typedirect",
    "typepoint",
    "typespot",
    "typenone"
];
var ambientSelection = [
    "ambientambient",
    "ambienthemispheric",
    "ambientnone"
];
var diffuseSelection = [
    "diffuselambert",
    "diffusetoon",
    "diffusenone"
];
var specularSelection = [
    "specularphong",
    "specularblinn",
    "speculartoonPhong",
    "speculartoonBlinn",
    "specularnone"
];

var boatLightLocation = [
    {
        // Help variables
        lightType:              null,
        lightAmbient:           null,
        lightDiffuse:           null,
        lightSpecular:          null,
        
        // Colors
        directColor:            null,
        pointColor:             null,
        spotColor:              null,
        ambientColor:           null,
        ambientLowerColor:      null,
        ambientUpperColor:      null,
        lambertColor:           null,
        toonColor:              null,
        phongColor:             null,
        blinnColor:             null,
        toonPColor:             null,
        toonSColor:             null,
        
        //
        // Other variables
        //
        
        // Direct
        directDir:              null,
        
        // Point
        pointPos:               null,
        pointDecay:             null,
        pointTargetG:           null,
        
        // Spot
        spotPosY:                null,
        spotDecay:              null,
        spotTargetG:            null,
        spotDir:                null,
        spotConeIn:             null,
        spotConeOut:            null,
        
        // Hemispheric
        hemisphericDir:         null,
        
        // Lambert
        lambertTexture:         null,
        
        // Toon
        toonTexture:            null,
        toonThr:                null,
        
        // Specular
        phongShiny:             null,
        blinnShiny:             null,
        toonPThr:               null,
        toonBThr:               null,
    },
    {
        // Help variables
        lightType:              null,
        lightAmbient:           null,
        lightDiffuse:           null,
        lightSpecular:          null,
        
        // Colors
        directColor:            null,
        pointColor:             null,
        spotColor:              null,
        ambientColor:           null,
        ambientLowerColor:      null,
        ambientUpperColor:      null,
        lambertColor:           null,
        toonColor:              null,
        phongColor:             null,
        blinnColor:             null,
        toonPColor:             null,
        toonSColor:             null,
        
        //
        // Other variables
        //
        
        // Direct
        directDir:              null,
        
        // Point
        pointPos:               null,
        pointDecay:             null,
        pointTargetG:           null,
        
        // Spot
        spotPosY:                null,
        spotDecay:              null,
        spotTargetG:            null,
        spotDir:                null,
        spotConeIn:             null,
        spotConeOut:            null,
        
        // Hemispheric
        hemisphericDir:         null,
        
        // Lambert
        lambertTexture:         null,
        
        // Toon
        toonTexture:            null,
        toonThr:                null,
        
        // Specular
        phongShiny:             null,
        blinnShiny:             null,
        toonPThr:               null,
        toonBThr:               null,
    },
    {
        // Help variables
        lightType:              null,
        lightAmbient:           null,
        lightDiffuse:           null,
        lightSpecular:          null,
        
        // Colors
        directColor:            null,
        pointColor:             null,
        spotColor:              null,
        ambientColor:           null,
        ambientLowerColor:      null,
        ambientUpperColor:      null,
        lambertColor:           null,
        toonColor:              null,
        phongColor:             null,
        blinnColor:             null,
        toonPColor:             null,
        toonSColor:             null,
        
        //
        // Other variables
        //
        
        // Direct
        directDir:              null,
        
        // Point
        pointPos:               null,
        pointDecay:             null,
        pointTargetG:           null,
        
        // Spot
        spotPosY:                null,
        spotDecay:              null,
        spotTargetG:            null,
        spotDir:                null,
        spotConeIn:             null,
        spotConeOut:            null,
        
        // Hemispheric
        hemisphericDir:         null,
        
        // Lambert
        lambertTexture:         null,
        
        // Toon
        toonTexture:            null,
        toonThr:                null,
        
        // Specular
        phongShiny:             null,
        blinnShiny:             null,
        toonPThr:               null,
        toonBThr:               null,
    },
    {
        // Help variables
        lightType:              null,
        lightAmbient:           null,
        lightDiffuse:           null,
        lightSpecular:          null,
        
        // Colors
        directColor:            null,
        pointColor:             null,
        spotColor:              null,
        ambientColor:           null,
        ambientLowerColor:      null,
        ambientUpperColor:      null,
        lambertColor:           null,
        toonColor:              null,
        phongColor:             null,
        blinnColor:             null,
        toonPColor:             null,
        toonSColor:             null,
        
        //
        // Other variables
        //
        
        // Direct
        directDir:              null,
        
        // Point
        pointPos:               null,
        pointDecay:             null,
        pointTargetG:           null,
        
        // Spot
        spotPosY:                null,
        spotDecay:              null,
        spotTargetG:            null,
        spotDir:                null,
        spotConeIn:             null,
        spotConeOut:            null,
        
        // Hemispheric
        hemisphericDir:         null,
        
        // Lambert
        lambertTexture:         null,
        
        // Toon
        toonTexture:            null,
        toonThr:                null,
        
        // Specular
        phongShiny:             null,
        blinnShiny:             null,
        toonPThr:               null,
        toonBThr:               null,
    },
];

// Buttons
var clicked = 0;
