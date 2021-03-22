class Bullet
{
	constructor( x,y,xVel,yVel,bigHitbox = false )
	{
		this.pos = new Vec2( x,y )
		this.size = Vec2.one().Copy().Mult( bigHitbox ? 5 : 3 )
		this.spd = 0.9
		this.vel = new Vec2( xVel,yVel ).Normalize().Mult( this.spd )
		this.rot = Math.atan2( this.vel.y,this.vel.x )
		this.rotSpd = 0.3
	}
	
	Update()
	{
		this.pos.Add( this.vel )
		
		this.rot += this.rotSpd
	}
	
	Update2()
	{
	}
	
	Draw( gfx )
	{
		// gfx.DrawRect( this.pos.x - this.size.x / 2,this.pos.y - this.size.y / 2,
		// 	this.size.x,this.size.y,"red" )
		// gfx.DrawRectRotate( this.pos.x,this.pos.y,this.size.x,this.size.y,"red",this.rot )
		gfx.DrawSpriteRotate( this.pos.x,this.pos.y,Bullet.spr,this.rot )
	}
}

Bullet.spr = new Sprite( "Images/Bullet" )