//-----------------------------------------------------------------------------
//  Galv's Map Projectiles
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MapProjectiles.js
//-----------------------------------------------------------------------------
//  2017-07-18 - Version 1.7 - added size to projectiles to mimic hitboxes
//  2017-04-20 - Version 1.6 - fixed angle of fire when targeting player/event
//                           - while using y offset feature.
//  2017-02-09 - Version 1.5 - fixed a bug with effects activating on player
//  2017-01-25 - Version 1.4 - added ability to only run actions if the proj
//                             id is included in a list in event comment
//  2016-11-09 - Version 1.3 - updated event hit detection to be based on real
//                             sprite location instead of map x,y position.
//                             Projectiles fade when max range is reached.
//                             Added mouse target to projectile settings
//                             Added animated projectiles
//  2016-10-31 - Version 1.2 - events with no active page would crash on hit
//  2016-09-25 - Version 1.1 - fixed bug with switch change on hit
//  2016-09-14 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MapProjectiles = true;

var Galv = Galv || {};            // Galv's main object
Galv.PROJ = Galv.PROJ || {};      // Galv's plugin stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.7) Create projectiles that can interact with the map and map characters
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Tile Size
 * @desc Premade projectile settings to call during game
 * Default: 48
 * @default 48
 *
 * @param Fade Speed
 * @desc The speed projectiles fade when they reach their max distance.
 * @default 40
 *
 * @param Disable Mouse Move
 * @desc Disables clicking on the map to move/interact with events
 * @default false
 *
 * @param Premade 1
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 2
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 3
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 4
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 5
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 6
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 7
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 8
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 9
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 10
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 11
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 12
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 13
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 14
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 15
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 16
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 17
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 18
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 19
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 20
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @help
 *   Galv's Map Projectiles
 * ----------------------------------------------------------------------------
 * This plugin allows you to create projectiles on the map that can interact
 * with characters and the map.
 *
 * Projectiles can be created manually in game with a customized script call or
 * the projectile cusomization can be set up in the Premade plugin settings.
 * Information on how to do this below.
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALLS (in event script or move route script)
 * ----------------------------------------------------------------------------
 * To create a projectile during the game there is a few ways. The first is to
 * use one of the following script calls and include the projectile settings:
 *
 *      Galv.PROJ.atTarget(sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size);
 *      Galv.PROJ.dir(sid,dir,s,d,'img',anim,'action',[r],[t],z,pid,size);
 *
 *
 * sid     = start event id or -1 for player or 'm' for mouse pos
 * tid     = target event id or -1 for player or 'm' for mouse pos
 * dir     = direction fired insead of at a target. Can be: 1,2,3,4,6,7,8,9,0
 *           Numbers are numpad directions. 0 for facing direction of target
 * s       = speed - how fast the projectile travels
 * d       = distance - the max number of tiles the projectile will travel
 * img     = graphic to use from /img/pictures/
 *           ANIMATED IMAGES:
 *           The graphic can have parenthesis that contains frames and speed.
 *           imageName(frames,speed)... eg: bullet(8,5)
 *           Have no parenthesis for the projectiles to be 1 frame
 * action  = actions to execute when the projectile hits a player or event.
 *           These actions only affect events with <projEffect> comment
 *           Player and event actions are separated by | symbol
 *           eg. playerAction|eventAction
 *           Actions below:
 *           c(x)        // run common event x
 *           S(x:t)      // change switch x to t (on or off)
 *           s(L:t)      // change self switch L to t (on or off) event only
 *           e           // erase event - event only
 * r       = list of regions projectile will hit and stop on. Blank = none
 * t       = list of terrains projectile will hit and stop on. Blank = none
 * z       = z value (leave blank to default to 3, same as characters)
 *           2 or less will hit characters "below character" priority
 *           2.1-3.9 will hit characters "same as character" priority
 *           (3 is same as chars. < 3 draws under & > 3 draws over chars)
 *           4+ will hit characters "above character" priority
 * pid     = an identifier number id for the projectile. Left blank it will
 *           default to 1. This is used for events to determine if the
 *           projectile will go through or contact them (more below)
 * size    = the distance from the center of a projectile that will cause
 *           a collision. Leave this blank for collision based on a point
 *
 * To create projectiles in multiple places with identical setup, you can
 * instead use the following script calls that will use the 'Premade'
 * setup projectiles in the plugin settings. Call them using:
 *
 *      Galv.PROJ.quickTar(id);  // creates projectile using premade id
 *                               // (using tid as target id)
 *      Galv.PROJ.quickDir(id);  // creates projectile using premade id
 *                               // (using tid as direction)
 *
 * Note: You can add an override sid in these two script calls using:
 *      Galv.PROJ.quickTar(id,overrideId);
 *      Galv.PROJ.quickDir(id,overrideId);
 *
 * EXAMPLE 1:
 * Galv.PROJ.dir(9,4,3,6,'bullet0',1,'c(7)|e',[5],[],3,1);
 * Fires a projectile from event 9
 * It used Galv.PROJ.dir call so it will fire in direction 4 (left)
 * It has a speed of 3
 * It will travel 6 tiles
 * It will use 'bullet0' graphic from /img/pictures/. 
 * It will play animation 1 on contact.
 * If it hits the player it will run common event 7.
 * If it hits an event it will erase it (if event has the <projEffect> tag). 
 * It will collide on region 5
 * It has no terrain collision
 * It has a z value of 3 (same as player)
 * It has an identifier of 1
 *
 * EXAMPLE 2:
 * Galv.PROJ.atTarget(-1,2,5,7,'bullet1(8,5)',2,'|s(A:on),[5,6],[6],3,2);
 * Fires a projectile from the player
 * It used Galv.PROJ.atTarget call so it will fire at event 2
 * It has a speed of 5
 * It will travel 7 tiles
 * It will use 'bullet1(8,5)' graphic from /img/pictures/. 
 *   This image needs to have 8 frames and will animate with speed of 5
 * It will play animation 2 on contact.
 * If it hits player it does nothing (it cant anyway as it is from player).
 * If it hits an event it will turn self switch A on (if <projEffect> tag). 
 * It will collide on regions 5 and 6
 * It will collide on a tile with terrain tag 6
 * It has a z value of 3 (same as player)
 * It has an identifier of 2
 * 
 * EXAMPLE 3:
 * Galv.PROJ.quickTar(1);
 * Fires a projectile with setup taken from 'Premade 1' in plugin settings
 *
 * EXAMPLE 4:
 * Galv.PROJ.quickTar(1,8);
 * Fires a projectile with setup taken from 'Premade 1' in plugin settings
 * but this time, replace the sid with the event id of 8. If done from a
 * move route, you could use this._eventId in place of the number 8 to get
 * the current event's id.
 *
 * EXAMPLE 5:
 * Galv.PROJ.atTarget(-1,2,5,4,'bulletBlast',12,'|s(A:on),[9],[],3,7,60);
 * Fires a projectile from the player
 * It used Galv.PROJ.atTarget call so it will fire at event 2
 * It has a speed of 5
 * It will travel 4 tiles
 * It will use 'bulletBlast' graphic from /img/pictures/. 
 * It will play animation 12 on contact.
 * If it hits player it does nothing (it cant anyway as it is from player).
 * If it hits an event it will turn self switch A on (if <projEffect> tag). 
 * It will collide on region 9
 * It won't collide with any terrain tiles
 * It has a z value of 3 (same as player)
 * It has an identifier of 7
 * It has a size of 60 pixels, so it will hit a wider area.
 *
 * Other script calls to make stuff happen:
 *
 *      $gamePlayer.projDodge = true/false;    // if true, projectiles can no
 *                                             // longer hit the player.
 *      $gamePlayer._projEffect = true/false;  // default is true. If false,
 *                                             // projectile effects do not
 *                                             // activate when player is hit
 *      $gamePlayer._projYoffset = y;          // change projectile y pos when
 *                                             // firing proj from player.
 *
 * ----------------------------------------------------------------------------
 * ----------------------------------------------------------------------------
 *   EVENT COMMENTS
 * ----------------------------------------------------------------------------
 * By default, if no comment tag is in the active event page, all projectiles
 * will collide on the evente if it is at the same z level as them (see above)
 *
 *   <projBlock:true>    // will block all projectiles
 *   <projBlock:false>   // will block no projectiles
 *   <projBlock:x,x,x>   // will NOT block projectiles that have a pid 
 *                       // included in this list.
 *
 *   <projEffect>        // Must include this comment on an event page if you
 *                       // want projectile effects to happen when hit. If no
 *                       // tag exists, Actions will not be activated.
 *
 *   <projEffect:x,x,x>  // INSTEAD of the above tag, you can use this to only
 *                       // want projectile actions to activate if projectile
 *                       // that hits has a pid included in this list.
 *
 *   <projY:x>           // y offset for where projectiles start from.
 *
 * ----------------------------------------------------------------------------
 *
 * To get the event id (or -1 for player, or 0 for no target) from inside
 * a common event called by a projectile hitting a target using script:
 *
 *   Galv.PROJ.ceTargetId()
 *
 * For example, you could use this in a Control Variables - script and then
 * in a conditional branch afterward you can do something depending on what
 * id you get from it. This may not be reliable with multiple common events
 * running at the same time.
 *
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.PROJ.mouseMove = PluginManager.parameters('GALV_MapProjectiles')["Disable Mouse Move"].toLowerCase() === 'true' ? true : false;
Galv.PROJ.tileSize = Number(PluginManager.parameters('GALV_MapProjectiles')["Tile Size"]);
Galv.PROJ.fadeSpeed = Number(PluginManager.parameters('GALV_MapProjectiles')["Fade Speed"]);
Galv.PROJ.eYOff = parseInt(Galv.PROJ.tileSize * 0.25);
Galv.PROJ.hitDis = parseInt(Galv.PROJ.tileSize * 0.5);
Galv.PROJ.requireClean = false;


Galv.PROJ.premade = {};
var premadeCheck = true;
var i = 1;
while (premadeCheck) {
	var name = "Premade " + i;
	var s = PluginManager.parameters('GALV_MapProjectiles')[name];
	if (s == undefined) {
		premadeCheck = false;
	} else {
		Galv.PROJ.premade[i] = s;
		i += 1;
	};
};

Galv.PROJ.quickTar = function(id,overrideId) {
	var settings = Galv.PROJ.premade[id];
	if (overrideId) {
		var origId = settings.match(/\d+/i);
		settings = settings.replace(origId,overrideId);
	};
	
	if (Galv.PROJ.premade[id]) eval('Galv.PROJ.atTarget(' + settings + ')');
};

Galv.PROJ.quickDir = function(id,overrideId) {
	var settings = Galv.PROJ.premade[id];
	if (overrideId) {
		var origId = settings.match(/\d+/i);
		settings = settings.replace(origId,overrideId);
	};
	if (Galv.PROJ.premade[id]) eval('Galv.PROJ.dir(' + settings + ')');
};

Galv.PROJ.getTarget = function(id) {
	if (Number.isInteger(id)) {
		if (id >= -1) {
			switch (id) {
				case 0:
					// Current event
					return $gameMap.event($gameMap._interpreter._eventId);
					break;
				case -1:
					// Player
					return $gamePlayer;
					break;
				default:
					// Event
					var event = $gameMap.event(id)
					return event._erased ? null : $gameMap.event(id);
					break;
			};
		} else {
			// Follower
			var f = Math.abs(id) - 2;
			return $gamePlayer._followers.follower(f)
		};
	} else {
		if (id === 'm') {
			// id was mouse pos
			var x = $gameMap.canvasToMapX(TouchInput.x);
			var y = $gameMap.canvasToMapY(TouchInput.y);
			return {x:x, y:y, _characterName: true};
		} else {
			// id was an array [x,y]
			//return {x: id[0], y: id[1]};
			return id;
		}
		
	};
};

Galv.PROJ.dist = function(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
};

Galv.PROJ.atTarget = function(sid,eid,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type) {
	var sTarget = Galv.PROJ.getTarget(sid);
	var eTarget = Galv.PROJ.getTarget(eid);

	action = action ? action.split('|') : '';
	if (action) {
		var pActions = action[0].split(',');
		var eActions = action[1] ? action[1].split(',') : [];
	} else {
		var pActions = [];
		var eActions = [];
	};

	var obj = {
		x: Number(sTarget._realX * Galv.PROJ.tileSize + Galv.PROJ.tileSize / 2),
		y: Number(sTarget._realY * Galv.PROJ.tileSize + Galv.PROJ.tileSize / 2),
		sTarget: sTarget,
		eTarget: eTarget,
		speed: speed,
		id: sid,
		pid: pid || 1,
		z: z || 3,
		ttl: Galv.PROJ.getTtl(dist,speed),
		type: type || 'updateNorm',
		graphic: graphic,
		hitAnim: hitAnim || 0,
		regions: regions || [],
		terrains: terrains || [],
		action: {player: pActions, event: eActions},
		atTarget: eTarget._characterName,
		hitbox: Number(hitbox)
	};
	
	$gameMap.addMapProjectile(obj);
};

Galv.PROJ.diag = {
// dir: [horz,vert],
	1: [4,2],
	3: [6,2],
	7: [4,8],
	9: [6,8]
};

Galv.PROJ.dir = function(sid,dir,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type) {
	var sTarget = Galv.PROJ.getTarget(sid);
	if (dir == 0) dir = sTarget._diagDir ? sTarget._diagDir : sTarget._direction;
	if ([1,3,7,9].contains(dir)) {
		// do diagonal direction
		var horVer = Galv.PROJ.diag[dir];
		
		var x = $gameMap.roundXWithDirection(sTarget.x, horVer[0]);
    	var y = $gameMap.roundYWithDirection(sTarget.y, horVer[1]);
	} else {
		// do normal direction
		var x = $gameMap.xWithDirection(sTarget.x,dir);
		var y = $gameMap.yWithDirection(sTarget.y,dir);
	};
	
	Galv.PROJ.atTarget(sid,{x:x,y:y},speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
};

Galv.PROJ.getTtl = function(dist,speed) {
	if (!dist || !speed) return 120;
	
	var dist = dist * Galv.PROJ.tileSize + Galv.PROJ.tileSize / 2;
	var ttl = dist / speed;
	
	return ttl;
};

Galv.PROJ.doActions = function(target,proj) {
	if (!target._projEffects) return;
	var actions = null;
	if (target == $gamePlayer) {
		var actions = proj.action.player;
	} else if (target._projEffects) {
		if (target._projEffects.length != undefined) {
			// _projEffect is an array, check for id
			if (target._projEffects.contains(proj.pid)) var actions = proj.action.event;
		} else {
			var actions = proj.action.event;
		}
	}

	if (actions) {
		for (var i = 0; i < actions.length; i++) {
			Galv.PROJ.executeAction(actions[i],target);
		};
	};
};

Galv.PROJ.cTargets = {};

Galv.PROJ.setEventTarget = function(cEventId,target) {
	if (!target) {
		Galv.PROJ.cTargets[cEventId] = 0;
	} else {
		Galv.PROJ.cTargets[cEventId] = target == $gamePlayer ? -1 : target.eventId();
	};
};

Galv.PROJ.ceTargetId = function() {
	return Galv.PROJ.cTargets[$gameTemp._savedcommonEventId];
};

Galv.PROJ.executeAction = function(action,target) {
	if (!action) return;
	var data = action.match(/\((.*)\)/i);
	data = data ? data[1].split(':') : [];
	switch(action[0]) {
		case 'c':  // common event
			var id = Number(data[0]);
			$gameTemp.reserveCommonEventWithSave(id);
			Galv.PROJ.setEventTarget(id,target);
			break;
		case 's':  // self switch
			var key = [$gameMap.mapId(), target.eventId(), data[0].toUpperCase()];
			var setState = data[1].toLowerCase() == 'on' ? true : false;
			$gameSelfSwitches.setValue(key, setState);
			break;
		case 'S':  // switch
			var setState = data[1].toLowerCase() == 'on' ? true : false;
			$gameSwitches.setValue(Number(data[0]),setState);
			break;
		case 'e':  // erase event
			target.erase();
			break;
	};
};

// Disable mouse move for map if setting checked
if (Galv.PROJ.mouseMove) {
	Scene_Map.prototype.processMapTouch = function() {};
};


//-----------------------------------------------------------------------------
// GAME TEMP
//-----------------------------------------------------------------------------

Game_Temp.prototype.reserveCommonEventWithSave = function(commonEventId) {
	this._savedcommonEventId = commonEventId;
	this._commonEventId = commonEventId;
};


//-----------------------------------------------------------------------------
// GAME MAP
//-----------------------------------------------------------------------------

Galv.PROJ.Game_Map_initialize = Game_Map.prototype.initialize ;
Game_Map.prototype.initialize = function() {
    Galv.PROJ.Game_Map_initialize.call(this);
	Galv.PROJ.tileSize = this.tileWidth();
};

Galv.PROJ.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	this._mapProjectiles = [];  // Clear projectiles when on new map
	Galv.PROJ.Game_Map_setup.call(this,mapId);
};

Game_Map.prototype.addMapProjectile = function(object) {
	var index = 0;
	for (var i = 0; i < this._mapProjectiles.length + 1; i++) {
		if (!this._mapProjectiles[i]) {
			index = i;
			break;
		};
	};
	this._mapProjectiles[index] = object;
	SceneManager._scene._spriteset.createProjectile(index);
};

Game_Map.prototype.removeMapProjectile = function(id) {
	SceneManager._scene._spriteset.removeProjectile(id);
	this._mapProjectiles[id] = null;
};


//-----------------------------------------------------------------------------
// Spriteset Map
//-----------------------------------------------------------------------------

Galv.PROJ.Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	Galv.PROJ.Spriteset_Map_createCharacters.call(this);
	this.createProjectiles();
};

Spriteset_Map.prototype.createProjectiles = function() {
	this._mapProjectileSprites = [];
	
	// Create existing projectiles
	for (var i = 0; i < $gameMap._mapProjectiles.length; i++) {
		this.createProjectile(i);
	};
};

Spriteset_Map.prototype.createProjectile = function(pIndex) {
	// Create new projectile
	if ($gameMap._mapProjectiles[pIndex]) {
		var isChar = Boolean($gameMap._mapProjectiles[pIndex].atTarget);
		this._mapProjectileSprites[pIndex] = new Sprite_MapProjectile(pIndex,isChar);
		this._tilemap.addChild(this._mapProjectileSprites[pIndex]);
	};
};

Galv.PROJ.Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    Galv.PROJ.Spriteset_Map_update.call(this);
	this.updateProjectiles();
};

