import { NextResponse } from "next/server";
import { db } from "../../../lib/firebaseAdmin";

async function getParticipantByCode(code){
 const clean=String(code||"").trim().toUpperCase();
 if(!clean)return null;
 const snap=await db.collection("participants").where("code","==",clean).limit(1).get();
 if(snap.empty)return null;
 const doc=snap.docs[0];
 return {id:doc.id,...doc.data()};
}
export async function POST(request){
 try{
  const {code}=await request.json();
  const participant=await getParticipantByCode(code);
  if(!participant)return NextResponse.json({error:"Código inválido."},{status:401});
  const cluesSnap=await db.collection("clues").where("toId","==",participant.id).orderBy("createdAt","asc").get();
  const clues=cluesSnap.docs.map(doc=>({id:doc.id,type:doc.data().type||"Pista",text:doc.data().text||""}));
  return NextResponse.json({ok:true,participant:{id:participant.id,name:participant.name,assignedToId:participant.assignedToId,assignedToName:participant.assignedToName},clues});
 }catch(e){return NextResponse.json({error:"Error al cargar datos."},{status:500})}
}
