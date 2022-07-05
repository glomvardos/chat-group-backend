<h1 align="center">Chat Group - Backend</h1>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Built With](#built-with)
- [How To Use](#how-to-use)

## Overview

I used React Native and NestJS to create this project. This project is a chat group application which you can create a room and chat with other people who are also members of the room.

- You can register/login
- You can create/delete a room
- You can join/leave a room
- You can kick other members from the room if you are the room owner
- You can delete/edit your messages
- You can delete your account
- You can search for other rooms to join

[Frontend](https://github.com/glomvardos/react-native-chat-group)

### Built With

- [React Native](https://reactnative.dev/)
- [NestJS](https://nestjs.com/)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/glomvardos/chat-group-backend

# Install dependencies
$ npm install

# Start docker db
$ docker compose up -d

# Run the app
$ npm run start:dev
```
