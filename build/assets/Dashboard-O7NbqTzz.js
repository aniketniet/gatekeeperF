import{r as i,_ as C,R as f,e as g,f as N,P as t,j as s,g as p,h as u,L as y,i as x}from"./index-B6T5Zpkw.js";var c=i.forwardRef(function(e,n){var d=e.children,a=e.as,o=a===void 0?"div":a,r=e.className,l=C(e,["children","as","className"]);return f.createElement(o,g({className:N("card-header",r)},l,{ref:n}),d)});c.propTypes={as:t.elementType,children:t.node,className:t.string};c.displayName="CCardHeader";var m=i.forwardRef(function(e,n){var d=e.children,a=e.as,o=a===void 0?"h5":a,r=e.className,l=C(e,["children","as","className"]);return f.createElement(o,g({className:N("card-title",r)},l,{ref:n}),d)});m.propTypes={as:t.elementType,children:t.node,className:t.string};m.displayName="CCardTitle";const T=()=>{const[e,n]=i.useState(0),[d,a]=i.useState(0);return i.useEffect(()=>{async function o(){const r=localStorage.getItem("token"),l=await x.get("http://45.198.13.238/api/admin/users",{headers:{Authorization:`Bearer ${r}`}});n(l.data.users.length);const h=await x.get("http://45.198.13.238/api/admin/get-all-audio",{headers:{Authorization:`Bearer ${r}`}});console.log(h.data.data,"vendors"),a(h.data.data.length)}o()},[]),s.jsxs(s.Fragment,{children:[s.jsxs(p,{textBgColor:"secondary",className:"mb-3",style:{maxWidth:"18rem"},children:[s.jsx(c,{children:"Users"}),s.jsx(u,{children:s.jsxs(m,{children:["Users: ",e," "]})})]}),s.jsx(y,{to:"/audiolist",children:s.jsxs(p,{textBgColor:"primary",className:"mb-4 mt-3",style:{maxWidth:"18rem"},children:[s.jsx(c,{children:"Total Audio"}),s.jsx(u,{children:s.jsxs(m,{children:["Total Audio: ",d]})})]})})]})};export{T as default};