class Sound
{
	constructor( src,vol = 1.0,ogg = false )
	{
		// vol = 0.0
		this.sound = new Audio( src + ( ogg ? ".ogg" : ".wav" ) )
		this.sound.volume = vol
	}
	
	Play()
	{
		this.sound.currentTime = 0
		this.sound.play()
	}
	
	Loop()
	{
		this.sound.loop = true
		this.sound.play()
	}
	
	Stop()
	{
		this.sound.pause()
		this.sound.currentTime = 0.0
	}
	
	SetVolume( vol )
	{
		this.sound.volume = vol
	}
}