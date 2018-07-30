export default [
  {
    name: 'Web Portal',
    role: 'Lead',
    info: 'Full-stack web app on a serverless architecture (in progress)',
    points: [
      'The React front-end resides in AWS S3 and is served by AWS CloudFront',
      'The Go back-end is a collection of AWS Lambda functions with AWS API Gateway serving as the router',
      'Practiced test-driven development and implemented a test suite',
      'Automated the update and deployment of front and back-ends with shell scripts and AWS CLI',
      'Created lightweight, responsive pages using just MaterializeCSS and validator.js libraries'
    ],
    tags: [
      'go',
      'rrr',
      'sh',
      'aws_l',
      'aws_ddb',
      'aws_s3'
    ]
  },
  {
    name: 'Notification Service v2',
    role: 'Lead',
    info: 'Second iteration of the notification service, rebuilt on a serverless architecture using Golang (in progress)',
    points: [
      'The endpoints are a collection of AWS Lambda functions with API Gateway serving as the router',
      'Used SendGrid for templating and emailing of notifications with string interpolation',
      'Used Twilio to send SMS notifications via REST API',
      'Automated the update and deployment of the Lambda functions with shell scripts and AWS CLI'
    ],
    tags: [
      'go',
      'sh',
      'aws_l',
      'aws_ddb',
      'sg',
      'tw_sms'
    ]
  },
  {
    name: 'Monitoring Application v1-v3',
    role: 'Lead',
    info: 'Application that monitors servers and apps running on them, along with a front-end dashboard',
    points: [
      'Runs on 17 servers (physical/AWS/GCP) monitoring 80 processes',
      'Detects crashed and frozen processes',
      'Monitors servers\' RAM and disk usage',
      'Alerts the IT department in case of crashes, freezes, low memory, low disk space, etc. via the notification service (v1)',
      'Web dashboard to view live status of the monitored servers and processes',
      'Also designed and developed the second version, which was my first application using Go. Version 3 contains several rewrites to support log streaming and remote restart features for monitored processes.',
      'Also designed and developed the first version, which was written using Node.js on Express'
    ],
    tags: [
      'go',
      'rrr',
      'aws_ec2'
    ]
  },
  {
    name: 'Digital Signatures',
    role: 'Lead',
    info: 'Back-end service to provide digital signing functionalities for the in-house delivery management app, along with a framework that allows internal users to create signable documents',
    points: [
      'Uses Pug/Jade for design and templating of signable documents, which allows embedding of dynamic text and data (such as custom QR codes) at render time',
      'Renders document templates to images in PNG format via PhantomJS on AWS Lambda, which provides scalability and reduces load on the main server',
      'Ability to render multiple images representing a multi-page document when provided with lengthy data, such as a delivery ticket with dozens of items',
      'Communicates pixel coordinates of input fields (checkboxes, signature field, etc.) and other document metadata to the mobile app in JSON for maintainability and expandability',
      'Provided auxiliary CLI scripts to assist templating, such as rendering a document image preview overlayed with color-coded bounding rectangles representing different input fields',
      'Periodic background job that merges all images of a work order into a single PDF on Lambda and emails it to the customer as an attachment through the notification service (v1)',
      'Allowed parallel downloads and uploads via Lambda, which also decrypts the encrypted images stored in S3',
      'Mitigated connection timeouts and load spikes in the API server by using periodic background tasks to process batches of saved requests in parallel',
      'Error accumulator for high-frequency tasks to send a condensed request to the notification service (v1) for error alerts',
      'An automated test suite with 120+ test cases using Mocha and Chai plus interactive CLI scripts to test cases requiring human interaction, including one to simulate a full signature flow',
      'Automated the update and deployment of the Lambda functions with shell scripts and AWS CLI',
      'Versioning for API endpoints and documents',
      'Secured resources with JWT-based authentication middleware'
    ],
    tags: [
      'njs',
      'pj',
      'sh',
      'mac',
      'mdb',
      'aws_ec2',
      'aws_s3',
      'aws_ddb',
      'aws_l',
      'phjs'
    ]
  },
  {
    name: 'Notification Service v1',
    role: 'Lead',
    info: 'Back-end service that sends emails to internal users for various events',
    points: [
      'Receives information about errors from various internal applications, and a periodic task to aggregate them by application and send a compact alert to the IT department',
      'Receives information about new orders/faxes and notifies the appropriate sales representative',
      'HTML emails with the ability to include attachments and respond/interact through buttons',
      'Ability to send mass emails based on email/user groups'
    ],
    tags: [
      'njs',
      'mdb',
      'aws_ec2',
      'gapi_gm'
    ]
  },
  {
    name: 'Document Management Application',
    role: 'Secondary',
    info: 'Developed auxiliary full-stack services providing various functionalities for the in-house document management application',
    points: [
      'Automated access to a 3rd party web portal using Selenium WebDriver (log in, navigate, retrieve data, and log out)',
      'Built a basic document recognition service using Google Vision API with the ability to recognize 9 different documents',
      'Provided a service that generates PDF files with embedded QR code and custom data, along with a web page where users can specify the custom data (user, date, etc.)',
      'Periodic task that converts files from TIFF to PDF format, places copies in network shared folders, uploads to appropriate folders in Google Drive, then uses the notification service (v1) to email the PDF to appropriate recipients',
      'Periodic task to retrieve and parse emails from a specific sender within a specified time range using Gmail API',
      'Periodic task to clean up aged files in specified directories',
      'Mitigated connection timeouts and spikes in server load by using periodic tasks to process saved requests',
      'Set up a development instance of the main application and wrote scripts to automate the setup and update processes',
      'Authored documention on the architecture and support, including common errors and their solutions',
      'Made minor bug fixes and modifications'
    ],
    tags: [
      'njs',
      'rjs',
      'mdb',
      'aws_s3',
      'gapi_d',
      'gapi_gm',
      'gapi_v',
      'swd'
    ]
  },
  {
    name: 'Delivery Management Application',
    role: 'Secondary',
    info: 'Made code changes to the in-house delivery management application',
    points: [
      'Integrated calls to the notification service (v1) in the app\'s error handling module, which discovered previously unknown errors',
      'Set up the back-end on a new AWS EC2 instance and modified it to run on HTTPS',
      'Developed 6 new endpoints allowing for batch update operations',
      'Replaced a PHP-based MSSQL wrapper with one based on Node.js'
    ],
    tags: [
      'njs',
      'aws_ec2'
    ]
  },
  {
    name: 'iOS Back-end',
    role: 'Co-lead',
    info: 'Developed the API server for the in-house iOS app and integrated existing endpoints',
    points: [
      'Designed a lightweight prescription management model based on templates',
      'Medication and prescription management',
      'User and session management',
      'User account creation via Google Login or standard email-password combo',
      'Automated test suite using Mocha and Chai'
    ],
    tags: [
      'njs',
      'mac',
      'mdb',
      'aws_ec2',
      'gapi_gm',
      'gapi_li'
    ]
  },
  {
    name: 'Inventory and User Management Application',
    role: 'Lead',
    info: 'Full-stack proof of concept for a basic management web app',
    points: [
      'Front-end dashboard for managing items and personnel',
      'CRUD and search functionality',
      'JWT-based authentication'
    ],
    tags: [
      'njs',
      'rjs',
      'mdb',
      'gapi_li'
    ]
  },
  {
    name: 'Delivery Driver Tracking Map',
    role: 'Lead',
    info: 'A web page that displays live locations of the company\'s delivery drivers on a map',
    points: [
      'Toggle-able traffic layer so dispatchers are more cognizant of drivers\' driving conditions',
      'View the driver\'s path trace on the map for any specified day',
      'View the driver\'s stops for the day on the map, as well as their work order information such as items being delivered',
      'View the driver\'s current status and status history--the timestamps and positions on the map where status changes occurred (en route, arrived, etc.)',
      'Blinking markers for drivers who are currently busy at a patient stop',
      'Filter drivers by branch and branch region',
      'Numerous minor features, such as being able to center on the driver by clicking his/her name on the fixed side menu'
    ],
    tags: [
      'njs',
      'rjs',
      'mdb',
      'gapi_m'
    ]
  }
]
