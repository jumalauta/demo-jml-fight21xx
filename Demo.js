/* var Demo = function() {
} */
let sippeKerroin = 0;
let neutralDuration;
const bpm = 115;
const beat = 60 / bpm;
const pattern = beat * 8;
const tick = beat / 4;
let hittingOrder = 0;
let cubeNumber=0;
let syncOrder = 0;
let lastTime;
let deltaTime;
const normalSyncValue = 1.4;
let syncValue = normalSyncValue;
const syncTime = [
  8 * pattern + 3 * beat,
  8 * pattern + 7 * beat,
  9 * pattern + 3 * beat,
  9 * pattern + 7 * beat,
  10 * pattern + 3 * beat,
  10 * pattern + 7 * beat,
  11 * pattern + 3 * beat,
  11 * pattern + 7 * beat,

  12 * pattern + beat,
  12 * pattern + beat * 3,
  12 * pattern + beat * 5,
  12 * pattern + beat * 7,
  13 * pattern + beat,
  13 * pattern + beat * 3,
  13 * pattern + beat * 5,
  13 * pattern + beat * 7,
  14 * pattern + beat,
  14 * pattern + beat * 3,
  14 * pattern + beat * 5,
  14 * pattern + beat * 7,
  15 * pattern + beat,
  15 * pattern + beat * 3,
  15 * pattern + beat * 5,
  15 * pattern + beat * 7,

  100 * pattern
];

const flashtexts = [
  'kiky.png',
  'chempolis.png',
  'yle.png',
  'koulutuslupaus.png',
  'terrafame.png',
  'vakuutuskuori.png',
  'suomi.png',
  'jumalauta.png'

];
const currentText = 0;

