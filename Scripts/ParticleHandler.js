class ParticleHandler
{
	constructor()
	{
		this.particles = []
	}
	
	Update()
	{
		for( let i in this.particles )
		{
			this.particles[i].Update()
			
			if( this.particles[i].lifetime.IsDone() ) this.particles.splice( i,1 )
		}
	}
	
	Draw( gfx )
	{
		for( let part of this.particles ) part.Draw( gfx )
	}
	
	CreateExplosion( x,y,amount,explosionForce = 2 )
	{
		for( let i = 0; i < amount; ++i )
		{
			var moveDir = new Vec2(
				Random.Range( -1.0,1.0 ),
				Random.Range( -1.0,1.0 ) )
			moveDir.Normalize().Mult( Random.Range( 0.1,explosionForce ) )
			
			this.particles.push( new Particle( x,y,moveDir.x,moveDir.y ) )
		}
	}
	
	CreateTrail( x,y )
	{
		this.particles.push( new Particle( x,y,
			Random.Range( -1.0,1.0 ) * 0.06,
			Random.Range( -1.0,1.0 ) * 0.06,
			0.6 ) )
	}
}