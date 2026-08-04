
(function(){
  function slides(){ return document.getElementById('slides'); }
  window.strideOnboardGo=function(index){
    var el=slides();
    if(!el) return false;
    el.style.transform='translateX(-'+(Number(index)*100)+'%)';
    window.scrollTo(0,0);
    return false;
  };
  window.strideSaveOnboarding=function(){
    try{
      var name=(document.getElementById('onboardName')||{}).value||'';
      var goal=(document.getElementById('onboardGoal')||{}).value||'';
      var stage=(document.getElementById('onboardStage')||{}).value||'0';
      if(name.trim()){
        localStorage.setItem('strideProfilePreferredName',name.trim());
        localStorage.setItem('strideProfileName',name.trim());
      }
      localStorage.setItem('strideJourneyStage',String(stage));
      if(goal.trim()) localStorage.setItem('strideGoal',goal.trim());
      var selected=document.querySelector('[data-onboard-pain].selected');
      if(selected) localStorage.setItem('strideInitialPain',selected.getAttribute('data-onboard-pain'));
    }catch(e){}
  };
  window.strideOnboardNext=function(index){ window.strideSaveOnboarding(); return window.strideOnboardGo(index); };
  window.strideOpenScan=function(){
    var modal=document.getElementById('scanModal');
    if(modal) modal.classList.add('open');
    return false;
  };
  window.strideOpenAccount=function(tab){
    window.strideSaveOnboarding();
    var modal=document.getElementById('accountModal');
    var signin=document.getElementById('signinPanel');
    var create=document.getElementById('createPanel');
    if(modal) modal.classList.add('open');
    if(signin) signin.classList.toggle('active',tab!=='create');
    if(create) create.classList.toggle('active',tab==='create');
    document.querySelectorAll('.auth-tab').forEach(function(btn){btn.classList.toggle('active',btn.getAttribute('data-auth-tab')===tab)});
    return false;
  };
  window.strideFinishOnboarding=function(){
    window.strideSaveOnboarding();
    try{localStorage.setItem('strideOnboardingComplete','true');}catch(e){}
    var on=document.getElementById('onboarding');
    if(on) on.classList.add('hidden');
    return false;
  };
})();