Demo.prototype.init = function () {
  const settings = new Settings();
  settings.demo.compatibility.old2dCoordinates = true; // when true 2d coordinates x: 0 - 1920, y: 0 - 1080; when false 2d coordinates are -0.5 - 0.5 range
  settings.demo.compatibility.oldColors = true; // when true colors are in 0-255 range, when false colors are in 0-1 range
  settings.demo.compatibility.oldMaterials = true;
  settings.demo.image.texture.wrapS = 'RepeatWrapping';
  settings.demo.image.texture.wrapT = 'RepeatWrapping';
  settings.demo.screen.width = 1280;
  settings.demo.screen.height = 720;
  settings.demo.camera = {
    type: 'Perspective',
    fov: 90,
    // aspectRatio calculated below
    near: 0.1,
    far: 1000,
    position: { x: 0.0, y: 0.0, z: 0.2 },
    lookAt: { x: 0.0, y: 0.0, z: 0.0 },
    up: { x: 0.0, y: 1.0, z: 0.0 }
  };
  settings.demo.lights = [
    {
      type: 'Ambient',
      color: { r: 1.0, g: 1.0, b: 1.0 },
      intensity: 100.0
    }
  ];
  /*var start = 0;
  var duration = 200;
  var layer = 1;
  this.loader.addAnimation({"start": start, "duration": duration, "layer": layer, "light": {
    "type": "Ambient",
    "properties": { "intensity":  ()=>100.0 },
  },
  "color":[{"r":1.0,"g":1.0,"b":1.0}]
});
this.loader.addAnimation({"start": start, "duration": duration, "layer": layer, "light": {
    "type": "Directional",
    "properties": { "intensity": 10.0 },
    "castShadow": true,
  },
  "color":[{"r":1.0,"g":0.0,"b":0.0}],
  "position":[{"x":()=>2,"y":1.0,"z":0.0}],
});

  this.car(0 * pattern, 4 * pattern);
  return;*/

  //this.car2(0 * pattern, 4 * pattern);
  //return;

  this.loader.addAnimation([
    {
      start: 0,
      duration: 40 * pattern,
      layer: 60008,
      image: ['scanner.png'],
      scale: [{ x: 31, y: 2.5 }],

      shader: {
        name: 'shader/scroll2.fs',
        variable: [
          
          { name: 'speedX', value: [0.0] },
          { name: 'speedY', value: [-0.15] }
        ]
      }
    }
  ]);

  this.loader.addAnimation([
    {
      start: 8 * pattern,
      duration: 40 * pattern,
      layer: 39999,
      image: ['scanner.png'],
      scale: [{ x: 31, y: 2.5 }],

      shader: {
        name: 'shader/scroll2.fs',
        variable: [
          
          { name: 'speedX', value: [0.0] },
          { name: 'speedY', value: [-0.15] }
        ]
      }
    }
  ]);

  /*

                    this.loader.addAnimation([
        {
            "start": 0*pattern, "duration":2*pattern
            ,"layer": 1, "image": ["white.png"]
            ,"color":[{"a":55}]
            ,"scale":[{"x":1.0,"y":1.0}]
        }]);
    */

  this.loader.addAnimation([
    {
      start: 7 * beat,
      duration: 7 * pattern + beat,
      layer: 60006,
      image: ['alkuteksti.png'],
      color: [{ a: 255 }],
      scale: [{ x: 1.7, y: 1.7 }],
      position: [{ x: 640, y: -750 },
        { duration: 7 * pattern + beat, y: 1230 }]

    }]);

  this.loader.addAnimation([
    {
      start: 31 * pattern + 7 * beat,
      duration: 2 * beat,
      layer: 29000,
      image: ['empty.png'],
      scale: [{ x: 1, y: 1 }],
      color: [{ a: 0 },
        { duration: 1 * beat, a: 255 },
        { duration: 1 * beat, a: 0 }]

    }
  ]);

  this.loader.addAnimation([
    {
      start: 32.5 * pattern,
      duration: 4.5 * pattern,
      layer: 20006,
      image: ['endscreen.png'],
      color: [{ a: 0 },
        { duration: 1 * pattern, a: 100 }],
      scale: [{ x: 1.0, y: 1.0 }]

    }]);

  this.loader.addAnimation([
    {
      start: 32.5 * pattern,
      duration: 4.5 * pattern,
      layer: 60006,
      image: ['endscreen.png'],
      color: [{ a: 0 },
        { duration: 1 * 5 * pattern, a: 255 }],
      scale: [{ x: 1.0, y: 1.0 }]

    }]);

  this.loader.addAnimation([
    {
      start: 7 * pattern + 6 * beat,
      duration: 2 * beat,
      layer: 79999,
      image: ['empty.png'],
      scale: [{ x: 1, y: 1 }],
      color: [{ a: 0 },
        { duration: 2 * beat, a: 255 }]

    }
  ]);
  this.loader.addAnimation([
    {
      start: 0,
      duration: 8 * pattern,
      layer: 60007,
      image: ['scan.png'],
      color: [{ a: 125 }],
      scale: [{ x: 1.7, y: 1.7 }]

    }]);

  this.loader.addAnimation([
    {
      start: 0,
      duration: 48 * pattern,
      layer: 70006,
      image: ['vignette.png'],
      color: [{ a: 255 }]

    }]);

  this.loader.addAnimation([
    {
      start: 8 * pattern,
      duration: 1 * pattern,
      layer: 23333,
      image: ['neonrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 9 * pattern,
      duration: 1 * pattern,
      layer: 23333,
      image: ['magrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          { name: 'time', value: [()=> -getSceneTimeFromStart()] }

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 10 * pattern,
      duration: 1 * pattern,
      layer: 23333,
      image: ['neonrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          { name: 'time', value: [()=> -getSceneTimeFromStart()] }

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 11 * pattern,
      duration: 1 * pattern,
      layer: 23333,
      image: ['magrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          

        ]
      }

    }
  ]);

  this.syncPattern0(8 * pattern, 2.5, 640 + 50, 240, 0);
  this.syncPattern0(9 * pattern, 2.5, 640 - 50, 240, 1);
  this.syncPattern0(10 * pattern, 2.5, 640 + 50, 240, 0);
  this.syncPattern0(11 * pattern, 2.5, 640 - 50, 240, 1);

  this.syncPattern2(12 * pattern, 1.0, 640, 260);
  this.syncPattern2(13 * pattern, 2.0, 640, 260);
  this.syncPattern2(14 * pattern, 3.0, 640, 260);
  this.syncPattern2(15 * pattern, 4.0, 640, 210);
  this.city(12 * pattern, 4 * pattern);

  this.car(16 * pattern, 4 * pattern);
  this.car2(28 * pattern, 4 * pattern);
  // car

  this.loader.addAnimation([
    {
      start: 16 * pattern,
      duration: 4 * pattern,
      layer: 13333,
      image: ['empty.png'],
      scale: [{ x: 1, y: 1 }],
      shader: {
        name: 'shader/starfield.fs',
        variable: [
          { name: 'time', value: [()=> 4.0*getSceneTimeFromStart()] }

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 20 * pattern,
      duration: 4 * pattern,
      layer: 13333,
      image: ['neonrect.png'],
      scale: [{ x: 5, y: 18 }],
      position: [{ x: 640, y: 10 }],
      shader: {
        name: 'shader/tunnel.fs',
        variable: [
          

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 20 * pattern,
      duration: 4 * pattern,
      layer: 14300,
      image: ['road.png'],
      scale: [{ x: 22.0, y: 31.0 }],
      position: [{ x: 640, y: -733 }],
      shader: {
        name: 'shader/mirrorscroll.fs',
        variable: [
          
          { name: 'speedX', value: [1.0] },
          { name: 'speedY', value: [-0.4] }
        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 20 * pattern,
      duration: 4 * pattern,
      layer: 15300,
      image: ['road.png'],
      scale: [{ x: 1.0, y: 31.0 }],
      position: [{ x: 640, y: -733 }],
      shader: {
        name: 'shader/mirrorscroll.fs',
        variable: [
          
          { name: 'speedX', value: [1.0] },
          { name: 'speedY', value: [-0.4] }
        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: 20 * pattern,
      duration: 4 * pattern,
      layer: 15006,
      image: ['road_layer2.png'],
      color: [{ a: 255 }],
      scale: [{ x: 3.6, y: 4.35 }],
      position: [{ x: 640, y: 173 }]

    }]);

  this.loader.addAnimation([
    {
      start: 20 * pattern,
      duration: 4 * pattern,
      layer: 20006,
      image: ['delorean.png'],
      color: [{ a: 255 }],
      scale: [{ x: 1.25, y: 1.25 }],
      position: [{ x: 640, y: 220 }]

    }]);

  this.syncPattern1(20 * pattern, 1.4, 640, 520);
  this.syncPattern1(21 * pattern, 1.4, 640, 520);
  this.syncPattern1(22 * pattern, 1.4, 640, 520);
  this.syncPattern1(23 * pattern, 1.4, 640, 520);

  this.syncPattern1(24 * pattern, 1.0, 640, 470);
  this.syncPattern1(25 * pattern, 1.0, 640, 470);
  this.syncPattern1(26 * pattern, 1.0, 640, 470);
  this.syncPattern1(27 * pattern, 1.0, 640, 470);
  this.earth(24 * pattern, 4 * pattern);

  // car end

  this.fullScreenNoise(0, pattern * 40, 40000, 0.25);

  /*
this.fullScreenNoise2(0,pattern*40,10001,.25);
*/

  this.brightnessContrast(0, pattern * 8, 0, 50004, 50007, 0.0, 1.5);

  this.brightnessContrast(8 * pattern, pattern * 38.5, 50001, 50004, 50007, 0.2, 3.5);
	  this.distortion(8 * pattern, pattern * 38.5, 0, 50000, 50002);

  this.hackGlow(0, pattern * 38.5, 50006, 50008, 50012);
};

Demo.prototype.city = function (startTime, duration) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 13331,
      image: ['empty.png'],
      scale: [{ x: 2, y: 3.55 }],

      shader: {
        name: 'shader/starfield2.fs',
        variable: [
          { name: 'time', value: [()=> 8.0*-getSceneTimeFromStart()] }

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: startTime,
      duration: pattern,
      object: 'city.obj',
      layer: 20000,
      position: [{ z: -3, y: -1.7, x: 0.0 }],
      color: [{ r: ()=> Math.sin((getSceneTimeFromStart()%(beat*2)))*255, g: ()=> 255-Math.sin((getSceneTimeFromStart()%(beat*4)))*255 }],
      scale: [{ x: 0.5, y: ()=> 0.25+(getSceneTimeFromStart()%beat)*0.50, z: 0.5 }],

      angle: [{ degreesZ: 0, degreesX: -25, degreesY: ()=> 277-(Math.sin(getSceneTimeFromStart()*.05))*360 }]

    }]);

  this.loader.addAnimation([
    {
      start: startTime + pattern,
      duration: pattern,
      object: 'city.obj',
      layer: 20000,
      position: [{ z: -3, y: -1.8, x: 0.0 }],
      color: [{ r: ()=> Math.sin((getSceneTimeFromStart()%(beat*2)))*255, g: ()=> 255-Math.sin((getSceneTimeFromStart()%(beat*4)))*255 }],
      angle: [{ degreesZ: 0, degreesX: -10, degreesY: ()=> 277-(Math.sin(getSceneTimeFromStart()*.05))*360 }],

      scale: [{ x: 0.5, y: ()=> 0.25+(getSceneTimeFromStart()%beat)*0.50, z: 0.5 }]

    }]);

  this.loader.addAnimation([
    {
      start: startTime + pattern * 2,
      duration: pattern,
      object: 'city.obj',
      layer: 20000,
      position: [{ z: 0, y: -1.8, x: 0.0 }],
      color: [{ r: ()=> Math.sin((getSceneTimeFromStart()%(beat*2)))*255, g: ()=> 255-Math.sin((getSceneTimeFromStart()%(beat*4)))*255 }],
      angle: [{ degreesZ: 0, degreesX: 5, degreesY: ()=> 277-(Math.sin(getSceneTimeFromStart()*.05))*360 }],

      scale: [{ x: 0.5, y: ()=> 0.25+(getSceneTimeFromStart()%beat)*0.50, z: 0.5 }]

    }]);

  this.loader.addAnimation([
    {
      start: startTime + pattern * 3,
      duration: pattern,
      object: 'city.obj',
      layer: 20000,
      position: [{ z: 0, y: -2.0, x: 0.0 }],
      color: [{ r: ()=> Math.sin((getSceneTimeFromStart()%(beat*2)))*255, g: ()=> 255-Math.sin((getSceneTimeFromStart()%(beat*4)))*255 }],
      angle: [{ degreesZ: 0, degreesX: 5, degreesY: ()=> 277-(Math.sin(getSceneTimeFromStart()*.05))*360 }],

      scale: [{ x: 0.7, y: ()=> 0.35+(getSceneTimeFromStart()%beat)*0.7, z: 0.7 }]

    }]);
};

Demo.prototype.earth = function (startTime, duration) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      object: 'earth.obj',
      layer: 22001,
      position: [{ z: -2, y: -0.95, x: 0.0 }],
      color: [{ r: ()=> Math.sin((getSceneTimeFromStart()%(beat*2)))*255, g: ()=> 255-Math.sin((getSceneTimeFromStart()%(beat*4)))*255 }],
      angle: [{ degreesX: 15, degreesZ: 0, degreesY: ()=> -getSceneTimeFromStart()*100 }],

      scale: [{ x: -0.22, y: -0.22, z: 0.22 }]

    }]);

  this.loader.addAnimation([
    {
      start: startTime,
      duration: 1 * pattern,
      layer: 13333,
      image: ['magrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: startTime + pattern,
      duration: 1 * pattern,
      layer: 13333,
      image: ['magrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          { name: 'time', value: [()=> -getSceneTimeFromStart()] }

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: startTime + pattern * 2,
      duration: 1 * pattern,
      layer: 13333,
      image: ['neonrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          

        ]
      }

    }
  ]);

  this.loader.addAnimation([
    {
      start: startTime + pattern * 3,
      duration: 1 * pattern,
      layer: 13333,
      image: ['neonrect.png'],
      scale: [{ x: 5, y: 4 }],
      shader: {
        name: 'shader/tunnel2.fs',
        variable: [
          { name: 'time', value: [()=> -getSceneTimeFromStart()] }

        ]
      }

    }
  ]);
};

Demo.prototype.car2 = function (startTime, duration) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 23331,
      image: ['empty.png'],
      scale: [{ x: 2, y: 3.55 }],

      shader: {
        name: 'shader/starfield2.fs',
        variable: [
          { name: 'time', value: [()=> 14.0*getSceneTimeFromStart()] }

        ]
      }

    }
  ]);

  const randomImages = [
    'character_punch2.png',
    'character_punch1.png',
    'character_kick1.png',
    'character_kick2.png'
  ];

  const greets = [
    'g0.png',
    'g1.png',
    'g2.png',
    'g3.png',
    'g4.png',
    'g5.png',
    'g6.png',
    'g7.png',
    'g8.png',
    'g9.png',
    'g10.png',
    'g11.png'
  ];

  for (let ix = 0; ix < 12; ix += 2) {
    var randomNumber = Math.floor(Math.random() * 3.99);
    var randomNumber2 = Math.floor(Math.random() * 3.99);

    this.explosion(startTime + 2 * beat * ix + beat, 2 * beat, 0.0, 0, -2, 0.15, 1.0, 1.0, 1.0, 1.0);
    this.explosion(startTime + 2 * beat * ix + 2 * beat + beat, 2 * beat, 0.0, 0, -2, 0.15, 1.0, 1.0, 1.0, 1.0);

    this.loader.addAnimation([
      {
        start: startTime + 2 * beat * ix,
        duration: 1 * beat,
        layer: 39002,
        image: greets[ix],
        perspective: '3d',
        scale: [{ x: 0.6, y: 0.6 }],
        position: [{ x: 0.0, y: 0, z: -8 },
          { duration: beat * 2, z: 1.54 }]

      }]);
    this.loader.addAnimation([
      {
        start: startTime + 2 * beat * ix + 2 * beat,
        duration: 1 * beat,
        layer: 39001,
        image: greets[ix + 1],
        perspective: '3d',
        scale: [{ x: 0.6, y: 0.6 }],
        position: [{ x: 0.0, y: 0, z: -8 },
          { duration: beat * 2, z: 1.54 }]

      }]);

    this.loader.addAnimation([
      {
        start: startTime + 2 * beat * ix,
        duration: 2 * beat,
        layer: 39000,
        image: randomImages[randomNumber],
        perspective: '3d',
        scale: [{ x: -1, y: 1 }],
        position: [{ x: 0.7, y: -0.2, z: -8 },
          { duration: beat * 2, z: 1.54 }]

      }]);

    this.loader.addAnimation([
      {
        start: startTime + 2 * beat * ix + 2 * beat,
        duration: 2 * beat,
        layer: 38999,
        image: randomImages[randomNumber2],
        perspective: '3d',
        scale: [{ x: 1, y: 1 }],
        position: [{ x: -0.7, y: -0.2, z: -8 },
          { duration: beat * 2, z: 1.54 }]

      }]);
  }

  for (let ix = 0; ix < 6; ix += 2) {
    var randomNumber = Math.floor(Math.random() * 3.99);
    var randomNumber2 = Math.floor(Math.random() * 3.99);

    this.loader.addAnimation([
      {
        start: startTime + 3 * pattern + beat * ix,
        duration: 2 * beat,
        layer: 39000,
        image: randomImages[randomNumber],
        perspective: '3d',
        scale: [{ x: -1, y: 1 }],
        position: [{ x: 0.7, y: -0.2, z: -10 },
          { duration: beat * 2, z: 1.54 }]

      }]);

    this.loader.addAnimation([
      {
        start: startTime + 3 * pattern + beat * ix + beat,
        duration: 2 * beat,
        layer: 38999,
        image: randomImages[randomNumber2],
        perspective: '3d',
        scale: [{ x: 1, y: 1 }],
        position: [{ x: -0.7, y: -0.2, z: -10 },
          { duration: beat * 2, z: 1.54 }]

      }]);
  }

  var randomNumber = Math.floor(Math.random() * 3.99);

  this.loader.addAnimation([
    {
      start: startTime + 3 * pattern + beat * 6,
      duration: 2 * beat,
      layer: 38999,
      image: randomImages[randomNumber],
      perspective: '3d',
      scale: [{ x: -1, y: 1 }],
      position: [{ x: 0.6, y: 0, z: -10 },
        { duration: beat * 2, z: 1.54 }]

    }]);

  this.loader.addAnimation([
    {
      start: startTime + 3 * pattern,
      duration: 8 * beat,
      layer: 29001,
      image: ['delorean.png'],
      perspective: '3d',
      scale: [{ x: 1.25, y: 1.25 }],
      position: [{ x: 0.0, y: -1, z: 1 },
        { duration: beat * 4, z: -15 },
        { duration: beat * 4, z: -35 }]

    }]);
  this.explosion(startTime + 4 * pattern, 1 * pattern, 0.0, -0.06, 0, 0.02, 0.35, 1.0, 0.0, 1.0);
  this.explosion(startTime + 4 * pattern, 1 * pattern, 0.0, -0.06, 0, 0.02, 0.25, 0.0, 1.0, 1.0);

  this.loader.addAnimation([
    {
      start: startTime,
      duration: 4 * pattern,
      object: 'doublegrid.obj',
      layer: 19000,
      position: [{ z: -8, y: -2.0, x: 0.0 }],
      scale: [{ x: 45.5, y: 45.5, z: 45.5 }],

      shader: {
        name: 'shader/scroll.fs',
        variable: [
          { name: 'time', value: [()=> -getSceneTimeFromStart()] },
          { name: 'speedX', value: [0.0] },
          { name: 'speedY', value: [0.4] },
          //{ name: 'colorR', value: [()=> Math.sin((getSceneTimeFromStart()))] }
          // ,{"name":"colorG","value":["return 1.0-Math.sin((getSceneTimeFromStart()%(beat*4.0)))}"]}

          /*
                 ,{"name":"colorR","value":[{"return Math.sin((getSceneTimeFromStart()%(beat*2)))*255}"]}
                 ,{"name":"colorG","value":[{"return 255-Math.sin((getSceneTimeFromStart()%(beat*4)))*255}"]}
                 */
        ]
      }
    }]);

  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 19001,
      image: ['gradient.png'],
      scale: [{ x: 1, y: 1 }]
    }]);
};

