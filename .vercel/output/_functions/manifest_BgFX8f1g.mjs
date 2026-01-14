import { p as decodeKey } from './chunks/astro/server_B1dgWMdS.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CGqOmKAp.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/","cacheDir":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/node_modules/.astro/","outDir":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/dist/","srcDir":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/src/","publicDir":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/public/","buildClientDir":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/dist/client/","buildServerDir":"file:///home/cagd/Programacion/Astro-dev/weather-app-main/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.7_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.55.1_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bw417QWL.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/cagd/Programacion/Astro-dev/weather-app-main/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.7_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.55.1_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BgFX8f1g.mjs","/home/cagd/Programacion/Astro-dev/weather-app-main/node_modules/.pnpm/astro@5.16.7_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.55.1_typescript@5.9.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CycpPjBK.mjs","/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/SearchBar.astro?astro&type=script&index=0&lang.ts":"_astro/SearchBar.astro_astro_type_script_index_0_lang.BYbJDt3V.js","/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/Units.astro?astro&type=script&index=0&lang.ts":"_astro/Units.astro_astro_type_script_index_0_lang.De0qIKcJ.js","/home/cagd/Programacion/Astro-dev/weather-app-main/node_modules/.pnpm/astro@5.16.7_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.55.1_typescript@5.9.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DcSP9LZ1.js","/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_HourlyForestcast/OptionDays.astro?astro&type=script&index=0&lang.ts":"_astro/OptionDays.astro_astro_type_script_index_0_lang.BdYLMRQV.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/Units.astro?astro&type=script&index=0&lang.ts","const c=()=>{const r=document.getElementById(\"unit-menu\"),a=document.getElementById(\"toggle-system\");if(!r||!a)return;const i=(t,s)=>{const n=new URL(window.location.href);n.searchParams.set(t,s),window.location.href=n.toString()};r.addEventListener(\"click\",t=>{const n=t.target.closest(\"button[data-unit]\");if(!n)return;const e=n.getAttribute(\"data-unit\");e&&(e===\"celsius\"||e===\"fahrenheit\"?i(\"temperature_unit\",e):e===\"kmh\"||e===\"mph\"?i(\"wind_speed_unit\",e):(e===\"mm\"||e===\"inch\")&&i(\"precipitation_unit\",e))}),a.addEventListener(\"click\",()=>{const t=new URL(window.location.href);t.searchParams.get(\"temperature_unit\")!==\"fahrenheit\"?(t.searchParams.set(\"temperature_unit\",\"fahrenheit\"),t.searchParams.set(\"wind_speed_unit\",\"mph\"),t.searchParams.set(\"precipitation_unit\",\"inch\")):(t.searchParams.set(\"temperature_unit\",\"celsius\"),t.searchParams.set(\"wind_speed_unit\",\"kmh\"),t.searchParams.set(\"precipitation_unit\",\"mm\")),window.location.href=t.toString()})};c();document.addEventListener(\"astro:page-load\",c);"],["/home/cagd/Programacion/Astro-dev/weather-app-main/src/components/weather/ui_HourlyForestcast/OptionDays.astro?astro&type=script&index=0&lang.ts","const d=()=>{const c=document.querySelectorAll(\".day-option\"),o=document.getElementById(\"current-label\");!c.length||!o||c.forEach(i=>{i.addEventListener(\"click\",l=>{const t=l.currentTarget,r=t.getAttribute(\"data-date\"),h=t.getAttribute(\"data-label\");o&&(o.textContent=h),c.forEach(e=>{e.classList.remove(\"bg-white/20\",\"text-white\",\"font-bold\"),e.classList.add(\"text-gray-300\");const a=e.querySelector(\".check-icon\");a&&a.classList.add(\"hidden\")}),t.classList.remove(\"text-gray-300\"),t.classList.add(\"bg-white/20\",\"text-white\",\"font-bold\");const s=t.querySelector(\".check-icon\");s&&s.classList.remove(\"hidden\"),document.querySelectorAll(\".hourly-list\").forEach(e=>{e.classList.add(\"hidden\")});const n=document.getElementById(`hours-${r}`);n&&n.classList.remove(\"hidden\")})})};d();document.addEventListener(\"astro:page-load\",d);"]],"assets":["/_astro/bricolage-grotesque-vietnamese-wght-normal.BUzh504Q.woff2","/_astro/bricolage-grotesque-latin-ext-wght-normal.CcLUaPy7.woff2","/_astro/bricolage-grotesque-latin-wght-normal.DLoelf7F.woff2","/_astro/dm-sans-latin-ext-wght-normal.BOFOeGcA.woff2","/_astro/dm-sans-latin-wght-normal.Xz1IZZA0.woff2","/_astro/index.Bw417QWL.css","/bg-today-small copy.svg","/favicon.svg","/icons.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DcSP9LZ1.js","/_astro/SearchBar.astro_astro_type_script_index_0_lang.BYbJDt3V.js","/_astro/router.2W7FzLmj.js","/images/bg-today-large.svg","/images/bg-today-small.svg","/images/favicon-32x32.png","/images/icon-checkmark.svg","/images/icon-drizzle.webp","/images/icon-dropdown.svg","/images/icon-error.svg","/images/icon-fog.webp","/images/icon-loading.svg","/images/icon-overcast.webp","/images/icon-partly-cloudy.webp","/images/icon-rain.webp","/images/icon-retry.svg","/images/icon-search.svg","/images/icon-snow.webp","/images/icon-storm.webp","/images/icon-sunny.webp","/images/icon-units.svg","/images/logo.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"5+bZbhgtFxF5gubXoYGps1rFsd8wdKA0c3eJ3WKIKXg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
