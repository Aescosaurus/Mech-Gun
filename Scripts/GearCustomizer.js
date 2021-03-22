class GearCustomizer
{
	constructor( x,y,start,partHand,icons )
	{
		this.icons = icons
		this.x = x
		this.y = y
		
		this.lButton = new Button( x - 12,y + 6,new Sprite( "Images/ArrowL" ),
			new Sprite( "Images/ArrowLLit" ),partHand )
		this.rButton = new Button( x + 55,y + 6,new Sprite( "Images/ArrowR" ),
			new Sprite( "Images/ArrowRLit" ),partHand )
		
		this.curIcon = start
	}
	
	Update( mouse )
	{
		if( this.lButton.Update( mouse ) )
		{
			if( --this.curIcon < 0 ) this.curIcon = this.icons.length - 1
		}
		
		if( this.rButton.Update( mouse ) )
		{
			if( ++this.curIcon > this.icons.length - 1 ) this.curIcon = 0
		}
	}
	
	Draw( gfx )
	{
		this.lButton.Draw( gfx )
		this.rButton.Draw( gfx )
		
		gfx.DrawSprite( this.x,this.y,this.icons[this.curIcon] )
	}
	
	GetChoice()
	{
		return( this.curIcon )
	}
}