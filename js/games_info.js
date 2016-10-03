var game_desc = {};
var game_control = {};
var game_author = {};
var game_key = {};

game_desc['15PUZZLE'] = 'Here is the infamous 15 puzzle for Chip8. The puzzle, as you doubtless recall, has 15 squares numbered 1 through 15 (in this case, 1 through F) and one hole. You can move the hole about and must put the pieces in order. When you first run puzzle, it comes up solved. Thereafter, pressing IRestart causes the puzzle to have 32 random moves made, effectively randomizing the puzzle. If 32’s not enough for you, just press IRestart again. The program does not check to see if you’ve solved the puzzle, and therefore nothing special happens when you do except for the warm, fuzzy feeling that you have beaten it.';
game_control['15PUZZLE'] = 'Use all keys. Each one is for its puzzle position.';
game_author['15PUZZLE'] = 'Unknowed';
game_key['15PUZZLE'] = [0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8,0x9,0xA,0xB,0xC,0xD,0xE,0xF];

game_desc['BLINKY'] = 'Blinky is a PacMan game for the Chip8. As Blinky, you are chased around in an office environment by two bosses, Packlett and Heward. Packlett does management by walking around, but Heward believes in the American dream, and possesses quite a killer instinct. Anyway, don’t let them get to you, unless you are feeling very aspirant. This, of course, requires the recent fulfilment of one of four major contracts, found near the corners of the building. Otherwise, the office is filled with small tasks, just waiting for your attention. If you manage to take care of them all, your intray will overflow, just over weekend. This is the curse of any responsible and hard working employee. However, neither boss know of the emergency exit which leads from one part of the office to the other, so this may be one way to avoid them, if everything else fails.';
game_control['BLINKY'] = '1: reset ' + '<br>' + '3: up' + '<br>' + 'E: down '  + '<br>' + 'A: left' + '<br>'    + 'S: right';
game_author['BLINKY'] = 'Christian Egeberg <egeberg@solan.unit.no>';
game_key['BLINKY'] = [0x1,0x3,0x6,0x7,0x8];
        
game_desc['BLITZ'] = 'This game is a BOMBER clone. You are in a plane, and you must destroy the towers of a town. Your plane is flying left to right, and goes down. The game ends when you crash yourself on a tower...';
game_control['BLITZ'] = 'W: Drop bomb ';
game_author['BLITZ'] =  'David Winter <winter@worldnet.net>';
game_key['BLITZ'] = [0x5];

game_desc['BRIX'] = 'This is a version of the classic game of knock out the bricks. Not particularly exciting, but I had to include something to show how the interpreter is used. Once you get all of the bricks, the game will freeze. Use the restart button to start the game again.';
game_control['BRIX'] = 'Q: move paddle left' + '<br>' + 'E: move paddle right ';
game_author['BRIX'] =  'Andreas Gustafsson <gson@niksula.hut.fi>';
game_key['BRIX'] = [0x4,0x6];

game_desc['CONNECT4'] = 'This game is for two players. The goal is to align 4 coins in the game area. Each player’s coins are colored. When you drop a coin, it is paced on the latest dropped coin in the same column, or at the bottom if the column is empty. Once the column is full, you cannot place any more coins in it. To select a column, use 4 and 6. To drop a coin, use 5. There is no winner detection yet.';
game_control['CONNECT4'] = 'Q: left' + '<br>' + 'W: place piece' + '<br>' + 'E: right ';
game_author['CONNECT4'] = 'David Winter <winter@worldnet.net>';
game_key['CONNECT4'] = [0x4,0x5,0x6];

game_desc['GUESS'] = 'Think to a number between 1 and 63. CHIP8 shows you several boards and you have to tell if you see your number in them. Press 5 if so, or another key if not. CHIP8 gives you the number.';
game_control['GUESS'] = 'W: Yes' + '<br>' + 'Q: No';
game_author['GUESS'] = 'David Winter <winter@worldnet.net>';
game_key['GUESS'] = [0x4,0x5];

