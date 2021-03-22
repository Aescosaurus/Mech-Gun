class RangerEnemy extends Enemy
{
	constructor( x,y,bullets )
	{
		super( x,y,bullets,new Sprite( "Images/RangerEnemy" ) )
		this.maxHP = 7
		this.hp = this.maxHP
		this.score = 550
		
		this.desiredDist = 30.0
		this.moveSpd = 0.2
		this.refire = new Timer( 0.11 )
		this.refire.Update( Random.Range( 0.0,this.refire.GetDuration() ) )
		this.recharge = new Timer( 2.0 )
		this.recharge.Update( Random.Range( 0.0,this.recharge.GetDuration() ) )
		
		this.volleySize = 10
		this.curVolleySpot = 0
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
		
		if( this.recharge.Update() )
		{
			if( this.refire.Update() )
			{
				this.refire.Reset()
				Enemy.shootSound.Play()
				
				this.bullets.push( new Bullet( this.pos.x,this.pos.y,
					Math.cos( this.rot - Math.PI / 2.0 ),Math.sin( this.rot - Math.PI / 2.0 ) ) )
				
				if( ++this.curVolleySpot > this.volleySize )
				{
					this.curVolleySpot = 0
					this.recharge.Reset()
				}
			}
		}
	}
}