class WandererEnemy extends Enemy
{
	constructor( x,y,bullets )
	{
		super( x,y,bullets,new Sprite( "Images/WandererEnemy" ) )
		this.maxHP = 4
		this.hp = this.maxHP
		this.score = 200
		
		this.desiredDist = 10.0
		this.moveSpd = 0.3
		this.refire = new Timer( 3.0 )
		this.refire.Update( Random.Range( 0.0,this.refire.GetDuration() ) )
		
		this.retargetTimer = new Timer( 2.0 )
		this.retargetTimer.Update( Random.Range( 0.0,this.retargetTimer.GetDuration() ) )
		this.targetPos = new Vec2( 50,50 )
	}
	
	Update( info )
	{
		let diff = this.targetPos.Copy().Sub( this.pos )
		if( diff.GetLenSq() > this.desiredDist * this.desiredDist )
		{
			this.pos.Add( diff.Normalize().Mult( this.moveSpd ) )
		}
		
		if( this.retargetTimer.Update() )
		{
			this.retargetTimer.Reset()
			
			this.targetPos.x = Random.Range( 10,info.gfx.scrWidth - 10 )
			this.targetPos.y = Random.Range( 10,info.gfx.scrHeight - 10 )
		}
		
		this.rot = Math.atan2( diff.y,diff.x ) + Math.PI / 2.0
		
		if( this.refire.Update() )
		{
			this.refire.Reset()
			Enemy.shootSound.Play()
			
			// this.bullets.push( new Bullet( this.pos.x,this.pos.y,
			// 	Math.cos( this.rot - Math.PI / 2.0 ),Math.sin( this.rot - Math.PI / 2.0 ) ) )
			
			for( let i = 0; i < 8; ++i )
			{
				this.bullets.push( new Bullet( this.pos.x,this.pos.y,
					Math.cos( this.rot - Math.PI / 2.0 + ( 360.0 / 8 ) * i ),
					Math.sin( this.rot - Math.PI / 2.0 + ( 360.0 / 8 ) * i ) ) )
			}
		}
	}
}