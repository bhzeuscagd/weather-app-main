import { e as createComponent, f as createAstro, h as addAttribute, k as renderScript, r as renderTemplate, l as renderComponent, n as renderHead, o as renderSlot, m as maybeRenderHead } from '../chunks/astro/server_B1dgWMdS.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$f = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/cagd/Programacion/Astro-dev/weather-app-main/node_modules/.pnpm/astro@5.16.7_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.55.1_typescript@5.9.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/node_modules/.pnpm/astro@5.16.7_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.55.1_typescript@5.9.3/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$e = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Weather Now</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body class="bg-neutral-900" data-astro-cid-sckkx6r4>  ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/layouts/Layout.astro", void 0);

const $$Astro$d = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Icon;
  const { name, size = "size-6", class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute([size, className], "class:list")} aria-hidden="true"> <use${addAttribute(`/icons.svg#${name}`, "href")}></use> </svg>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/ui/Icon.astro", void 0);

const $$Astro$c = createAstro();
const $$Options = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Options;
  const { title, options, activeUnit } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="p-1"> <span class="block px-4 py-1.5 font-DMSans text-neutral-400 text-xs tracking-wider"> ${title} </span> ${options.map((option) => {
    const isActive = option.dataunit === activeUnit;
    return (
      // Creamos el botón para esta opción específica
      renderTemplate`<button${addAttribute([
        // Clases fijas: diseño base, flexbox, hover effects...
        "flex items-center justify-between  px-4 py-2 my-1 text-sm w-full text-left transition-colors hover:px-5 hover:rounded-md hover:bg-white/5 hover:text-white",
        // Clase condicional: Si isActive es true, texto blanco. Si no, gris.
        isActive ? "px-5 rounded-md bg-white/5 text-white" : "text-gray-300"
      ], "class:list")}${addAttribute(option.dataunit, "data-unit")}> <span>${option.label}</span> ${isActive && //la opción tiene icono personalizado, úsalo. Si no, usa "check".
      renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": option.icon || "check", "class": "w-3 h-3 text-white" })}`} </button>`
    );
  })} </div>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_button/Options.astro", void 0);

const $$Astro$b = createAstro();
const $$Units = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Units;
  const currentTemp = Astro2.url.searchParams.get("temperature_unit") || "celsius";
  const currentWind = Astro2.url.searchParams.get("wind_speed_unit") || "kmh";
  const currentPrecip = Astro2.url.searchParams.get("precipitation_unit") || "mm";
  const TemperatureOptions = [
    { label: "Celsius (\xB0C)", dataunit: "celsius" },
    { label: "Fahrenheit (\xB0F)", dataunit: "fahrenheit" }
  ];
  const WindOptions = [
    { label: "km/h", dataunit: "kmh" },
    { label: "mph", dataunit: "mph" }
  ];
  const PrecipitationOptions = [
    { label: "Millimeter (mm)", dataunit: "mm" },
    { label: "Inch (in)", dataunit: "inch" }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="relative inline-block text-left z-100 group"> <button class="font-DMSans inline-flex w-full justify-center align-center gap-2 rounded-md bg-neutral-800 px-2 py-1 text-sm text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20 hover:border-black hover:border-solid hover:border-2 hover:ring-2 hover:ring-white"> ${renderComponent($$result, "Icon", $$Icon, { "name": "units", "class": "w-4 h-4 text-white" })} <span>Units</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "dropdown", "class": "w-3 h-3 text-white opacity-70" })} </button> <menu id="unit-menu" class="absolute right-0 top-full mt-2 group-hover:block hidden group-focus-within:block w-48 origin-top-right divide-y divide-white/10 rounded-md bg-neutral-800 outline-1 border border-white/30 transition transition-discrete shadow-sm shadow-white/20"> <div class="p-2 mb-2 border-b border-white/5"> <button id="toggle-system" class="border-hover rounded-md block w-full text-left px-2 py-1 text-sm text-white font-semibold font-DMSans hover:bg-white/5 hover:text-white transition-colors"> ${currentTemp === "celsius" ? "Switch to Imperial" : "Switch to Metric"} </button> </div> ${renderComponent($$result, "Options", $$Options, { "title": "Temperature", "options": TemperatureOptions, "activeUnit": currentTemp })} ${renderComponent($$result, "Options", $$Options, { "title": "Wind speed", "options": WindOptions, "activeUnit": currentWind })} ${renderComponent($$result, "Options", $$Options, { "title": "Precipitation", "options": PrecipitationOptions, "activeUnit": currentPrecip })} </menu> </div> ${renderScript($$result, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/Units.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/Units.astro", void 0);

const $$Astro$a = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="flex justify-between items-center px-2 -mt-10 lg:mx-20 lg:-mt-3">  ${renderComponent($$result, "Icon", $$Icon, { "name": "logo", "class": "w-36 h-auto lg:w-48 lg:h-auto" })}  <div> ${renderComponent($$result, "Units", $$Units, { "currentUnit": Astro2.props.currentUnit })} </div> </header>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/layouts/Header.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<hero class="font-Bricolage text-6xl font-bold text-white text-center"> <h1 class="px-3">How's the sky looking today?</h1> </hero>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/Hero.astro", void 0);

const $$Astro$9 = createAstro();
const $$WeatherIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$WeatherIcon;
  const { code, class: className, alt = "Icono del clima" } = Astro2.props;
  const getWeatherImage = (c) => {
    if (c === 0) return "icon-sunny.webp";
    if (c === 1 || c === 2) return "icon-partly-cloudy.webp";
    if (c === 3) return "icon-overcast.webp";
    if (c === 45 || c === 48) return "icon-fog.webp";
    if (c >= 51 && c <= 57) return "icon-drizzle.webp";
    if (c >= 61 && c <= 67 || c >= 80 && c <= 82) return "icon-rain.webp";
    if (c >= 71 && c <= 77 || c >= 85 && c <= 86) return "icon-snow.webp";
    if (c >= 95) return "icon-storm.webp";
    return "icon-sunny.webp";
  };
  const imageName = getWeatherImage(code);
  const imagePath = `/images/${imageName}`;
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(imagePath, "src")}${addAttribute(alt, "alt")}${addAttribute(`object-contain ${className}`, "class")} loading="lazy" width="64" height="64">`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_HourlyForestcast/WeatherIcon.astro", void 0);

const $$Astro$8 = createAstro();
const $$Hours = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Hours;
  const { hourly } = Astro2.props;
  const horasParaMostrar = hourly.time.map((time, i) => {
    return {
      horaLegible: new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      temperatura: Math.round(hourly.temperature_2m[i]),
      codigoClima: hourly.weather_code[i]
    };
  });
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-3 p-2 max-h-[560px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2"> ${horasParaMostrar.map((item) => renderTemplate`<div class="flex flex-row items-center justify-between p-1 theme-card shrink-0"> <div class="flex flex-row items-center gap-2 text-white"> ${renderComponent($$result, "WeatherIcon", $$WeatherIcon, { "code": item.codigoClima, "class": "w-10 h-10 mb-2" })} <span class="text-sm font-light">${item.horaLegible}</span> </div> <span class="text-xl font-semibold text-white"> ${item.temperatura}°
</span> </div>`)} </div>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_HourlyForestcast/Hours.astro", void 0);

const $$Astro$7 = createAstro();
const $$OptionDays = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OptionDays;
  const { days, selectedDay } = Astro2.props;
  const formatDate = (dateStr) => {
    const date = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  const initialLabel = formatDate(selectedDay);
  return renderTemplate`${maybeRenderHead()}<div class="relative inline-block text-left z-50 group"> <button id="dropdown-trigger" class="font-DMSans inline-flex w-full justify-center items-center gap-2 rounded-md bg-white/20 px-2 py-1 text-sm text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20 hover:border-black hover:border-solid hover:border-2 hover:ring-2 hover:ring-white capitalize"> <span id="current-label">${initialLabel}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "dropdown", "class": "w-2.5 h-5 text-white" })} </button> <menu class="absolute right-0 top-full mt-2 group-hover:block hidden group-focus-within:block w-48 origin-top-right divide-y rounded-md bg-gray-900/10 outline-1 border border-white/30 transition transition-discrete shadow-sm shadow-white/20"> <div class="p-1 flex flex-col gap-1 bg-gray-700"> ${days.map((day) => {
    const label = formatDate(day);
    const isToday = day === selectedDay;
    return renderTemplate`<button${addAttribute([
      "day-option text-left px-3 py-2 text-sm rounded-md capitalize w-full transition-colors flex justify-between items-center",
      isToday ? "bg-white/20 text-white font-bold" : "text-gray-300 hover:bg-white/20 hover:text-white"
    ], "class:list")}${addAttribute(day, "data-date")}${addAttribute(label, "data-label")}> ${label}  <span class="check-icon hidden text-white">✓</span> </button>`;
  })} </div> </menu> </div> ${renderScript($$result, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_HourlyForestcast/OptionDays.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_HourlyForestcast/OptionDays.astro", void 0);

const getFilteredHours = (hourly, selectedDate) => {
  let startIndex = hourly.time.findIndex((t) => t.startsWith(selectedDate));
  if (startIndex === -1) return null;
  const now = /* @__PURE__ */ new Date();
  const localDate = now.toLocaleDateString("sv-SE");
  if (selectedDate === localDate) {
    const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now);
    if (currentHourIndex !== -1 && currentHourIndex > startIndex) {
      startIndex = currentHourIndex;
    }
  }
  const HOURS_TO_SHOW = 24;
  const endIndex = startIndex + HOURS_TO_SHOW;
  return {
    time: hourly.time.slice(startIndex, endIndex),
    temperature_2m: hourly.temperature_2m.slice(startIndex, endIndex),
    weather_code: hourly.weather_code.slice(startIndex, endIndex)
  };
};
const getFormattedDaily = (daily) => {
  return daily.time.slice(0, 7).map((time, i) => {
    const dateObj = /* @__PURE__ */ new Date(time + "T00:00:00");
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    return {
      dayName,
      maxTemp: Math.round(daily.temperature_2m_max[i]),
      minTemp: Math.round(daily.temperature_2m_min[i]),
      code: daily.weather_code[i]
    };
  });
};
const getStackCardData = (weather, geo, units) => {
  const tempUnit = units.temperature_unit === "fahrenheit" ? "°F" : "°C";
  const windUnit = units.wind_speed_unit === "mph" ? "mph" : "km/h";
  const precipUnit = units.precipitation_unit === "inch" ? "in" : "mm";
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return {
    city: geo.name,
    country: geo.country,
    date: dateStr,
    temp: Math.round(weather.daily.temperature_2m_max[0]),
    tempUnit,
    code: weather.daily.weather_code[0],
    feelsLike: Math.round(weather.current.apparent_temperature),
    humidity: weather.current.relative_humidity_2m,
    wind: Math.round(weather.current.wind_speed_10m),
    windUnit,
    precip: weather.daily.precipitation_sum[0],
    precipUnit
  };
};

const $$Astro$6 = createAstro();
const $$HourlyForecast = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$HourlyForecast;
  const { class: className, weatherData } = Astro2.props;
  const now = /* @__PURE__ */ new Date();
  const localDate = now.toLocaleDateString("sv-SE");
  const allDaysData = weatherData ? weatherData.daily.time.map((day) => {
    return {
      date: day,
      // Llamamos a tu utilidad para obtener las horas de ESE día específico
      hours: getFilteredHours(weatherData.hourly, day)
    };
  }) : [];
  const selectedDay = weatherData ? weatherData.daily.time[0] : localDate;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([
    "theme-card flex flex-col gap-2 max-w-[340px] mx-auto p-2 md:max-w-xl lg:mx-0",
    className
  ], "class:list")}>  <header class="flex flex-row justify-between px-2 items-center"> <h2 class="font-DMSans text-xl font-semibold text-white">
Hourly Forecast
</h2> ${weatherData && renderTemplate`${renderComponent($$result, "OptionDays", $$OptionDays, { "days": weatherData.daily.time, "selectedDay": selectedDay })}`} </header>  <div id="hours-container"> ${allDaysData.map(
    (dayData) => (
      // Solo renderizamos si hay datos válidos para ese día
      dayData.hours ? renderTemplate`<div${addAttribute(`hours-${dayData.date}`, "id")}${addAttribute(`hourly-list ${dayData.date === selectedDay ? "" : "hidden"}`, "class")}> ${renderComponent($$result, "Hours", $$Hours, { "hourly": dayData.hours })} </div>` : null
    )
  )}  ${allDaysData.length === 0 && renderTemplate`<p class="text-white/50 text-sm p-2">Cargando datos...</p>`} </div> </section>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/HourlyForecast.astro", void 0);

const $$Astro$5 = createAstro();
const $$WeatherDataDaily = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$WeatherDataDaily;
  const { daily } = Astro2.props;
  const forecastData = getFormattedDaily(daily);
  return renderTemplate`${forecastData.map((day) => renderTemplate`${maybeRenderHead()}<div class="theme-card row-span-2 flex flex-col items-center justify-between py-3"><span class="text-gray-300 text-sm font-medium uppercase tracking-wide">${day.dayName}</span><div class="w-12 h-12">${renderComponent($$result, "WeatherIcon", $$WeatherIcon, { "code": day.code, "class": "w-full h-full drop-shadow-md" })}</div><div class="flex flex-row justify-between leading-none w-full px-2"><span class="text-white font-bold text-lg">${day.maxTemp}°</span><span class="text-white/60 font-semibold text-lg">${day.minTemp}°
</span></div></div>`)}`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_DailyForecast/weatherDataDaily.astro", void 0);

const $$Astro$4 = createAstro();
const $$DailyForecast = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DailyForecast;
  const { class: className, weatherData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["flex flex-col gap-4 p-2 lg:p-0", className], "class:list")}> <header class="font-DMSans font-semibold text-white"> <h2>Daily Forecast</h2> </header> <div class="flex-1 flex flex-col">  <div class="grid grid-cols-3 grid-rows-6 gap-3 h-[500px] md:grid-cols-7 md:grid-rows-2 md:h-auto lg:grid-rows-1 lg:flex-1 lg:items-stretch">  ${weatherData ? renderTemplate`${renderComponent($$result, "WeatherDataDaily", $$WeatherDataDaily, { "daily": weatherData.daily })}` : renderTemplate`<div class="col-span-3 text-white/50 text-center flex items-center justify-center">
Cargando...
</div>`} </div> </div> </section>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/DailyForecast.astro", void 0);

