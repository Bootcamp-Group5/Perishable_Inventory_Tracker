// *** Start of Animations ** //

anime({
  targets: '.title path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});


// let animation = anime({
//     targets: '.card-img',
//     // Properties 
//     translateX: 100,
//     borderRadius: 50,
//     // Property Parameters
//     duration: 2000,
//     easing: 'linear',
//     // Animation Parameters
//     direction: 'alternate'
// });  

anime({
    targets: [".card-img"],
    keyframes: [
        //{translateY: -500},
        
        {translateX: -100},
        {translateY: 100},
       
      ],
      scale: [
        {value: .1, easing: 'easeOutCirc', duration: 600},
        {value: 1, easing: 'easeOutCirc', duration: 600}
      ],
    borderRadius: 450,
    easing: 'linear',
    direction: 'alternate'
});  

// anime({
//     targets: [".animate-form"],
//     keyframes: [
//         {translateY: -40},
//         {translateX: 350},
//         {translateY: 40},
//         {translateX: 0},
//         {translateY: 0}
//       ],
//     borderRadius: 200,
//     //easing: 'linear',
//     direction: 'alternate'
// });  

anime({
  targets: [".animate-form"],
  keyframes: [
    //{translateY: -500},
    
    {translateX: -100},
    {translateY: 100},
   
  ],
    scale: [
      {value: .1, easing: 'easeOutCirc', duration: 600},
      {value: 1, easing: 'easeOutCirc', duration: 600}

    ],
  borderRadius: 450,
  easing: 'linear',
  //easing: 'linear',
  direction: 'alternate'
});  


anime({
  targets: [".animate-footer"],
  keyframes: [
    //{translateY: -500},
    
    {translateX: -100},
    {translateY: 100},
   
  ],
    scale: [
      {value: .1, easing: 'easeOutCirc', duration: 600},
      {value: 1, easing: 'easeOutCirc', duration: 600}

    ],
  borderRadius: 450,
  easing: 'linear',
  //easing: 'linear',
  direction: 'alternate'
});  







// let animationFormEntry = anime({
//     targets: [".form-entry", 'feTurbulence', 'feDisplacementMap'],
//     points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
//     baseFrequency: 0,
//     scale: 1,
//     loop: true,
//     direction: 'alternate',
//     easing: 'easeInOutExpo'
// });

anime({
  targets: '.nav-link',

  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 1,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});


// *** End of Animations ** //
