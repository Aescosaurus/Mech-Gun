class BasicEnemy extends Enemy
{
	constructor( x,y,bullets )
	{
		super( x,y,bullets,new Sprite( "Images/BasicEnemy" ) )
		this.score = 50
		
		this.desiredDist = 40.0
		this.moveSpd = 0.1
		this.refire = new Timer( 1.5 )
		this.refire.Update( Random.Range( 0.0,this.refire.GetDuration() ) )
	}
	
	Update( info )
	{
		let diff = info.gfx.scrCenter.Copy().Sub( this.pos )
		if( diff.GetLenSq() > this.desiredDist * this.desiredDist )
		{
			this.pos.Add( diff.Normalize().Mult( this.moveSpd ) )
		}
		
		const playerDiff = info.player.pos.Copy().Sub( this.pos )
		this.rot = Math.atan2( playerDiff.y,playerDiff.x ) + Math.PI / 2.0
		
		if( this.refire.Update() )
		{
			this.refire.Reset()
			Enemy.shootSound.Play()
			
			this.bullets.push( new Bullet( this.pos.x,this.pos.y,
				Math.cos( this.rot - Math.PI / 2.0 ),Math.sin( this.rot - Math.PI / 2.0 ) ) )
		}
	}
}