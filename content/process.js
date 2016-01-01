 $(document).ready(function(){
	$("#sendmail").click(function(){
		var valid = '';
		var isr = ' is required.';
		var name = $("#name").val();
		var mail = $("#email").val();
		var text = $("#message").val();
		if (name == "") {
			valid += '<br />Your Name'+isr;
		}
		if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
			valid += '<br />A valid Email'+isr;
		}
		if (text == "" || text.length<10) {
			valid += '<br />Message (minimum 10 characters)'+isr;
		}
		if (valid!='') {
			$("#response-error").fadeIn("slow");
			$("#response-error").html(valid);
		}
		else {
			var datastr ='name=' + name + '&mail=' + mail + '&text=' + text;
			$("#response-info").css("display", "block");
			$("#response-error").fadeOut("slow");
			$("#response-info").html("Sending message .... ");
			$("#response-info").fadeIn("slow");
			setTimeout("send('"+datastr+"')",2000);
		}
		return false;
	});
});
function send(datastr){
	$.ajax({	
		type: "POST",
		url: "send.php",
		data: datastr,
		cache: false,
		success: function(html){
		$("#response-info").fadeOut("slow");
		$("#response-success").fadeIn("slow");
		$("#response-success").html(html);
		setTimeout('$("#response-success").fadeOut("slow")',7000);
	}
	});
}
