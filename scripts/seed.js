const admin = require("firebase-admin");

function privateKey(){
 const key=process.env.FIREBASE_PRIVATE_KEY;
 if(!key)return undefined;
 return key.replace(/\\n/g,"\n");
}

admin.initializeApp({
 credential: admin.credential.cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: privateKey()
 })
});

const db=admin.firestore();

const participantes=[
 "Damian",
 "Flor",
 "Eliana",
 "Paola",
 "Diógenes"
 // Agregá todos los participantes reales acá
];

function generateCode(){
 const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
 let out="";
 for(let i=0;i<6;i++) out+=chars[Math.floor(Math.random()*chars.length)];
 return out;
}
function shuffle(arr){
 const copy=[...arr];
 for(let i=copy.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [copy[i],copy[j]]=[copy[j],copy[i]];
 }
 return copy;
}
function assign(names){
 let assigned=shuffle(names), attempts=0;
 while(names.some((name,index)=>name===assigned[index])){
  assigned=shuffle(names); attempts++;
  if(attempts>2000) throw new Error("No se pudo hacer el sorteo.");
 }
 return names.map((name,index)=>({name,assignedToName:assigned[index]}));
}
async function main(){
 if(participantes.length<3) throw new Error("Cargá al menos 3 participantes.");
 const results=assign(participantes);
 const batch=db.batch();
 const refsByName={};
 for(const p of results) refsByName[p.name]=db.collection("participants").doc();
 for(const p of results){
  batch.set(refsByName[p.name],{name:p.name,code:generateCode(),assignedToId:refsByName[p.assignedToName].id,assignedToName:p.assignedToName,createdAt:admin.firestore.FieldValue.serverTimestamp()});
 }
 await batch.commit();
 const snap=await db.collection("participants").orderBy("name").get();
 console.log("\nCódigos para enviar:\n");
 snap.docs.forEach(doc=>{const p=doc.data(); console.log(`${p.name}: ${p.code} | Le tocó: ${p.assignedToName}`)});
 console.log("\nListo. Enviá a cada persona solo su código.\n");
}
main().catch(error=>{console.error(error);process.exit(1)});
