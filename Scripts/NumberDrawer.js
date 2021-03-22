class NumberDrawer
{
	constructor()
	{
		this.nums = []
		
		for( let i = 0; i < 10; ++i )
		{
			this.nums.push( new Sprite( "Images/H" + i ) )
		}
	}
	
	DrawNum( x,y,num,gfx )
	{
		for( let i in num )
		{
			gfx.DrawSprite( x + i * ( this.nums[0].width + 1 ),y,this.nums[num[i]] )
		}
	}
}