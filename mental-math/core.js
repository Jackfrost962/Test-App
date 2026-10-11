(function(root){
 'use strict';
 const categories=['Addition','Subtraction','Multiplication','Division','Percentages','Mixed'];
 const int=(lo,hi)=>Math.floor(Math.random()*(hi-lo+1))+lo;
 function question(category,difficulty){
  const level={easy:0,medium:1,hard:2}[difficulty];
  if(level===undefined||!categories.includes(category))throw Error('Invalid question settings');
  const max=[20,99,499][level];let a,b,text,answer;
  if(category==='Addition'){a=int(2,max);b=int(2,max);text=`${a} + ${b}`;answer=a+b;}
  if(category==='Subtraction'){a=int(2,max);b=int(1,a);text=`${a} − ${b}`;answer=a-b;}
  if(category==='Multiplication'){a=int(2,[10,20,35][level]);b=int(2,[10,12,25][level]);text=`${a} × ${b}`;answer=a*b;}
  if(category==='Division'){b=int(2,[10,12,25][level]);answer=int(2,[10,20,35][level]);text=`${b*answer} ÷ ${b}`;}
  if(category==='Percentages'){a=[10,20,25,50,75][int(0,4)];b=int(1,[10,30,100][level])*4;text=`${a}% of ${b}`;answer=a*b/100;}
  if(category==='Mixed'){a=int(2,[10,20,30][level]);b=int(2,[8,12,20][level]);const c=int(1,max);text=`${a} × ${b} + ${c}`;answer=a*b+c;}
  return {category,text,answer};
 }
 function summarize(sessions){
  const bySkill=Object.fromEntries(categories.map(c=>[c,{total:0,correct:0,ms:0,timed:0}]));
  let total=0,correct=0,ms=0,timed=0;
  for(const session of sessions)for(const a of session.answers){const b=bySkill[a.category];b.total++;total++;if(a.correct){b.correct++;correct++;}if(!a.skipped){b.ms+=a.ms;b.timed++;ms+=a.ms;timed++;}}
  return {bySkill,total,correct,accuracy:total?Math.round(correct/total*100):null,speed:timed?ms/timed/1000:null};
 }
 function validateBackup(value){
  if(!value||value.version!==1||!Array.isArray(value.sessions)||value.sessions.length>10000)throw Error('This is not a supported Minute Mind backup.');
  const ids=new Set();
  return value.sessions.map(s=>{
   if(!s||typeof s.id!=='string'||!s.id||s.id.length>100||ids.has(s.id)||typeof s.date!=='string'||!Number.isFinite(Date.parse(s.date))||!['easy','medium','hard'].includes(s.difficulty)||!Array.isArray(s.answers)||s.answers.length<1||s.answers.length>30||![12,18,30].includes(s.planned)||s.answers.length>s.planned)throw Error('Invalid session in backup.');
   ids.add(s.id);
   const answers=s.answers.map(a=>{
    if(!a||!categories.includes(a.category)||typeof a.text!=='string'||a.text.length>150||!Number.isFinite(a.answer)||!(a.user===null||Number.isFinite(a.user))||typeof a.correct!=='boolean'||typeof a.skipped!=='boolean'||!Number.isFinite(a.ms)||a.ms<0||a.ms>86400000||(a.skipped&&a.user!==null)||(!a.skipped&&a.user===null))throw Error('Invalid question in backup.');
    const correct=!a.skipped&&Math.abs(a.user-a.answer)<0.000001;
    if(correct!==a.correct)throw Error('Inconsistent score in backup.');
    return {category:a.category,text:a.text,answer:a.answer,user:a.user,correct,skipped:a.skipped,ms:a.ms};
   });
   return {id:s.id,date:s.date,difficulty:s.difficulty,planned:s.planned,answers};
  });
 }
 const api={categories,question,summarize,validateBackup};if(typeof module!=='undefined')module.exports=api;else root.MathCore=api;
})(globalThis);
