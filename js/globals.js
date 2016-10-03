var SMALL_SIZE = 0.3;
var MEDIUM_SIZE = 0.6;
var BIG_SIZE = 0.8;

var MAX_WIDTH = 640;
var MAX_HEIGHT = 320;

var CYCLES_PER_INTERVAL = 10;

var screenSizeProp = BIG_SIZE;
var emu = null;

var gameSelected = "";
var Hs = MAX_HEIGHT * screenSizeProp;
var Ws = MAX_WIDTH * screenSizeProp;
var pixelProp = 8;

var game = new Phaser.Game(Ws, Hs, Phaser.AUTO, 'screen', {preload: preload, create: create, update: update});
var graphics = null;
var beepSound = null;
var beep = null;
var keyboard = {};
var welcomeText = null;

function create() {
    keyboard[0x1] = game.input.keyboard.addKey(49);
    keyboard[0x2] = game.input.keyboard.addKey(50);
    keyboard[0x3] = game.input.keyboard.addKey(51);
    keyboard[0xC] = game.input.keyboard.addKey(52);

    keyboard[0x4] = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    keyboard[0x5] = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyboard[0x6] = game.input.keyboard.addKey(Phaser.Keyboard.E);
    keyboard[0xD] = game.input.keyboard.addKey(Phaser.Keyboard.R);

    keyboard[0x7] = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyboard[0x8] = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyboard[0x9] = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyboard[0xE] = game.input.keyboard.addKey(Phaser.Keyboard.F);

    keyboard[0xA] = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    keyboard[0x0] = game.input.keyboard.addKey(Phaser.Keyboard.X);
    keyboard[0xB] = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyboard[0xF] = game.input.keyboard.addKey(Phaser.Keyboard.V);
    
    graphics = game.add.graphics(0, 0);
    
    paintInitialScreen();
}

function preload(){
    sound = game.load.audio('beep', 'sound/beep.wav');
    beep = game.add.audio('beep');
}

function update() {
    if (emu !== null) {
        updateKeyboardState();
        emu.cicle();
        drawLayer();
        if(emu.needPlaySound){
            beep.play();
            emu.needPlaySound = false;
        }
    }
}

function INIT(rom) {
    game.world.remove(welcomeText);
    gameSelected = rom;
    emu = Object.create(SnxChip8);
    emu.loadRomAndStart(rom);
}

function RESIZE(size) {
    $('#screen').removeClass('center-big');
    $('#screen').removeClass('center-med');
    $('#screen').removeClass('center-sml');
    
    if (size === "x1") {
        $('#screen').addClass('center-sml');
        screenSizeProp = SMALL_SIZE;
    } else if (size === "x2") {
        $('#screen').addClass('center-med');
        screenSizeProp = MEDIUM_SIZE;
    } else if (size === "x3") {
        $('#screen').addClass('center-big');
        screenSizeProp = BIG_SIZE;
    }
    
    Ws = MAX_WIDTH * screenSizeProp;
    Hs = MAX_HEIGHT * screenSizeProp;
    pixelProp = 10 * screenSizeProp;
    game.renderer.resize(Ws, Hs);
    
    if (emu !== null) {
        drawLayer();
    } else {
        paintInitialScreen();
    }
}

function howplay() {
    if (gameSelected === '') {
        alert('No game selected.');
        return;
    }

    $("td[id^='cid_']").each(function () {
        $(this).removeClass('info');
    });

    $('#gameTitle')[0].innerHTML = gameSelected;
    $('#gameDesc')[0].innerHTML = game_desc[gameSelected];
    $('#gameControl')[0].innerHTML = game_control[gameSelected];
    $('#gameAuthor')[0].innerHTML = game_author[gameSelected];

    for (var i = 0; i < game_key[gameSelected].length; i++) {
        var key = game_key[gameSelected][i];
        var cid = '#cid_' + key;
        $(cid).addClass('info');
    }
    
    window.location.href = '#openModal';
}

function paintInitialScreen() {
    if(welcomeText!==null) {
        game.world.remove(welcomeText);
    }
    var fontSize = 30 * screenSizeProp;
    var textFont = fontSize + "px Georgia";
    var textFill = "#ffffff";
    var wPos = (Ws/4) + 30 * screenSizeProp ;
    var hPos = (Hs/2.3); 
    
    var style = { font: textFont, fill: textFill};
    welcomeText = game.add.text(wPos, hPos, "Select ROM to play!", style);  
}

function drawLayer() {
    graphics.clear();
    for (var i = 0; i < emu.screen.length; i++) {
        for (var j = 0; j < emu.screen[i].length; j++) {
            if (emu.screen[i][j]) {
                graphics.beginFill(0xFFFFFF, 1);
                graphics.drawRect(pixelProp * j, pixelProp * i, pixelProp, pixelProp);
            }
        }
    }
}

function updateKeyboardState() {
    for(i = 0; i < 0x10; i++) {
        if(keyboard[i].isDown) {
            emu.keyPress[i] = true;
        }
        else {
            emu.keyPress[i] = false;
        }
    }
}

