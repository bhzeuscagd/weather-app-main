import{n as d}from"./router.2W7FzLmj.js";const c=async e=>{if(!e||e.length<2)return[];const i=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(e)}&count=5&language=en&format=json`;try{const n=await fetch(i);return n.ok?(await n.json()).results||[]:[]}catch(n){return console.error("Error buscando sugerencias:",n),[]}},r=()=>{const e={input:document.getElementById("search-input"),list:document.getElementById("suggestions-list"),btn:document.getElementById("search-btn-wrapper")?.querySelector("button")};if(!e.input||!e.list||!e.btn)return;let i;const n=s=>{if(s.length===0){e.list.classList.add("hidden");return}e.list.innerHTML=s.map(t=>`
            <li data-loc="${t.name}, ${t.country}" class="m-2 p-2 rounded-lg hover:border-neutral-200/40 hover:bg-white/10 cursor-pointer hover:border-solid hover:border last:border-0 flex flex-col">
                <span class="font-bold text-sm text-white pointer-events-none">${t.name}</span>
                <span class="text-xs text-white/50 pointer-events-none">${t.admin1||""}, ${t.country}</span>
            </li>
        `).join(""),e.list.classList.remove("hidden")},a=s=>{const t=new URL(window.location.href);t.searchParams.set("city",s),document.body.classList.add("is-searching"),d(t.toString())};e.input.addEventListener("input",s=>{const t=s.target.value;if(clearTimeout(i),t.length<2){e.list.classList.add("hidden");return}i=setTimeout(async()=>{e.list.innerHTML=`
                <li class="m-2 p-3 rounded-lg flex items-center gap-3 text-white/70">
                    <svg class="animate-spin size-5 text-white" aria-hidden="true">
                        <use href="/icons.svg#loading"></use>
                    </svg>
                    <span class="text-sm font-medium">Search in progress...</span>
                </li>
            `,e.list.classList.remove("hidden");const[o]=await Promise.all([c(t),new Promise(l=>setTimeout(l,1e3))]);n(o)},300)}),e.list.addEventListener("click",s=>{const t=s.target.closest("li");if(t){const o=t.dataset.loc;e.input.value=o,e.list.classList.add("hidden"),a(o)}}),e.input.addEventListener("keydown",s=>{s.key==="Enter"&&e.input.value&&(e.list.classList.add("hidden"),a(e.input.value))}),e.btn.addEventListener("click",()=>{e.input.value&&(e.list.classList.add("hidden"),a(e.input.value))}),document.addEventListener("click",s=>{!e.input.contains(s.target)&&!e.list.contains(s.target)&&e.list.classList.add("hidden")})};r();document.addEventListener("astro:page-load",()=>{document.body.classList.remove("is-searching"),r()});
