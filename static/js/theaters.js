$(".theater-box").click(function () {
  const seat_number = $(this).text();
  const seat = seat_number.split("-");
  const showtime_id = $(this).data("showtime-id");
  const theater_id = $(this).data("theater-id");
  if($(this).hasClass("border-primary")) {
    if (confirm(seat_number+"자리로 예매하시겠습니까?")) {
      const uri = NODE_API_HOST+"/v1/theater_tickets"
      const data = {showtime_id: showtime_id, theater_id: theater_id, x: seat[0], y: seat[1]};
      $.post(uri, data, function () {
        alert("예약되었습니다.");
        location.reload();
      })
    }
  } else {
    return alert("이미 예약한 자리입니다.");
  }
})