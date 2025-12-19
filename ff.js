 const display = document.getElementById('display');
  let expr = '';

  function update() { display.textContent = expr || '0'; }

  function safeEval(s){
    // простой и осторожный парсер: разрешаем цифры, пробел, +-*/.() только
    if(!/^[\d+\-*/().\s]+$/.test(s)) return 'ERR';
    try{ return String(Function('"use strict";return ('+s+')')()); }catch(e){ return 'ERR'; }
  }

  document.querySelectorAll('[data-key]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const k = btn.dataset.key;
      if(k === 'C'){ expr = ''; update(); return; }
      if(k === '='){ expr = safeEval(expr); update(); return; }
      expr += k;
      update();
    });
  });

  // keyboard support
  window.addEventListener('keydown', e=>{
    if(/[\d+\-*/().]/.test(e.key)) { expr += e.key; update(); }
    else if(e.key === 'Enter'){ expr = safeEval(expr); update(); }
    else if(e.key === 'Backspace'){ expr = expr.slice(0,-1); update(); }
    else if(e.key.toLowerCase() === 'c'){ expr=''; update(); }
  });