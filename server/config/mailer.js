var sendgrid_username   = process.env.SENDGRID_USERNAME || 'azure_8fb283a721afb8bab790c0835f98b6a4@azure.com';
var sendgrid_password   = process.env.SENDGRID_PASSWORD || 'LqCfqpmgAE113rs';

var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);

var sendMail = function(to) {

	var email      = new sendgrid.Email();

	email.addTo(to);
	email.setFrom(to);
	email.setSubject('[sendgrid-php-example] Owl');
	email.setText('Owl are you doing?');
	email.setHtml('<strong>%how% are you doing?</strong>');
	email.addSubstitution("%how%", "Owl");
	email.addHeader('X-Sent-Using', 'SendGrid-API');
	email.addHeader('X-Transport', 'web');
	email.addFile({path: './gif.gif', filename: 'owl.gif'});

	sendgrid.send(email, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});
}