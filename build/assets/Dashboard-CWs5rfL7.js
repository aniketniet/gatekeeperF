import{r as d,_ as h,R as p,c as C,d as f,P as r,j as a,k as u}from"./index-GfoBFkT7.js";import{C as N,a as x}from"./CCardBody-CYVQzmrb.js";var i=d.forwardRef(function(e,t){var n=e.children,s=e.as,c=s===void 0?"div":s,l=e.className,o=h(e,["children","as","className"]);return p.createElement(c,C({className:f("card-header",l)},o,{ref:t}),n)});i.propTypes={as:r.elementType,children:r.node,className:r.string};i.displayName="CCardHeader";var m=d.forwardRef(function(e,t){var n=e.children,s=e.as,c=s===void 0?"h5":s,l=e.className,o=h(e,["children","as","className"]);return p.createElement(c,C({className:f("card-title",l)},o,{ref:t}),n)});m.propTypes={as:r.elementType,children:r.node,className:r.string};m.displayName="CCardTitle";const T=()=>{const[e,t]=d.useState(0);return d.useState(0),d.useEffect(()=>{async function n(){const s=localStorage.getItem("token"),c=await u.get("http://45.198.13.238/api/admin/users",{headers:{Authorization:`Bearer ${s}`}});t(c.data.users.length)}n()},[]),a.jsx(a.Fragment,{children:a.jsxs(N,{textBgColor:"secondary",className:"mb-3",style:{maxWidth:"18rem"},children:[a.jsx(i,{children:"Users"}),a.jsx(x,{children:a.jsxs(m,{children:["Users: ",e," "]})})]})})};export{T as default};
