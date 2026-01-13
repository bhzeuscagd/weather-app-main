// 1. IMPORTAMOS LA FUNCIÓN DEL SERVICIO
import { searchCitySuggestions } from "../services/weather";
import { navigate } from "astro:transitions/client";

export const initSearch = () => {
    const refs = {
        input: document.getElementById("search-input") as HTMLInputElement,
        list: document.getElementById("suggestions-list") as HTMLUListElement,
        btn: document.getElementById("search-btn-wrapper")?.querySelector("button") as HTMLButtonElement,
    };

    if (!refs.input || !refs.list || !refs.btn) return;

    let timeout: any;

    // --- RENDERIZADO ---
    const showResults = (cities: any[]) => {
        if (cities.length === 0) {
            refs.list.classList.add("hidden");
            return;
        }
        
        // Template String limpio
        refs.list.innerHTML = cities.map(city => `
            <li data-loc="${city.name}, ${city.country}" class="m-2 p-2 rounded-lg hover:border-neutral-200/40 hover:bg-white/10 cursor-pointer hover:border-solid hover:border last:border-0 flex flex-col">
                <span class="font-bold text-sm text-white pointer-events-none">${city.name}</span>
                <span class="text-xs text-white/50 pointer-events-none">${city.admin1 || ''}, ${city.country}</span>
            </li>
        `).join("");
        
        refs.list.classList.remove("hidden");
    };

    // --- NAVEGACIÓN ---
    const navigateTo = (fullLocation: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("city", fullLocation);
        
        // Activamos estado de carga visual
        document.body.classList.add("is-searching");
        
        // Navegación tipo SPA (mantiene el estado de is-searching hasta que cambia la pág)
        navigate(url.toString());
    };

    // --- EVENTOS ---

    // 1. Input: Llama al servicio (searchCitySuggestions)
    refs.input.addEventListener("input", (e: any) => {
        const query = e.target.value;
        clearTimeout(timeout);
        
        if (query.length < 2) {
            refs.list.classList.add("hidden");
            return;
        }

        timeout = setTimeout(async () => {
            // Mostrar "Search in progress" dentro del UL
            refs.list.innerHTML = `
                <li class="m-2 p-3 rounded-lg flex items-center gap-3 text-white/70">
                    <svg class="animate-spin size-5 text-white" aria-hidden="true">
                        <use href="/icons.svg#loading"></use>
                    </svg>
                    <span class="text-sm font-medium">Search in progress...</span>
                </li>
            `;
            refs.list.classList.remove("hidden");
            
            // Usamos Promise.all para asegurar que el loader se vea al menos 1 segundo
            const [results] = await Promise.all([
                searchCitySuggestions(query),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);

            showResults(results);
        }, 300);
    });

    // 2. Click en Lista (Delegation)
    refs.list.addEventListener("click", (e: any) => {
        const li = e.target.closest("li");
        if (li) {
            const location = li.dataset.loc;
            refs.input.value = location;
            refs.list.classList.add("hidden");
            navigateTo(location);
        }
    });

    // 3. Enter
    refs.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && refs.input.value) {
            refs.list.classList.add("hidden");
            navigateTo(refs.input.value);
        }
    });

    // 4. Click en Botón
    refs.btn.addEventListener("click", () => {
        if (refs.input.value) {
            refs.list.classList.add("hidden");
            navigateTo(refs.input.value);
        }
    });

    // 5. Click fuera
    document.addEventListener("click", (e: any) => {
        if (!refs.input.contains(e.target) && !refs.list.contains(e.target)) {
            refs.list.classList.add("hidden");
        }
    });
};