import{r as m,_ as h,R as g,c as x,d as f,P as n,u as L,j as e,L as w,C as S,e as b,f as N,g as j,h as k,i as R,k as T}from"./index-C21T-dxo.js";import{C as y,a as v}from"./CRow-s5VAqTjU.js";import{C as G,a as A}from"./CCardBody-B3QpklSD.js";var C=m.forwardRef(function(s,t){var a=s.children,r=s.className,o=h(s,["children","className"]);return g.createElement("div",x({className:f("card-group",r)},o,{ref:t}),a)});C.propTypes={children:n.node,className:n.string};C.displayName="CCardGroup";var p=m.forwardRef(function(s,t){var a,r=s.children,o=s.className,i=s.size,d=h(s,["children","className","size"]);return g.createElement("div",x({className:f("input-group",(a={},a["input-group-".concat(i)]=i,a),o)},d,{ref:t}),r)});p.propTypes={children:n.node,className:n.string,size:n.oneOf(["sm","lg"])};p.displayName="CInputGroup";var u=m.forwardRef(function(s,t){var a=s.children,r=s.as,o=r===void 0?"span":r,i=s.className,d=h(s,["children","as","className"]);return g.createElement(o,x({className:f("input-group-text",i)},d,{ref:t}),a)});u.propTypes={as:n.elementType,children:n.node,className:n.string};u.displayName="CInputGroupText";var E=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"];const F=()=>{const s=L(),[t,a]=m.useState(""),[r,o]=m.useState(""),[i,d]=m.useState(!1);async function I(){d(!0);try{const l={employeeId:t,password:r},c=await T.post("http://45.198.13.238/api/auth/login",l);console.log(c,"res"),localStorage.setItem("user",JSON.stringify(c.data.user)),localStorage.setItem("token",c.data.token),c.status===200?(console.log(c.data),localStorage.setItem("user",JSON.stringify(c.data.user)),localStorage.setItem("token",c.data.token),s("/dashboard")):alert("Login failed: Invalid credentials.")}catch(l){console.error("Login error:",l),alert("Login Failed! Please try again."),d(!1)}}return e.jsxs(e.Fragment,{children:[i&&e.jsx(w,{}),e.jsx("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:e.jsx(S,{children:e.jsx(y,{className:"justify-content-center",children:e.jsx(v,{md:8,children:e.jsx(C,{children:e.jsx(G,{className:"p-4",children:e.jsx(A,{children:e.jsxs(b,{children:[e.jsx("h1",{children:"Login"}),e.jsx("p",{className:"text-body-secondary",children:"Sign In to your account"}),e.jsxs(p,{className:"mb-3",children:[e.jsx(u,{children:e.jsx(N,{icon:E})}),e.jsx(j,{placeholder:"User Id",autoComplete:"off",name:"username",onChange:l=>a(l.target.value)})]}),e.jsxs(p,{className:"mb-4",children:[e.jsx(u,{children:e.jsx(N,{icon:k})}),e.jsx(j,{type:"password",placeholder:"Password",name:"password",onChange:l=>o(l.target.value),autoComplete:"current-password"})]}),e.jsx(y,{children:e.jsx(v,{xs:6,children:e.jsx(R,{color:"primary",className:"px-4",onClick:I,children:"Login"})})})]})})})})})})})})]})};export{F as default};