game_desc['HIDDEN'] = 'This is a version of the classic memory game. You are asked to find pairs of cards.'; 
game_control['HIDDEN'] = '2: up'+'<br>'+'Q: left'+'<br>'+'W: pick'+'<br>'+'E: right'+'<br>' +'S: down';
game_author['HIDDEN'] = 'David Winter <winter@worldnet.net>';
game_key['HIDDEN'] = [0x2,0x4,0x5,0x6,0x8];

game_desc['INVADERS'] = 'The well known game. Destroy the invaders with your ship.'; 
game_control['INVADERS'] = 'Q: left' + '<br>' + 'W: fire' + '<br>' + 'E: right';
game_author['INVADERS'] = 'David Winter <winter@worldnet.net>';
game_key['INVADERS'] = [0x4,0x5,0x6];

game_desc['KALEID'] = 'A little program (not a game) to make funny graphics.'; 
game_control['KALEID'] = 'X: finish' + '<br>' + '2: up' + '<br>' + 'Q: left' + '<br>' + 'E: right' + '<br>' + 'S: down';
game_author['KALEID'] = 'David Winter <winter@worldnet.net>';
game_key['KALEID'] = [0x0,0x2,0x4,0x6,0x8];

game_desc['MAZE'] = 'This little program draws random mazes.'; 
game_control['MAZE'] = 'Press any key to cause a different maze to be drawn.';
game_author['MAZE'] = 'David Winter <winter@worldnet.net>';
game_key['MAZE'] = [0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8,0x9,0xA,0xB,0xC,0xD,0xE,0xF];

game_desc['MERLIN'] = 'This little This is the Simon game. The goal is to remember in which order the squares are lighted. The game begins by lighting 4 random squares, and then asks you to light the squares in the correct order. You win a level when you give the exact order, and each increasing level shows a additionnal square. The game ends when you light an incorrect square. Ke ys are 4 and 5 for the two upper squares, then 7 and 8 for the two lower ones. draws random mazes.'; 
game_control['MERLIN'] = 'Q: left' + '<br>' + 'E: right';
game_author['MERLIN'] = 'Unknown';
game_key['MERLIN'] = [0x4,0x6];

game_desc['MISSILE'] = 'You must shoot the 8 targets on the screen. Your shooter movesalittle bit faster each time you shoot. You have 12 missiles to shoot all the targets, and you win 5 points per target shot.'; 
game_control['MISSILE'] = 'S: fire';
game_author['MISSILE'] = 'David Winter <winter@worldnet.net>';
game_key['MISSILE'] = [0x08];

game_desc['PONG'] = 'The game never ends. It keeps score, but only up to 9 for each player, then it will roll over to 0. Sorry, it’s the only way I could think of to do it. So, you have to play ‘‘whoever gets to a number first, wins.’’ It is kind of slow, but then there are two paddles and ball moving around all at once. The player who got the last point gets the serve.'; 
game_control['PONG'] = '1: move left paddle up' + '<br>' + 'Q: move left paddle down' + '<br>' + '4: move right paddle up' + '<br>' + 'R: move right paddle down';
game_author['PONG'] = 'Paul Vervalin <vervalin@austin.lockheed.com>';
game_key['PONG'] = [0x1,0x4,0xC,0xD];

game_desc['PONG2'] = 'Another pong game with some improvements.'; 
game_control['PONG2'] = '1: move left paddle up' + '<br>' + 'Q: move left paddle down' + '<br>' + '4: move right paddle up' + '<br>' + 'R: move right paddle down';
game_author['PONG2'] = 'Unknown';
game_key['PONG2'] = [0x1,0x4,0xC,0xD];

game_desc['PUZZLE'] = 'Here is the infamous 15 puzzle for Chip8. The puzzle, as you doubtless recall, has 15 squares numbered 1 through 15 (in this case, 1 through F) and one hole. You can move the hole about and must put the pieces in order. When you first run puzzle, it comes up solved. Thereafter, pressing IRestart causes the puzzle to have 32 random moves made, effectively randomizing the puzzle. If 32’s not enough for you, just press IRestart again. The program does not check to see if you’ve solved the puzzle, and therefore nothing special happens when you do except for the warm, fuzzy feeling that you have beaten it.';
game_control['PUZZLE'] = 'You enter moves by using the keys. The key’s position in that 4×4 matrix corresponds to the square in that position of the puzzle matrix. Pushing a key causes the hole to migrate to that position. The migration is performed in the order up, down, left, right; it is not necessary to limit your moves to those rows and columns containing the hole; you can request that the hole move to any position';
game_author['PUZZLE'] = 'Roger Ivie <slsw2@cc.usu.edu>';
game_key['PUZZLE'] = [0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8,0x9,0xA,0xB,0xC,0xD,0xE,0xF];

