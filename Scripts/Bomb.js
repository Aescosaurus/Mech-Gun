class Bomb extends Bullet
{
	constructor( x,y,xVel,yVel )
	{
		super( x,y,xVel,yVel )
		this.vel.Mult( 0.2 )
		
		this.explodeTimer = new Timer( 2.5 )
	}
	
	Update2()
	{
		if( this.explodeTimer.Update() )
		{
			this.explode = true
		}
		
		this.rotSpd = 0.3 * this.explodeTimer.GetPercent()
	}
	
	Draw( gfx )
	{
		gfx.DrawSpriteRotate( this.pos.x,this.pos.y,Bomb.spr,this.rot )
	}
}

Bomb.spr = new Sprite( "Images/Bomb" )