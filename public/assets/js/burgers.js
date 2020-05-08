$(function () {
  if (location.pathname === "/") {
    $("body").attr("style", `background-image: url("/assets/image/test.jpeg")`);
  } else {
    $("body").attr(
      "style",
      `background-image: url("/assets/image/EXTERIOR.jpg")`
    );
  }

  $(".change-devoured").on("click", function (event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");
    var newDevouredState = {
      devoured: newDevoured,
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState,
    }).then(function () {
      location.reload();
    });
  });

  $(".create-form").on("submit", function (e) {
    e.preventDefault();
    var newBurger = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(),
    };

    if (location.pathname === "/indexBR") {
      newBurger.language = "pt";
    } else {
      newBurger.language = "en";
    }

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      location.reload();
    });
  });

  $(".delete-burger").on("click", function (e) {
    var id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });

  // click handle to send the page to portuguese
  $("#br").on("click", function () {
    location.replace("/indexBR");
  });

  // click handle to go back to english
  $("#us").on("click", function () {
    location.replace("/");
  });
});
