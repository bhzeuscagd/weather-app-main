// 1. IMPORTAMOS LA FUNCIÓN DEL SERVICIO
import { searchCitySuggestions } from "../services/weather";

export const initSearch = () => {
    const refs = {
        input: document.getElementById("search-input") as HTMLInputElement,
        list: document.getElementById("suggestions-list") as HTMLUListElement,
    };

    if (!refs.input || !refs.list) return;

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
        window.location.href = url.toString();
    };

    // --- EVENTOS ---

    // 1. Input: Llama al servicio (searchCitySuggestions)
    refs.input.addEventListener("input", (e: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            // AQUI ESTÁ EL CAMBIO: Usamos la función importada
            const results = await searchCitySuggestions(e.target.value);
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

    // 4. Click fuera
    document.addEventListener("click", (e: any) => {
        if (!refs.input.contains(e.target) && !refs.list.contains(e.target)) {
            refs.list.classList.add("hidden");
        }
    });
};