Spriteset_Map.prototype.updateProjectiles = function() {
	if (Galv.PROJ.requireClean) {
		Galv.PROJ.requireClean = false;
		
		// clean up dead projectiles
		for (var i = 0; i < this._mapProjectileSprites.length; i++) {
			if (!this._mapProjectileSprites[i] || this._mapProjectileSprites[i].dead) {
				this._tilemap.removeChild(this._mapProjectileSprites[i]);
				this._mapProjectileSprites[i] = null;    
				$gameMap._mapProjectiles[i] = null;
			};
		};
	};
};

})();


//-----------------------------------------------------------------------------
// SPRITE: Projectile
//-----------------------------------------------------------------------------

function Sprite_MapProjectile() {
    this.initialize.apply(this, arguments);
}

Sprite_MapProjectile.prototype = Object.create(Sprite_Base.prototype);
Sprite_MapProjectile.prototype.constructor = Sprite_MapProjectile;

Sprite_MapProjectile.prototype.initialize = function(objId,yoFix) {
    Sprite_Base.prototype.initialize.call(this);
	this._obj = $gameMap._mapProjectiles[objId];
	this._id = this._obj.id;
	this._updateType = this._obj.type;
	this._ticker = 0;
	this.ttd = 5;
	this._yo = this._obj.sTarget._projYoffset;
	this._yoFix = yoFix || false;
	this.setBitmap();
	this.updateDirection();
	this.setupHitbox();
};