/* paskaa
Demo.prototype.car2 = function(startTime, duration)
{

            this.loader.addAnimation([
                    {
                    "start": startTime, "duration": 3*pattern, "object":"car.obj"
                    ,"layer": 20000
                    ,"position": [{"z":-3,"y":-1,"x":0.0}
                    ,{"duration":2.5*pattern,"z":-11,"y":-1.7,"x":3.0}
                    ,{"duration":.5*pattern,"z":-2,"y":-1.7,"x":-13.0}]
                    ,"angle": [{"degreesX":0,"degreesZ":-1,"degreesY":"{return 262-(Math.sin(getSceneTimeFromStart()*.051))*360}"}]

                    ,"scale": [{"x":0.25,"y":0.25,"z":0.25}
                    ,{"duration":3*pattern,"z":1.8,"y":1.8,"x":1.8}]
                    }]);

            this.loader.addAnimation([
                    {
                    "start": startTime, "duration": 3*pattern, "object":"road2.obj"
                    ,"layer": 19000
                    ,"position": [{"z":-8,"y":-2.0,"x":0.0}

                    ,{"duration":3*pattern,"z":-5,"y":-2.0,"x":15.0}]
                    ,"angle": [{"degreesZ":0,"degreesZ":0,"degreesY":"{return 352-(Math.sin(getSceneTimeFromStart()*.051))*360}"}]

                    ,"scale": [{"x":15.5,"y":15.5,"z":15.5}]

                             ,"shader":{
            "name":"shader/scroll.fs",
            "variable":[
                  {"name":"time","value":["{return -getSceneTimeFromStart();}"]}
                 ,{"name":"speedX","value":[0.0]}
                 ,{"name":"speedY","value":[-5.4]}
            ]
        }
                    }]);

            this.loader.addAnimation([
                    {
                    "start": startTime, "duration": 3*pattern, "object":"road2_2.obj"
                    ,"layer": 18999
                    ,"position": [{"z":-8,"y":-2.0,"x":0.0}
                    ,{"duration":2.5*pattern, "z":-8,"y":-2.0,"x":0.0}
                    ,{"duration":.5*pattern, "z":-8,"y":-2.0,"x":67.0}]
                    ,"angle": [{"degreesZ":90,"degreesZ":90,"degreesY":"{return 352-(Math.sin(getSceneTimeFromStart()*.051))*360}"}]

                    ,"scale": [{"x":35.5,"y":35.5,"z":35.5}]

     ,"shader":{
            "name":"shader/starfield4.fs",
            "variable":[
                  {"name":"time","value":["{return 41.0*getSceneTimeFromStart();}"]},

            ]
        }
                    }]);

            this.loader.addAnimation([
                    {
                    "start": startTime+3*pattern, "duration": pattern, "object":"car.obj"
                    ,"layer": 20000
                    ,"position": [{"z":-7,"y":-0.6,"x":0.0}]
                    ,"angle": [{"degreesZ":"{return Math.sin(getSceneTimeFromStart())*.1*180}","degreesX":"{return getSceneTimeFromStart()*180}","degreesY":"{return getSceneTimeFromStart()*15}"}]

                    ,"scale": [{"x":0.5,"y":0.5,"z":0.5}]

                    }]);

                this.loader.addAnimation([
    {
         "start": startTime+3*pattern, "duration":pattern
        ,"layer": 13331, "image": ["empty.png"]
        ,"scale":[{"x":1,"y":1}]
     ,"shader":{
            "name":"shader/starfield3.fs",
            "variable":[
                  {"name":"time","value":["{return 4.0*getSceneTimeFromStart();}"]},

            ]
        }

    }
]);

this.loader.addAnimation([
    {
         "start": startTime+3*pattern, "duration":pattern
        ,"layer": 10008, "image": ["grid.png"]
        ,"scale":[{"x":1.2,"y":1.2}]

                             ,"shader":{
            "name":"shader/scroll.fs",
            "variable":[
                  {"name":"time","value":["{return getSceneTimeFromStart();}"]}
                 ,{"name":"speedX","value":["{return .001-Math.sin(getSceneTimeFromStart())*.002;}"]}
                 ,{"name":"speedY","value":[0.15]}
            ]
        }
    }
    ]);

}

*/
Demo.prototype.car = function (startTime, duration) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      object: 'car.obj',
      layer: 20000,
      position: [{ z: -5, y: -1.0, x: 0.0 },
        { duration: 2 * pattern, z: -16, y: -2.7, x: -0.00 },
        { duration: 2 * pattern, z: -11, y: -2.0, x: -0.00 }],
      angle: [{ degreesZ: 0, degreesZ: 0, degreesY: ()=> 300-(Math.sin(getSceneTimeFromStart()*.0515))*360 }],

      scale: [{ x: 1.5, y: 1.5, z: 1.5 }]

    }]);

  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      object: 'roadobject.obj',
      layer: 19000,
      position: [{ z: -5, y: 0.0, x: 0.0 },
        { duration: 2 * pattern, z: -42, y: -4.5, x: 5.0 },
        { duration: 2 * pattern, z: -20, y: -1.0, x: 0.0 }],
      angle: [{ degreesZ: 0, degreesZ: 0, degreesY: ()=> 300-(Math.sin(getSceneTimeFromStart()*.0515))*360 }],

      scale: [{ x: 3.5, y: 3.5, z: 3.5 },
        { duration: 2 * pattern, x: 3.5, y: 3.5, z: 5.5 },
        { duration: 2 * pattern, x: 3.5, y: 3.5, z: 3.5 }],

      shader: {
        name: 'shader/scroll.fs',
        variable: [
          
          { name: 'speedX', value: [0.0] },
          { name: 'speedY', value: [-5.4] }
        ]
      }
    }]);
};

