(()=>{'use strict';
 const E=(s,r=document)=>r.querySelector(s),A=(s,r=document)=>Array.from(r.querySelectorAll(s));
 const toast=t=>{let e=E('#demo-toast');if(!e){e=document.createElement('p');e.id='demo-toast';e.setAttribute('role','status');document.body.append(e)}e.textContent=t;clearTimeout(window._previewToastTimer);window._previewToastTimer=setTimeout(()=>e.remove(),4200)};
 const prices={starter:490,professional:2990,broadcast:9900,enterprise:29000,global:null};
 const labels={starter:'Starter',professional:'Professional',broadcast:'Broadcast',enterprise:'Enterprise',global:'Global'};
 const url=new URL(window.location.href);
 const choice=E('[data-demo-buy]');
 if(choice){
  let edition=url.searchParams.get('edition');if(!prices.hasOwnProperty(edition)||edition==='global')edition='professional';
  let r=E('input[name=edition][value="'+edition+'"]',choice);if(r)r.checked=true;
  const refresh=()=>{const ed=E('input[name=edition]:checked',choice)?.value||'professional',term=E('input[name=term]:checked',choice)?.value||'year';let base=prices[ed]*(term==='perpetual'?3:1);E('[data-price]',choice).textContent='$'+base.toLocaleString('en-US');E('[data-edition-label]',choice).textContent=labels[ed];E('[data-term-label]',choice).textContent=term==='year'?'Annual':'Perpetual';};
  choice.addEventListener('change',refresh);refresh();
  choice.addEventListener('submit',e=>{e.preventDefault();let ed=E('input[name=edition]:checked',choice)?.value||'professional';let term=E('input[name=term]:checked',choice)?.value||'year';window.location.href='/store/order/?edition='+encodeURIComponent(ed)+'&term='+encodeURIComponent(term)})
 }
 if(E('[data-demo-order]')){let ed=url.searchParams.get('edition')||'professional',term=url.searchParams.get('term')||'year';if(!prices.hasOwnProperty(ed)||ed==='global')ed='professional';if(term!=='perpetual')term='year';let base=prices[ed]*(term==='perpetual'?3:1);A('[data-order-edition]').forEach(e=>e.textContent=labels[ed]);A('[data-order-term]').forEach(e=>e.textContent=term==='year'?'Annual':'Perpetual');A('[data-order-price]').forEach(e=>e.textContent='$'+base.toLocaleString('en-US'));let a=E('[data-complete-order]');if(a)a.href='/store/receipt/?edition='+encodeURIComponent(ed)+'&term='+encodeURIComponent(term)}
 const rf=E('[data-demo-receipt]');if(rf){let ed=url.searchParams.get('edition')||'professional';if(!prices.hasOwnProperty(ed)||ed==='global')ed='professional';let term=url.searchParams.get('term')==='perpetual'?'perpetual':'year';A('[data-receipt-edition]').forEach(e=>e.textContent=labels[ed]);A('[data-receipt-price]').forEach(e=>e.textContent='$'+(prices[ed]*(term==='perpetual'?3:1)).toLocaleString('en-US'))}
 A('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();let q=E('[data-demo-feedback]',form.parentElement);if(q){q.hidden=false;q.textContent=form.dataset.result||'Demo action completed locally. Nothing has been sent or saved.'}form.reset();toast('Demo only: no submission was sent, stored or processed.')}));
 A('[data-demo-action]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();toast(b.dataset.demoAction||'Demo only: this does not change any production system.')}));
 const role=E('[data-demo-role]');if(role){const choose=()=>{let v=role.value;A('[data-role-access]').forEach(x=>{let roles=x.dataset.roleAccess.split(' ');x.hidden=!roles.includes(v)});const contents=E('.admin-demo-content');const denied=E('.admin-demo-locked');if(contents&&denied){let roles=(contents.dataset.roleAccess||'owner sales editor').split(' ');contents.hidden=!roles.includes(v);denied.hidden=roles.includes(v)}A('[data-role-label]').forEach(x=>x.textContent=v[0].toUpperCase()+v.slice(1))};role.addEventListener('change',choose);choose()}
 A('[data-demo-search]').forEach(input=>{input.addEventListener('input',()=>{const v=input.value.trim().toLowerCase();A('[data-search-item]',input.closest('[data-search-container]')||document).forEach(e=>e.hidden=!e.textContent.toLowerCase().includes(v))})});
})();