Sprite_MapProjectile.prototype.setupHitbox = function() {
	this._hitDist = this._obj.hitbox ? this._obj.hitbox : Galv.PROJ.hitDis;
};

Sprite_MapProjectile.prototype.updateDirection = function() {
	var yo = this._yo && this._yoFix ? this._yo / 48 : 0;
	
	this._angle = Math.atan2(this._obj.eTarget.y - yo - this._obj.sTarget.y, this._obj.eTarget.x - this._obj.sTarget.x) * 180 / Math.PI;
	this.rotation = (this._angle + 90) * Math.PI / 180;

	this._animId = 0;
	this.xMove = this._obj.speed * Math.cos(this._angle * Math.PI / 180);
	this.yMove = this._obj.speed * Math.sin(this._angle * Math.PI / 180);
};

Sprite_MapProjectile.prototype.setBitmap = function() {
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._cFrame = 0;
	this._fTicker = 0;
	this.x = this._obj.x;
	this.y = this._obj.y + this._yo;
	this.z = this._obj.z;
	var frames = this._obj.graphic.match(/\((.*)\)/i);
	if (frames) {
		frames = frames[1].split(',');
		this._frames = Number(frames[0]);
		this._frameSpeed = Number(frames[1]);
	}
	
	this.bitmap = ImageManager.loadPicture(this._obj.graphic);
};