/*
Demo.prototype.cityScene = function(startTime, duration)
{
    var randomi;
    for(var ii=0; ii < 2; ii++)
    {
        for(var i=0; i < 200; i++)
        {
        randomi=Math.random();
            sceneLoader.addAnimation([
        {
            "start": sceneStartTime, "duration":sceneEndTime-sceneStartTime, "object":"cubes2"+i,"shape":{"type":"CUBE"}
            ,"layer": "00001"
            ,"camera": "Cam01"
            ,"scale":[
                {"x":0.5+randomi,"z":0.5+randomi,"y":5.5+randomi}
            ]
            ,"color":[
            {"r":0,"g":Math.random()*155+100,"b":0,"a":Math.random()*205+50}
            ]

            ,"position":[
            {"x":-4+8*ii,"y":0,"z":50-2*i}
        ]
        }]);
    }
    }
}
*/
Demo.prototype.syncPattern1 = function (startTime, characterScale, xPosition, yPosition) {
  this.attack(startTime, beat, characterScale, xPosition, yPosition);

  this.attack(startTime + beat, beat, characterScale, xPosition, yPosition);

  this.attack(startTime + beat * 2, beat, characterScale, xPosition, yPosition);

  this.attack(startTime + beat * 3, tick, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 3 + tick, tick, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 3 + tick * 2, tick, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 3 + tick * 3, tick, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 4, beat, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 5, beat, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 6, beat, characterScale, xPosition, yPosition);
  this.attack(startTime + beat * 7, beat, characterScale, xPosition, yPosition);
};

