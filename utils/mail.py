import smtplib
from socket import gaierror
import sys

port = 2525
smtp_server = "smtp.mailtrap.io"
user = "896d5d909cb530"
password = "10fac59536cf69"

sender = "from@example.com"
recievers = [sys.argv[1]]

message = f"""\
Subject: Hi {sys.argv[1]}
To: {recievers}
From: {sender}

{sys.argv[3]}. {sys.argv[2]}"""

try:
    with smtplib.SMTP(smtp_server, port) as server:
        server.login(user, password)
        server.sendmail(sender, recievers, message)

    print('Sent')
except (gaierror, ConnectionRefusedError):
    print('Failed to connect to the server. Bad connection settings?')
except smtplib.SMTPServerDisconnected:
    print('Failed to connect to the server. Wrong user/password?')
except smtplib.SMTPException as e:
    print('SMTP error occurred: ' + str(e))