const $$Astro$3 = createAstro();
const $$StatCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$StatCard;
  const { weatherData } = Astro2.props;
  if (!weatherData) {
    return null;
  }
  const info = getStackCardData(
    weatherData.weather,
    weatherData.geo,
    weatherData.units
  );
  return renderTemplate`${maybeRenderHead()}<section class="w-full mx-auto p-2 flex justify-center items-center md:max-w-2xl lg:min-w-full lg:mx-0">  <div class="grid grid-cols-2 grid-rows-8 h-[500px] w-full gap-4 md:w-auto lg:grid-cols-4 lg:grid-rows-6 lg:min-w-full lg:h-[400px]">  <div class="col-span-2 row-span-4 lg:flex lg:flex-row lg:items-center lg:justify-between lg:col-span-4 lg:row-span-4 theme-card bg-[url('/images/bg-today-small.svg')] lg:bg-[url('/images/bg-today-large.svg')] bg-cover bg-center bg-no-repeat p-5 flex flex-col justify-between relative overflow-hidden group"> <div class="absolute inset-0 bg-black/10 z-0"></div> <div class="z-10 flex flex-col items-center lg:items-start lg:text-start"> <h2 class="font-bold text-white font-DMSans text-center text-2xl drop-shadow-md lg:text-start"> ${info.city}, <span class="text-white/90 lg:text-start">${info.country}</span> </h2> <p class="text-white/80 text-sm mt-1 font-DMSans font-semibold capitalize text-center drop-shadow-sm"> ${info.date} </p> </div> <div class="flex items-center justify-between z-10 mt-2 px-2 lg:gap-10">  <div class="w-32 h-32 lg:w-28 lg:h-28"> ${renderComponent($$result, "WeatherIcon", $$WeatherIcon, { "code": info.code, "class": "w-full h-full drop-shadow-2xl filter" })} </div>  <div class="flex flex-col items-end"> <div class="flex items-start"> <span class="text-8xl font-DMSans font-bold text-white tracking-tighter drop-shadow-lg"> ${info.temp} </span> <span class="text-4xl font-DMSans font-bold text-white/80 mt-4 ml-1"> ${info.tempUnit} </span> </div> </div> </div> </div>   <div class="row-span-2 row-start-5 theme-card lg:col-span-1 lg:row-span-2 theme-card-info-main"> <span class="theme-card-info-sub">Feels like</span> <span class="text-2xl font-DMSans text-white"> ${info.feelsLike}${info.tempUnit} </span> </div>  <div class="row-span-2 row-start-5 theme-card lg:col-span-1 lg:row-span-2 theme-card-info-main"> <span class="theme-card-info-sub">Humidity</span> <span class="text-2xl font-DMSans text-white"> ${info.humidity}%
</span> </div>  <div class="row-span-2 row-start-7 theme-card lg:col-span-1 lg:row-span-2 theme-card-info-main"> <span class="theme-card-info-sub">Wind</span> <div class="flex items-baseline gap-1"> <span class="text-2xl font-DMSans text-white"> ${info.wind} </span> <span class="text-sm text-white/60 font-medium"> ${info.windUnit} </span> </div> </div>  <div class="row-span-2 row-start-7 theme-card lg:col-span-1 lg:row-span-2 theme-card-info-main"> <span class="theme-card-info-sub">Precipitation</span> <div class="flex items-baseline gap-1"> <span class="text-2xl font-DMSans text-white"> ${info.precip} </span> <span class="text-sm text-white/60 font-medium"> ${info.precipUnit} </span> </div> </div> </div> </section>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/StatCard.astro", void 0);

const $$Button = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="w-full h-full flex justify-center items-center lg:w-32 lg:h-auto"> <button class="bg-blue-600 text-white font-DMSans-700 w-full py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
Search
</button> </div>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/ui/Button.astro", void 0);

const $$SearchBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-2 py-8 px-4 relative z-50 md:max-w-3xl md:px-8 md:mx-auto lg:max-w-[800px] lg:flex-row lg:items-center lg:gap-4 lg:px-0">  <div class="flex items-center gap-2 relative w-full text-white"> <input id="search-input" type="text" autocomplete="off" placeholder="Search for a place..." class="w-full p-2 pl-10 theme-card peer transition-all focus:pl-2 outline-none text-white placeholder-white/50">  ${renderComponent($$result, "Icon", $$Icon, { "name": "search", "class": "absolute text-white left-4 top-1/2 -translate-y-1/2 transition-all peer-focus:opacity-0 peer-focus:scale-75 pointer-events-none" })}  <ul id="suggestions-list" class="absolute top-full inset-x-2 mt-2 bg-neutral-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden max-h-60 overflow-y-auto z-50"></ul> </div>  <div id="search-btn-wrapper" class="w-full lg:w-auto"> ${renderComponent($$result, "Button", $$Button, {}, { "default": ($$result2) => renderTemplate`Search` })} </div> </div> ${renderScript($$result, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/SearchBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/SearchBar.astro", void 0);

const $$ErrorState = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center justify-center h-[50vh] w-full text-center"> <h3 class="text-white font-bold text-xl font-DMSans">
No search result found!
</h3> </div>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/Error/ErrorState.astro", void 0);

const $$SkeletonStatCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="max-w-[450px] p-2 flex justify-center items-center lg:min-w-full"> <div class="grid grid-cols-2 grid-rows-8 h-[500px] w-[450px] gap-4 lg:grid-cols-4 lg:grid-rows-6 lg:min-w-full lg:h-[400px]">  <div class="col-span-2 row-span-4 lg:col-span-4 lg:row-span-4 theme-card p-5 flex flex-col justify-center items-center relative overflow-hidden group"> <div class="flex flex-col items-center gap-4 animate-pulse"> <div class="flex gap-2"> <div class="w-2 h-2 bg-white/20 rounded-full"></div> <div class="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]"></div> <div class="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]"></div> </div> <p class="text-white/30 font-DMSans font-medium text-lg">
Loading...
</p> </div> </div>  ${["Feels Like", "Humidity", "Wind", "Precipitation"].map((label) => renderTemplate`<div class="row-span-2 theme-card p-4 flex flex-col justify-between animate-pulse"> <h3 class="text-white/30 text-xs font-DMSans font-semibold uppercase tracking-wider"> ${label} </h3> <div class="mt-4"> <div class="h-8 w-12 bg-white/5 rounded-md"></div> </div> </div>`)} </div> </section>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/skeleton/SkeletonStatCard.astro", void 0);

const $$Astro$2 = createAstro();
const $$SkeletonDailyForecast = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SkeletonDailyForecast;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["flex flex-col gap-4 p-2 lg:p-0", className], "class:list")}> <header class="font-DMSans font-semibold text-white/50 animate-pulse"> <div class="h-6 w-32 bg-white/10 rounded-md"></div> </header> <div class="flex-1 flex flex-col"> <div class="grid grid-cols-3 grid-rows-6 gap-3 h-[500px] lg:grid-cols-7 lg:grid-rows-1 lg:flex-1 lg:items-stretch"> ${Array.from({ length: 7 }).map(() => renderTemplate`<div class="theme-card min-h-[140px] lg:h-full animate-pulse flex flex-col items-center justify-between p-4"> <div class="h-4 w-8 bg-white/10 rounded"></div> <div class="w-12 h-12 bg-white/5 rounded-full my-2"></div> <div class="h-4 w-12 bg-white/10 rounded"></div> </div>`)} </div> </div> </section>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/skeleton/SkeletonDailyForecast.astro", void 0);

const $$Astro$1 = createAstro();
const $$SkeletonHourlyForecast = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SkeletonHourlyForecast;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([
    "theme-card flex flex-col gap-2 max-w-[340px] m-2 p-2 lg:m-0",
    className
  ], "class:list")}> <header class="flex flex-row justify-between px-2 items-center animate-pulse h-10"> <div class="h-6 w-40 bg-white/10 rounded-md"></div> <div class="h-8 w-16 bg-white/10 rounded-lg"></div> </header> <div id="hours-container" class="flex flex-col gap-3 mt-4 overflow-hidden"> ${Array.from({ length: 8 }).map(() => renderTemplate`<div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 animate-pulse"> <div class="flex items-center gap-3"> <div class="w-8 h-8 bg-white/10 rounded-lg"></div> <div class="h-4 w-20 bg-white/10 rounded"></div> </div> <div class="h-6 w-10 bg-white/10 rounded"></div> </div>`)} </div> </section>`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/skeleton/SkeletonHourlyForecast.astro", void 0);