Sprite_MapProjectile.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	this.updatePosition();
	this.updateAnimation();
	this.updateFrame();
	if (this._hasHit) {
		if (!this.isAnimationPlaying()) {
			this._obj.ttl = 0;
			this.updateDead();
		};
	} else {
		this[this._updateType]();
		this.updateCollide();
		this.updateDead();
		this._obj.ttl -= 1;
	};
};


Sprite_MapProjectile.prototype.updateFrame = function() {
	if (this._frames) {
		var pw = this.bitmap.width / this._frames;
		var ph = this.bitmap.height;
		var sx = this._cFrame * pw;
		var sy = 0;
		
		if (this._fTicker >= this._frameSpeed) {

			this._fTicker = 0;
			this._cFrame = this._cFrame >= this._frames - 1 ? 0 : this._cFrame + 1;
		}

		this.setFrame(sx, sy, pw, ph);
		this._fTicker += 1;
	}
};

Sprite_MapProjectile.prototype.updateNorm = function() {
	this._obj.x += this.xMove;
	this._obj.y += this.yMove;
};

Sprite_MapProjectile.prototype.updatePosition = function() {
	this.x = this._obj.x - $gameMap.displayX() * Galv.PROJ.tileSize;
	this.y = this._obj.y - $gameMap.displayY() * Galv.PROJ.tileSize + this._yo;
};

