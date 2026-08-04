
(function(){
  function lockOnboardingWidth(){
    const app=document.querySelector('.app');
    const onboarding=document.getElementById('onboarding');
    const slides=document.getElementById('slides');
    if(!onboarding||!slides)return;
    const width=Math.min(430,window.innerWidth);
    onboarding.style.width=width+'px';
    onboarding.style.maxWidth=width+'px';
    onboarding.style.left='50%';
    onboarding.style.right='auto';
    onboarding.style.transform='translateX(-50%)';
    slides.style.width='100%';
    slides.style.maxWidth='100%';
    onboarding.querySelectorAll('.slide').forEach(function(slide){
      slide.style.width='100%';
      slide.style.minWidth='100%';
      slide.style.maxWidth='100%';
      slide.style.flex='0 0 100%';
      slide.style.scrollbarGutter='auto';
    });
  }
  function centreVideo(){
    const modal=document.getElementById('fmtVideoModal');
    if(!modal)return;
    modal.style.alignItems='center';
    modal.style.justifyContent='center';
  }
  window.addEventListener('resize',function(){lockOnboardingWidth();centreVideo();});
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){lockOnboardingWidth();centreVideo();});
  }else{
    lockOnboardingWidth();centreVideo();
  }
})();
