const imageArray = [
  { src: "images/img6.png", id: 1 },
  { src: "images/img5.png", id: 2 },
  { src: "images/img4.png", id: 3 },
  { src: "images/img3.png", id: 4 },
  { src: "images/img2.png", id: 5 },
  { src: "images/img1.png", id: 6 }
];
let selectedImage = 1;

$(document).ready(function() {
  //Chosen avatar persists a page refresh
  if (selectedImage !== 1) {
    let state = localStorage.getItem("stateImage");
    $(".firstImage").attr("src", state);

    $.each(imageArray, function(key, value) {
      if (value.src === state) {
        selectedImage = value.id;
      }
    });
  }

  //Print avatar list
  $.each(imageArray, function(key, value) {
    $(".list").append(
      "<li id=" +
        value.id +
        "><img src=" +
        value.src +
        " id=" +
        key +
        " /></li>"
    );
  });

  //Change CSS of first avatar when mouse hovers
  $(".firstImage")
    .on("mouseenter", function() {
      $(this).animate({
        opacity: "0.5"
      });
      $(this).css({
        border: "1px solid rgb(155, 160, 163)"
      });
    })
    .on("mouseleave", function() {
      $(this).animate({ opacity: "1" });
      $(this).css({
        border: "0px"
      });
    });

  //Popover opens with scaling animation
  $(".firstImage").on("click", function() {
    $(".container").show(500);
    $(".container").css({
      top: "10%",
      left: "39%",
      margin:
        "-" +
        $(".container").height() / 2 +
        "px 0 0 -" +
        $(".container").width() / 2 +
        "px"
    });
    $("li").css({
      border: "0px"
    });
    $("#" + selectedImage + "").css({
      border: "3px solid rgb(122,161,178)",
      borderRadius: "50%"
    });
  });

  //CSS animation on list of avatars when mouse hovers
  $("li img")
    .on("mouseenter", function() {
      $(this).animate({ opacity: "0.8" });
      $(this).css({
        border: "3px solid rgb(155, 160, 163)"
      });
    })
    .on("mouseleave", function() {
      $(this).animate({ opacity: "1" });
      $(this).css({
        border: "0px"
      });
    });

  //When selected avatar
  $("li").on("click", function() {
    selectedImage = parseInt($(this).attr("id"));
    let srcImage = "";

    $.each(imageArray, function(key, value) {
      if (value.id === selectedImage) {
        srcImage = value.src;
      }
    });

    //Spinner animation
    $(this)
      .css({
        border: "3px solid rgb(122,161,178)",
        borderRadius: "50%"
      })
      .animate(
        {
          borderColor: "solid rgb(122,161,178)",
          borderTopWidth: "0px"
        },
        250
      )
      .animate(
        {
          borderColor: "solid rgb(122,161,178)",
          borderTopWidth: "3px",
          borderRightWidth: "0px"
        },
        250
      )
      .animate(
        {
          borderColor: "solid rgb(122,161,178)",
          borderRightWidth: "3px",
          borderBottomWidth: "0px"
        },
        250
      )
      .animate(
        {
          borderColor: "solid rgb(122,161,178)",
          borderBottomWidth: "3px",
          borderLeftWidth: "0px"
        },
        250
      );

    //Whait for spinner animation to finish and hide container
    $(".container")
      .delay(1000)
      .hide(500);

    //Displaying selected avatar
    $(".firstImage").attr("src", srcImage);

    //Seting new local storage if page is reloaded
    localStorage.setItem("stateImage", srcImage);
  });
});

//The spinner is not like the one requested in the assignment, I couldn't figure out how to make
//it work that way, although I'm confident that with a bit of help, I would be able to display it
//properly.
//Also, wasn't able to succesfully "click outside the popover area will result in the popover closing".
