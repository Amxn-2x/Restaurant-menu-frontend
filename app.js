let cart = [];
const cartEl = document.getElementById('cart');
const listEl = document.getElementById('list');
const totalEl = document.getElementById('total');
const countEl = document.getElementById('cartCount');
const cartToggleBtn = document.getElementById('cartToggle');
const closeCartBtn = document.getElementById('closeCart');

function add(btn){
  const card = btn.closest('.card');
  const name = card.dataset.name;
  const price = +card.dataset.price;
  const item = cart.find(i=>i.name===name);
  if(item) item.qty++;
  else cart.push({name,price,qty:1});
  update();
  openCart();
}

function update(){
  listEl.innerHTML = '';
  let total=0; let count=0;
  cart.forEach((it,idx)=>{
    total += it.price*it.qty;
    count += it.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${it.name}</strong><div style="font-size:12px;color:#666">₹${it.price} x ${it.qty}</div>
      </div>
      <div>
        <button onclick="dec(${idx})">-</button>
        <button onclick="inc(${idx})">+</button>
        <button onclick="rm(${idx})" style="margin-left:8px">✕</button>
      </div>
    `;
    listEl.appendChild(li);
  });
  totalEl.textContent = total;
  countEl.textContent = count;
}

function inc(i){ cart[i].qty++; update() }
function dec(i){ if(cart[i].qty>1){cart[i].qty--} else rm(i); update() }
function rm(i){ cart.splice(i,1); update() }
function clearCart(){ cart=[]; update() }
function placeOrder(){
  if(cart.length===0) return alert('Cart empty');
  let total = cart.reduce((s,it)=>s+it.price*it.qty,0);
  alert('Order placed. Total ₹' + total);
  clearCart(); closeCart();
}
function openCart(){ cartEl.classList.add('open') }
function closeCart(){ cartEl.classList.remove('open') }

cartToggleBtn.addEventListener('click', ()=> {
  cartEl.classList.toggle('open');
});
closeCartBtn.addEventListener('click', closeCart);

update();
