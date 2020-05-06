$(function () {
  $(".change-devoured").on("click", function (event) {
    console.log("you click me");
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newDevoured,
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState,
    }).then(function () {
      console.log("changed eat to", newDevoured);

      location.reload();
    });
  });

  $(".create-form").on("submit", function (e) {
    console.log("you click me");

    e.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(),
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("add new burger");
      location.reload();
    });
  });

  $(".delete-burger").on("click", function (e) {
    console.log("you click me");
    var id = $(this).data("id");

    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);

      location.reload();
    });
  });

  // click handle to send the page to portuguese
  $("#br").on("click", function () {
    location.replace("/indexBR");
    console.log("you click me");
  });

  // click handle to go back to the english page
  $("#us").on("click", function () {
    location.replace("/");

    console.log("you click me");
  });
});
