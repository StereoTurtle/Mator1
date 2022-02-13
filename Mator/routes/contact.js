var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', (request, response) => {
  const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "adrianozuna133@gmail.com", // this should be YOUR GMAIL account
			pass: "laikmayo13" // this should be your password
		}
	});

	var textBody = `Nombre: ${request.body.nombre_completo} \n Correo Electronico: ${request.body.correo_electronico} \n Numero de telefono: ${request.body.telefono} Mensaje: ${request.body.mensaje}`;
	var htmlBody = `Nombre: ${request.body.nombre_completo} <br> Correo Electronico: ${request.body.correo_electronico} <br> Numero de telefono: ${request.body.telefono} <br> Mensaje: ${request.body.mensaje}`;
	var mail = {
		from: "adrianozuna133@gmail.com", // sender address
		to: "adrianozuna133@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: "Mensaje de contacto", // Subject line
		text: textBody,
		html: htmlBody
	};

	// send mail with defined transport object
	transporter.sendMail(mail, function (err, info) {
		if(err) {
			console.log(err);
			response.json({ message: "message not sent: an error occured; check the server's console log" });
		}
		else {
			response.json({ message: `message sent: ${info.messageId}` });
		}
	});
});

module.exports = router;

module.exports = router;
