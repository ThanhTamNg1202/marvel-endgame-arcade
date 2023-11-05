namespace SpriteKind {
    export const boss = SpriteKind.create()
    export const Boss1 = SpriteKind.create()
    export const complete = SpriteKind.create()
    export const Treasure = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Treasure, function (sprite, otherSprite) {
    DialogMode = true
    game.showLongText("Who is the actor who plays Iron Man in the Marvel Cinematic Universe?", DialogLayout.Bottom)
    story.showPlayerChoices("Robert Downey Jr", "Chris Evans", "Chris Hemsworth")
    if (story.checkLastAnswer("Chris Evans")) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
        info.changeLifeBy(0)
        treasure.setKind(SpriteKind.complete)
        sprites.destroy(treasure, effects.confetti, 500)
    } else if (story.checkLastAnswer("Robert Downey Jr")) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        info.changeLifeBy(1)
        treasure.setKind(SpriteKind.complete)
        sprites.destroy(treasure, effects.confetti, 500)
    } else if (story.checkLastAnswer("Chris Hemsworth")) {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
        info.changeLifeBy(0)
        treasure.setKind(SpriteKind.complete)
        sprites.destroy(treasure, effects.confetti, 500)
    } else {
    	
    }
    DialogMode = false
    pause(100)
})
function changeLevel (num: number) {
    if (num == 1) {
        tiles.setCurrentTilemap(tilemap`level4`)
    } else if (num == 2) {
        tiles.setCurrentTilemap(tilemap`level4`)
    } else if (num == 3) {
        tiles.setCurrentTilemap(tilemap`level1`)
        info.setLife(3)
        boss1()
        treasure = sprites.create(img`
            . . b b b b b b b b b b b b . . 
            . b e 4 4 4 4 4 4 4 4 4 4 e b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b b b b b b b d d b b b b b b b 
            c b b b b b b c c b b b b b b c 
            c c c c c c b c c b c c c c c c 
            b e e e e e c b b c e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.Treasure)
        tiles.placeOnTile(treasure, tiles.getTileLocation(0, 1))
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    tiles.setTileAt(mySprite.tilemapLocation(), assets.tile`transparency16`)
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(MyBoss, effects.disintegrate, 500)
    sprites.destroy(statusbar)
    BossAlive = false
    if (info.life() == 3) {
        info.changeScoreBy(20)
    } else if (info.life() == 2) {
        info.changeScoreBy(15)
    } else if (info.life() == 1) {
        info.changeScoreBy(10)
    } else {
        info.changeScoreBy(25)
    }
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
function boss1 () {
    MyBoss = sprites.create(img`
        ....fffffffffff.........
        ...f88888588888f........
        ...f85888588858f........
        ..f8855585855588f.......
        ..f8885555555888f.......
        ..f8855555555588f.......
        ..f85bbbbbbbbb58f.......
        ..f85bf1bbbf1b58f.......
        ...f5bffbbbffb5f........
        ...f5bbbbbbbbb5f........
        ..f5f5bbbbbbb5f5f.......
        .f555fbbbbbbbf555f......
        .ff555fffffff555ff......
        ...f88555555588f........
        ..f88f8855588f88ff......
        .f555f8885888f5555f.....
        .f55ff5555555ffe73f.....
        ..ff.f5585855f.f59f.....
        ....ff8885888ff.ff......
        ....f888fff888f.........
        ....f55f...f55f.........
        ...f555f...f555f........
        ...fffff...fffff........
        ........................
        `, SpriteKind.Boss1)
    MyBoss.setScale(2, ScaleAnchor.Middle)
    MyBoss.ay = 350
    tiles.placeOnTile(MyBoss, tiles.getTileLocation(11, 8))
    BossAlive = true
    statusbar = statusbars.create(140, 10, StatusBarKind.EnemyHealth)
    statusbar.positionDirection(CollisionDirection.Bottom)
    statusbar.setOffsetPadding(0, 5)
    statusbar.setColor(2, 12, 5)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    statusbar.setBarBorder(2, 15)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss1, function (sprite, otherSprite) {
    if (mySprite.vy > 0 && mySprite.y < MyBoss.y) {
        game.setGameOverEffect(false, effects.blizzard)
        mySprite.vy = -70
        statusbar.value += -10
    } else {
        info.changeLifeBy(-1)
        statusbar.value += 10
    }
    pause(1000)
})
let BossAlive = false
let statusbar: StatusBarSprite = null
let MyBoss: Sprite = null
let treasure: Sprite = null
let DialogMode = false
let mySprite: Sprite = null
mySprite = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    .......fffffffff........
    ......f255225522f.......
    ......f555225552f.......
    ......f511551152f.......
    ......f555555552f.......
    ......f255ff5522f.......
    ......f255555522f.......
    ...fff..fffffff.........
    ...ff2ff2222222f........
    ....fff5f29922f5f.......
    .......ff22222ff2f......
    ........ff2ff2f.22f.....
    .........ff.fff.........
    .........66.6b6.........
    .........66.6b6.........
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
DialogMode = false
scene.cameraFollowSprite(mySprite)
mySprite.ay = 380
changeLevel(3)
game.onUpdate(function () {
    if (BossAlive) {
        if (mySprite.x + 30 < MyBoss.x) {
            MyBoss.vx = -20
            MyBoss.setImage(img`
                ...fffffffffff..........
                ..f88888588888f.........
                ..f85888588858f.........
                .f8855585855588f........
                .f8885555555888f........
                .f8855555555588f........
                .f85bbbbbbbbb58f........
                .f85bf1bbbf1b58f........
                ..f5bffbbbffb5f.........
                ..f5bbbbbbbbb5f.........
                .f5f5bbbbbbb5f5f........
                f555fbbbbbbbf555f.......
                ff555fffffff555ff.......
                ..f88555555588f.........
                .f88f8855588f88ff.......
                f555f8885888f5555f......
                f55ff5555555ffe73f......
                .ff.f5585855f.f59f......
                ...ff8885888ff.ff.......
                ...f888fff888f..........
                ...f55f...f55f..........
                ..f555f...f555f.........
                ..fffff...fffff.........
                ........................
                `)
        } else if (mySprite.x - 30 > MyBoss.x) {
            MyBoss.vx = 20
            MyBoss.setImage(img`
                ...fffffffffff..........
                ..f88888588888f.........
                ..f85888588858f.........
                .f8855585855588f........
                .f8885555555888f........
                .f8855555555588f........
                .f85bbbbbbbbb58f........
                .f85bf1bbbf1b58f........
                ..f5bffbbbffb5f.........
                ..f5bbbbbbbbb5f.........
                .f5f5bbbbbbb5f5f........
                f555fbbbbbbbf555f.......
                ff555fffffff555ff.......
                ..f88555555588f.........
                .f88f8855588f88ff.......
                f555f8885888f5555f......
                f55ff5555555ffe73f......
                .ff.f5585855f.f59f......
                ...ff8885888ff.ff.......
                ...f888fff888f..........
                ...f55f...f55f..........
                ..f555f...f555f.........
                ..fffff...fffff.........
                ........................
                `)
        } else {
            MyBoss.vx = 0
        }
    }
})
forever(function () {
    if (DialogMode == false) {
        controller.moveSprite(mySprite, 100, 0)
    } else if (DialogMode == true) {
        controller.moveSprite(mySprite, 0, 0)
    } else {
    	
    }
})
