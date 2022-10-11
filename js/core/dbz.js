// DETECTS IF MAIN OBJ APP EXISTS, NAMESPACE THE APP CODE
if (!com_canvas) var com_canvas = {}
else if (com_canvas && typeof com_canvas != 'object')
  throw new Error('com_canvas is not an Object type')

// APPLICATION MAIN INIT - DOUGLAS COCKFORD POWER PATTERN
com_canvas.Main = function () {
  // PRIVATE ATTRIBUTES. ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE

  //var iPrivateVar = 10;
  // PRIVATE MEMBERS. ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE.

  /*
	function privateFunction1(){
		alert('privateFunction1');	
	}
  */

  //RETURN OBJECT LITERAL.
  return {
    //PUBLIC ATTRIBUTES ANYONE MAY READ/WRITE.
    NAME: 'Application initialize module',
    VERSION: 1.0,
    AUTHOR: "Daniel Batista",
    YEAR: 2013,

    // PUBLIC MEMBERS ANYONE MAY READ/WRITE. (MAY BE OVERRIDEN).
    // PUBLIC METHOD THAT INITIALIZES MAIN APP.
    init: function () {
      this.dbzGame() // CANVAS - Dragon Ball
    },
    // CANVAS - Dragon Ball
    dbzGame: function () {
      if (!$('canvas#dbz').length) retur

      // Game version 1.0
      // Developed by - Daniel Batista
      var nicks
      var scores

      //GAME INTRO
      function dbzGameIntroFn() {
        $('#dbzWellcome a').click(function () {
          $(this)
            .parent()
            .fadeOut(800, function () {
              $('#dbzIntroctions, #dbzMovement').fadeIn(800)
              $('#dbzIntroctions a').click(function () {
                $(this)
                  .parent()
                  .fadeOut(800, function () {
                    $('#dbzInitGame').fadeIn(800)

                    //$("#formID").validationEngine();

                    $('#playerSave').click(function () {
                      nicks = $('input#nickName').val()
                      preTimerFn()
                      return false
                    })
                  })
                return false
              })
            })
          return false
        })
        // GET From DataBase
        console.log('-> get score list from DB')
        // $.post('data_dbz/dbz_score_list.php #scoresList', function (data) {
        //   $('#score_feedback').html(data)
        // })
      }

      //PRE LOAD Timer
      function preTimerFn() {
        // Volume Sound
        audioPunch.volume = 0.05
        audioTeleport.volume = 0.05
        audioInGame.volume = 0.2

        $('#dbzIntroScreen').hide()
        audioInGame.play()
        $('#dbzBlock').css(
          'background',
          'url(images/bg_namek_790.jpg) no-repeat center center'
        )

        //Audio Button
        $('#sound a').click(function () {
          $(this).toggleClass('off')
          if ($('a.off').is(':visible') == true) {
            audioInGame.pause()
          } else {
            audioInGame.play()
          }
          return false
        })

        var preTimeId
        var sec = 4
        var startWord = 'GO'

        preTimeId = window.setInterval(function () {
          sec--

          $('#preTimer').remove()
          $("<div id='preTimer'>" + sec + '</div>').appendTo('#dbzBlock')

          if (sec === 0) {
            $('#preTimer').remove()
            $(
              "<div id='preTimer'><span>" + startWord + '</span></div>'
            ).appendTo('#dbzBlock')
            setTimeout(function () {
              $('#preTimer').remove()
              dbzGameFn()
            }, 1000)

            clearInterval(preTimeId)

            return
          }
        }, 1000)
      }

      // The GAME
      function dbzGameFn() {
        var canvas = document.getElementById('dbz')
        var ctx = canvas.getContext('2d')

        // Game Vars
        var villainCaught = 0
        var villainSpeed = 1100
        var gameTimer
        var resetId = 0
        // Timer
        var sec = 60
        var id = window.setInterval(function () {
          sec--
          if (sec === 0) {
            clearInterval(id)
            clearInterval(resetId)
            return
          }
        }, 1000)

        // Background image
        var bgReady = false
        var bgImage = new Image()
        bgImage.onload = function () {
          bgReady = true
        }
        bgImage.src = 'images/bg_namek_790.jpg'

        // Background image Game Over
        var bgGameOver = false
        var bgImageOver = new Image()
        bgImageOver.onload = function () {
          bgGameOver = true
        }
        bgImageOver.src = 'images/bg_namek_790_over.jpg'

        // Hero image
        var heroReady = false
        var heroImage = new Image()
        heroImage.onload = function () {
          heroReady = true
        }
        heroImage.src = 'images/ico_goku.png'

        // Hero image Game Over
        var heroGameOver = false
        var heroImageOver = new Image()
        heroImageOver.onload = function () {
          heroGameOver = true
        }
        heroImageOver.src = 'images/ico_goku_over.png'

        // Villain image
        var villainReady = false
        var villainImage = new Image()
        villainImage.onload = function () {
          villainReady = true
        }
        villainImage.src = 'images/ico_freezer.png'

        // Game objects
        var hero = {
          speed: 500, // movement in pixels per second
          x: 0,
          y: 0
        }
        var villain = {
          x: 0,
          y: 0
        }

        // Handle keyboard controls
        var keysDown = {}

        addEventListener(
          'keydown',
          function (e) {
            keysDown[e.keyCode] = true
          },
          false
        )

        addEventListener(
          'keyup',
          function (e) {
            delete keysDown[e.keyCode]
          },
          false
        )

        // Reset the game when the player catches a monster

        var reset = function (caught) {
          if (caught) {
            hero.x = canvas.width / 2
            hero.y = canvas.height / 2
            audioTeleport.pause()
          } else {
            audioTeleport.play()
          }
          // Throw the villain somewhere on the screen randomly
          villain.x = 32 + Math.random() * (canvas.width - 64)
          villain.y = 32 + Math.random() * (canvas.height - 64)

          if (resetId > 0) {
            clearInterval(resetId)
          }
          resetId = setInterval(reset, villainSpeed)
          //console.log(resetId);
        }

        // Update game objects
        var update = function (modifier) {
          if (38 in keysDown) {
            // Player holding up
            hero.y -= hero.speed * modifier
          }
          if (40 in keysDown) {
            // Player holding down
            hero.y += hero.speed * modifier
          }
          if (37 in keysDown) {
            // Player holding left
            hero.x -= hero.speed * modifier
          }
          if (39 in keysDown) {
            // Player holding right
            hero.x += hero.speed * modifier
          }

          // Are they touching?
          if (
            hero.x <= villain.x + 32 &&
            villain.x <= hero.x + 32 &&
            hero.y <= villain.y + 32 &&
            villain.y <= hero.y + 32
          ) {
            ++villainCaught
            reset(true)
            audioPunch.play()
          }
        }

        // Draw everything
        var render = function () {
          if (bgReady) {
            ctx.drawImage(bgImage, 0, 0)
          }

          // Game Over
          if (sec === 0) {
            if (bgGameOver) {
              ctx.drawImage(bgImageOver, 0, 0)
            }

            if (nicks === undefined || nicks === "") {
              nicks = "Vegeta :)"
            }

            var x = canvas.width / 2
            var y = canvas.height / 2            

            ctx.fillStyle = 'yellow'
            ctx.font = '72px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Game Over', x, y - 160)

            ctx.font = '30px Arial'
            ctx.lineWidth = 2
            ctx.strokeStyle = 'orange'
            ctx.fillText(nicks, x, y + 60)
            ctx.strokeStyle = '#FFF'
            ctx.font = '32px Arial'
            ctx.fillText('Your Total Score is:', x, y + 100)

            ctx.fillStyle = '#fff'
            ctx.font = '40px Arial'
            ctx.fillText(villainCaught, x, y + 145)
            scores = villainCaught

            //redraw hero
            hero.x = canvas.width / 2 - 20
            hero.y = canvas.height / 2 - 120
            if (heroGameOver) {
              ctx.drawImage(heroImageOver, hero.x, hero.y)
            }

            // Audio stop
            // audioInGame.pause()
            //audioPunch.pause();
            //audioTeleport.pause();
            // $('#sound a').addClass('off')

            clearInterval(gameTimer)
            clearInterval(resetId)

            // Send To DataBase
            console.log('-> post nicks and scores to DB')
            // $.post(
            //   'data_dbz/dbz_create_score.php',
            //   { nicks: nicks, scores: scores },
            //   function (data) {
            //     // GET From DataBase
            //     $.post(
            //       'data_dbz/dbz_score_list.php #scoresList',
            //       function (data) {
            //         $('#score_feedback').html(data)
            //       }
            //     )
            //   }
            // )

            $('#restart').fadeIn(100, function () {
              $('#restart a').click(function () {
                if (bgReady) {
                  ctx.drawImage(bgImage, 0, 0)
                }
                $('#restart').css('display', 'none')
                $('#dbzBlock').css(
                  'background',
                  'url(images/bg_namek_790.jpg) no-repeat center center'
                )

                audioInGame.currentTime = 0
                $('#sound a').removeClass('off')

                //Audio Button
                $('#sound a').click(function () {
                  $(this).toggleClass('off')
                  if ($('a.off').is(':visible') == true) {
                    audioInGame.pause()
                  } else {
                    audioInGame.play()
                  }
                  return false
                })

                // RESTART
                // preTimerFn()
                // TEMPORARY RELOAD FIX FOR SHOWCASE PURPOSES
                window.location.reload()
              })
            })

            return true
          }

          // Starting objects
          if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y)
          }

          if (villainReady) {
            ctx.drawImage(villainImage, villain.x, villain.y)
          }

          // TIME
          var x = canvas.width - 12
          var y = 12
          ctx.fillStyle = 'purple'
          ctx.font = '24px Arial Black'
          ctx.textAlign = 'right'
          ctx.textBaseline = 'top'
          ctx.fillText('time: ' + sec + ' sec      ', x, y)

          // Score
          ctx.fillStyle = 'purple'
          ctx.font = '24px Arial Black'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'top'
          ctx.fillText('      points: ' + villainCaught, 12, 12)
        }

        // The main game loop
        var main = function () {
          var now = Date.now()
          var delta = now - then

          update(delta / 1000)
          render()

          then = now
        }

        // Let's play this game!
        reset(true)
        var then = Date.now()
        //setInterval(main, 1); // Execute as fast as possible
        gameTimer = setInterval(main, 1)
      }

      //Init the game
      // 1
      dbzGameIntroFn()
      // 2
      // preTimerFn();
      // 3
      //dbzGameFn();
    }
  }
}

// ALIAS NAMESPACE AND INIT CLASSES.
var templateMain = (DBT = com_canvas.Main())

// ON DOM READY INIT APPLICATION.
$(document).ready(function () {
  DBT.init()
})
