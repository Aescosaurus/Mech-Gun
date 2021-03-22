class BomberEnemy extends Enemy
{
	constructor( x,y,bullets )
	{
		super( x,y,bullets,new Sprite( "Images/BomberEnemy" ) )
		this.maxHP = 10
		this.hp = this.maxHP
		this.score = 850
		
		this.desiredDist = 30.0
		this.moveSpd = 0.2
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
			
			const target = new Vec2(
				Random.Range( 0,info.gfx.scrWidth ),
				Random.Range( 0,info.gfx.scrHeight ) )
			const diff = target.Sub( this.pos ).Normalize()
			this.bullets.push( new Bomb( this.pos.x,this.pos.y,diff.x,diff.y ) )
		}
	}
}