(this["webpackJsonpcounter-wallet"]=this["webpackJsonpcounter-wallet"]||[]).push([[0],{145:function(e,t){},226:function(e,t,c){},227:function(e,t,c){},235:function(e,t){},256:function(e,t){},258:function(e,t){},268:function(e,t){},270:function(e,t){},318:function(e,t){},319:function(e,t){},324:function(e,t){},326:function(e,t){},333:function(e,t){},352:function(e,t){},371:function(e,t){},410:function(e,t){},457:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c.n(n),a=c(215),r=c.n(a),i=(c(226),c(227),c(22)),o=c(15),l=c(9),j=c.n(l),d=c(75),u=c(37),b=c(23),O=c(458),h=c(219),x=c(221),m=c(220),f=c(459),p=c(57),v=c(58),g=c(216),w=c.p+"static/media/bee-showing-stinger.59123214.png",N=c.p+"static/media/bee-pointing-right.59e0329e.png",k=c(217),S=c(1),y="holodeck-2",C={client:null,address:null},F=Object(n.createContext)(C),B=function(e){var t=e.children,c=Object(n.useState)(!1),s=Object(b.a)(c,2),a=s[0],r=s[1],i=Object(n.useState)(),o=Object(b.a)(i,2),l=o[0],d=o[1],O=Object(n.useState)(),h=Object(b.a)(O,2),x=h[0],m=h[1];return Object(n.useEffect)((function(){(function(){var e=Object(u.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.keplr){e.next=3;break}return r(!0),e.abrupt("return",window.keplr);case 3:if("complete"!==document.readyState){e.next=6;break}return r(!!window.keplr),e.abrupt("return",window.keplr);case 6:return e.abrupt("return",new Promise((function(e){document.addEventListener("readystatechange",(function t(c){var n;"complete"===(null===(n=c.target)||void 0===n?void 0:n.readyState)&&(r(!!window.keplr),e(window.keplr),document.removeEventListener("readystatechange",t))}))})));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()})),Object(n.useEffect)((function(){(function(){var e=Object(u.a)(j.a.mark((function e(){var t,c,n,s,a,i,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(null===(t=window)||void 0===t||null===(c=t.keplr)||void 0===c?void 0:c.enable)){e.next=14;break}return e.next=3,window.keplr.enable(y);case 3:return n=window.getOfflineSigner(y),s=window.getEnigmaUtils(y),e.next=7,n.getAccounts();case 7:a=e.sent,i=a[0].address,m(i),o=new k.SigningCosmWasmClient("https://bootstrap.secrettestnet.io/",i,n,s),d(o),e.next=15;break;case 14:r(!1);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a]),Object(S.jsx)(F.Provider,{value:{client:l,address:x},children:t})},I=c(36),T=function(){var e,t=Object(n.useContext)(F).client,c=Object(n.useState)(!1),s=Object(b.a)(c,2),a=s[0],r=s[1],o=Object(n.useState)(""),l=Object(b.a)(o,2),k=l[0],y=l[1],C=Object(n.useState)(!1),B=Object(b.a)(C,2),T=B[0],_=B[1],E=Object(n.useState)(""),L=Object(b.a)(E,2),z=L[0],M=L[1],J=function(){var e=Object(u.a)(j.a.mark((function e(){var c,n,s,a,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),n=I.Random.getBytes(16).reduce((function(e,t){return e+t.toString(16).padStart(2,"0")}),""),e.next=4,t.execute(P,{mint_nft:{token_id:n,public_metadata:{description:k}}}).catch((function(e){return console.log(e)}));case 4:s=e.sent,a=JSON.parse(String.fromCharCode.apply(String,Object(d.a)(s.data))),i=null===a||void 0===a||null===(c=a.mint_nft)||void 0===c?void 0:c.token_id,M(i),y(""),r(!1);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=t&&!a;return Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("img",{src:N,className:"img-fluid"})}),Object(S.jsxs)("div",{className:"col",children:[R&&z&&Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)("h3",{children:"Your secret token is ready"}),Object(S.jsxs)("div",{children:[Object(S.jsx)(g.CopyToClipboard,{text:"".concat(window.location.origin,"/").concat(z),onCopy:function(e){return _(!0)},children:Object(S.jsxs)("span",{children:["".concat(window.location.origin,"/").concat(z),Object(S.jsx)(p.a,{className:"ml-1 mr-1",icon:v.a})]})}),T&&"copied",Object(S.jsx)("br",{})]}),Object(S.jsx)(i.b,{as:"Button",to:"/".concat(z),children:"Reveal the secret"})]}),R&&!z&&Object(S.jsx)(S.Fragment,{children:Object(S.jsxs)(O.a,{children:[Object(S.jsxs)(h.a,{controlId:"message",children:[Object(S.jsx)(x.a,{children:"Message"}),Object(S.jsx)(m.a,{as:"textarea",rows:3,value:k,onChange:(e=y,function(t){var c=t.target.value;return e(c)})})]}),Object(S.jsx)(h.a,{controlId:"createTokenButton",className:"text-center",children:Object(S.jsx)(f.a,{size:"lg",className:"create-token-button",disabled:!R||!k,onClick:J,children:a?Object(S.jsx)(p.a,{icon:v.b,spin:!0}):"Create SHHH! token"})})]})}),!R&&Object(S.jsx)("div",{children:"Loading..."})]}),Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("img",{src:w,className:"img-fluid"})})]})},_=c.p+"static/media/bee-carrying.dedfdf2e.png",E=function(){var e=Object(o.g)().tokenId,t=Object(n.useContext)(F).client,c=Object(o.f)(),s=Object(n.useState)(!1),a=Object(b.a)(s,2),r=a[0],l=a[1],g=Object(n.useState)(""),w=Object(b.a)(g,2),N=w[0],k=w[1],y=function(){var n=Object(u.a)(j.a.mark((function n(){return j.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:l(!0),t.execute(P,{burn_nft:{token_id:e}}).then((function(e){var t,c,n=JSON.parse(String.fromCharCode.apply(String,Object(d.a)(e.data)));k(null===n||void 0===n||null===(t=n.burn_nft)||void 0===t||null===(c=t.secret)||void 0===c?void 0:c.description),l(!1)})).catch((function(e){console.error(e),c.replace("/not-found")}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),C=t&&!r;return Object(S.jsxs)("div",{className:"row",children:[Object(S.jsx)("div",{className:"col"}),Object(S.jsxs)("div",{className:"col",children:[Object(S.jsxs)(O.a,{children:[e&&!N&&Object(S.jsx)(S.Fragment,{children:Object(S.jsx)(h.a,{controlId:"burnToRevealButton",children:Object(S.jsx)(f.a,{className:"burn-to-reveal-button",disabled:!C,onClick:y,children:r?Object(S.jsx)(p.a,{icon:v.b,spin:!0}):"Burn to reveal"})})}),N&&Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)(h.a,{controlId:"revealedMessage",children:[Object(S.jsx)(x.a,{children:"Revealed Message"}),Object(S.jsx)(m.a,{as:"textarea",rows:3,value:N,disabled:!0})]}),Object(S.jsx)(i.b,{as:"Button",to:"/new",children:"Send another secret"})]})]}),Object(S.jsx)("img",{src:_,className:"img-fluid"})]}),Object(S.jsx)("div",{className:"col"})]})},L=function(){return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)("div",{children:"That secret isn't available"}),Object(S.jsx)(i.b,{as:"Button",to:"/",children:"Create a new secret"})]})},z=function(){return Object(S.jsxs)("div",{className:"XXXcontainer welcome",children:[Object(S.jsx)("div",{className:"row mb-5",children:Object(S.jsx)("div",{className:"col",children:Object(S.jsx)(i.b,{to:"/new",children:Object(S.jsx)(f.a,{size:"lg",variant:"outline-primary",children:"Create Secret Message"})})})}),Object(S.jsxs)("div",{className:"row",children:[Object(S.jsxs)("div",{className:"col-sm",children:[Object(S.jsx)("h1",{children:"Trustless"}),Object(S.jsx)("h1",{children:"Temporary"})]}),Object(S.jsx)("div",{className:"col-sm",children:Object(S.jsx)("img",{src:w,className:"img-fluid"})}),Object(S.jsxs)("div",{className:"col-sm",children:[Object(S.jsx)("h1",{children:"Secret"}),Object(S.jsx)("h1",{children:"Sharing"})]})]})]})},M=c.p+"static/media/bee-angry.0f248343.png",J=function(){return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)("div",{className:"row mb-5",children:[Object(S.jsx)("div",{className:"col-sm"}),Object(S.jsx)("div",{className:"col-sm",children:Object(S.jsx)("img",{src:M,className:"img-fluid"})}),Object(S.jsx)("div",{className:"col-sm"})]}),Object(S.jsx)("div",{className:"row",children:Object(S.jsx)("div",{className:"col",children:Object(S.jsx)("h3",{children:"It seems that you've lost your way"})})}),Object(S.jsx)("div",{className:"row",children:Object(S.jsx)("div",{className:"col",children:Object(S.jsx)(i.b,{to:"/",children:Object(S.jsx)(f.a,{size:"lg",variant:"outline-primary",children:"Go back to the hive"})})})})]})},P="secret19vc03hfsuqfsmt73c4fypg5au07lfngpcw2ytc";var R=function(){return Object(S.jsx)(B,{children:Object(S.jsx)(i.a,{children:Object(S.jsxs)("div",{className:"App",children:[Object(S.jsxs)("header",{className:"App-header",children:[Object(S.jsx)("h1",{children:"Shhh.buzz"}),"Like Snapchat, except for secrets"]}),Object(S.jsxs)(o.c,{children:[Object(S.jsx)(o.a,{path:"/",exact:!0,children:Object(S.jsx)(z,{})}),Object(S.jsx)(o.a,{path:"/new",exact:!0,children:Object(S.jsx)(T,{})}),Object(S.jsx)(o.a,{path:"/not-found",exact:!0,children:Object(S.jsx)(L,{})}),Object(S.jsx)(o.a,{path:"/:tokenId",exact:!0,children:Object(S.jsx)(E,{})}),Object(S.jsx)(o.a,{path:"*",children:Object(S.jsx)(J,{})})]})]})})})},A=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,460)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;c(e),n(e),s(e),a(e),r(e)}))};r.a.render(Object(S.jsx)(s.a.StrictMode,{children:Object(S.jsx)(R,{})}),document.getElementById("root")),A()}},[[457,1,2]]]);
//# sourceMappingURL=main.608e522f.chunk.js.map