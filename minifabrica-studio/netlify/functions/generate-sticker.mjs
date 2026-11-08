const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const knownStyles={
 comic:'caricatura editorial de alta calidad, rostro fotorrealista reconocible y cuerpo ilustrado pequeño, contorno oscuro limpio, colores vibrantes, sticker premium',
 watercolor:'acuarela artesanal de textura delicada, rostro muy reconocible en formato ilustración narrativa',
 cinema:'personaje estilizado con acabado 3D cinematográfico, iluminación profesional, profundidad de campo suave, rostro identificable',
 pixel:'pixel art de 16 bits, avatar reconocible, estética retro de videojuegos, detalles y color bien definidos',
 anime:'anime expresivo con cuerpo estilizado y rostro basado fielmente en la referencia fotográfica',
 oil:'pintura al óleo expresionista de pinceladas visibles con la forma facial de la persona conservada'
};
function authorize(request){
 if(process.env.ENABLE_PAID_AI!=='true')return json({error:'La generación de pago está desactivada. Activa ENABLE_PAID_AI=true en Netlify cuando estés listo.'},503);
 if(!process.env.OPENAI_API_KEY)return json({error:'Falta OPENAI_API_KEY en las variables del servidor.'},503);
 if(!process.env.STUDIO_ACCESS_CODE)return json({error:'Configura STUDIO_ACCESS_CODE para proteger el consumo de API.'},503);
 if(request.headers.get('x-studio-code')!==process.env.STUDIO_ACCESS_CODE)return json({error:'Código de acceso IA incorrecto.'},403);
 return null;
}
export default async request=>{
 if(request.method!=='POST')return json({error:'Solo POST'},405);
 const denied=authorize(request);if(denied)return denied;
 try{
  const body=await request.json(),photo=String(body.photo||''),prompt=String(body.prompt||'').trim().slice(0,600);
  const style=knownStyles[body.style]||knownStyles.comic;
  if(!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(photo)||photo.length>5000000)return json({error:'Foto faltante o muy grande. Selecciona JPEG, PNG o WebP.'},400);
  if(!prompt)return json({error:'Escribe una instrucción.'},400);
  const systemPrompt='Crea UN sticker ilustrado original de la persona en la imagen de referencia. Prioriza conservar identidad y rasgos distintivos: nariz, ojos, cejas, textura y tono de piel, edad aparente, forma facial, cabello, lentes, arrugas y boca. No rejuvenezcas ni cambies género ni rasgos físicos. Imagen cuadrada, personaje completo o busto, con gesto según la instrucción. Estilo: '+style+'. Solicitud: '+prompt+'. No incluyas letras ni frases incrustadas; la app añade el texto exacto. Fondo transparente, contorno nítido, un solo sticker y no collage.';
  const payload={model:'gpt-image-1.5',images:[{image_url:photo}],prompt:systemPrompt,input_fidelity:'high',quality:'medium',size:'1024x1024',background:'transparent',output_format:'webp',output_compression:80};
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),57000);let answer;
  try{answer=await fetch('https://api.openai.com/v1/images/edits',{method:'POST',headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal})}finally{clearTimeout(timer)}
  if(!answer.ok){const error=await answer.json().catch(()=>({}));return json({error:error?.error?.message||'OpenAI HTTP '+answer.status},answer.status>=500?502:400)}
  const data=await answer.json(),b64=data?.data?.[0]?.b64_json;if(!b64)return json({error:'La API no devolvió imagen.'},502);
  return json({image:'data:image/webp;base64,'+b64,model:'gpt-image-1.5'});
 }catch(e){return json({error:e.name==='AbortError'?'La generación superó el tiempo del servidor.':'Error de generación: '+e.message},502)}
};
