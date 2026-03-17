// ── SHARED PRODUCT DATA ──
const PRODUCTS = [
  {id:1,name:"Obsidian Wool Coat",cat:"Outerwear",price:68500,badge:"new",e:"◈",colors:["#1a1a18","#3a3530","#4a3828"],sizes:["S","M","L","XL"],desc:"Double-faced Super 180s wool overcoat, hand-sewn by master tailors in Naples. Horn buttons, full silk lining, hand-stitched lapels. The centrepiece of the AW25 collection. Dry clean only.",stars:5,reviews:24,material:"Super 180s Wool",origin:"Naples, Italy"},
  {id:2,name:"Brushed Cashmere Blazer",cat:"Outerwear",price:48000,badge:"exc",e:"✦",colors:["#2a2820","#1a1a16","#3d3530"],sizes:["S","M","L","XL","XXL"],desc:"Single-breasted blazer in Loro Piana brushed cashmere. Patch pockets, working button cuffs, clean half-canvas construction. Effortlessly between casual and formal.",stars:5,reviews:18,material:"Loro Piana Cashmere",origin:"Milan, Italy"},
  {id:3,name:"Japanese Selvedge Trousers",cat:"Trousers",price:22800,badge:"new",e:"▣",colors:["#1a1612","#3a3020","#5a4a38"],sizes:["30","32","34","36","38"],desc:"Cut from Kojima selvedge denim in a relaxed high-rise silhouette. Raw hem, coin pocket, Japanese-style hidden rivet construction. Ages beautifully with every wear.",stars:4,reviews:31,material:"Selvedge Denim",origin:"Kojima, Japan"},
  {id:4,name:"Linen Popover Shirt",cat:"Shirts",price:11200,badge:"",e:"◉",colors:["#E8DDD0","#2a2820","#A8956E"],sizes:["S","M","L","XL","XXL"],desc:"Washed Italian linen in an easy-to-wear popover cut. Split hem, chest pocket, mother-of-pearl buttons, band collar. The essential summer shirt.",stars:4,reviews:42,material:"Italian Linen",origin:"Tuscany, Italy"},
  {id:5,name:"Merino Rollneck",cat:"Knitwear",price:16400,badge:"",e:"⊛",colors:["#2a2820","#C8A870","#3a3a36"],sizes:["S","M","L","XL"],desc:"18.5 micron Merino wool in a refined ribbed rollneck. Fully fashioned construction, minimal bulk, ultra-soft handle. Wears beautifully under a coat.",stars:5,reviews:29,material:"18.5μ Merino Wool",origin:"Biella, Italy"},
  {id:6,name:"Cashmere Scarf",cat:"Accessories",price:8600,badge:"sale",oldPrice:12000,e:"✾",colors:["#3a3530","#8B6B35","#C8A870"],sizes:["One Size"],desc:"Plain-weave Scottish cashmere, 200×70cm. Fringed ends, hand-rolled edges. The most important accessory in a considered wardrobe.",stars:5,reviews:55,material:"Scottish Cashmere",origin:"Edinburgh, Scotland"},
  {id:7,name:"Super 120s Wool Trouser",cat:"Trousers",price:19500,badge:"",e:"◇",colors:["#2a2820","#1a1a14","#3d3028"],sizes:["30","32","34","36"],desc:"Tailored high-rise trouser in Ermenegildo Zegna Super 120s wool. Extended waistband, no-break hem, hand-stitched side seams. The backbone of a formal wardrobe.",stars:5,reviews:19,material:"Zegna Super 120s",origin:"Trivero, Italy"},
  {id:8,name:"Oxford Button-Down",cat:"Shirts",price:9800,badge:"new",e:"◑",colors:["#F4F2EE","#2a2820","#A8956E"],sizes:["S","M","L","XL","XXL"],desc:"Pinpoint Oxford cotton in a classic BD silhouette. Soft roll collar, box pleat, split hem that tucks cleanly or works untucked. An essential that ages with grace.",stars:4,reviews:38,material:"Pinpoint Oxford Cotton",origin:"Albini Mills, Italy"},
  {id:9,name:"Leather Bifold Wallet",cat:"Accessories",price:5800,badge:"",e:"◈",colors:["#2a1e14","#1a1a16","#8B6B35"],sizes:["One Size"],desc:"Vegetable-tanned bridle leather, hand-burnished. Six card slots, note compartment, slim profile that improves dramatically with age and use.",stars:5,reviews:67,material:"Bridle Leather",origin:"Northampton, England"},
  {id:10,name:"Shawl-Collar Cardigan",cat:"Knitwear",price:21000,badge:"exc",e:"❧",colors:["#3a3530","#C8A870","#1a1a14"],sizes:["S","M","L","XL"],desc:"Heavy-gauge cashmere-merino blend in a generous shawl collar cardigan. Four-button front, deep pockets, relaxed body — a perfect indoor layer or light outerwear.",stars:5,reviews:22,material:"Cashmere-Merino Blend",origin:"Edinburgh, Scotland"},
  {id:11,name:"Pleated Chino",cat:"Trousers",price:14800,badge:"new",e:"▤",colors:["#C8B89A","#2a2820","#3a3020"],sizes:["30","32","34","36","38"],desc:"Garment-dyed Italian cotton in a generous double-pleat cut. High rise, side adjusters, clean hem. A trouser that bridges tailored and casual with ease.",stars:4,reviews:33,material:"Garment-Dyed Cotton",origin:"Prato, Italy"},
  {id:12,name:"Nubuck Derby Shoes",cat:"Accessories",price:32000,badge:"",e:"◎",colors:["#2a1e14","#8B6B35","#1a1a16"],sizes:["7","8","9","10","11"],desc:"Hand-welted nubuck leather derby on a classic last. Double leather sole, natural edge, leather insole that moulds to your foot over time. Made in Northampton.",stars:5,reviews:14,material:"Nubuck Leather",origin:"Northampton, England"},
];

