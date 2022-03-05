$("#userForm").on("submit", function () {
  var formData = $(this).serialize();
  // console.log(formData);
  $.ajax({
    type: "post",
    url: "/users",
    data: formData,
    success: function (result) {
      console.log(result);
      location.href = "user.html";
    },
    error: function (err) {
      $("#tip").html(err.responseJSON.message);
      $("#warning").addClass("bi bi-exclamation-triangle-fill");
      console.log(err.responseJSON.message);
    },
  });
  return false;
});
