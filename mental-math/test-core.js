'use strict';
const assert=require('node:assert/strict');const C=require('./core.js');
for(const c of C.categories)for(const difficulty of ['easy','medium','hard'])for(let i=0;i<50;i++){
 const q=C.question(c,difficulty);assert.equal(q.category,c);assert(Number.isFinite(q.answer));
 const expression=q.text.replace('×','*').replace('÷','/').replace('−','-');
 const expected=c==='Percentages'?Number(q.text.split('%')[0])*Number(q.text.split('of ')[1])/100:Function(`return (${expression})`)();
 assert.equal(q.answer,expected);
}
const session={id:'test',date:new Date().toISOString(),difficulty:'easy',planned:12,answers:[{category:'Addition',text:'2 + 2',answer:4,user:4,correct:true,skipped:false,ms:1000},{category:'Division',text:'4 ÷ 2',answer:2,user:null,correct:false,skipped:true,ms:5000}]};
const parsed=C.validateBackup({version:1,sessions:[session]});const summary=C.summarize(parsed);assert.equal(summary.accuracy,50);assert.equal(summary.speed,1);assert.equal(summary.bySkill.Division.total,1);assert.equal(summary.bySkill.Mixed.total,0);assert.equal(C.summarize([]).accuracy,null);
assert.throws(()=>C.validateBackup({version:1,sessions:[session,session]}));assert.throws(()=>C.validateBackup({version:2,sessions:[]}));
const tampered=JSON.parse(JSON.stringify(session));tampered.answers[1].correct=true;assert.throws(()=>C.validateBackup({version:1,sessions:[tampered]}));
console.log('Passed: 900 generated questions, score aggregation, skipped-answer timing, empty state, and backup validation.');
