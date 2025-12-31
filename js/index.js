document.addEventListener('DOMContentLoaded', ()=>{
  const loginBtn = document.getElementById('loginBtn');
  const modal = document.getElementById('modal');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveBtn = document.getElementById('saveBtn');
  const cardNo = document.getElementById('cardNo');
  const wrap = document.querySelector('.card-wrap');

  function openModal(){
    if(cardNo) cardNo.value = '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    if(cardNo) cardNo.focus();
  }
  function closeModal(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
  }

  function saveData(){
    const c = cardNo ? cardNo.value.trim() : '';
    if(!c){
      alert('카드 비밀번호 4자리를 입력해주세요.');
      if(cardNo) cardNo.focus();
      return;
    }
    if(c !== '1117'){
      alert('비밀번호가 틀렸습니다. 다시 입력해주세요.');
      if(cardNo) { cardNo.value = ''; cardNo.focus(); }
      return;
    }
    // 성공
    closeModal();
    showCelebration();
  }

  function showCelebration(){
    wrap.innerHTML = `
      <div class="celebration">
        <div class="left">
          <div class="small">엄마의 생일을 축하드립니다 ♥</div>
          <div class="bigtitle"><span class="g1">생일</span> <span class="g2">축하합니다</span></div>
          <a id="resetBtn" class="big-action">카드를 투입구에 넣어주세요</a>
        </div>
        <div class="right">
          <div style="font-size:96px;">🎂</div>
        </div>
      </div>
    `;

    const resetBtn = document.getElementById('resetBtn');
    if(resetBtn) resetBtn.addEventListener('click', ()=> location.reload());

    createConfetti(80);
  }

  function createConfetti(count){
    const colors = ['#ffb03b','#ff6b6b','#6bcB77','#6b9eff','#b86bff'];
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random()*100 + '%';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.animationDelay = (Math.random()*0.6)+'s';
      el.style.width = (6+Math.random()*18)+'px';
      el.style.height = (8+Math.random()*18)+'px';
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), 4500);
    }
  }

  // Enter 처리: cardNo에 Enter 입력시 확인
  if(cardNo){
    cardNo.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') saveData(); });
  }

  loginBtn.addEventListener('click', openModal);
  cancelBtn.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', saveData);

  // close modal on overlay click
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
});
