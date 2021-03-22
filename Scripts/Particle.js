class Particle
{
	constructor( x,y,xVel,yVel,lifetime = 0.3 )
	{
		this.pos = new Vec2( x,y )
		this.vel = new Vec2( xVel,yVel )
		this.lifetime = new Timer( lifetime )
		this.col = Particle.colors[Math.floor( Random.Range( 0,Particle.colors.length ) )]
	}
	
	Update()
	{
		this.lifetime.Update()
		
		this.pos.Add( this.vel )
	}
	
	Draw( gfx )
	{
		gfx.DrawRect( this.pos.x,this.pos.y,1,1,this.col )
	}
}

Particle.colors =
[
	"#3d548b",
	"#4b829c",
	"#a5d7f4"
]