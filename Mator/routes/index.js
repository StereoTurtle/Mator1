var express = require('express');
var router = express.Router();
var path = require("path")
var nodemailer = require("nodemailer")

const title = 'Mator'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
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

	var textBody = `Nombre: ${request.body.nombre_completo} \n Correo Electronico: ${request.body.correo_electronico} \n Numero de telefono: ${request.body.telefono} \n Materia: ${request.body.materia_select} \n Tipo: ${request.body.tipo} \n Descripion y requisitos: ${request.body.descripcion}`;
	var htmlBody = `Nombre: ${request.body.nombre_completo} <br> Correo Electronico: ${request.body.correo_electronico} <br> Numero de telefono: ${request.body.telefono} <br> Materia: ${request.body.materia_select} <br> Tipo: ${request.body.tipo} <br> Descripion y requisitos: ${request.body.descripcion}`;
	var mail = {
		from: "adrianozuna133@gmail.com", // sender address
		to: "adrianozuna133@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: "Nueva peticion de tarea", // Subject line
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
