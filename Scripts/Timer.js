class Timer
{
	constructor( duration )
	{
		this.dur = duration * 60.0
		this.curTime = 0.0
	}
	
	Update( dt = 1 )
	{
		if( this.curTime <= this.dur ) this.curTime += dt
		
		return( this.IsDone() )
	}
	
	Reset()
	{
		this.curTime = 0.0
	}
	
	IsDone()
	{
		return( this.curTime >= this.dur )
	}
	
	GetDuration()
	{
		return( this.dur )
	}
	
	GetPercent()
	{
		return( Math.min( 1.0,this.curTime / this.dur ) )
	}
}