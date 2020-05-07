# ScholarNet

## About

ScholarNetwork is a semester long project for [UIUC's Database Systems class (CS 411](https://wiki.illinois.edu/wiki/display/CS411AASP20/)). ScholarNetwork is a web application that will visualize a massive Google Scholar dataset which includes numerous Articles and Authors. The plan is to also integrate a Neo4j database as well to create interesting graph network visualizations connecting various authors or articles.

## Local Installation

### MySQL

[Download and install MySQL Server (8.0.19)](https://dev.mysql.com/downloads/mysql/)

When configuring the server, take special note of the login you create. For the purposes of this project we have it set to user: root, password: scholarnetwork.

Once installed open up MySQL Workbench and connect to the given server using the aforementioned username/password.

Download the [dbschema.sql](https://github.com/janakshah/ScholarNet/blob/master/dbschema.sql) file.

Within Workbench go to Server > Data Import. Import from Self-Contained file and select the dbschema.sql file. Create a new schema named scholarnetwork, and set the file to import to scholarnetwork, and then click start import.

On the left below navigator swap to schemas and refresh the tab. You should see the scholarnetwork schema appear.

If there isn't a query tab open, go to File > New Query Tab, and from there you can now query the MySQL database as normal. 

For example to view all the articles in the database, first specify the schema:
```sql
USE scholarnetwork;
```

And then you can do a standard select all:
```sql
SELECT * FROM articles;
```

Happy querying!

### Visual Studio Code

While VSCode is not stictly required, this will match our workflow the best.

[Download and install VSCode](https://code.visualstudio.com/)

Open up VSCode and on the right click the branching git icon.

Clone in the repository using this link: https://github.com/janakshah/ScholarNet.git

You can put the repository location wherever you want, just make sure it is accessible.

### Python/Django

[Download and install Python](https://www.python.org/downloads/) (We are currently using Python 3.8.2)

[Install the Python Extension in VSCode](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

Create a virtual environment named env within the ScholarNet project:
```bash
# Source: Microsoft's Django VSCode tutorial

# macOS/Linux
sudo apt-get install python3-venv # If needed
python3 -m venv env

# Windows
python -m venv env
```

Specify the Python environment by opening the Command Palette (View > Command Palette), typing Python: Select Interpreter, and selecting the virtual Python environment.

If not automatically activated navigate to `ScholarNet/env/Scripts` and run `Activate.ps1`. Navigate back to `ScholarNet`.

Install all required packages with pip:
```bash
python -m pip install -r requirements.txt
```

You should now be all set in terms of Python packages.

Note that over time the package requirements might change, but if so you can rerun the above command to grab all packages the environment doesn't already have.

If you wish to update the requirements.txt file, you can view all dependencies with
```bash
pip freeze
```

and if you want to propagate that listing of packages just pipe it to requirements.txt:
```bash
pip freeze > requirements.txt
```

### JavaScript/React

Navigate to `ScholarNet/scholarnetwork/frontend`. Once there run
```bash
npm install
```

This should download all dependencies that are specified in package.json and place them in a folder named `node_modules`.

Assuming you did all of the above, you should be good to go!

## Running Locally

Make sure that your instance of the MySQL Server is running. 

If you changed the login information for the MySQL Server, you will need to tinker with Django to set up the connection. If this is the case, open up `ScholarNet/scholarnetwork/scholarnetwork/settings.py`. Look for the `DATABASE` section and change the information to match the login you want the project to use.

Also if the local models ever change, you will need to migrate the changes back to the database from within `ScholarNet/scholarnetwork`:
```bash
python manage.py makemigrations <app_name>
python manage.py migrate <app_name>
```
If the second command fails due to a preexisting table, you can fake the migration:
```bash
python manage.py migrate --fake <app_name>
```

To compile the JavaScript for the front end, navigate to `ScholarNet/scholarnetwork/frontend` and run 
```bash
npm run dev
```

To start up the Django Server navigate to `ScholarNet/scholarnetwork` and run
```bash
python manage.py runserver
```

If everything compiles successfully, you should see a prompt to open up http://127.0.0.1:8000/ in your browser, and you can now view the current state of the ScholarNetwork project.

## Project Organization

This project's stack is comprised of a MySQL database, Django as a backend framework, and React as a front end framework. At the moment this project is not deployed to a remote server so all components are run locally. 

The actual file structure is mostly wrapped up inside of the `ScholarNet/scholarnetwork`. This is the overarching Django project. Inside there are three main folders. `api` handles the communication with the MySQL database and interfaces with it to create endpoints that can be requested by some form of front end. `frontend` is the aptly named frontend, which contains JavaScript libraries managed by npm. React is the primary libary being used. `scholarnetwork` is used by the overall project to manage everything.



## Frontend Setup

1. In 'scholarnetwork' folder (ls -> see scholarnetwork folder and cannot see frontend folder)  // update
```
npm init -y
```

2. package intall // update

```
npm install @babel/core @babel/preset-env @babel/preset-react @babel/runtime axios babel-eslint babel-loader babel-plugin-transform-async-to-generator babel-plugin-transform-class-properties eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react husky prettier pretty-quick prop-types react react-dom react-router-dom react-transition-group semantic-ui-css semantic-ui-react webpack webpack-cli victory

```

3. build and run 

On first terminal:
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

On second terminal:
npm run dev 

4. Then go to browser, by default http://127.0.0.1:8000/