Demo.prototype.syncPattern0 = function (startTime, characterScale, xPosition, yPosition, i2) {
  this.attackTrain(startTime, beat, characterScale, xPosition, yPosition, i2);

  this.attackTrain(startTime + beat, beat, characterScale, xPosition, yPosition, i2);

  this.attackTrain(startTime + beat * 2, beat, characterScale, xPosition, yPosition, i2);

  this.attackTrain(startTime + beat * 3, tick, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 3 + tick, tick, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 3 + tick * 2, tick, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 3 + tick * 3, tick, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 4, beat, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 5, beat, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 6, beat, characterScale, xPosition, yPosition, i2);
  this.attackTrain(startTime + beat * 7, beat, characterScale, xPosition, yPosition, i2);
};

Demo.prototype.syncPattern2 = function (startTime, characterScale, xPosition, yPosition) {
  this.fistAttack(startTime, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat * 2, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat * 3, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat * 4, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat * 5, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat * 6, beat, characterScale, xPosition, yPosition);
  this.fistAttack(startTime + beat * 7, beat, characterScale, xPosition, yPosition);
};

Demo.prototype.character1neutral = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_neutral.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character1damage = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_damage.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character2damage = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_damage.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character1punch1 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_punch1.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 8 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character1punch2 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_punch2.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 8 * characterScale, y: yPosition - 8 * characterScale }]
    }]);
};

