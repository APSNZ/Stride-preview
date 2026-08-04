
(function(){
  function go(index){
    var slides=document.getElementById('slides');
    if(!slides) return;
    slides.style.transform='translate3d(-'+(Number(index)*100)+'%,0,0)';
    var onboarding=document.getElementById('onboarding');
    if(onboarding) onboarding.scrollTop=0;
  }
  function save(){
    try{
      var name=document.getElementById('onboardName');
      var goal=document.getElementById('onboardGoal');
      var stage=document.getElementById('onboardStage');
      var selected=document.querySelector('[data-onboard-pain].selected');
      if(name && name.value.trim()){localStorage.setItem('strideProfilePreferredName',name.value.trim());localStorage.setItem('strideProfileName',name.value.trim());}
      if(goal && goal.value.trim()) localStorage.setItem('strideGoal',goal.value.trim());
      if(stage) localStorage.setItem('strideJourneyStage',stage.value);
      if(selected) localStorage.setItem('strideInitialPain',selected.dataset.onboardPain);
    }catch(e){}
  }
  window.strideOnboardGo=go;
  window.strideOnboardNext=function(i){save();go(i)};
  document.addEventListener('click',function(e){
    var target=e.target.closest('button,a');
    if(!target) return;
    if(target.id==='startOnboarding'){e.preventDefault();go(1);return;}
    if(target.id==='continueToSetup'||target.id==='skipPatientIntro'){e.preventDefault();go(2);return;}
    if(target.matches('.onboard-next')){e.preventDefault();save();go(target.dataset.nextStep);return;}
    if(target.hasAttribute('data-back-step')){e.preventDefault();go(target.dataset.backStep);return;}
    if(target.hasAttribute('data-onboard-intent')){e.preventDefault();document.querySelectorAll('[data-onboard-intent]').forEach(function(x){x.classList.toggle('selected',x===target)});try{localStorage.setItem('strideOnboardingIntent',target.dataset.onboardIntent)}catch(err){}return;}
    if(target.hasAttribute('data-onboard-pain')){e.preventDefault();document.querySelectorAll('[data-onboard-pain]').forEach(function(x){x.classList.toggle('selected',x===target)});var label=document.getElementById('onboardPainSelected');if(label)label.textContent='Selected: '+target.dataset.onboardPain+'/10';return;}
    if(target.id==='onboardScanQr'){e.preventDefault();var m=document.getElementById('scanModal');if(m)m.classList.add('open');return;}
    if(target.id==='onboardCreateAccount'){e.preventDefault();save();if(typeof openAccountModal==='function')openAccountModal('create');else{var m=document.getElementById('accountModal');if(m)m.classList.add('open');}return;}
    if(target.id==='finishOnboarding'){e.preventDefault();save();try{localStorage.setItem('strideOnboardingComplete','true')}catch(err){}var o=document.getElementById('onboarding');if(o)o.classList.add('hidden');return;}
    if(target.id==='accountLink'){e.preventDefault();if(typeof openAccountModal==='function')openAccountModal('signin');else{var m=document.getElementById('accountModal');if(m)m.classList.add('open');}return;}
  },true);
})();
