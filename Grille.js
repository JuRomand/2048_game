//Creation de la grille
(function ($) {
  $.fn.DeuxMille48 = function () {
    $(document).ready(function () {
      var score = 0;
      if(!document.cookie){
        document.cookie = "0";
      }
      var contour = $("<div class='contour'></div>");
      var newGame = $("<button type='button'>New Game</button>");
      var scoreElement = $("<p class='score'>Score : " + score + "</p>");
      var bestScoreElement = $("<p class='score'>Best score : " + parseInt(document.cookie) + "</p>")
      $("body").append(contour);
      newGame.insertBefore(contour);
      bestScoreElement.insertAfter(newGame);
      scoreElement.insertAfter(bestScoreElement);
      $(document).keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode === 39) {
          moveRight();
        }
        else if (keycode === 37) {
          moveLeft();
        }
        else if (keycode === 38) {
          moveUp();
        }
        else if (keycode === 40) {
          moveDown();
        }
      });

      for (var i = 1; i <= 16; i++) {
        var div = $("<div id='" + i + "'></div>");
        div.addClass("none");
        $(contour).append(div);
      }

      var countNewCase = 0;
      (function start2Cases() {
        while (countNewCase < 2) {
          var id = randomNumber(16);
          if ($("#" + id).attr("class") === "none") {
            let div = $("#" + id);
            div.removeClass();
            div.addClass("case2").text(2);
            countNewCase++;
          } else {
            start2Cases();
          }
        }
      })();

      newGame.click(function () {
        location.reload();
      });

      //FUNCTIONS
      var hasMoved = false;
      function animateMerge(div){
        div.animate({paddingRight: 10}, 50);
        div.animate({paddingRight: 0}, 50);
        div.animate({paddingLeft: 10}, 50);
        div.animate({paddingLeft: 0}, 50);
      }

      function moveLineRight(setJ) {
        for (let i = 4; i > 1; i--) {
          fillBlankRight(setJ);
        }
        mergeRight(setJ);
        fillBlankRight(setJ);
      }

      function moveLineLeft(setJ) {
        for (let i = 4; i > 1; i--) {
          fillBlankLeft(setJ);
        }
        mergeLeft(setJ);
        fillBlankLeft(setJ);
      }

      function moveColUp(setJ) {
        for (let i = 4; i > 1; i--) {
          fillBlankUp(setJ);
        }
        mergeUp(setJ);
        fillBlankUp(setJ);
      }

      function moveColDown(setJ) {
        for (let i = 4; i > 1; i--) {
          fillBlankDown(setJ);
        }
        mergeDown(setJ);
        fillBlankDown(setJ);
      }

      function fillBlankRight(setJ) {
        for (let j = setJ; j > setJ - 3; j--) {
          var div = $("#" + j);
          var divBefore = $("#" + (j - 1));
          if (div.attr('class') === "none" && divBefore.attr('class') !== "none") {
            var newClass = divBefore.attr('class');
            var newText = divBefore.text();
            div.removeClass();
            div.addClass(newClass).text(newText);
            divBefore.removeClass();
            divBefore.addClass("none").text("");
            hasMoved = true;
          }
        }
      }

      function fillBlankLeft(setJ) {
        for (let j = setJ; j < setJ + 3; j++) {
          var div = $("#" + j);
          var divAfter = $("#" + (j + 1));
          if (div.attr('class') === "none" && divAfter.attr('class') !== "none") {
            var newClass = divAfter.attr('class');
            var newText = divAfter.text();
            div.removeClass();
            div.addClass(newClass).text(newText);
            divAfter.removeClass();
            divAfter.addClass("none").text("");
            hasMoved = true;
          }
        }
      }

      function fillBlankUp(setJ) {
        for (let j = setJ; j < setJ + 12; j += 4) {
          var div = $("#" + j);
          var divAfter = $("#" + (j + 4));
          if (div.attr('class') === "none" && divAfter.attr('class') !== "none") {
            var newClass = divAfter.attr('class');
            var newText = divAfter.text();
            div.removeClass();
            div.addClass(newClass).text(newText);
            divAfter.removeClass();
            divAfter.addClass("none").text("");
            hasMoved = true;
          }
        }
      }

      function fillBlankDown(setJ) {
        for (let j = setJ; j > setJ - 12; j -= 4) {
          var div = $("#" + j);
          var divBefore = $("#" + (j - 4));
          if (div.attr('class') === "none" && divBefore.attr('class') !== "none") {
            var newClass = divBefore.attr('class');
            var newText = divBefore.text();
            div.removeClass();
            div.addClass(newClass).text(newText);
            divBefore.removeClass();
            divBefore.addClass("none").text("");
            hasMoved = true;
          }
        }
      }

      function mergeRight(setJ) {
        for (let j = setJ; j > setJ - 3; j--) {
          var div = $("#" + j);
          var divBefore = $("#" + (j - 1));
          if (div.attr('class') !== "none") {
            if (divBefore.attr('class') === div.attr('class')) {
              divBefore.removeClass();
              divBefore.addClass("none").text("");
              let number = parseInt(div.text());
              number *= 2;
              score += number;
              if(score > parseInt(document.cookie)){
                document.cookie = "" + score + "";
                bestScoreElement.text("Best score: " + score);
              }
              if (number === 2048) {
                Victory();
              }
              div.removeClass();
              div.addClass('case' + number).text(number);
              hasMoved = true;
              animateMerge(div);
            }

          }
        }
      }

      function mergeLeft(setJ) {
        for (let j = setJ; j < setJ + 3; j++) {
          var div = $("#" + j);
          var divAfter = $("#" + (j + 1));
          if (div.attr('class') !== "none") {
            if (divAfter.attr('class') === div.attr('class')) {
              divAfter.removeClass();
              divAfter.addClass("none").text("");
              let number = parseInt(div.text());
              number *= 2;
              score += number;
              if(score > parseInt(document.cookie)){
                document.cookie = "" + score + "";
                bestScoreElement.text("Best score: " + score);
              }
              if (number === 2048) {
                Victory();
              }
              div.removeClass();
              div.addClass('case' + number).text(number);
              hasMoved = true;
              animateMerge(div);
            }
          }
        }
      }

      function mergeUp(setJ) {
        for (let j = setJ; j < setJ + 12; j += 4) {
          var div = $("#" + j);
          var divAfter = $("#" + (j + 4));
          if (div.attr('class') !== "none") {
            if (divAfter.attr('class') === div.attr('class')) {
              divAfter.removeClass();
              divAfter.addClass("none").text("");
              let number = parseInt(div.text());
              number *= 2;
              score += number;
              if(score > parseInt(document.cookie)){
                document.cookie = "" + score + "";
                bestScoreElement.text("Best score: " + score);
              }
              if (number === 2048) {
                Victory();
              }
              div.removeClass();
              div.addClass('case' + number).text(number);
              hasMoved = true;
              animateMerge(div);
            }

          }
        }
      }

      function mergeDown(setJ) {
        for (let j = setJ; j > setJ - 12; j -= 4) {
          var div = $("#" + j);
          var divBefore = $("#" + (j - 4));
          if (div.attr('class') !== "none") {
            if (divBefore.attr('class') === div.attr('class')) {
              divBefore.removeClass();
              divBefore.addClass("none").text("");
              let number = parseInt(div.text());
              number *= 2;
              score += number;
              if(score > parseInt(document.cookie)){
                document.cookie = "" + score + "";
                bestScoreElement.text("Best score: " + score);
              }
              if (number === 2048) {
                Victory();
              }
              div.removeClass();
              div.addClass('case' + number).text(number);
              hasMoved = true;
              animateMerge(div);
            }
          }
        }
      }

      //MOVES

      function randomNumber(max) {
        return Math.floor((Math.random() * (max)) + 1);
      }

      function newCase() {
        var id = randomNumber(16);
        var deuxOuQuatre = randomNumber(200);
        var countCase = 0;
        if ($("#" + id).attr("class") === "none" && countCase === 0) {
          let div = $("#" + id);
          div.removeClass();
          if (deuxOuQuatre < 195) {
            div.addClass("case2").text(2);
            $(div).fadeTo(300, 0.5);
            $(div).fadeTo(300, 1);
          } else {
            div.addClass("case4").text(4);
            $(div).fadeTo(300, 0.5);
            $(div).fadeTo(300, 1);                      }
          } else if (countCase === 0) {
            newCase();
          }

        }

        function Victory() {
          alert("YOU WIN!!");
        }

        function moveCheckRight() {
          for (let setJ = 4; setJ <= 16; setJ += 4) {
            for (let j = setJ; j > setJ - 3; j--) {
              var div = $("#" + j);
              var divBefore = $("#" + (j - 1));
              if (divBefore.attr('class') === div.attr('class')) {
                return true;
              }

            }
          }
          return false;
        }

        function moveCheckLeft() {
          for (let setJ = 1; setJ <= 13; setJ += 4) {
            for (let j = setJ; j < setJ + 3; j++) {
              var div = $("#" + j);
              var divAfter = $("#" + (j + 1));
              if (divAfter.attr('class') === div.attr('class')) {
                return true;
              }
            }
          }
          return false;
        }

        function moveUpCheck() {
          for (let setJ = 1; setJ <= 4; setJ += 1) {
            for (let j = setJ; j < setJ + 12; j += 4) {
              var div = $("#" + j);
              var divAfter = $("#" + (j + 4));
              if (divAfter.attr('class') === div.attr('class')) {
                return true;
              }
            }
          }
          return false;
        }

        function moveDownCheck() {
          for (let setJ = 13; setJ <= 16; setJ += 1) {

            for (let j = setJ; j > setJ - 12; j -= 4) {
              var div = $("#" + j);
              var divBefore = $("#" + (j - 4));
              if (divBefore.attr('class') === div.attr('class')) {
                return true;
              }
            }
          }
          return false;
        }

        function checkblank() {
          for (let i = 1; i <= 16; i++) {
            let div = $("#" + i);
            if (div.text() === "") {
              return false;
            }
          }
          return true;
        }

        function gameOver() {
          if (checkblank() && !moveCheckLeft() && !moveCheckRight() && !moveUpCheck() && !moveDownCheck()) {
            alert("Game Over");
          }
        }

        function moveRight() {
          hasMoved = false;
          for (let setJ = 4; setJ <= 16; setJ += 4) {
            moveLineRight(setJ);
          }
          if (hasMoved === true) {
            scoreElement.text("Score : " + score);
            newCase();
          }
          gameOver();
        }

        function moveLeft() {
          hasMoved = false;
          for (let setJ = 1; setJ <= 13; setJ += 4) {
            moveLineLeft(setJ);
          }
          if (hasMoved === true) {
            scoreElement.text("Score : " + score);
            newCase();
          }
          gameOver();
        }


        function moveUp() {
          hasMoved = false;
          for (let setJ = 1; setJ <= 4; setJ += 1) {
            moveColUp(setJ);
          }
          if (hasMoved === true) {
            scoreElement.text("Score : " + score);
            newCase();
          }
          gameOver();
        }

        function moveDown() {
          hasMoved = false;
          for (let setJ = 13; setJ <= 16; setJ += 1) {
            moveColDown(setJ);
          }
          if (hasMoved === true) {
            scoreElement.text("Score : " + score);
            newCase();
          }
          gameOver();
        }

      }
    );
  };
})(jQuery);