Demo.prototype.character1kick1 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_kick1.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character1kick2 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_kick2.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 28 * characterScale, y: yPosition }]
    }]);
};

// ---

Demo.prototype.character1block = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_block.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 96 * characterScale, y: yPosition - 12 * characterScale }]
    }]);
};

Demo.prototype.character1crouch = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_crouch.png',
      scale: [{ x: characterScale, y: characterScale }],
      position: [{ x: xPosition - 40 * characterScale, y: yPosition }]
    }]);
};
// ---

Demo.prototype.character2punch1 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_punch1.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 8 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character2punch2 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_punch2.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 8 * characterScale, y: yPosition - 8 * characterScale }]
    }]);
};

Demo.prototype.character2kick1 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_kick1.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character2kick2 = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_kick2.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 28 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character2neutral = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_neutral.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.character2block = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_block.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 96 * characterScale, y: yPosition - 12 * characterScale }]
    }]);
};

Demo.prototype.character2crouch = function (startTime, duration, characterScale, xPosition, yPosition) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: 'character_crouch.png',
      scale: [{ x: -characterScale, y: characterScale }],
      position: [{ x: xPosition + 40 * characterScale, y: yPosition }]
    }]);
};

Demo.prototype.kuva = function (startTime, duration, pic) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: 39000,
      image: [pic],
      scale: [{ x: 1.5, y: 1.5 }]
    }]);
};

// --

