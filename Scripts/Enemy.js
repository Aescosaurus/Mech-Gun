class Enemy
{
	constructor( x,y,bullets,spr )
	{
		this.pos = new Vec2( x,y )
		this.size = new Vec2( 4,6 )
		this.bullets = bullets
		this.rot = Math.PI
		this.spr = spr
		this.maxHP = 1
		this.hp = this.maxHP
		
		this.score = 50
	}
	
	Update( info )
	{
	}
	
	Draw( gfx )
	{
		// gfx.DrawRectRotate( this.pos.x,this.pos.y,this.size.x,this.size.y,"red",this.rot )
		gfx.DrawSpriteRotate( this.pos.x,this.pos.y,this.spr,this.rot )
	}
}

Enemy.ouchSound = new Sound( "Audio/EnemyOuch",0.2 )
Enemy.oofSound = new Sound( "Audio/EnemyOof",0.16 )
Enemy.shootSound = new Sound( "Audio/EnemyShoot",0.07 )