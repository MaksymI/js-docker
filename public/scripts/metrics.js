window.HOVERBOARD=window.HOVERBOARD||{},HOVERBOARD.Analytics=HOVERBOARD.Analytics||function(n){"use strict";function t(){this.setTrackerDefaults(),this.initTrackerReadyState(),this.trackPageView(),this.trackPerfEvent("HTMLImportsLoaded","Polymer"),this.trackPerfEvent("WebComponentsReady","Polymer"),this.trackOnlineStatus(),this.trackServiceWorkerControlled();var t=n.location.search.match(/utm_error=([^&]+)/);t&&this.trackError("notification",decodeURIComponent(t[1])),this.startTimes_={}}return t.prototype.POLYMER_ANALYTICS_TIMEOUT_=6e4,t.prototype.FP_TIMEOUT_=6e3,t.prototype.READY_STATE_TIMEOUT_=5e3,t.prototype.NULL_DIMENSION="(not set)",t.prototype.requiredDimensions=[(t.prototype.customDimensions={SIGNED_IN:"dimension1",ONLINE:"dimension2",SERVICE_WORKER_STATUS:"dimension3",NOTIFICATION_PERMISSION:"dimension4",METRIC_VALUE:"dimension5"}).SIGNED_IN,t.prototype.customDimensions.ONLINE,t.prototype.customDimensions.SERVICE_WORKER_STATUS,t.prototype.customDimensions.NOTIFICATION_PERMISSION],t.prototype.setTrackerDefaults=function(){Object.keys(this.customDimensions).forEach(function(t){ga("set",this.customDimensions[t],this.NULL_DIMENSION)}.bind(this))},t.prototype.initTrackerReadyState=function(){this.readyState_=HOVERBOARD.Deferred.createDeferred(),setTimeout(function(){this.readyState_.resolve(),this.trackEvent("analytics","timeout",this.READY_STATE_TIMEOUT_,window.performance&&Math.round(window.performance.now()))}.bind(this),this.READY_STATE_TIMEOUT_)},t.prototype.updateTracker=function(t,i){ga(function(e){ga("set",t,i),Object.keys(this.requiredDimensions).every(function(t){e.get(this.requiredDimensions[t]),this.NULL_DIMENSION}.bind(this))&&this.readyState_.resolve()})},t.prototype.waitForTrackerReady=function(){return this.readyState_.promise},t.prototype.trackPageView=function(t,e){this.waitForTrackerReady().then(function(){t&&ga("set","page",t),ga("send","pageview",{hitCallback:e})})},t.prototype.trackPerf=function(t,e,i,r,n,o){this.waitForTrackerReady().then(function(){null!==n&&n<i&&(e+=" - outliers"),i=parseInt(i,10),r=r||this.NULL_DIMENSION,(o=o||{})[this.customDimensions.METRIC_VALUE]=i,ga("send","event",t,e,r,i,o),ga("send","timing",t,e,i,r,o)})},t.prototype.trackEvent=function(t,e,i,r,n){this.waitForTrackerReady().then(function(){ga("send",{hitType:"event",eventCategory:t,eventAction:e,eventLabel:i||this.NULL_DIMENSION,eventValue:r,hitCallback:n})}.bind(this))},t.prototype.trackError=function(t,e){this.waitForTrackerReady().then(function(){ga("send","event","error",t,String(e))})},t.prototype.trackSocial=function(t,e,i){this.waitForTrackerReady().then(function(){ga("send","social",t,e,i)})},t.prototype.trackPerfEvent=function(t,e){if(n.performance&&n.performance.getEntriesByName){var i=performance.getEntriesByName(t,"mark");if(i.length){var r=i[0].startTime;debugLog(t,"@",r),this.trackPerf(e,t,r,null,this.POLYMER_ANALYTICS_TIMEOUT_)}else document.addEventListener(t,this.trackPerfEvent.bind(this,t,e))}},t.prototype.timeStart=function(t,e,i){(this.startTimes_[t]||(this.startTimes_[t]={}))[e]=i},t.prototype.timeEnd=function(t,e,i,r,n){var o=this.startTimes_[t];if(o){var s=o[e];null!==s&&(this.trackPerf(t,e,i-s,r,n),o[e]=null)}},t.prototype.trackOnlineStatus=function(){this.updateTracker(this.customDimensions.ONLINE,navigator.onLine);var t=function(t){this.updateTracker(this.customDimensions.ONLINE,navigator.onLine),this.trackEvent("network","change",t.type)}.bind(this);window.addEventListener("online",t),window.addEventListener("offline",t)},t.prototype.trackServiceWorkerControlled=function(){var t=this.getServiceWorkerStatus();this.updateTracker(this.customDimensions.SERVICE_WORKER_STATUS,t),"unsupported"===t?this.trackEvent("serviceworker","supported",!1):(this.trackEvent("serviceworker","supported",!0),this.trackEvent("serviceworker","controlled","controlled"===t))},t.prototype.getServiceWorkerStatus=function(){return"serviceWorker"in navigator?navigator.serviceWorker.controller?"controlled":"supported":"unsupported"},t.prototype.getNotificationPermission=function(){return n.Notification?n.Notification.permission:"unsupported"},new t}(window);