Demo.prototype.attackTrain = function (startTime, duration, characterScale, xPosition, yPosition, i2) {
  neutralDuration = tick;

  if (i2 == 0) {
    const ii = Math.floor(Math.random() * 3.99);
    switch (ii) {
      case 0:
        this.character1kick1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character1kick2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character1punch1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 3:
        this.character1punch2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }

    this.character1neutral(startTime + duration * 0.75, duration * 0.25, characterScale, xPosition, yPosition);
  }
  if (i2 == 1) {
    const ii = Math.floor(Math.random() * 3.99);
    switch (ii) {
      case 0:
        this.character2kick1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character2kick2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character2punch1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 3:
        this.character2punch2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
    this.character2neutral(startTime + duration * 0.75, duration * 0.25, characterScale, xPosition, yPosition);
  }
};

// --
Demo.prototype.attack = function (startTime, duration, characterScale, xPosition, yPosition) {
  neutralDuration = tick;
  const i2 = Math.round(Math.random());

  if (i2 == 0) {
    const ii = Math.floor(Math.random() * 3.99);
    switch (ii) {
      case 0:
        this.character1kick1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character1kick2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character1punch1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 3:
        this.character1punch2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
    const iii = Math.floor(Math.random() * 2.99);
    switch (iii) {
      case 0:
        this.character2block(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character2damage(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character2crouch(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
  }
  if (i2 == 1) {
    const ii = Math.floor(Math.random() * 3.99);
    switch (ii) {
      case 0:
        this.character2kick1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character2kick2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character2punch1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 3:
        this.character2punch2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
    const iii = Math.floor(Math.random() * 2.99);
    switch (iii) {
      case 0:
        this.character1block(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character1damage(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character1crouch(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
  }

  this.character1neutral(startTime + duration * 0.75, duration * 0.25, characterScale, xPosition, yPosition);
  this.character2neutral(startTime + duration * 0.75, duration * 0.25, characterScale, xPosition, yPosition);
};

Demo.prototype.fistAttack = function (startTime, duration, characterScale, xPosition, yPosition, i2) {
  neutralDuration = tick;
  i2 = Math.round(Math.random());

  if (hittingOrder == 0) {
    hittingOrder = 1;
    const ii = Math.round(Math.random());
    switch (ii) {
      case 0:
        this.character1punch1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character1punch2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
    const iii = Math.floor(Math.random() * 2.99);
    switch (iii) {
      case 0:
        this.character2block(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character2damage(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character2crouch(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
  } else {
    hittingOrder = 0;
    const ii = Math.round(Math.random());
    switch (ii) {
      case 0:
        this.character2punch1(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character2punch2(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
    const iii = Math.floor(Math.random() * 2.99);
    switch (iii) {
      case 0:
        this.character1block(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 1:
        this.character1damage(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
      case 2:
        this.character1crouch(startTime, duration * 0.75, characterScale, xPosition, yPosition);
        break;
    }
  }

  this.character1neutral(startTime + duration * 0.75, duration * 0.25, characterScale, xPosition, yPosition);
  this.character2neutral(startTime + duration * 0.75, duration * 0.25, characterScale, xPosition, yPosition);
};
/*
    this.loader.addAnimation([
    {
         "start": startTime, "duration":6*pattern
        ,"layer": 40000, "image": ["noise.png","noise.png"]
        ,"scale":[{"x":1.0,"y":1.0}]
     ,"shader":{
            "name":"shader/fire.fs",
            "variable":[
                  {"name":"time","value":["{return "{return getSceneTimeFromStart();}"]}
            ]
        }

    }
]);
*/

Demo.prototype.distortion = function (startTime, duration, startLayer, endLayer, layer) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: startLayer,
      fbo: { name: 'fbodist', action: 'begin' }
    },
    {
      start: startTime,
      duration,
      layer: endLayer,
      fbo: { name: 'fbodist', action: 'unbind' }
    }
  ]);
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      image: 'fbodist.color.fbo',
      layer,
      shader: {
        name: 'shader/distortion.fs',
        variable: [
          
          { name: 'timeMultiplier', value: [3.9] },
          { name: 'pixelSize', value: [()=> Math.random()*0.02, 0.005] },
          { name: 'noiseWaveSpeed', value: [-2] },
          { name: 'noiseWaveSize', value: [1] },
          { name: 'noiseLuminance', value: [1] },
          { name: 'noiseAlpha', value: [0.0] },
          { name: 'colorComponentDistortionX', value: [0.005, 0.005, 0.005, 0.005] },
          { name: 'colorComponentDistortionY', value: [0.01, 0.01, 0.01, 0.01] }
        ]
      }
    }]);
};

Demo.prototype.scanline = function (startTime, duration, startLayer, endLayer, layer) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: startLayer,
      fbo: { name: 'fboscan', action: 'begin' }
    },
    {
      start: startTime,
      duration,
      layer: endLayer,
      fbo: { name: 'fboscan', action: 'unbind' }
    }
  ]);
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      image: 'fboscan.color.fbo',
      layer,
      shader: {
        name: 'shader/scanline.fs',
        variable: [
          
        ]
      }
    }]);
};

Demo.prototype.brightnessContrast = function (startTime, duration, startLayer, endLayer, layer, brightness, contrast) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: startLayer,
      fbo: { name: 'fbobc', action: 'begin' }
    },
    {
      start: startTime,
      duration,
      layer: endLayer,
      fbo: { name: 'fbobc', action: 'unbind' }
    }
  ]);
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer,
      image: ['fbobc.color.fbo'],
      //initFunction: "{fboBcImage = imageLoadImage('fbobc.color.fbo'); setTextureSizeToScreenSize(fboBcImage.ptr); }",
      //runFunction: '{setTextureSizeToScreenSize(fboBcImage.ptr);}',
      brightness,
      contrast,
      beat,
      shader: {
        name: 'shader/brightnesscontrast.fs',
        variable: [
          
          { name: 'brightness', value: [brightness] },
          { name: 'contrast', value: [contrast] }
        ]
      }
    }
  ]);
};

Demo.prototype.edgeGlow = function (startTime, duration, startLayer, endLayer, layer) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: startLayer,
      fbo: { name: 'fboeg', action: 'begin' }
    },
    {
      start: startTime,
      duration,
      layer: endLayer,
      fbo: { name: 'fboeg', action: 'unbind' }
    }
  ]);
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer,
      image: ['fboeg.color.fbo'],
      //initFunction: "{fboegImage = imageLoadImage('fboeg.color.fbo'); setTextureSizeToScreenSize(fboegImage.ptr); }",
      //runFunction: '{setTextureSizeToScreenSize(fboegImage.ptr);}',
      shader: {
        name: 'shader/edgeglow.fs',
        variable: [
          
        ]
      }
    }
  ]);
};

