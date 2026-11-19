// しーちゃん占い v1.0.0
const CACHE="uranai-v1.0.0";
const FILES=["./","./index.html","./manifest.json","./icon-180.png","./icon-192.png","./icon-512.png",
"./img/guide.webp","./img/logo.webp","./img/howto.webp","./img/miko.webp","./img/miko_daikichi.webp","./img/ekisha.webp","./img/ekisha_mushi.webp",
"./img/ouen.webp","./img/fukubiki.webp","./img/gacha.webp","./img/hibiscus.webp","./img/chinsuko.webp","./img/nade.webp"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 const page=r.mode==="navigate"||/\.(html|js|json)$/.test(new URL(r.url).pathname);
 if(page){ // 新しい版を先に取りに行く（オフラインならキャッシュ）
  e.respondWith(fetch(r,{cache:"no-store"}).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html"))));
 }else{
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(r,c));return res})));
 }});
