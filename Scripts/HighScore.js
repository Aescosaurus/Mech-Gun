class HighScore
{
	constructor( numberDrawer )
	{
		this.numberDrawer = numberDrawer
		
		this.score = 0
		
		this.prevScores = []
	}
	
	Draw( gfx )
	{
		this.numberDrawer.DrawNum( 0,0,this.score.toString(),gfx )
	}
	
	DrawPrevScores( gfx )
	{
		for( let i in this.prevScores )
		{
			const score = this.prevScores[i]
			
			this.numberDrawer.DrawNum( 30,50 + i * 10,score.toString(),gfx )
		}
	}
	
	Score( amount )
	{
		this.score += amount
	}
	
	SaveScore()
	{
		this.prevScores.push( this.score )
		
		this.prevScores.sort( function( a,b ) { return( b - a ) } )
		
		while( this.prevScores.length > 5 ) this.prevScores.pop()
	}
	
	Reset()
	{
		this.score = 0
	}
}