import{readFileSync as R,writeFileSync as W,mkdirSync as K}from"node:fs";
export function V(g,n){
let s=[],c=[],M=new Int32Array(256),o=[],p=0,q=0,t=0;
const N=k=>{if(s.length<k)throw 2},F=k=>{if(s.length+k>256)throw 3};
try{
for(;;){
if(t>=1e6)return[o,10];
if(p<0||p>=g.length)return[o,9];
let e=g[p];
if(!(e<8||e>=16&&e<31||e>=32&&e<35||e>=48&&e<53||e>=64&&e<66||e>=80&&e<84))return[o,5];
let l=e==1?1:e==2?4:e>=48&&e<52?2:0;
if(p+1+l>g.length)return[o,9];
let x=p+1+l;t++;
if(!e)return[o,0];
if(e==1){F(1);let v=g[p+1];s.push(v>127?v-256:v);p=x;continue}
if(e==2){F(1);s.push(g.readInt32LE(p+1));p=x;continue}
if(e==3){N(1);s.pop();p=x;continue}
if(e==4){N(1);F(1);s.push(s[s.length-1]);p=x;continue}
if(e==5){N(2);let a=s[s.length-1];s[s.length-1]=s[s.length-2];s[s.length-2]=a;p=x;continue}
if(e==6){N(2);F(1);s.push(s[s.length-2]);p=x;continue}
if(e==7){N(3);let a=s[s.length-3];s[s.length-3]=s[s.length-2];s[s.length-2]=s[s.length-1];s[s.length-1]=a;p=x;continue}
if(e>15&&e<35&&e!=23&&e!=27){N(2);let b=s.pop(),a=s.pop(),r;
if(e==16)r=a+b|0;else if(e==17)r=a-b|0;else if(e==18)r=Math.imul(a,b);
else if(e<23){if(!b)throw 4;r=e==19?(a/b)|0:e==20?a%b:e==21?Math.trunc((a>>>0)/(b>>>0))|0:((a>>>0)%(b>>>0))|0}
else if(e==24)r=a&b;else if(e==25)r=a|b;else if(e==26)r=a^b;
else if(e==28)r=a<<(b&31);else if(e==29)r=a>>(b&31);else if(e==30)r=(a>>>(b&31))|0;
else if(e==32)r=a==b?1:0;else if(e==33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
s.push(r|0);p=x;continue}
if(e==23||e==27){N(1);let a=s.pop();s.push(e==23?(-a)|0:~a);p=x;continue}
if(e==48){p=x+g.readInt16LE(p+1);continue}
if(e==49||e==50){N(1);let a=s.pop();p=(e==49?a==0:a!=0)?x+g.readInt16LE(p+1):x;continue}
if(e==51){if(c.length>63)throw 7;c.push(x);p=g[p+1]|g[p+2]<<8;continue}
if(e==52){if(!c.length)throw 8;p=c.pop();continue}
if(e==64){N(1);let a=s.pop();if(a<0||a>255)throw 6;s.push(M[a]);p=x;continue}
if(e==65){N(2);let a=s.pop(),v=s.pop();if(a<0||a>255)throw 6;M[a]=v;p=x;continue}
if(e==80){N(1);let a=s.pop(),y=String(a);if(o.length+y.length>65536)throw 11;for(let k=0;k<y.length;k++)o.push(y.charCodeAt(k));p=x;continue}
if(e==81){N(1);let a=s.pop();if(o.length>65535)throw 11;o.push(a&255);p=x;continue}
if(e==82){F(1);s.push(q<n.length?n[q++]:-1);p=x;continue}
if(e==83){N(1);return[o,s.pop()&255]}
}
}catch(e){return[o,e]}
}
for(let i=1;i<41;i++){
let d="i"+String(i).padStart(3,"0"),g=R(`/input/${d}/program.bin`),n=R(`/input/${d}/input.bin`),f=V(g,n);
K(`/output/${d}`,{recursive:!0});W(`/output/${d}/stdout.bin`,Buffer.from(f[0]));W(`/output/${d}/exit.txt`,String(f[1]));
}
