# API Utils
## Description
API Utils is a project that contains some endpoints to help you in your projects. This project is a REST API that contains endpoints to upload images and send emails.
## Technologies
- Node.js
- Express
- Mongoose
- Winston
## How to run
Clone the project:

Rename the file `.env.example` to `.env` and fill the variables with your data.

Install the dependencies:
```bash
npm install
```
Run the project:
```bash
npm start
```

## Roadmap
### Endpoint Images
- [X] Upload image Base64
- [X] Upload image URL
- [X] Upload image File
- [X] Get List of Images
- [ ] Delete Image

### Endpoint Mails
- [X] Send email

### Logs
- [X] Save logs when fail upload images
- [ ] Save logs when fail email