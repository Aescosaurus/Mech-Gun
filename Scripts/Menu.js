class Menu
{
	constructor( partHand )
	{
		this.open = true
		
		this.startButton = new Button( 25,117,new Sprite( "Images/StartButton" ),
			new Sprite( "Images/StartButtonLit" ),partHand )
		this.started = false
		
		this.combineText = new Sprite( "Images/CombineComponents" )
		this.combineBG = new Sprite( "Images/CombineBG" )
		this.titleSpr = new Sprite( "Images/Title" )
		this.tutSpr = new Sprite( "Images/Instructions" )
		
		const gearX = 22
		this.gearSlots =
		[
			new GearCustomizer( gearX,15,2,partHand,
			[
				new Sprite( "Images/Gun1Icon" ),
				new Sprite( "Images/Gun2Icon" ),
				new Sprite( "Images/Gun3Icon" )
			] ),
			new GearCustomizer( gearX,45,2,partHand,
			[
				new Sprite( "Images/Chassis1Icon" ),
				new Sprite( "Images/Chassis2Icon" ),
				new Sprite( "Images/Chassis3Icon" )
			] ),
			new GearCustomizer( gearX,75,0,partHand,
			[
				new Sprite( "Images/Wing1Icon" ),
				new Sprite( "Images/Wing2Icon" ),
				new Sprite( "Images/Wing3Icon" )
			] )
		]
		
		this.menuMusic = new Sound( "Music/Menu",1.0,true )
	}
	
	Update( kbd,mouse )
	{
		if( this.startButton.Update( mouse ) )
		{
			if( !this.started )
			{
				this.started = true
				this.menuMusic.Loop()
			}
			else
			{
				this.open = false
				this.menuMusic.Stop()
				return( true )
			}
		}
		
		if( this.started )
		{
			for( let slot of this.gearSlots ) slot.Update( mouse )
		}
		
		return( false )
	}
	
	Draw( gfx )
	{
		if( this.started )
		{
			gfx.DrawSprite( 0,0,this.combineBG )
			gfx.DrawSprite( 19,1,this.combineText )
			
			gfx.DrawSprite( 21,103,this.tutSpr )
			
			for( let slot of this.gearSlots ) slot.Draw( gfx )
		}
		else
		{
			gfx.DrawSprite( 0,0,this.titleSpr )
		}
		
		this.startButton.Draw( gfx )
	}
	
	Open()
	{
		this.open = true
	}
	
	GetGun()
	{
		return( this.gearSlots[0].GetChoice() )
	}
	
	GetChassis()
	{
		return( this.gearSlots[1].GetChoice() )
	}
	
	GetWings()
	{
		return( this.gearSlots[2].GetChoice() )
	}
	
	IsOpen()
	{
		return( this.open )
	}
}