const getCoordinates = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error conectando con servicio de geocoding");
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error("Ciudad no encontrada");
    }
    return data.results[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getWeather = async (lat, lon, units = {}) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    hourly: "temperature_2m,weather_code",
    timezone: "auto",
    // Configuración dinámica de unidades
    temperature_unit: units.temperature_unit || "celsius",
    wind_speed_unit: units.wind_speed_unit || "kmh",
    precipitation_unit: units.precipitation_unit || "mm"
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error obteniendo datos del clima");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
const loadWeatherFromUrl = async (searchParams) => {
  const city = searchParams.get("city") || "Bogota";
  const units = {
    temperature_unit: searchParams.get("temperature_unit") || "celsius",
    wind_speed_unit: searchParams.get("wind_speed_unit") || "kmh",
    precipitation_unit: searchParams.get("precipitation_unit") || "mm"
  };
  const coords = await getCoordinates(city);
  if (!coords) return null;
  const weather = await getWeather(coords.latitude, coords.longitude, units);
  return weather ? { weather, geo: coords, units } : null;
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const weatherData = await loadWeatherFromUrl(Astro2.url.searchParams);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "SearchBar", $$SearchBar, {})} ${maybeRenderHead()}<div class="loading-layer"> <div class="flex flex-col gap-5 max-w-7xl my-0 mx-auto px-4 min-h-4/5 items-stretch pb-10 md:px-8 lg:flex-row lg:mx-20 lg:px-0"> <div class="flex-3 flex flex-col gap-5 h-auto"> ${renderComponent($$result2, "SkeletonStatCard", $$SkeletonStatCard, {})} ${renderComponent($$result2, "SkeletonDailyForecast", $$SkeletonDailyForecast, { "class": "flex-1" })} </div> <aside class="flex-1 flex flex-col h-auto"> ${renderComponent($$result2, "SkeletonHourlyForecast", $$SkeletonHourlyForecast, { "class": "flex-1 h-full" })} </aside> </div> </div> <div class="weather-content"> ${weatherData ? (
    /* 
       CASO ÉXITO: Tenemos datos del clima.
       Renderizamos el dashboard principal dividido en dos columnas para escritorio.
    */
    renderTemplate`<div class="flex flex-col gap-5 max-w-7xl my-0 mx-auto px-4 min-h-4/5 items-stretch pb-10 md:px-8 lg:flex-row lg:mx-20 lg:px-0">  <div class="flex-3 flex flex-col gap-5 h-auto"> ${renderComponent($$result2, "StatCard", $$StatCard, { "weatherData": weatherData })} ${renderComponent($$result2, "DailyForecast", $$DailyForecast, { "weatherData": weatherData.weather, "class": "flex-1" })} </div>  <aside class="flex-1 flex flex-col h-auto items-center lg:items-stretch"> ${renderComponent($$result2, "HourlyForecast", $$HourlyForecast, { "weatherData": weatherData.weather, "class": "flex-1 h-full" })} </aside> </div>`
  ) : (
    /* 
       CASO FALLO / NO HAY COINCIDENCIAS: No se encontraron datos para la ciudad.
       Mostramos el estado de error.
    */
    renderTemplate`${renderComponent($$result2, "ErrorState", $$ErrorState, {})}`
  )} </div> ` })}`;
}, "/home/cagd/Programacion/Astro-dev/weather-app-main/src/pages/index.astro", void 0);

const $$file = "/home/cagd/Programacion/Astro-dev/weather-app-main/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
