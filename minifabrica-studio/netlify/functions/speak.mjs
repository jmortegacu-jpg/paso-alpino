const json=(message,status)=>new Response(JSON.stringify({error:message}),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
export default async request=>{
 if(request.method!=='POST')return json('Solo POST',405);
 if(process.env.ENABLE_PAID_AI!=='true'||!process.env.OPENAI_API_KEY||!process.env.STUDIO_ACCESS_CODE)return json('Voz en servidor no habilitada. Usa voz del dispositivo o grabación propia.',503);
 if(request.headers.get('x-studio-code')!==process.env.STUDIO_ACCESS_CODE)return json('Código de acceso IA incorrecto.',403);
 try{
  const {text,voice}=await request.json();if(typeof text!=='string'||!text.trim()||text.length>400)return json('Texto vacío o superior a 400 caracteres.',400);
  const voices=['alloy','coral','nova','echo'],selected=voices.includes(voice)?voice:'coral';
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000);let resp;
  try{resp=await fetch('https://api.openai.com/v1/audio/speech',{method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-4o-mini-tts',voice:selected,input:text,response_format:'mp3',instructions:'Habla en español natural, cálido y expresivo.'}),signal:controller.signal})}finally{clearTimeout(timeout)}
  if(!resp.ok){const e=await resp.json().catch(()=>({}));return json(e?.error?.message||'No se pudo sintetizar la voz.',400)}
  return new Response(resp.body,{status:200,headers:{'Content-Type':'audio/mpeg','Content-Disposition':'attachment; filename="voz.mp3"','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})
 }catch(e){return json('Error de audio: '+e.message,502)}
};