Sprite_MapProjectile.prototype.updateDead = function() {
	if (this._obj.ttl <= 0) {
		if (this.ttd <= 0) {
			this.opacity -= Galv.PROJ.fadeSpeed;
			if (this.opacity <= 0) {
				this.dead = true;
				Galv.PROJ.requireClean = true;
			}
		};
		this.ttd -= 1;
	};
};

Sprite_MapProjectile.prototype.updateCollide = function() {
	if (this._ticker <= 0 && this.opacity == 255) {
		// check hit player
		var player = this.checkHitPlayer();
		if (player) {
			// do hit player
			this.doHit($gamePlayer);
		} else {
			// check hit event
			var event = this.checkHitEvent();
			if (event) {
				// do hit event
				this.doHit(event);
			};
		};
		this._ticker = 2;
	};
	this._ticker -= 1;
};

Sprite_MapProjectile.prototype.checkHitPlayer = function() {
	return this._obj.sTarget != $gamePlayer && !$gamePlayer.projDodge && Galv.PROJ.dist($gamePlayer.screenX(),$gamePlayer.screenY(),this.x,this.y) < this._hitDist && this.isSameLevel($gamePlayer._priorityType);
};

Sprite_MapProjectile.prototype.checkHitEvent = function() {
	// Basic checking for events
	var tx = Math.floor(this._obj.x / Galv.PROJ.tileSize);
	var ty = Math.floor(this._obj.y / Galv.PROJ.tileSize);
	
	// check regions
	if (this._obj.regions.contains($gameMap.regionId(tx,ty)) || this._obj.terrains.contains($gameMap.terrainTag(tx,ty))) {
		this.doHit();
		return null;
	};

	var events = $gameMap.events();
	var event = null;
	for (var i = 0; i < events.length; i++) {
		var dis = Galv.PROJ.dist(events[i].screenX(),events[i].screenY() - Galv.PROJ.eYOff,this.x,this.y);

		if (dis < this._hitDist && events[i] != this._obj.sTarget && this.isBlockerEvent(events[i])) {
			event = events[i];
			break;
		};
	};
	return event;
};

