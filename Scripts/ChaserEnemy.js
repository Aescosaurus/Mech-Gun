class ChaserEnemy extends Enemy
{
	constructor( x,y,bullets )
	{
		super( x,y,bullets,new Sprite( "Images/ChaserEnemy" ) )
		this.maxHP = 3
		this.hp = this.maxHP
		this.score = 100
		
		this.desiredDist = 10.0
		this.moveSpd = 0.3
		this.refire = new Timer( 2.5 )
		this.refire.Update( Random.Range( 0.0,this.refire.GetDuration() ) )
		
		this.shotSpread = 0.7
	}
	
	Update( info )
	{
		let diff = info.player.pos.Copy().Sub( this.pos )
		if( diff.GetLenSq() > this.desiredDist * this.desiredDist )
		{
			this.pos.Add( diff.Normalize().Mult( this.moveSpd ) )
		}
		
		this.rot = Math.atan2( diff.y,diff.x ) + Math.PI / 2.0
		
		if( this.refire.Update() )
		{
			this.refire.Reset()
			Enemy.shootSound.Play()
			
			// this.bullets.push( new Bullet( this.pos.x,this.pos.y,
			// 	Math.cos( this.rot - Math.PI / 2.0 ),Math.sin( this.rot - Math.PI / 2.0 ) ) )
			
			for( let i = -1; i <= 1; ++i )
			{
				this.bullets.push( new Bullet( this.pos.x,this.pos.y,
					Math.cos( this.rot - Math.PI / 2.0 + this.shotSpread * i ),
					Math.sin( this.rot - Math.PI / 2.0 + this.shotSpread * i ) ) )
			}
		}
	}
}