let e=!1;const t=/Firefox/i.test(navigator.userAgent),l=/MSIE/i.test(navigator.userAgent)||/Trident.*rv\:11\./i.test(navigator.userAgent);let n=0;const o=document.querySelectorAll(".background").length;const r=t?"DOMMouseScroll":"wheel";window.addEventListener(r,_.throttle((function(r){let s;s=t?-120*r.detail:l?-r.deltaY:r.wheelDelta,e||s<=-30&&(e=!0,n!==o-1&&(n++,function(){const e=document.querySelectorAll(".background")[n-1];e.classList.remove("up-scroll"),e.classList.add("down-scroll")}()))}),60),!1);
//# sourceMappingURL=index.eaee32ab.js.map