Sprite_MapProjectile.prototype.isBlockerEvent = function(event) {
	if (event._erased) return false;
	if (event._projBlock === -1) return true;
	if (event._projBlock === -2) return false;
	if (event._projBlockList.contains(this._obj.pid)) return false;
	return this.isSameLevel(event._priorityType);
};


Sprite_MapProjectile.prototype.isSameLevel = function(prioType) {
	if (this.z <= 2) {
		// below chars
		return prioType == 0;
	} else if (this.z <= 4) {
		// same as chars
		return prioType == 1;
	} else {
		return prioType == 3;
	}
	return false;
};

Sprite_MapProjectile.prototype.doHit = function(target) {
	this._hasHit = true;
	this.opacity = 0;
	this._animId = this._obj.hitAnim;

	if (target) Galv.PROJ.doActions(target,this._obj);
};

Sprite_MapProjectile.prototype.updateAnimation = function() {
    this.setupAnimation();
    if (!this.isAnimationPlaying()) {
       this._animationPlaying = false;
    }
};

Sprite_MapProjectile.prototype.setupAnimation = function() {
    if (this._animId > 0) {
        var animation = $dataAnimations[this._animId];
        this.startAnimation(animation, false, 0);
		this._animId = 0;
		this._animationPlaying = true;
    }
};


