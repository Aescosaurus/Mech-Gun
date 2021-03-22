class Main
{
	constructor()
	{
		this.gfx = new Graphics()
		this.kbd = new Keyboard()
		this.mouse = new Mouse( this.gfx )
		
		this.playerBullets = []
		this.player = new Player( this.gfx,this.playerBullets )
		this.enemies = []
		this.enemyBullets = []
		
		this.minBasicEnemies = 5
		this.wave = 0
		this.waveDifficultyIncrease = 1.0
		this.waveDifficultyPenalty = 0.5
		this.basicPercent = 1.3
		this.chaserPercent = 0.45
		this.wandererPercent = 0.2
		this.rangerPercent = 0.13
		this.bomberPercent = 0.1
		
		this.SpawnEnemyWave()
		
		this.scrRect = {
			pos: this.gfx.scrCenter,
			size: new Vec2( this.gfx.scrWidth,this.gfx.scrHeight ) }
		
		this.partHand = new ParticleHandler()
		
		this.menu = new Menu( this.partHand )
		this.numberDrawer = new NumberDrawer()
		this.highScore = new HighScore( this.numberDrawer )
		
		this.bgSpr = new Sprite( "Images/Background" )
		this.bgMove = 0
		this.bgMoveSpd = 0.2
		this.bgReset = 128 * 2
		
		this.waveScore = 500
		
		this.gameOver = false
		this.gameOverSpr = new Sprite( "Images/GameOver" )
		this.retryButton = new Button( 30,100,new Sprite( "Images/RetryButton" ),
			new Sprite( "Images/RetryButtonLit" ),this.partHand )
		
		this.bulletPartChance = 0.1
	}
	
	Update()
	{
		this.partHand.Update()
		
		if( this.menu.IsOpen() )
		{
			if( this.menu.Update( this.kbd,this.mouse ) )
			{
				this.player.SetupStats( this.menu.GetGun(),this.menu.GetChassis(),this.menu.GetWings() )
			}
			return
		}
		else if( this.gameOver )
		{
			if( this.retryButton.Update( this.mouse ) )
			{
				this.gameOver = false
				this.menu.menuMusic.Loop()
				
				this.highScore.Reset()
				this.player.Reset( this.gfx )
				
				this.enemies.length = 0
				this.enemyBullets.length = 0
				this.playerBullets.length = 0
				
				this.wave = 0
				this.bgMove = 0
				
				this.menu.Open()
				
				this.SpawnEnemyWave()
			}
			
			return
		}
		
		this.player.Update( this.kbd,this.mouse,this.gfx,this.enemies )
		
		const enemyUpdateInfo = {
			gfx: this.gfx,
			player: this.player
		}
		for( let i in this.enemies )
		{
			const enemy = this.enemies[i]
			
			enemy.Update( enemyUpdateInfo )
		}
		
		for( let i in this.playerBullets )
		{
			const bullet = this.playerBullets[i]
			bullet.Update()
			if( Random.Range( 0.0,1.0 ) < this.bulletPartChance )
			{
				this.partHand.CreateTrail( bullet.pos.x,bullet.pos.y )
			}
			
			if( !Rect.IsContainedBy( bullet,this.scrRect ) )
			{
				this.playerBullets.splice( i,1 )
				continue
			}
			
			for( let j in this.enemies )
			{
				const enemy = this.enemies[j]
				if( Rect.CheckOverlap( enemy,bullet ) )
				{
					this.playerBullets.splice( i,1 )
					if( --this.enemies[j].hp < 1 )
					{
						Enemy.oofSound.Play()
						this.partHand.CreateExplosion( enemy.pos.x,enemy.pos.y,25 * enemy.maxHP )
						
						this.highScore.Score( this.enemies[j].score )
						this.enemies.splice( j,1 )
						
						if( this.enemies.length < 1 )
						{
							this.SpawnEnemyWave()
							this.highScore.Score( this.waveScore )
						}
					}
					else
					{
						Enemy.ouchSound.Play()
						this.partHand.CreateExplosion( enemy.pos.x,enemy.pos.y,10 * enemy.maxHP )
					}
					
					continue
				}
			}
		}
		
		for( let i in this.enemyBullets )
		{
			const bullet = this.enemyBullets[i]
			bullet.Update()
			bullet.Update2()
			if( Random.Range( 0.0,1.0 ) < this.bulletPartChance )
			{
				this.partHand.CreateTrail( bullet.pos.x,bullet.pos.y )
			}
			
			if( !Rect.IsContainedBy( bullet,this.scrRect ) )
			{
				this.enemyBullets.splice( i,1 )
				continue
			}
			
			if( this.player.CheckOverlap( bullet ) )
			{
				this.enemyBullets.splice( i,1 )
				
				if( --this.player.hp < 1 )
				{
					this.player.oofSound.Play()
					this.partHand.CreateExplosion( this.player.pos.x,this.player.pos.y,500 )
					
					this.gameOver = true
					this.player.StopSound()
					this.highScore.SaveScore()
					return
					// continue
				}
				else
				{
					this.player.ouchSound.Play()
					this.partHand.CreateExplosion( this.player.pos.x,this.player.pos.y,200 )
				}
			}
		}
		
		for( let i in this.enemyBullets )
		{
			const b = this.enemyBullets[i]
			if( b.explode )
			{
				for( let j = 0; j < 6; ++j )
				{
					this.enemyBullets.push( new Bullet( b.pos.x,b.pos.y,
						Math.cos( b.rot + ( 360.0 / 8 ) * j ),
						Math.sin( b.rot + ( 360.0 / 8 ) * j ) ) )
				}
				this.enemyBullets.splice( i,1 )
				break
			}
		}
		
		this.bgMove += this.bgMoveSpd
		if( this.bgMove >= 0 ) this.bgMove -= this.bgReset
	}
	
	Draw()
	{
		if( this.menu.IsOpen() )
		{
			this.menu.Draw( this.gfx )
		}
		else
		{
			this.gfx.DrawSprite( 0,this.bgMove,this.bgSpr )
			
			for( let enemy of this.enemies ) enemy.Draw( this.gfx )
			for( let bullet of this.enemyBullets ) bullet.Draw( this.gfx )
			
			this.player.Draw( this.gfx )
			for( let bullet of this.playerBullets ) bullet.Draw( this.gfx )
			
			this.highScore.Draw( this.gfx )
			
			if( this.gameOver )
			{
				this.gfx.DrawSprite( 3,20,this.gameOverSpr )
				
				this.highScore.DrawPrevScores( this.gfx )
				
				this.retryButton.Draw( this.gfx )
			}
		}
		
		this.partHand.Draw( this.gfx )
	}
	
	SpawnEnemyWave()
	{
		++this.wave
		const spawnExtra = Math.floor( this.wave * this.waveDifficultyIncrease )
		
		for( let i = 0; i < Math.max( this.minBasicEnemies,spawnExtra * this.basicPercent/* * this.waveDifficultyPenalty*/ ); ++i )
		{
			this.enemies.push( new BasicEnemy( Random.Range( 0,this.gfx.scrWidth ),
				-Random.Range( 5,30 ),this.enemyBullets ) )
		}
		
		for( let i = 0; i < Math.floor( spawnExtra * this.chaserPercent ) * this.waveDifficultyPenalty; ++i )
		{
			this.enemies.push( new ChaserEnemy( Random.Range( 0,this.gfx.scrWidth ),
				-Random.Range( 5,30 ),this.enemyBullets ) )
		}
		
		for( let i = 0; i < Math.floor( spawnExtra * this.wandererPercent ) * this.waveDifficultyPenalty; ++i )
		{
			this.enemies.push( new WandererEnemy( Random.Range( 0,this.gfx.scrWidth ),
				-Random.Range( 5,30 ),this.enemyBullets ) )
		}
		
		for( let i = 0; i < Math.floor( spawnExtra * this.rangerPercent ) * this.waveDifficultyPenalty; ++i )
		{
			this.enemies.push( new RangerEnemy( Random.Range( 0,this.gfx.scrWidth ),
				-Random.Range( 5,30 ),this.enemyBullets ) )
		}
		
		for( let i = 0; i < Math.floor( spawnExtra * this.bomberPercent ) * this.waveDifficultyPenalty; ++i )
		{
			this.enemies.push( new BomberEnemy( Random.Range( 0,this.gfx.scrWidth ),
				-Random.Range( 5,30 ),this.enemyBullets ) )
		}
	}
}

{
	const main = new Main()
	
	setInterval( function()
	{
		// main.gfx.DrawRect( 0,0,main.gfx.scrWidth,main.gfx.scrHeight,"#19103f" )
		main.Update()
		main.Draw()
	},1000 / 60.0 )
}