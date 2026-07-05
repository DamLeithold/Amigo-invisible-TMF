import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebaseAdmin";

export async function POST(request){
 try{
  const {adminCode}=await request.json();
  if(!process.env.ADMIN_CODE||adminCode!==process.env.ADMIN_CODE)return NextResponse.json({error:"Código administrador inválido."},{status:401});
  const participantsSnap=await db.collection("participants").orderBy("name").get();
  const cluesSnap=await db.collection("clues").get();
  const clues=cluesSnap.docs.map(doc=>({id:doc.id,...doc.data()}));
  const participants=participantsSnap.docs.map(doc=>{
   const p={id:doc.id,...doc.data()};
   return {id:p.id,name:p.name,code:p.code,assignedToName:p.assignedToName,sentCount:clues.filter(c=>c.fromId===p.id).length,receivedCount:clues.filter(c=>c.toId===p.id).length};
  });
  return NextResponse.json({ok:true,participants,clues:clues.map(c=>({id:c.id,type:c.type||"Pista",fromName:c.fromName||"",toName:c.toName||"",text:c.text||""}))});
 }catch(e){return NextResponse.json({error:"Error al cargar panel."},{status:500})}
}