game_desc['SYZYGY'] = 'The object of the game is to seek out "targets". You do this with your syzygy. Initially small, the syzygy will grow by some amount each time a target is hit. Eventually, your syzygy will be so long as to make tougher and tougher to get any points (and easier and easier to get killed). Confused? Just try it.'; 
game_control['SYZYGY'] = '3: up' + '<br>' +'E: down' + '<br>' +'A: left' + '<br>' +'S: right' + '<br>' +'C: Show Score' + '<br>' +'F: No Border' + '<br>' +'V: Border';
game_author['SYZYGY'] = 'Roy Trevino <rtrevino@sedona.intel.com>';
game_key['SYZYGY'] = [0x3,0x6,0x7,0x8,0xB,0xE,0xF];

game_desc['TANK'] = 'You hav e 20 missiles to shoot ad the bad guys. This is one of the original Chip 8 games'; 
game_control['TANK'] = '2: up' + '<br>' + 'Q: left' + '<br>' + 'W: fire' + '<br>' + 'E: right' + '<br>' + 'S: down';
game_author['TANK'] = 'Unknown';
game_key['TANK'] = [0x2,0x4,0x5,0x6,0x8];

game_desc['TETRIS'] = 'Guess what this game is... I’m sure you don’t need the rules. If you do, please ask your friends'; 
game_control['TETRIS'] = 'Q: rotate' + '<br>' + 'W: left' + '<br>' + 'E: right' + '<br>' + 'A: drop piece';
game_author['TETRIS'] = 'Unknown';
game_key['TETRIS'] = [0x4,0x5,0x6,0x7];

game_desc['TICTAC'] = 'A tic-tac-toe game. Play with [1] to [9] keys. Each key corresponds to a square in the grid. The game never ends, so at any time, the winner is the one who has the best score'; 
game_control['TICTAC'] = '1-D: select corresponding square';
game_author['TICTAC'] = 'David Winter <winter@worldnet.net>';
game_key['TICTAC'] = [0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8,0x9];

game_desc['UFO'] = 'You have 15 missiles to shoot on the two types of invaders. The big one moves on the left and gives you 5 points. The small one moves on the right at variant speeds. The game ends after having shot the 15 missiles.'; 
game_control['UFO'] = 'Q: shoot left' + '<br>'  + 'W: shoot up' + '<br>' + 'E: shoot right';
game_author['UFO'] = 'Unknown';
game_key['UFO'] = [0x4,0x5,0x6];

game_desc['VBRIX'] = 'This is a version of the classic game of knock out the bricks.'; 
game_control['VBRIX'] = '1: move paddle up' + '<br>' + 'Q: move paddle down' + '<br>' + 'A: start game';
game_author['VBRIX'] = 'Paul Robson';
game_key['VBRIX'] = [0x1,0x4,0x7];

game_desc['VERS'] = 'There are two players, each controls a worm. The idea is to have the longest worm. First to 8 points, wins.'; 
game_control['VERS'] = '1: Player 1 Left ' + '<br>' +'1: Player 1 Right ' + '<br>' +'A: Player 1 Up ' + '<br>' + 'Z: Player 1 Down ' + '<br>' +'C: Player 2 Left ' + '<br>'+'4: Player 2 Up ' + '<br>'+'R: Player 2 Down ' + '<br>'+'V: Player 2 Right ';
game_author['VERS'] = 'JMN';
game_key['VERS'] = [0x1,0x2,0x7,0xA,0xB,0xC,0xD,0xF];

game_desc['WIPEOFF'] = 'Another BRIX variant, but quite hard to play. Your score is shown when you lose all your lives'; 
game_control['WIPEOFF'] = 'Q: move paddle left' + '<br>' + 'E: move paddle right';
game_author['WIPEOFF'] = 'Unknown';
game_key['WIPEOFF'] = [0x4,0x6];