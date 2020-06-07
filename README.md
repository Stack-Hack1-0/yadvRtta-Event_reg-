# yadvRtta

Event registration app

Preview app https://calm-anchorage-30458.herokuapp.com/

Link to the presentation: https://docs.google.com/presentation/d/1_VVma39kdxGrYZQNyOkbPofPCfNRD1b0S7zGNnZm3SI/edit?usp=sharing

Presentation also hosted in github here: https://github.com/Stack-Hack1-0/stack_hackeventreg/blob/master/yadvRtta%20%20(1).pdf

An app to register events. Add more description here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
Cloning a repository using the command line

    On GitHub, navigate to the main page of the repository.

    Note: If the repository is empty, you can manually copy the repository page's URL from your browser and skip to step four.

    Under the repository name, click Clone or download.
    Clone or download button

    To clone the repository using HTTPS, under "Clone with HTTPS", click 

. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click Use SSH, then click

    .
    Clone URL button

    Open Terminal.

    Change the current working directory to the location where you want the cloned directory to be made.

    Type git clone, and then paste the URL you copied in Step 2.

    $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

    Press Enter. Your local clone will be created.

    $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
    > Cloning into `Spoon-Knife`...
    > remote: Counting objects: 10, done.
    > remote: Compressing objects: 100% (8/8), done.
    > remove: Total 10 (delta 1), reused 10 (delta 1)
    > Unpacking objects: 100% (10/10), done.

Cloning a repository to GitHub Desktop

    On GitHub, navigate to the main page of the repository.
    Under your repository name, click 

to clone your repository in Desktop. Follow the prompts in GitHub Desktop to complete the clone. For more information, see "Cloning a repository from GitHub to GitHub Desktop."


### Prerequisites

As long as you have a pc, with node, npm running and mongodb you are good to go!

### Installing

A step by step series of examples that tell you how to get a development env running

```
npm install
```

change directory to client, run

```
npm install
```
add your own credentials to existing config.env file,

return to main directory, run

```
npm run dev
```
Now development server will open in your browser.

Use userid: **'admin'** and password: **'password'** to log into admin section.

### Deploying

A step by step series of examples to deploy the app to heroku

On main dirctory run
```
npm run build
```
A build folder will be crated on client folder.

Change NODE_ENV env variable to 'production' in config.env file.

add your deploy credentials to existing config.env file.

run

```
heroku create
```
```
git push heroku master
```
```
heroku ps:scale web=1
```
```
heroku open
```
Heroku link will be open in your browser.

## Built With

* [ReactJS](https://reactjs.org/docs/getting-started.html) - JavaScript library used
* [Node.js](https://nodejs.org/en/docs/) - Backend used
* [Express](https://expressjs.com/en/4x/api.html) - Web application framework used
* [MongoDB](https://docs.mongodb.com/) - Database
* [JWT](https://jwt.io/introduction/) - Used to generate authentication token
* [git](https://guides.github.com/) - Used for managing workflow
* [npm](https://docs.npmjs.com/) - Package manager
* [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) - Used for deploy
* [nodemailer](https://nodemailer.com/about/) - Used for sending mail
* [sendgrid](https://sendgrid.com/)- API used for mail
* [pdfKit](https://pdfkit.org/)- Used for making pdf

## Versioning

For the versions available, see the [https://github.com/Stack-Hack1-0/stack_hackeventreg.git]. 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to all who has contributed here
* And inspired 
