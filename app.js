const CONFIG={whatsapp:"27314047891",deliveryFee:150,bank:{name:"HERBAL FORCE",bank:"ADD BANK NAME",accountName:"ADD ACCOUNT NAME",accountNumber:"ADD ACCOUNT NUMBER",branchCode:"ADD BRANCH CODE"}};
const PRODUCTS=[
{id:"adult-skin",name:"Psoriasis & Eczema Treatment — Adult",tag:"Psoriasis / eczema",price:0,concerns:["psoriasis","eczema"],ages:["adult","teen"]},
{id:"child-skin",name:"Psoriasis & Eczema Treatment — Children",tag:"Children",price:0,concerns:["psoriasis","eczema"],ages:["child"]},
{id:"skin-scalp",name:"Psoriasis & Eczema Treatment — Skin & Scalp",tag:"Skin / scalp",price:0,concerns:["psoriasis","eczema","skin"],ages:["adult","teen"]},
{id:"acne",name:"Pimple & Acne Treatment",tag:"Acne / pimples",price:0,concerns:["acne"],ages:["adult","teen"]},
{id:"marks",name:"Treatment for Pimple Marks",tag:"Pimple marks",price:0,concerns:["marks"],ages:["adult","teen"]},
{id:"pre-treatment",name:"Pre-Psoriasis / Eczema Treatment",tag:"Pre-treatment",price:0,concerns:["psoriasis","eczema"],ages:["adult","teen"]},
{id:"shampoo",name:"Medicated Shampoo",tag:"Hair / scalp",price:0,concerns:["psoriasis","eczema","skin"],ages:["adult","teen"]},
{id:"perfect-touch",name:"Perfect Touch Hand & Body Cream",tag:"Body care",price:0,concerns:["skin","eczema","psoriasis"],ages:["adult","teen","child"]},
{id:"detox",name:"Body Detox",tag:"Wellness",price:0,concerns:["skin"],ages:["adult"]},
{id:"supplement",name:"Herbal Supplement",tag:"Supplement",price:0,concerns:["skin"],ages:["adult","teen"]},
{id:"dstress",name:"D-Stress Nutrient Supplement",tag:"Supplement",price:0,concerns:["skin"],ages:["adult"]}];
let state={step:1,answers:{},cart:JSON.parse(localStorage.getItem("hf_v12_cart")||"[]")};
let orders=JSON.parse(localStorage.getItem("hf_v12_orders")||"[]");
const $=s=>document.querySelector(s), money=n=>n>0?new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR"}).format(n):"Price on request";
function save(){localStorage.setItem("hf_v12_cart",JSON.stringify(state.cart));counts()}
function saveOrders(){localStorage.setItem("hf_v12_orders",JSON.stringify(orders))}function counts(){let n=state.cart.reduce((a,x)=>a+x.qty,0);$("#cartCount").textContent=n}function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}function open(id){$(id).classList.add("open")}function close(){document.querySelectorAll(".modal").forEach(x=>x.classList.remove("open"))}
function wa(t){window.open("https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t),"_blank")}
$("#menu").onclick=()=>$("#nav").classList.toggle("open");$("#start").onclick=()=>$("#finder").scrollIntoView({behavior:"smooth"});$("#whatsapp").onclick=()=>wa("Hello Herbal Force, I have a question about your products.");
document.querySelectorAll("[data-concern]").forEach(b=>b.onclick=()=>select("concern",b.dataset.concern,b));document.querySelectorAll("[data-age]").forEach(b=>b.onclick=()=>select("age",b.dataset.age,b));document.querySelectorAll("[data-duration]").forEach(b=>b.onclick=()=>select("duration",b.dataset.duration,b));
function select(k,v,b){state.answers[k]=v;b.parentElement.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");$("#next").disabled=false}
function setStep(n){state.step=n;document.querySelectorAll(".q").forEach(x=>x.classList.toggle("active",+x.dataset.step===n));$("#bar").style.width=n*25+"%";$("#label").textContent=`Question ${n} of 4`;$("#back").disabled=n===1;$("#next").style.display=n===4?"none":"inline-block";$("#next").disabled=!state.answers[["","concern","age","duration"][n]]}
$("#next").onclick=()=>setStep(state.step+1);$("#back").onclick=()=>setStep(state.step-1);
$("#finderForm").onsubmit=e=>{e.preventDefault();if(!$("#ack").checked)return toast("Please confirm the guidance notice.");state.answers.extra=$("#extra").value.trim();showResults()};
function relevant(){let c=state.answers.concern,a=state.answers.age;if(c==="vitiligo")return[];let r=PRODUCTS.filter(p=>p.concerns.includes(c)&&(p.ages.includes(a)||a==="prefer"));return(r.length?r:PRODUCTS.filter(p=>p.concerns.includes(c))).slice(0,4)}
function card(p){return `<article class="rec"><span class="tag">${p.tag}</span><h3>${p.name}</h3><p>Relevant to the concern selected. Confirm suitability with Herbal Force before ordering.</p><div class="rec-bottom"><b>${money(p.price)}</b><button class="add" onclick="add('${p.id}')">${p.price?"Add to cart":"Ask price"}</button></div></article>`}
function showResults(){let c=state.answers.concern;$("#resultText").textContent=c==="vitiligo"?"For vitiligo, the website recommends speaking directly with Herbal Force rather than making a treatment claim.":`Based on your answers for ${c}, these products may be relevant to ask Herbal Force about.`;let r=relevant();$("#recommendations").innerHTML=r.length?r.map(card).join():`<article class="rec"><span class="tag">DIRECT ENQUIRY</span><h3>Talk to Herbal Force</h3><p>Please send your answers for personalised guidance.</p><button class="add" onclick="wa(resultMessage())">WhatsApp</button></article>`;$("#results").classList.remove("hidden");$("#results").scrollIntoView({behavior:"smooth"})}
function resultMessage(){return `Hello Herbal Force. I used the Skin Finder.\n\nConcern: ${state.answers.concern}\nAge: ${state.answers.age}\nDuration: ${state.answers.duration}\nDetails: ${state.answers.extra||"None"}\n\nPlease advise me on the appropriate products.`}
$("#addRecommended").onclick=()=>{relevant().filter(p=>p.price>0).forEach(p=>add(p.id,true));toast("Priced recommendations added")};$("#restart").onclick=()=>{state.answers={};$("#results").classList.add("hidden");document.querySelectorAll(".choices button").forEach(x=>x.classList.remove("selected"));$("#extra").value="";$("#ack").checked=false;setStep(1);$("#finder").scrollIntoView({behavior:"smooth"})};
function add(id,silent=false){let p=PRODUCTS.find(x=>x.id===id);if(!p)return;if(p.price<=0){wa("Hello Herbal Force. Please send me the current price for: "+p.name);return}let x=state.cart.find(i=>i.id===id);x?x.qty++:state.cart.push({id,qty:1});save();if(!silent)toast("Added to cart")}
function renderProducts(){$("#productGrid").innerHTML=PRODUCTS.map(p=>`<article class="product"><div class="product-img"><div class="bottle"></div></div><div class="product-info"><span class="tag">${p.tag}</span><h3>${p.name}</h3><p>Ask Herbal Force to confirm suitability.</p><div class="prod-bottom"><b>${money(p.price)}</b><button class="add" onclick="add('${p.id}')">${p.price?"Add to cart":"Ask price"}</button></div></div></article>`).join("")}
function cartSubtotal(){return state.cart.reduce((sum,x)=>sum+PRODUCTS.find(p=>p.id===x.id).price*x.qty,0)}
function renderCart(){
 let box=$("#cartItems");
 if(!state.cart.length){box.innerHTML="<p>Your cart is empty.</p>";$("#cartTotal").textContent="R0.00";return}
 let subtotal=cartSubtotal(), total=subtotal+CONFIG.deliveryFee;
 box.innerHTML=state.cart.map(x=>{let p=PRODUCTS.find(y=>y.id===x.id);return `<div class="cart-row"><span><b>${p.name}</b><small>${x.qty} × ${money(p.price)}</small></span><button onclick="removeItem('${p.id}')">Remove</button></div>`}).join("")+
 `<div class="cart-row"><span>Products subtotal</span><b>${money(subtotal)}</b></div><div class="cart-row"><span>South Africa delivery</span><b>${money(CONFIG.deliveryFee)}</b></div>`;
 $("#cartTotal").textContent=money(total);
}
function removeItem(id){state.cart=state.cart.filter(x=>x.id!==id);save();renderCart()}
$("#cartOpen").onclick=()=>{renderCart();open("#cartModal")};$("#eft").onclick=()=>{if(!state.cart.length)return toast("Your cart is empty");if(state.cart.some(x=>PRODUCTS.find(p=>p.id===x.id).price<=0))return toast("Some prices are not confirmed yet");close();open("#eftModal")};
$("#cartWA").onclick=()=>wa("Hello Herbal Force. I would like to order:\n\n"+state.cart.map(x=>{let p=PRODUCTS.find(y=>y.id===x.id);return p.name+" × "+x.qty+" — "+money(p.price)}).join("\n"));
$("#eftForm").onsubmit=e=>{
 e.preventDefault();
 let f=new FormData(e.target), order="HF-"+Date.now().toString().slice(-8),
 subtotal=cartSubtotal(), delivery=CONFIG.deliveryFee, total=subtotal+delivery,
 items=state.cart.map(x=>{let p=PRODUCTS.find(y=>y.id===x.id);return p.name+" × "+x.qty}).join("\\n"),
 province=f.get("province"), address=f.get("address"),
 customer={first:f.get("first"),last:f.get("last"),phone:f.get("phone"),email:f.get("email"),province,address},
 record={order,created:new Date().toISOString(),customer,items,subtotal,delivery,total,status:"Awaiting Payment"};
 orders.unshift(record);saveOrders();
 $("#bank").innerHTML=`<b>Order ${order}</b><br><br><strong>Total: ${money(total)}</strong><br><br><b>South Africa delivery: ${money(delivery)}</b><br><br><b>Bank transfer details</b><br>Bank: ${CONFIG.bank.bank}<br>Account name: ${CONFIG.bank.accountName}<br>Account number: ${CONFIG.bank.accountNumber}<br>Branch code: ${CONFIG.bank.branchCode}<br><br><b>Payment reference: ${order}</b><br><br>After paying, send proof of payment.<br><button class="primary full" style="margin-top:15px" onclick='sendOrder(${JSON.stringify(order)},${JSON.stringify(customer.first+" "+customer.last)},${JSON.stringify(customer.phone)},${JSON.stringify(customer.email)},${JSON.stringify(province+" — "+address)},${JSON.stringify(items)},${total})'>Send order on WhatsApp</button>`;
 $("#bank").classList.remove("hidden"); e.target.classList.add("hidden");
};
function sendOrder(order,name,phone,email,address,items,total){
 wa(`NEW HERBAL FORCE ORDER\\n\\nOrder: ${order}\\nName: ${name}\\nPhone: ${phone}\\nEmail: ${email}\\nDelivery: ${address}\\n\\nItems:\\n${items}\\n\\nDelivery: ${money(CONFIG.deliveryFee)}\\nTotal: ${money(total)}\\n\\nCustomer will pay by EFT.`);
 state.cart=[];save();toast("Order sent to Herbal Force");
}
$("#contactForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);wa(`Hello Herbal Force.\n\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nConcern: ${f.get("concern")}\nMessage: ${f.get("message")}`)};
document.addEventListener("click",e=>{if(e.target.matches("[data-close]")||e.target.classList.contains("modal"))close()});$("#year").textContent=new Date().getFullYear();renderProducts();counts();setStep(1);