// ── CART ──
function getCart(){try{return JSON.parse(localStorage.getItem('vorn_cart'))||[]}catch{return[]}}
function saveCart(c){localStorage.setItem('vorn_cart',JSON.stringify(c))}
function addToCart(id,size,qty=1){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const cart=getCart();const k=`${id}|${size}`;
  const ex=cart.find(i=>i.k===k);
  if(ex)ex.qty+=qty;else cart.push({k,id,name:p.name,price:p.price,size,e:p.e,qty,cat:p.cat});
  saveCart(cart);updateCartBadge();
}
function removeFromCart(k){const c=getCart().filter(i=>i.k!==k);saveCart(c);updateCartBadge()}
function updateQty(k,d){
  const c=getCart();const i=c.find(x=>x.k===k);
  if(!i)return;i.qty+=d;if(i.qty<=0){saveCart(c.filter(x=>x.k!==k))}else{saveCart(c)}
  updateCartBadge();
}
function getCartCount(){return getCart().reduce((s,i)=>s+i.qty,0)}
function getCartTotal(){return getCart().reduce((s,i)=>s+i.price*i.qty,0)}
function updateCartBadge(){
  const b=document.getElementById('cartBadge');if(!b)return;
  const n=getCartCount();b.textContent=n;b.style.display=n>0?'flex':'none';
}

// ── WISHLIST ──
function getWishlist(){try{return JSON.parse(localStorage.getItem('vorn_wish'))||[]}catch{return[]}}
function saveWishlist(w){localStorage.setItem('vorn_wish',JSON.stringify(w))}
function toggleWish(id){
  let w=getWishlist();
  if(w.includes(id))w=w.filter(x=>x!==id);else w.push(id);
  saveWishlist(w);return w.includes(id);
}
function isWished(id){return getWishlist().includes(id)}

// ── TOAST ──
function showToast(msg,type='info'){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t);}
  t.textContent=msg;t.className='toast show '+(type==='success'?'toast-success':'');
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600);
}

// ── STARS ──
function renderStars(n){
  return Array(5).fill(0).map((_,i)=>`<svg class="star ${i<n?'filled':'empty'}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`).join('');
}

// ── SHARED NAV INIT ──
function initNav(){
  updateCartBadge();
  const ham=document.getElementById('hamBtn');
  const mob=document.getElementById('mobNav');
  const mobCls=document.getElementById('mobCls');
  if(ham)ham.addEventListener('click',()=>mob.classList.add('open'));
  if(mobCls)mobCls.addEventListener('click',()=>mob.classList.remove('open'));
  mob&&mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open')));
  // scroll reveal
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}}),{threshold:.1});
  document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
}
