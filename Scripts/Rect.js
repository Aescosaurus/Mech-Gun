class Rect
{
	
}

Rect.CheckOverlap = function( obj1,obj2 )
{
	const hSize1 = obj1.size.Copy().Div( 2 )
	const hSize2 = obj2.size.Copy().Div( 2 )
	return( obj1.pos.x - hSize1.x < obj2.pos.x + hSize2.x &&
		obj1.pos.x + hSize1.x > obj2.pos.x - hSize2.x &&
		obj1.pos.y - hSize1.y < obj2.pos.y + hSize2.y &&
		obj1.pos.y + hSize1.y > obj2.pos.y - hSize2.y )
}

// is obj1 contained by obj2
Rect.IsContainedBy = function( obj1,obj2 )
{
	const hSize1 = obj1.size.Copy().Div( 2 )
	const hSize2 = obj2.size.Copy().Div( 2 )
	return( obj1.pos.x - hSize1.x > obj2.pos.x - hSize2.x &&
		obj1.pos.x + hSize1.x < obj2.pos.x + hSize2.x &&
		obj1.pos.y - hSize1.y > obj2.pos.y - hSize2.y &&
		obj1.pos.y + hSize1.y < obj2.pos.y + hSize2.y )
}

Rect.IsOffUp = function( obj )
{
	return( obj.pos.y - obj.size.y / 2 < 0 )
}

Rect.IsOffDown = function( obj,gfx )
{
	return( obj.pos.y + obj.size.y / 2 >= gfx.scrHeight )
}

Rect.IsOffLeft = function( obj )
{
	return( obj.pos.x - obj.size.x / 2 < 0 )
}

Rect.IsOffRight = function( obj,gfx )
{
	return( obj.pos.x + obj.size.x / 2 >= gfx.scrWidth )
}