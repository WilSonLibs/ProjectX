(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{8031:(e,t,a)=>{Promise.resolve().then(a.bind(a,2243))},2243:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>i});var s=a(5155);let r={src:"/_next/static/media/scale.a42fceb5.jpg"};var l=a(2115);function i(){let[e,t]=(0,l.useState)(""),a=async a=>{a.preventDefault();let s=await fetch("/api/withdraw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:e})}),r=await s.json();t(""),alert(r.message||"Withdrawal successful!")};return(0,s.jsxs)("div",{className:"relative h-screen",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-cover bg-center",style:{backgroundImage:"url(".concat(r.src,")"),filter:"blur(2px)"}}),(0,s.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",style:{backdropFilter:"blur(10px)"},children:(0,s.jsxs)("div",{className:"glass-bg mx-auto p-6 rounded-lg shadow-md max-w-3xl",style:{background:"rgba(255, 255, 255, 0.1)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)"},children:[(0,s.jsx)("h2",{className:"text-2xl font-semibold mb-4 text-center",children:"Make a Withdrawal"}),(0,s.jsxs)("form",{onSubmit:a,className:"mb-6",children:[(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("label",{htmlFor:"withdrawAmount",className:"block text-sm font-medium mb-2 text-gray-700",children:"Withdrawal Amount"}),(0,s.jsx)("input",{type:"number",id:"withdrawAmount",value:e,onChange:e=>t(e.target.value),className:"w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300",required:!0,style:{border:"1px solid #ccc"}})]}),(0,s.jsx)("button",{type:"submit",className:"w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition",children:"Withdraw"})]})]})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(8031)),_N_E=e.O()}]);