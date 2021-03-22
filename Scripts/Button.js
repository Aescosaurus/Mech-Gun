class Button
{
	constructor( x,y,spr,hoverSpr,partHand )
	{
		this.x = x
		this.y = y
		this.spr = spr
		this.hoverSpr = hoverSpr
		
		this.hover = false
		this.canPress = false
		this.pressed = false
		
		this.partHand = partHand
	}
	
	Update( mouse )
	{
		this.hover = this.spr.Contains( mouse.x,mouse.y,this.x,this.y )
		
		this.pressed = false
		if( mouse.down )
		{
			if( this.canPress )
			{
				if( this.hover )
				{
					this.pressed = true
					Button.clickSound.Play()
					this.partHand.CreateExplosion( mouse.x,mouse.y,Random.Range( 10,25 ),1.7 )
				}
				this.canPress = false
			}
		}
		else this.canPress = true
		
		return( this.pressed )
	}
	
	Draw( gfx )
	{
		gfx.DrawSprite( this.x,this.y,( this.hover ? this.hoverSpr : this.spr ) )
	}
}

Button.clickSound = new Sound( "Audio/ButtonClick",0.5 )