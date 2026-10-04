'use client';
import {useEffect,useRef,type ReactNode} from 'react';

// Fit a diagram into the space left by the section heading and narration player.
// Keep the prose at its normal reading size, and retain natural flow on mobile.
export default function FitVisual({children,className}:{children:ReactNode;className:string}){
 const frame=useRef<HTMLDivElement>(null),content=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const outer=frame.current,inner=content.current;if(!outer||!inner)return;
  const measure=()=>{
   const bounded=getComputedStyle(outer).getPropertyValue('--fit-visual').trim()==='1';
   const scale=bounded&&inner.offsetHeight?Math.min(1,Math.max(0,outer.clientHeight-4)/inner.offsetHeight):1;
   inner.style.setProperty('--visual-scale',String(scale));
  };
  const observer=new ResizeObserver(measure);observer.observe(outer);observer.observe(inner);
  window.addEventListener('resize',measure);measure();
  return()=>{observer.disconnect();window.removeEventListener('resize',measure);};
 },[]);
 return <div className={className} ref={frame}><div className="visual-fit" ref={content}>{children}</div></div>;
}
