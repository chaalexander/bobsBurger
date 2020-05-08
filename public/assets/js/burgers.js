$(() => {
  if (location.pathname === "/") {
    $("body").attr("style", `background-image: url("/assets/image/test.jpeg")`);
  } else {
    $("body").attr(
      "style",
      `background-image: url("/assets/image/EXTERIOR.jpg")`
    );
  }

  $(".change-devoured").on("click", (event) => {
    const id = $(this).data("id");
    const newDevoured = $(this).data("newdevoured");
    const newDevouredState = {
      devoured: newDevoured,
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState,
    }).then(() => {
      location.reload();
    });
  });

  $(".create-form").on("submit", (e) => {
    e.preventDefault();
    const newBurger = {
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
    }).then(() => {
      location.reload();
    });
  });

  $(".delete-burger").on("click", (e) => {
    const id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(() => {
      location.reload();
    });
  });

  // click handle to send the page to portuguese
  $("#br").on("click", () => {
    location.replace("/indexBR");
  });

  // click handle to go back to english
  $("#us").on("click", () => {
    location.replace("/");
  });
});