//-----------------------------------------------------------------------------
// GAME PLAYER
//-----------------------------------------------------------------------------

Galv.PROJ.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	this._projEffects = true;
	this._projYoffset = 0;
	Galv.PROJ.Game_Player_initMembers.call(this);
};

//-----------------------------------------------------------------------------
// GAME EVENT
//-----------------------------------------------------------------------------

Galv.PROJ.Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	Galv.PROJ.Game_Event_initMembers.call(this);
	this.initProjVars();
};

Game_Event.prototype.initProjVars = function() {
	this._projBlock = 0;
	this._projBlockList = [];
	this._projEffects = false;
};

Galv.PROJ.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	Galv.PROJ.Game_Event_setupPageSettings.call(this);
	this.setProjStuff();
};

Game_Event.prototype.setProjStuff = function() {
	var page = this.page();
	this.initProjVars();
	if (!page) return;
	
	for (var i = 0; i < page.list.length; i++) {
		if (page.list[i].code == 108) {
			var params = page.list[i].parameters[0];
			
			var yO = params.match(/<projY:(.*)>/i)
			this._projYoffset = yO ? Number(yO[1]) : 0;
			
			
			if (params == '<projEffect>') {
				this._projEffects = true;
				continue;
			};
			
			var projEffects = params.match(/<projEffect:(.*)>/i);
			
			if (projEffects) {
				projEffects = projEffects[1].split(",");
				this._projEffects = [];
				for (var b = 0; b < projEffects.length; b++) {
					this._projEffects.push(Number(projEffects[b]));
				};
				continue;
			}
			
			var blockId = params.match(/<projBlock:(.*)>/i);
			if (blockId) {
				blockId = blockId[1].toLowerCase();
				if (blockId === 'true') {
					this._projBlock = -1;
				} else if (blockId === 'false') {
					this._projBlock = -2;
				} else {
					blockId = blockId.split(",");
					for (var b = 0; b < blockId.length; b++) {
						this._projBlockList.push(Number(blockId[b]));
					};
				};
			};
		};
	};
};