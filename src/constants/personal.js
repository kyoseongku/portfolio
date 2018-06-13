export default [
  {
    name: 'Autonomous Drone',
    role: 'Co-lead',
    info: 'A drone that will fly on its own to a specified geocoordinate, hopefully in one piece (in progress)',
    points: [
      'Designed the software architecture',
      'Developed the Raspberry Pi client',
      'Developed the web server, which will receive a collection of sensor data from the Pi client and compute the drone\'s next state'
    ],
    tags: [
      'go',
      'rp'
    ]
  },
  {
    name: 'Big brother',
    role: 'Lead',
    info: 'Fiddling with data visualization (in progress)',
    media: {
      type: 'link',
      src: '/bigbruv',
      text: 'Click here to be a big brother'
    },
    points: [
      'I like to micro-manage myself because I\'m weird'
    ],
    tags: [
      'njs',
      'rrr',
      'd3'
    ]
  },
  {
    name: 'WebVR Fiddle',
    role: 'Lead',
    info: 'Places media (image, video, or 3D object) onto the user\'s video feed where a mapped color appears. For example, holding up a red object to the camera will render Harambe over the object while blue will render My Little Pony.',
    media: {
      type: 'video',
      src: '/static/webAR.mp4'
    },
    points: [
      'Code is available in archive/2016.zip. I may update and migrate the code, but prolly not.'
    ],
    tags: [
      'njs',
      'rjs',
      'wrtc',
      't3js',
      'tjs'
    ]
  },
  {
    name: 'Dylect',
    role: 'Lead',
    info: 'My educational technology startup effort. Dylect (dynamic + lectures) allows educators to expand their services beyond brick walls through video chat built into the browser along with scheduling functionality and more.',
    points: [
      'Developed a peer-to-peer, one-on-one video chat web app using WebRTC, which reduced server costs since the media data is transferred directly between the two participants',
      'Built a collaborative whiteboard with the ability to share images onto the whiteboard and draw on them, along with undo functionality',
      'Integrated text chat with translation and speech recognition features',
      'Cron jobs on AWS Lambda, in order to guarantee single execution across multiple AWS EC2 instances',
      'Automated notification emails triggered by Lambda and AWS CloudWatch',
      'Implmented a cookie-based session management',
      'CRUD functionality on user accounts'
    ],
    tags: [
      'njs',
      'pj',
      'ws',
      'wrtc',
      'aws_ddb',
      'aws_ec2',
      'aws_l',
      'aws_s3',
      'gapi_gm',
      'gapi_tr'
    ]
  },
  {
    name: 'Desktop Helicopter Game',
    role: 'Lead',
    info: 'Simple game where the player can maneuver a helicopter and fire missiles to shoot down giant bees while avoiding their stingers, sort of like a 3D Asteroid Blaster',
    media: {
      type: 'video',
      src: '/static/heli.mp4'
    },
    points: [
      'Expansion of an assignment for UCLA\'s Intro to Computer Graphics course (174A), which was a coded animation',
      'There are no sound effects, and only the original animation video and my initial commit are available because my laptop crashed and I didn\'t back up my files',
      'The additional code I wrote allowed the user to maneuver the helicopter along the x and y axes and fire missiles'
    ],
    tags: [
      'cpp',
      'ogl'
    ]
  },
  {
    name: 'Desktop Scheduling Application',
    role: 'Lead',
    info: 'Allows users to set their availabilities for a work week and exports the data as a Microsoft Excel file',
    media: {
      type: 'video',
      src: '/static/scheduling.mp4'
    },
    points: [
      'Every week, the employees at the UCLA Computer Store filled out a paper form that indicated their availability for the following week, and the manager scheduled the employees manually. This was my attempt to automate this process.',
      'The video has no sound, and only my initial commit is available because my laptop crashed and I didn\'t back up my files',
    ],
    tags: [
      'jv'
    ]
  }
]