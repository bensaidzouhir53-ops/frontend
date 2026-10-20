interface SnapHeadScriptsProps {
  pixelId: string
}

/**
 * Single Snap Pixel bootstrap in <head> so PAGE_VIEW / PURCHASE are not delayed
 * by lazyOnload. tracking.ts must not init snaptr again.
 */
export default function SnapHeadScripts({ pixelId }: SnapHeadScriptsProps) {
  const id = pixelId.trim()
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null

  const bootstrap = `
(function(e,t,n){
  if(e.__nasamaSnapInitStarted)return;
  e.__nasamaSnapInitStarted=true;
  var a=e.snaptr=function(){
    a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
  };
  a.queue=[];
  var r=t.createElement('script');
  r.async=true;
  r.src=n;
  r.onload=function(){
    e.__nasamaSnapReady=true;
    e.__nasamaSyncSnapReady&&e.__nasamaSyncSnapReady();
  };
  (t.head||t.documentElement).appendChild(r);
})(window,document,'https://sc-static.net/scevent.min.js');
snaptr('init','${id}');
snaptr('track','PAGE_VIEW');
window.__nasamaSnapPageViewTracked=true;
`.trim()

  return (
    <script id="nasama-snap-pixel" dangerouslySetInnerHTML={{ __html: bootstrap }} />
  )
}
