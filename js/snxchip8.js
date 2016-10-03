var SnxChip8 = {
    
    V : [],
    mem : [],
    screen: [],
    stack : [],
    PC : 0,
    rom : [],
    I : [],
    sp : [],
    delay_timer : 0,
    sound_timer : 0,
 
    HScreen : 32,
    WScreen : 64,
 
    keyPress : [],
    needPlaySound: false,

    chip8_fontset : [
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80 // F
    ],
    
    loadRomAndStart : function(rom) {
        var romUrl = "roms/" + rom;
        this.getRomFromHttpRequest(this, romUrl);
    },
    
    getRomFromHttpRequest : function(obj, romUrl) {
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.responseType = 'arraybuffer';
        xmlhttp.onload = function() {
            var uInt8Array = new Uint8Array(this.response);
            obj.init(uInt8Array);
        };
        xmlhttp.open("GET", romUrl, true);
        xmlhttp.send();   
    },
    
    init : function(romArray){
        this.needPlaySound = false;
        this.sp = 0;
        this.PC = 0x200;

        for (var i = 0; i < 4096; i++){
            this.mem[i] = 0;
        }
        
        for (var i = 0; i < romArray.length; i++) {
            this.mem[i + this.PC] = romArray[i];
        }

        for (var i = 0; i < 0x10; i++) {
            this.V[i] = 0;
            this.stack[i] = 0;
            this.keyPress[i] = false;
        }
        
        for (var i = 0; i < this.HScreen; i++) {
            hLine = new Array(this.WScreen);
            for (var j = 0; j < this.WScreen; j++) {
                hLine[j] = false;
            }
            this.screen[i] = hLine;
        }

        for(var i = 0; i < 0x50; i++) {
            this.mem[i] = this.chip8_fontset[i];
        }
    },

    cicle : function() {       
        for(var i = 0; i < CYCLES_PER_INTERVAL; i++) {
            this.execute();

            if (this.delay_timer > 0)  {
                this.delay_timer--;
            }

            if ( this.sound_timer > 0 ) {
                if ( this.sound_timer === 1 ) {
                    this.needPlaySound = true;
                }
                this.sound_timer--;
            }
        }
    },
    
    getRandomInt : function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    execute : function() {             
        opcode = (this.mem[this.PC] & 0xFF) << 8 | (this.mem[this.PC + 1] & 0xFF);
        op_1 = (opcode >> 8) & 0x000F;
        op_2 = (opcode >> 4) & 0x000F;
        op_3 = opcode & 0x000F;
        op_23 = opcode & 0x00FF;
        op_123 = opcode & 0x0FFF;
            
        switch (opcode & 0xF000) {
            case 0x0000:
                switch (opcode & 0x00FF) {
                    case 0x00E0:
                        this.FN_CLS();
                        break;

                    case 0x00EE:
                        this.FN_RET();
                        break;
                }
                break;

            case 0x1000:
                this.FN_JP_Addr(op_123);
                break;

            case 0x2000:
                this.FN_CALL_Addr(op_123);
                break;

            case 0x3000:
                this.FN_SE_VX_KK(op_1, op_23);
                break;

            case 0x4000:
                this.FN_SNE_VX_KK(op_1, op_23);
                break;

            case 0x5000:
                this.FN_SE_VX_VY(op_1, op_2);
                break;

            case 0x6000:
                this.FN_LD_VX_KK(op_1, op_23);
                break;

            case 0x7000:
                this.FN_ADD_VX_KK(op_1, op_23);
                break;

            case 0x8000:
                switch (opcode & 0x000F) {
                    case 0x0000:
                        this.FN_LD_VX_VY(op_1, op_2);
                        break;

                    case 0x0001:
                        this.FN_OR_VX_VY(op_1, op_2);
                        break;

                    case 0x0002:
                        this.FN_AND_VX_VY(op_1, op_2);
                        break;

                    case 0x0003:
                        this.FN_XOR_VX_VY(op_1, op_2);
                        break;

                    case 0x0004:
                        this.FN_ADD_VX_VY(op_1, op_2);
                        break;

                    case 0x0005:
                        this.FN_SUB_VX_VY(op_1, op_2);
                        break;

                    case 0x0006:
                        this.FN_SHR_VX(op_1);
                        break;

                    case 0x0007:
                        this.FN_SUBN_VX_VY(op_1, op_2);
                        break;

                    case 0x000E:
                        this.FN_SHL_VX(op_1);
                        break;
                }
                break;

            case 0x9000:
                this.FN_SNE_VX_VY(op_1, op_2);
                break;

            case 0xA000:
                this.FN_LD_I_NNN(op_123);
                break;

            case 0xB000:
                this.FN_JMP_NNN(op_123);
                break;

            case 0xC000:
                this.FN_RND_VX_NN(op_1, op_23);
                break;

            case 0xD000:
                this.FN_DRW_VX_VY_N(op_1, op_2, op_3);
                break;

            case 0xE000:
                switch (opcode & 0x00FF) {
                    case 0x009E:
                        this.FN_SKP_VX(op_1);
                    break;
                    
                     case 0x00A1:
                        this.FN_SKPN_VX(op_1);
                     break;
                }
                break;

            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007:
                        this.FN_LD_VX_DT(op_1);
                        break;

                    case 0x000A:
                        this.FN_LD_VX_K_WAIT(op_1);
                        break;

                    case 0x0015:
                        this.FN_LD_DT_VX(op_1);
                        break;

                    case 0x0018:
                        this.FN_LD_ST_VX(op_1);
                        break;

                    case 0x001E:
                        this.FN_LD_I_VX(op_1);
                        break;

                    case 0x0029:
                        this.FN_LD_F_VX(op_1);
                        break;

                    case 0x0033:
                        this.FN_LD_B_VX(op_1);
                        break;

                    case 0x0055:
                        this.FN_LD_I_V0_VX(op_1);
                        break;

                    case 0x0065:
                        this.FN_LD_V0_VX_I(op_1);
                        break;
                }
                break;
        }

    },
    
    //00E0 - CLS - Clear the display.
    FN_CLS : function() {
        for (var i = 0; i < this.HScreen; i++) {
            for (var j = 0; j < this.WScreen; j++) {
                this.screen[i][j] = false;
            }
        }
        this.PC += 2;  
    },

    //00EE - RET - Return from a subroutine
    FN_RET : function() {
        this.sp--;
        this.PC = this.stack[this.sp];
        this.PC += 2;
    },

    //1nnn - JP addr - Jump to location nnn
    FN_JP_Addr : function(nnn) {
        this.PC = ( nnn & 0x0FFF );
    },

    //2nnn - CALL addr - Call subroutine at nnn
    FN_CALL_Addr : function(nnn) {
        this.stack[this.sp] = this.PC;
        this.sp++;
        this.PC = ( nnn & 0x0FFF );
    },

    //3xkk - SE Vx, int - Skip next instruction if Vx = kk
    FN_SE_VX_KK : function(x, kk) {
        this.PC +=  ( this.V[x] === kk ) ? 4 : 2;
    },

    //4xkk - SE Vx, int - Skip next instruction if Vx != kk
    FN_SNE_VX_KK : function(x, kk) {
        this.PC += ( this.V[x] !== kk ) ? 4 : 2;
    },

    //5xy0 - SE Vx, Vy - Skip next instruction if Vx = Vy
    FN_SE_VX_VY : function(x, y) {
        this.PC += ( this.V[x] === this.V[y] ) ? 4 : 2;
    },

    //6xkk - LD VX,int - Set VX = int
    FN_LD_VX_KK : function(x, kk) {
        this.V[x] = kk;
        this.PC += 2;
    },

    //7xkk - ADD VX,int - Set VX = VX + int
    FN_ADD_VX_KK : function(x, kk) {
        this.V[x] = ( this.V[x] + kk ) & 0xFF;
        this.PC += 2;
    },

    //8XY0 - LD VX,VY - Set VX = VY, VF updates
    FN_LD_VX_VY : function(x, y) {
        this.V[x] = this.V[y];
        this.PC += 2;
    },

    //8xy1 - OR VX,VY - Set VX = VX | VY, VF updates
    FN_OR_VX_VY : function(x, y) {
        this.V[x] = ( this.V[x] | this.V[y] );
        this.PC += 2;
    },

    //8xy2 - Set Vx = Vx AND Vy.
    FN_AND_VX_VY : function(x, y) {
        this.V[x] = ( this.V[x] & this.V[y] );
        this.PC += 2;
    },

    //8xy3 - XOR VX,VY - Set VX = VX ^ VY, VF updates
    FN_XOR_VX_VY : function(x, y) {
        this.V[x] = ( this.V[x] ^ this.V[y] );
        this.PC += 2;
    },

    //8xy4      ADD VX,VY - Set VX = VX + VY, VF = carry
    FN_ADD_VX_VY : function(x, y) {
        this.V[0xF] = ( (this.V[x] + this.V[y]) & 0xFFFFFF00 ) !== 0  ? 1 : 0;
        this.V[x] = (this.V[x] + this.V[y]) & 0xFF;
        this.PC += 2;
    },

    //8xy5 - SUB VX,VY - Set Vx = Vx - Vy,  VF = !borrow.
    FN_SUB_VX_VY : function(x, y) {
        this.V[0xF] = (this.V[y] > this.V[x]) ? 0: 1;
        this.V[x] = (this.V[x] - this.V[y]) & 0xFF;
        this.PC += 2;
    },

    //8xy6 - SHR VX{,VY}Set VX = VX >> 1, VF = carry
    FN_SHR_VX : function(x) {
        this.V[0xF] = this.V[x] & 0x01;
        this.V[x] = (this.V[x] >> 1) & 0xFF;
        this.PC += 2;
    },

    //8xy7 - SUBN VX,VY - Set VX = VY - VX, VF = !borrow
    FN_SUBN_VX_VY : function(x, y) {
        this.V[0xF] =  (this.V[x] > this.V[y]) ? 0 : 1;
        this.V[x] = (this.V[y] - this.V[x]) & 0xFF;
        this.PC += 2;
    },

    //8xyE - SHL VX{,VY} - Set VX = VX << 1, VF = carry
    FN_SHL_VX : function(x) {
        this.V[0xF] = ( this.V[x] & 0x80 ) === 0 ? 0 : 1;
        this.V[x] = ( this.V[x] << 1 ) & 0xFF;
        this.PC += 2;
    },

    //9xy0 - SNE VX,VY - Skip next instruction if VX != VY
    FN_SNE_VX_VY : function(x, y) {
        this.PC += ( this.V[x] !== this.V[y] ) ? 4 : 2;
    },
    
    //Annn - LD I,Addr - Set I = Addr
    FN_LD_I_NNN : function(nnn) {
        this.I = nnn;
        this.PC += 2;
    },

    //Bnnn - JP V0,Addr - Jumps to the address NNN plus V0.
    FN_JMP_NNN : function(nnn) {
        this.PC = ( nnn + this.V[0] ) & 0xFFF;
    },

    //Cxkk - RND VX,int - Sets VX to a random number and NN.
    FN_RND_VX_NN : function(x, n) {
        this.V[x] = this.getRandomInt(0x0,0xff) & n;
        this.PC += 2;
    },

    //Dxyn - DRW VX,VY,Nibble - Draw Nibble int sprite stored at [I] at VX, VY. Set VF = collision
    FN_DRW_VX_VY_N : function(op1, op2, n) {
        var x = this.V[op1];
        var y = this.V[op2];

        this.V[0xF] = 0;
        for ( var nbyte = 0; nbyte < n; nbyte++ ) {
            var pixel = this.mem[this.I + nbyte];
            for ( var p = 0; p < 8; p++ ) {
                if ((pixel & (0x80 >> p)) !== 0) {
                    if ( this.screen[ (y + nbyte) % 32 ][ (x + p) % 64 ] ) {
                        this.V[0xF] = 1;
                    }
                    this.screen[ (y + nbyte) % 32 ][ (x + p) % 64 ] ^= true;
                }
            }
        }
        this.PC += 2;
    },

    //Ex9E - SKP VX - Skip next instruction if key VX down
    FN_SKP_VX : function(x) {
        this.PC += ( this.keyPress[this.V[x]] ) ? 4 : 2;
    },

    //ExA1 - SKNP VX - Skip next instruction if key VX up
    FN_SKPN_VX : function(x) {
        this.PC += ( !this.keyPress[this.V[x]] ) ? 4 : 2;
    },

    //Fx07 - LD VX,DT - Set VX = delaytimer
    FN_LD_VX_DT : function(x) {
        this.V[x] = this.delay_timer;
        this.PC += 2;
    },
    
    //Fx0A - LD VX,K - Set VX = key, wait for keypress
    FN_LD_VX_K_WAIT : function(x) {
        
        var kpress = false;
        
        for( var i = 0; i < this.keyPress.length; i++ ){
            if( this.keyPress[i] ) {
                this.V[x] = i;
                kpress = true;
            }
        }
        
        if( !kpress ) {
            return;
        }
        
        this.PC+= 2;
    },
    
    //Fx15 - LD DT,VX - Set delaytimer = VX
    FN_LD_DT_VX : function(x) {
        this.delay_timer = this.V[x];
        this.PC += 2;
    },

    //Fx18 - LD ST,VX - Set soundtimer = VX
    FN_LD_ST_VX : function (x) {
        this.sound_timer = this.V[x];
        this.PC += 2;
    },

    //Fx1E - LD ST,VX - Set I = location of sprite for digit Vx
    FN_LD_I_VX : function(x) {
        this.I = ( this.I + this.V[x] ) & 0xFFF;
        this.PC += 2;
    },

    //Fx29 - LD F, Vx - Set I = location of sprite for digit Vx.
    FN_LD_F_VX : function(x) {
        this.I = this.V[x] * 5;
        this.PC += 2;
    },

    //Fx33 - LD B, Vx
    FN_LD_B_VX : function(x) {
        this.mem[this.I] = this.V[x] / 100;
        this.mem[this.I + 1] = ( this.V[x] / 10 ) % 10;
        this.mem[this.I + 2] = ( this.V[x] % 100 ) % 10;
        this.PC += 2;
    },

    //Fx55 - LD [I], Vx - Store registers V0 through Vx in memory starting at location I.
    FN_LD_I_V0_VX : function(x) {
        for (var i = 0; i <= x; i++) {
            this.mem[this.I + i] = this.V[i];
        }
        this.I += x + 1;
        this.PC += 2;
    },

    //Fx65 - LD Vx, [I] - Read registers V0 through Vx from memory starting at location I.
    FN_LD_V0_VX_I : function(x) {
        for (var i = 0; i <= x; i++) {
            this.V[i] = this.mem[this.I + i] & 0xFF;
        }
        this.PC += 2;
    }
    
};    
