# Hapi API Base
Base code I found myself always using when starting an API based on [Hapi](https://hapijs.com/)

## Getting Started

**Clone this repo**
  ```
  ~$ git clone git@github.com:iniva/hapi-api-base.git
  ```
  
#### Running the project from your Host machine
To use your machine to run everything you will need:
* Node **_Carbon LTS_** (using [nvm](https://github.com/creationix/nvm) is easy and recommended)
* **Mac**
    * Run `brew install nvm`
* **Ubuntu**
    *   ```
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
        source ~/.profile
        ```
* **Both**
    * Run `nvm install lts/carbon` to install the current LTS version of Node
    * Run `nvm use lts/carbon` to set Node to use this version
    * Run `yarn install` to install the project dependencies
    * Run `yarn start:development` to start the API [see below for more options](#available-commands)
    * By default the API will listen to [http://0.0.0.0:8091](http://0.0.0.0:8091) 

#### Running the project using Docker Compose
To use Docker Compose you will need:
* **On Mac**: [Get Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
* **On Ubuntu**: You will need to install Docker and then Docker compose
    * [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)
    * [Compose](https://docs.docker.com/compose/install/#install-compose) 
    Follow the instructions on the **Linux** tab
* On the terminal, go to project's folder:
    * Run `docker-compose build`
    * Duplicate the file `.env.example` and rename it to `.env`
    * Fill the available environment variables to your needs or leave them with their defaults
    * Run
        * `docker-compose up -d` to keep the process on background
        * `./run.sh {{service}} "{{command}}"`. e.g:
                
            ```bash
            # For the API Server
            ./run.sh server "yarn start:development"
            ```


# Available commands

## Server
### yarn start:[environment]
Start API server in _environment_ mode listening on port 8091
* Environments:
  * development
  * production

### yarn clean
Remove build files

### yarn build
Generate build files (**dist** folder)

### yarn test
Run the test suites

### yarn lint
Run lint tool
