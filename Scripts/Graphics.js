class Graphics
{
	constructor()
	{
		this.canv = document.getElementById( "canv" )
		this.ctx = this.canv.getContext( "2d" )
		
		this.ctx.imageSmoothingEnabled = false
		this.ctx.mozImageSmoothingEnabled = false
		
		const scale = 5
		this.scale = scale
		
		this.ctx.scale( scale,scale )
		
		this.scrWidth = this.canv.width / scale
		this.scrHeight = this.canv.height / scale
		this.scrCenter = new Vec2( this.scrWidth / 2,this.scrHeight / 2 )
	}
	
	DrawRect( x,y,width,height,color )
	{
		this.ctx.fillStyle = color
		this.ctx.fillRect( x,y,width,height )
	}
	
	// Centers rect for you
	DrawRectRotate( x,y,width,height,color,rot )
	{
		this.ctx.save()
		this.ctx.translate( x,y )
		this.ctx.rotate( rot )
		this.ctx.translate( -x,-y )
		
		this.DrawRect( x - width / 2,y - height / 2,width,height,color )
		
		this.ctx.restore()
	}
	
	DrawSprite( x,y,sprite )
	{
		this.ctx.drawImage( sprite.img,x,y )
	}
	
	DrawSpriteRotate( x,y,sprite,rot )
	{
		this.ctx.save()
		this.ctx.translate( x,y )
		this.ctx.rotate( rot )
		this.ctx.translate( -x,-y )
		
		this.DrawSprite( x - sprite.width / 2,y - sprite.height / 2,sprite )
		
		this.ctx.restore()
	}
}