function isDefined(e){return void 0!==e}function clone(e){return JSON.parse(JSON.stringify(e))}function attachSessionAndSpeakersTogether(e,s){if(isDefined(e.speakers))for(var a=0;a<e.speakers.length;a++)if(isDefined(e.speakers[a])&&!isDefined(e.speakers[a].id)){e.speakers[a]=s[e.speakers[a]];var n=clone(e);delete n.speakers,isDefined(e.speakers[a])&&(isDefined(e.speakers[a].sessions)||(e.speakers[a].sessions=[]),e.speakers[a].sessions.push(n))}}function getEndTime(e,s,a,n,t){var r=(new Date).toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1],i=new Date(e+" "+s+" "+r).getTime(),o=new Date(e+" "+a+" "+r).getTime(),d=Math.floor((o-i)/n),g=new Date(i+d*t);return g.getHours()+":"+g.getMinutes()}function hasSpeakersAndSessionsAndSchedule(e,s,a){return hasSpeakersAndSessions(e,s)&&Object.keys(a).length}function hasSpeakersAndSessions(e,s){return Object.keys(e).length&&Object.keys(s).length}function addTagTo(e,s){s.indexOf(e)<0&&s.push(e)}self.addEventListener("message",function(e){var s=e.data.speakers,a=e.data.sessions,n=e.data.schedule;if(hasSpeakersAndSessionsAndSchedule(s,a,n)){n.tags=[];for(var t=0,r=n.length;t<r;t++){var i=n[t];i.tags=[];for(var o=0,d=i.timeslots.length;o<d;o++)for(var g=i.timeslots[o],f=0,h=g.sessions.length;f<h;f++)for(var k=0,c=g.sessions[f].length;k<c;k++){var l=a[g.sessions[f][k]];l.mainTag=l.tags?l.tags[0]:"General",l.day=t+1,addTagTo(l.mainTag,i.tags),addTagTo(l.mainTag,n.tags),isDefined(l.track)||(l.track=i.tracks[f]),l.startTime=g.startTime,l.endTime=1<c?getEndTime(i.date,g.startTime,g.endTime,c,k+1):g.endTime,l.dateReadable=i.dateReadable,attachSessionAndSpeakersTogether(l,s),n[t].timeslots[o].sessions[f][k]=l}}}else hasSpeakersAndSessions(s,a)&&Object.keys(a).forEach(function(e){return attachSessionAndSpeakersTogether(a[e],s)});self.postMessage({speakers:s,sessions:a,schedule:Array.isArray(n)&&Object.keys(a).length?n:[]})},!1);