
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const phases=[
    {
      name:'Getting Started',weeks:'Weeks 1–4',
      summary:'You have already completed your initial assessment and your first FMT adjustment. The first 4 weeks usually include consistent FMT adjustments alongside the introduction of prescribed exercises.',
      fmt:'Regular FMT adjustments to improve movement, reduce restriction and establish a strong early foundation.',
      patient:'Attend consistently, begin your prescribed exercises and notice changes in symptoms, movement and activity tolerance.',
      milestone:'Initial assessment and first FMT adjustment completed.'
    },
    {
      name:'Foundation Phase',weeks:'Weeks 5–8',
      summary:'Foundation Phase follows your Getting Started phase and your Progress Review milestone. FMT may become less frequent while early gains are reinforced and strength and control are progressed.',
      fmt:'Maintain movement gains, keep joints mobile, introduce or progress strengthening and support surrounding structures.',
      patient:'Continue your prescribed exercises, stay active within your plan and remain consistent with recommended appointments.',
      milestone:'Progress Review completed and the next stage of your plan confirmed.'
    },
    {
      name:'Maintenance Phase',weeks:'Weeks 9–13',
      summary:'Maintenance Phase follows your 90-day Review milestone. Regular FMT is gradually reduced while your podiatrist checks that movement is holding and supports greater self-management.',
      fmt:'Monitor for regression, reduce visit frequency where appropriate and refine self-management strategies.',
      patient:'Keep using your prescribed exercises and self-management tools, and attend planned reviews.',
      milestone:'90-day Review completed and longer-term recommendations confirmed.'
    },
    {
      name:'Ongoing Support',weeks:'After 90 days',
      summary:'Your structured phase is complete. Continue independently and arrange support when symptoms change, new goals arise or you would benefit from a review.',
      fmt:'Periodic review of movement, symptoms, exercises and any new concerns.',
      patient:'Maintain helpful exercises and movement habits, and contact APS whenever further support is needed.',
      milestone:'Independent self-management with ongoing support available.'
    }
  ];
  function current(){const n=Number(localStorage.getItem('strideJourneyStage')||0);return Number.isFinite(n)?Math.max(0,Math.min(3,n)):0}
  let rendering=false;
  function renderJourney(){
    const host=$('#journeyPhaseList'); if(!host||rendering)return;
    rendering=true;
    const idx=current();
    host.innerHTML=phases.map((p,i)=>{
      const completed=i<idx,currentPhase=i===idx;
      return `<article class="journey-v53-card ${completed?'completed':''} ${currentPhase?'current open':''}" data-v53-card="${i}">
        <button class="journey-v53-head" type="button" data-v53-toggle="${i}">
          <span class="journey-v53-number">${completed?'✓':i+1}</span>
          <span class="journey-v53-copy"><small>${p.weeks}</small><strong>${p.name}</strong></span>
          <span class="journey-v53-state">${completed?'Completed':currentPhase?'Current':'Upcoming'}</span>
        </button>
        <div class="journey-v53-detail">
          <p class="journey-v53-summary">${p.summary}</p>
          <div class="journey-v53-info">
            <div class="journey-v53-info-row"><strong>FMT focus</strong><span>${p.fmt}</span></div>
            <div class="journey-v53-info-row"><strong>Your focus</strong><span>${p.patient}</span></div>
            <div class="journey-v53-info-row"><strong>Milestone</strong><span>${p.milestone}</span></div>
          </div>
          <div class="journey-v53-footer">${currentPhase?'<span class="journey-v53-current">Current phase</span>':`<button class="journey-v53-select" type="button" data-v53-select="${i}">Mark as current</button>`}</div>
        </div>
      </article>`
    }).join('');
    const phase=phases[idx];
    if($('#journeyProgressLabel'))$('#journeyProgressLabel').textContent=phase.name;
    if($('#journeyProgressPercent'))$('#journeyProgressPercent').textContent=((idx+1)*25)+'%';
    if($('#journeyProgressFill'))$('#journeyProgressFill').style.width=((idx+1)*25)+'%';
    if($('#homeStageLabel'))$('#homeStageLabel').textContent=phase.name;
    rendering=false;
  }
  function fixOnboardingFrame(){
    const o=$('#onboarding'); if(!o)return;
    o.style.position='fixed';o.style.top='0';o.style.bottom='0';o.style.left='50%';o.style.right='auto';o.style.width=window.innerWidth<=430?'100vw':'430px';o.style.maxWidth='100vw';o.style.transform='translateX(-50%)';
    const slides=$('#slides');if(slides)slides.style.width='100%';
    $$('#onboarding .slide').forEach(s=>{s.style.flex='0 0 100%';s.style.width='100%';s.style.minWidth='100%';s.style.maxWidth='100%'});
  }
  function moveChartLabel(){
    const card=$('.rehab-card');if(!card)return;
    const label=$('.chart-note',card);if(label){label.setAttribute('x','220');label.setAttribute('y','82');label.textContent='this is still progress';}
  }
  document.addEventListener('click',function(e){
    const toggle=e.target.closest('[data-v53-toggle]');
    if(toggle){e.preventDefault();toggle.closest('[data-v53-card]')?.classList.toggle('open');return;}
    const select=e.target.closest('[data-v53-select]');
    if(select){e.preventDefault();e.stopPropagation();localStorage.setItem('strideJourneyStage',select.dataset.v53Select);const os=$('#onboardStage');if(os)os.value=select.dataset.v53Select;renderJourney();return;}
  },true);
  const host=$('#journeyPhaseList');
  if(host){
    const observer=new MutationObserver(()=>{if(!rendering && !host.querySelector('.journey-v53-card'))renderJourney()});
    observer.observe(host,{childList:true});
  }
  window.addEventListener('resize',fixOnboardingFrame);
  window.addEventListener('storage',renderJourney);
  function init(){fixOnboardingFrame();moveChartLabel();renderJourney()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
