class Vec2
{
	constructor( x,y )
	{
		this.x = x
		this.y = y
	}
	
	Add( other )
	{
		this.x += other.x
		this.y += other.y
		
		return( this )
	}
	
	Sub( other )
	{
		this.x -= other.x
		this.y -= other.y
		
		return( this )
	}
	
	Mult( amount )
	{
		this.x *= amount
		this.y *= amount
		
		return( this )
	}
	
	Div( amount )
	{
		this.x /= amount
		this.y /= amount
		
		return( this )
	}
	
	GetLenSq()
	{
		return( this.x * this.x + this.y * this.y )
	}
	
	GetLen()
	{
		return( Math.sqrt( this.GetLenSq() ) )
	}
	
	Normalize()
	{
		let len = this.GetLen()
		
		if( len > 0.0 )
		{
			this.x /= len
			this.y /= len
		}
		
		return( this )
	}
	
	Copy()
	{
		return( new Vec2( this.x,this.y ) )
	}
}

Vec2.zero = function()
{
	return( new Vec2( 0,0 ) )
}

Vec2.one = function()
{
	return( new Vec2( 1,1 ) )
}