Demo.prototype.piikkiPallo = function (startTime) {
  for (let i = 0; i < 4; i++) {
    this.pomppuObu(startTime + i * beat, 200, 0, 0, 'spikeball.obj');
  }

  for (let i = 0; i < 4; i++) {
    this.pomppuObu(4 * beat + startTime + i * beat, 180, -200, 0, 'triplatorus.obj');
    this.pomppuObu(4 * beat + startTime + i * beat, 180, 200, 0, 'triplatorus.obj');
  }

  for (let i = 0; i < 4; i++) {
    this.pomppuObu(8 * beat + startTime + i * beat, 200, -200, -200, 'spikeball.obj');
    this.pomppuObu(8 * beat + startTime + i * beat, 200, 200, -200, 'spikeball.obj');
    this.pomppuObu(8 * beat + startTime + i * beat, 200, -200, 200, 'spikeball.obj');
    this.pomppuObu(8 * beat + startTime + i * beat, 200, 200, 200, 'spikeball.obj');
  }
  for (let i = 0; i < 4; i++) {
    this.pomppuObu(12 * beat + startTime + i * beat, 150, -150, -150, 'triplatorus.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, 150, -150, 'spikeball.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, -150, 150, 'spikeball.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, 150, 150, 'triplatorus.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, -450, -150, 'spikeball.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, 450, -150, 'triplatorus.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, -450, 150, 'triplatorus.obj');
    this.pomppuObu(12 * beat + startTime + i * beat, 150, 450, 150, 'spikeball.obj');
  }
};

Demo.prototype.pomppuObu = function (startTime, scale, positionX, positionY, obu) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration: 3 * tick,
      object: obu,
      layer: 20000,
      position: [{ z: -900, y: positionY, x: positionX }],
      angle: [{ degreesX: Math.random() * 720 - 360, degreesY: Math.random() * 720 - 360, degreesZ: ()=> (Math.sin(getSceneTimeFromStart()*.5))*360 }],

      scale: [
        { x: scale, y: scale, z: scale },
        { duration: beat, x: scale * 0.25, y: scale * 0.25, z: scale * 0.25 }
      ]
    }]);
};

Demo.prototype.fullScreenNoise = function (sceneStartTime, duration, layer, alpha) {
  this.loader.addAnimation([
    {
      start: sceneStartTime,
      duration,
      layer,
      image: ['empty.png'],
      shader: {
        name: 'shader/noise.fs',
        variable: [
          
          { name: 'alphaBlending', value: [alpha] }
        ]
      }
    }
  ]);
};

Demo.prototype.fullScreenNoise2 = function (sceneStartTime, duration, layer, alpha) {
  this.loader.addAnimation([
    {
      start: sceneStartTime,
      duration,
      layer,
      image: ['empty.png'],
      shader: {
        name: 'shader/noise.fs',
        variable: [
          
          { name: 'alphaBlending', value: [()=> getsyncValue()] }
        ]
      }
    }
  ]);
};

Demo.prototype.explosion = function (startTime, duration, positionX, positionY, positionZ, scale, randomScaler, colorR, colorG, colorB) {
  for (let ie = 0; ie < 100; ie++) {
    cubeNumber++;
    const randomScale = Math.random();
    this.loader.addAnimation([
      {
        start: startTime,
        duration,
        object: 'cubes' + cubeNumber,
        shape: { type: 'CUBE' },
        layer: 39100,

        position: [{ x: positionX + Math.random() * randomScaler * 0.2 - Math.random() * randomScaler * 0.2,
          y: positionY + Math.random() * randomScaler * 0.2 - Math.random() * randomScaler * 0.2,
          z: positionZ + Math.random() * randomScaler * 0.2 - Math.random() * randomScaler * 0.2 },
          { duration, x: positionX + Math.random() * randomScaler * 3 - Math.random() * randomScaler * 3,
            y: positionY + Math.random() * randomScaler * 3 - Math.random() * randomScaler * 3,
            z: positionZ + Math.random() * randomScaler * 3 - Math.random() * randomScaler * 3 }],
        scale: [{ x: scale * randomScale, y: scale * randomScale, z: scale * randomScale }],
        color: [{ r: 255 * colorR, g: 255 * colorG, b: 255 * colorB, a: 255 },
          { duration, a: 0 }
        ]
      }]);
  }
};

Demo.prototype.hackGlow = function (startTime, duration, startLayer, endLayer, layer) {
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer: startLayer,
      fbo: { name: 'fbohg', action: 'begin' }
    },
    {
      start: startTime,
      duration,
      layer: endLayer,
      fbo: { name: 'fbohg', action: 'unbind' }
    }
  ]);
  this.loader.addAnimation([
    {
      start: startTime,
      duration,
      layer,
      image: ['fbohg.color.fbo'],
      //initFunction: "{fbohgImage = imageLoadImage('fbohg.color.fbo'); setTextureSizeToScreenSize(fbohgImage.ptr); }",
      //runFunction: '{setTextureSizeToScreenSize(fbohgImage.ptr);}',
      shader: {
        name: 'shader/hackglow.fs',
        variable: [
          
          { name: 'syncmultiplier', value: [()=> getsyncValue()] }
        ]
      }
    }
  ]);
};

function getsyncValue() {
  // contrast 3.5

  //screenPrint('syncorder ' + syncOrder + ' deltatime ' + deltaTime + ' syncvalue ' + syncValue);

  deltaTime = getSceneTimeFromStart() - lastTime;
  lastTime = getSceneTimeFromStart();

  if (syncValue > normalSyncValue) {
    syncValue -= 15 * deltaTime;
    if (syncValue < normalSyncValue) { syncValue = normalSyncValue; }
  }

  if (getSceneTimeFromStart() > syncTime[syncOrder]) {
    syncOrder++;
    // OBSHUOM!
    // syncValue=5.0;
  }
  return syncValue;
}

function sippeScrollX() {
  sippeKerroin++;
  if (sippeKerroin > 11)sippeKerroin = 0;
  //print(sippeKerroin);
  return ((sippeKerroin * 0.090909090909091 + (0.7 * getSceneTimeFromStart())) % 1.1 * (1280));
}
function sippeScrollY() {
  return (Math.abs(Math.sin(sippeKerroin + getSceneTimeFromStart()))) * 360 + 180;
}
