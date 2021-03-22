class Player
{
	constructor( gfx,bullets )
	{
		this.pos = new Vec2( gfx.scrWidth / 2,gfx.scrHeight * 0.7 )
		this.size = new Vec2( 6,6 )
		this.spd = 0.1
		this.decay = 0.93
		this.maxSpd = 0.4
		this.vel = Vec2.zero()
		this.spr = new Sprite( "Images/Player" )
		this.maxHP = 1
		this.hp = this.maxHP
		
		this.moveStep = 0.1
		
		this.rot = 0.0
		this.rotSpd = 0.1
		
		this.gunRot = 0.0
		this.refire = new Timer( 0.3 )
		this.tankRefire = new Timer( 0.4 )
		this.shotSpread = 0.5
		
		this.bullets = bullets
		
		this.gun = 0 // 0 = auto aim, 1 = triple aim forward, 2 = single aim mouse
		this.chassis = 0 // 0 = fast, 1 = tank, 2 = middle ground
		this.wings = 0 // 0 = reg, 1 = tank, 2 = mouse
		
		this.ouchSound = new Sound( "Audio/PlayerOuch",0.6 )
		this.oofSound = new Sound( "Audio/PlayerOof",0.6 )
		this.shootSound = new Sound( "Audio/PlayerShoot",0.07 )
		
		this.regen = 0.005
		
		const vol = 0.3
		this.bass =
		[
			new Sound( "Music/Bass_1",vol,true ),
			new Sound( "Music/Bass_2",vol,true ),
			new Sound( "Music/Bass_3",vol,true )
		]
		this.drums =
		[
			new Sound( "Music/Drums_1",vol,true ),
			new Sound( "Music/Drums_2",vol,true ),
			new Sound( "Music/Drums_3",vol,true )
		]
		this.melody =
		[
			new Sound( "Music/Melody_1",vol,true ),
			new Sound( "Music/Melody_2",vol,true ),
			new Sound( "Music/Melody_3",vol,true )
		]
	}
	
	Update( kbd,mouse,gfx,enemies )
	{
		let move = Vec2.zero()
		
		if( this.wings == 0 )
		{
			if( kbd.KeyDown( 'W' ) ) --move.y
			if( kbd.KeyDown( 'S' ) ) ++move.y
			if( kbd.KeyDown( 'A' ) ) --move.x
			if( kbd.KeyDown( 'D' ) ) ++move.x
			if( move.x != 0 || move.y != 0 ) this.rot = Math.atan2( move.y,move.x ) + Math.PI / 2.0
			
		}
		else if( this.wings == 1 )
		{
			if( kbd.KeyDown( 'W' ) ) --move.y
			if( kbd.KeyDown( 'S' ) ) ++move.y
			if( kbd.KeyDown( 'A' ) ) this.rot -= this.rotSpd
			if( kbd.KeyDown( 'D' ) ) this.rot += this.rotSpd
			
			move.x = Math.cos( this.rot + Math.PI / 2.0 ) * move.y
			move.y = Math.sin( this.rot + Math.PI / 2.0 ) * move.y
		}
		else
		{
			move = new Vec2( mouse.x,mouse.y ).Sub( this.pos )
			
			if( !mouse.down && ( move.x != 0 || move.y != 0 ) )
			{
				this.rot = Math.atan2( move.y,move.x ) + Math.PI / 2.0
			}
		}
		
		this.vel.Add( move.Normalize().Mult( this.spd ) )
		
		if( this.vel.GetLenSq() > this.maxSpd * this.maxSpd )
		{
			this.vel = this.vel.Normalize().Mult( this.maxSpd )
		}
		
		this.Move( this.vel )
		while( this.IsOff( Rect.IsOffUp,gfx ) ) this.Move( new Vec2( 0,this.moveStep ) )
		while( this.IsOff( Rect.IsOffDown,gfx ) ) this.Move( new Vec2( 0,-this.moveStep ) )
		while( this.IsOff( Rect.IsOffLeft,gfx ) ) this.Move( new Vec2( this.moveStep,0 ) )
		while( this.IsOff( Rect.IsOffRight,gfx ) ) this.Move( new Vec2( -this.moveStep,0 ) )
		
		this.vel.Mult( this.decay )
		
		if( this.refire.Update() && mouse.down )
		{
			this.refire.Reset()
			this.shootSound.Play()
			
			if( this.gun == 0 )
			{
				let closest = null
				let dist = 9999999.0
				for( let enemy of enemies )
				{
					const curDist = enemy.pos.Copy().Sub( this.pos )
					if( curDist.GetLenSq() < dist )
					{
						closest = enemy
						dist = curDist.GetLenSq()
					}
				}
				
				if( closest )
				{
					const diff = closest.pos.Copy().Sub( this.pos )
					this.gunRot = Math.atan2( diff.y,diff.x ) + Math.PI / 2.0
					
					this.bullets.push( new Bullet( this.pos.x,this.pos.y,
						diff.x,diff.y,true ) );
				}
			}
			else if( this.gun == 1 )
			{
				for( let i = -1; i <= 1; ++i )
				{
					this.bullets.push( new Bullet( this.pos.x,this.pos.y,
						Math.cos( this.rot - Math.PI / 2.0 + this.shotSpread * i ),
						Math.sin( this.rot - Math.PI / 2.0 + this.shotSpread * i ),true ) )
				}
			}
			else if( this.gun == 2 )
			{
				const mouseDiff = new Vec2( mouse.x,mouse.y ).Sub( this.pos )
				this.bullets.push( new Bullet( this.pos.x,this.pos.y,
					mouseDiff.x,mouseDiff.y,true ) )
			}
		}
		
		if( this.wings == 1 && this.tankRefire.Update() )
		{
			if( enemies.length > 0 )
			{
				this.tankRefire.Reset()
				this.shootSound.Play()
				
				const targetEnemy = enemies[Math.floor( enemies.length / 2 )]
				const diff = targetEnemy.pos.Copy().Sub( this.pos )
				// this.gunRot = Math.atan2( diff.y,diff.x ) + Math.PI / 2.0
				
				this.bullets.push( new Bullet( this.pos.x,this.pos.y,
					diff.x,diff.y,true ) );
			}
		}
		
		this.hp += this.regen
		if( this.hp > this.maxHP ) this.hp = this.maxHP
	}
	
	Draw( gfx )
	{
		// gfx.DrawRectRotate( this.pos.x,this.pos.y,this.size.x,this.size.y,this.col,this.rot )
		gfx.DrawSpriteRotate( this.pos.x,this.pos.y,this.spr,this.rot )
		
		// if( this.gun == 0 )
		// {
		// 	gfx.DrawRectRotate( this.pos.x,this.pos.y,1,2,"blue",this.gunRot )
		// }
	}
	
	CheckOverlap( obj )
	{
		return( Rect.CheckOverlap( this,obj ) )
	}
	
	Move( moveVec )
	{
		this.pos.Add( moveVec )
	}
	
	SetupStats( gun,chassis,wings )
	{
		this.gun = gun
		this.chassis = chassis
		this.wings = wings
		
		// set hp based on chassis
		// refire based on gun
		// console.log( "todo set up hp based on chassis" )
		
		if( this.chassis == 0 )
		{
			this.spd = 0.16
			this.maxSpd = 0.85
			this.maxHP = 1
		}
		else if( this.chassis == 1 )
		{
			this.spd = 0.08
			this.maxSpd = 0.4
			this.maxHP = 5
		}
		else if( this.chassis == 2 )
		{
			this.spd = 0.13
			this.maxSpd = 0.55
			this.maxHP = 2
		}
		
		this.hp = this.maxHP
		
		this.bass[gun].Loop()
		this.drums[chassis].Loop()
		this.melody[wings].Loop()
	}
	
	Reset( gfx )
	{
		this.pos = new Vec2( gfx.scrWidth / 2,gfx.scrHeight * 0.7 )
		this.vel = Vec2.zero()
		this.rot = 0.0
		this.refire.Reset()
		
		this.StopSound()
	}
	
	StopSound()
	{
		for( let s of this.bass ) s.Stop()
		for( let s of this.drums ) s.Stop()
		for( let s of this.melody ) s.Stop()
	}
	
	IsOff( checkFunc,gfx )
	{
		return( checkFunc( this,gfx ) )
	}
}