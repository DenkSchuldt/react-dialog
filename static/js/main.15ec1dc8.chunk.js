(this.webpackJsonpExamples=this.webpackJsonpExamples||[]).push([[0],{30:function(e,t,n){},40:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),i=n(12),l=n.n(i),r=(n(30),n(15)),d=n(7),o=n(13),a=n.n(o),j=n(5),b=(n(40),n(0)),h=function(){return Object(b.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/DenkSchuldt/react-dialog",className:"github-corner","aria-label":"View source on GitHub",children:Object(b.jsxs)("svg",{width:"100",height:"100",viewBox:"0 0 250 250",style:{fill:"#151513",color:"#fff",position:"absolute",top:0,border:0,right:0},"aria-hidden":"true",children:[Object(b.jsx)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}),Object(b.jsx)("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{transformOrigin:"130px 106px"},className:"octo-arm"}),Object(b.jsx)("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",className:"octo-body"})]})})};n(42);var O=function(){var e=Object(c.useState)(),t=Object(d.a)(e,2),n=t[0],s=t[1],i=Object(c.useState)(!0),l=Object(d.a)(i,2),o=l[0],O=l[1],x=Object(c.useState)(!0),u=Object(d.a)(x,2),m=u[0],f=u[1],p=Object(c.useState)(!0),g=Object(d.a)(p,2),C=g[0],k=g[1],y=Object(c.useState)(!0),v=Object(d.a)(y,2),N=v[0],w=v[1];return Object(b.jsxs)("div",{className:"app",children:[Object(b.jsxs)("header",{className:"app-header",children:[Object(b.jsxs)("div",{className:"app-header-content",children:[Object(b.jsx)("h2",{children:"@denkschuldt/react-dialog"}),Object(b.jsx)("p",{children:"A simple to use and customizable react dialog implementation."}),Object(b.jsx)("button",{type:"button",className:"app-button",onClick:function(){return O(!0)},children:"Open dialog"})]}),o&&Object(b.jsx)(a.a,{cancelableOutside:!1,className:"dnk-my-dialog",title:"@denkschuldt/react-dialog",confirmText:"Woohoo!",onConfirmClick:function(){return O(!1)},onCloseClick:function(){return O(!1)},children:Object(b.jsx)("div",{children:"A simple to use and customizable react dialog implementation."})})]}),Object(b.jsxs)("section",{className:"app-body",children:[Object(b.jsxs)("article",{children:[Object(b.jsx)("h1",{children:"Installation"}),Object(b.jsxs)("code",{className:"app-installation-code",children:[Object(b.jsx)("div",{id:"dnk-npm",children:"$ npm i @denkschuldt/react-dialog --save"}),Object(b.jsx)("i",{id:"dnk-npm-icon",className:"fas fa-copy",onClick:function(){var e,t;null===(e=navigator)||void 0===e||null===(t=e.clipboard)||void 0===t||t.writeText("npm i @denkschuldt/react-dialog --save");var n=document.getElementById("dnk-npm"),c=document.getElementById("dnk-npm-icon");n.classList.add("dnk-animate"),c.classList.add("dnk-animate"),n.addEventListener("animationend",(function(){n.classList.remove("dnk-animate"),c.classList.remove("dnk-animate")}))}})]})]}),Object(b.jsxs)("article",{children:[Object(b.jsx)("h1",{children:"Usage"}),Object(b.jsxs)("h2",{children:["Basic",m?Object(b.jsx)("i",{className:"fas fa-minus-circle",onClick:function(){return f(!1)}}):Object(b.jsx)("i",{className:"fas fa-plus-circle",onClick:function(){return f(!0)}})]}),m&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(j.a,{text:"\n                  import ReactDOM from 'react-dom';\n                  import React, { useState } from 'react';\n                  import Dialog from '@denkschuldt/react-dialog';\n\n                  const App = () => {\n                    const [ isVisible, setIsVisible ] = useState(false);\n                    return (\n                      <div>\n                        <button\n                          type='button'\n                          onClick={() => setIsVisible(true)}>\n                          Show dialog\n                        </button>\n                        {\n                          isVisible &&\n                          <Dialog\n                            height={150}\n                            title='Basic'\n                            onCloseClick={() => setIsVisible(false)}>\n                            <span>\n                              This is the body.\n                            </span>\n                          </Dialog>\n                        }\n                      </div>\n                    );\n                  }\n\n                  ReactDOM.render(<App/>, document.getElementById('root'));\n                ",language:"javascript",showLineNumbers:!1,theme:j.b}),Object(b.jsx)("footer",{children:Object(b.jsx)("button",{type:"button",className:"app-button",onClick:function(){s({height:150,title:"Basic",onCloseClick:function(){return s()}})},children:"Show dialog"})})]})]}),Object(b.jsxs)("article",{children:[Object(b.jsxs)("h2",{children:["With buttons",C?Object(b.jsx)("i",{className:"fas fa-minus-circle",onClick:function(){return k(!1)}}):Object(b.jsx)("i",{className:"fas fa-plus-circle",onClick:function(){return k(!0)}})]}),C&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(j.a,{text:"\n                  import ReactDOM from 'react-dom';\n                  import React, { useState } from 'react';\n                  import Dialog from '@denkschuldt/react-dialog';\n\n                  const App = () => {\n                    const [ isVisible, setIsVisible ] = useState(false);\n                    return (\n                      <div>\n                        <button\n                          type='button'\n                          onClick={() => setIsVisible(true)}>\n                          Show dialog\n                        </button>\n                        {\n                          isVisible &&\n                          <Dialog\n                            width={400}\n                            title='With buttons'\n                            onCancelClick={() => setIsVisible(false)}\n                            onConfirmClick={() => setIsVisible(false)}\n                            onCloseClick={() => setIsVisible(false)}>\n                            <span>\n                              This is the body. Now the dialog includes two buttons,\n                              one for cancelations, and one for confirmations.\n                            </span>\n                          </Dialog>\n                        }\n                      </div>\n                    );\n                  }\n\n                  ReactDOM.render(<App/>, document.getElementById('root'));\n                ",language:"javascript",showLineNumbers:!1,theme:j.b}),Object(b.jsx)("footer",{children:Object(b.jsx)("button",{type:"button",className:"app-button",onClick:function(){s({width:400,title:"With buttons",body:"This is the body. Now the dialog includes two buttons, one for cancelations, and one for confirmations.",onCancelClick:function(){return s()},onConfirmClick:function(){return s()},onCloseClick:function(){return s()}})},children:"Show dialog"})})]})]}),Object(b.jsxs)("article",{children:[Object(b.jsxs)("h2",{children:["Overriding styles",N?Object(b.jsx)("i",{className:"fas fa-minus-circle",onClick:function(){return w(!1)}}):Object(b.jsx)("i",{className:"fas fa-plus-circle",onClick:function(){return w(!0)}})]}),N&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(j.a,{className:"hi",text:"\n                import ReactDOM from 'react-dom';\n                import React, { useState } from 'react';\n                import Dialog from '@denkschuldt/react-dialog';\n\n                const App = () => {\n                  const [ isVisible, setIsVisible ] = useState(false);\n                  return (\n                    <div>\n                      <button\n                        type='button'\n                        onClick={() => setIsVisible(true)}>\n                        Show dialog\n                      </button>\n                      {\n                        isVisible &&\n                        <Dialog\n                          width={320}\n                          title='Overriding styles'\n                          className='my-custom-styles'\n                          onCancelClick={() => setIsVisible(false)}\n                          onConfirmClick={() => {...}}\n                          onCloseClick={() => setIsVisible(false)}>\n                          <span>\n                            You can change the styles by overriding the dialog's classes\n                          </span>\n                        </Dialog>\n                      }\n                    </div>\n                  );\n                }\n\n                ReactDOM.render(<App/>, document.getElementById('root'));\n\n                /*\n                  styles.scss\n                  .my-custom-styles {\n                    .dnk-dialog-content {\n                      border-radius: 0;\n                      background-color: #fff;\n                      .dnk-dialog-close {\n                        top: 0;\n                        right: 0;\n                        border-radius: 0;\n                        box-shadow: none;\n                        background-color: transparent;\n                        &:hover {\n                          box-shadow: none;\n                        }\n                      }\n                      .dnk-dialog-body {\n                        .dnk-dialog-body-buttons {\n                          justify-content: center;\n                          button {\n                            width: 100%;\n                            border-radius: 0;\n                          }\n                        }\n                      }\n                    }\n                  }\n                */\n              ",language:"javascript",showLineNumbers:!1,theme:j.b}),Object(b.jsx)("footer",{children:Object(b.jsx)("button",{type:"button",className:"app-button",onClick:function(){s({width:320,title:"Overriding styles",className:"my-custom-styles",body:"You can change the styles by overriding the dialog's classes",onCancelClick:function(){return s()},onConfirmClick:function(){return s()},onCloseClick:function(){return s()}})},children:"Show dialog"})})]}),Object(b.jsxs)("a",{target:"_blank",rel:"noreferrer",className:"dnk-playground-link",href:"https://denkschuldt.github.io/react-dialog/storybook",children:["Visit the playground for more examples",Object(b.jsx)("i",{className:"fas fa-external-link-square-alt"})]})]}),Object(b.jsxs)("article",{children:[Object(b.jsx)("h1",{children:"Props"}),Object(b.jsx)("div",{className:"app-body-table",children:Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"Name"}),Object(b.jsx)("th",{children:"Type"}),Object(b.jsx)("th",{children:"Required"}),Object(b.jsx)("th",{children:"Description"}),Object(b.jsx)("th",{children:"Default"})]})}),Object(b.jsxs)("tbody",{children:[Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"width"}),Object(b.jsx)("td",{children:"Number"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Dialog width"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"height"}),Object(b.jsx)("td",{children:"Number"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Dialog height"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"title"}),Object(b.jsx)("td",{children:"String"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Dialog title"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"draggable"}),Object(b.jsx)("td",{children:"Boolean"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Allows dialog drag"}),Object(b.jsx)("td",{children:"true"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"className"}),Object(b.jsx)("td",{children:"String"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Component class to override styles"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"slideIn"}),Object(b.jsx)("td",{children:"String"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Initial animation: top, bottom, left, right"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"cancelableOutside"}),Object(b.jsx)("td",{children:"Boolean"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Whether the dialogs closes by clicking outside or not"}),Object(b.jsx)("td",{children:"false"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"closeOnEscPress"}),Object(b.jsx)("td",{children:"Boolean"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Whether the dialogs closes by pressing escape"}),Object(b.jsx)("td",{children:"false"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"hideCloseButton"}),Object(b.jsx)("td",{children:"Boolean"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Hides the close button"}),Object(b.jsx)("td",{children:"false"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"onCloseClick"}),Object(b.jsx)("td",{children:"function"}),Object(b.jsx)("td",{style:{textAlign:"center"},children:Object(b.jsx)("p",{children:"\u2705"})}),Object(b.jsx)("td",{children:"Close button click function"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"cancelText"}),Object(b.jsx)("td",{children:"String"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Negative button text"}),Object(b.jsx)("td",{children:"'CANCEL'"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"onCancelClick"}),Object(b.jsx)("td",{children:"function"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Negative button click function"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"cancelDisabled"}),Object(b.jsx)("td",{children:"Boolean"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Negative button disabled prop"}),Object(b.jsx)("td",{children:"false"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"confirmText"}),Object(b.jsx)("td",{children:"String"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Positive button text"}),Object(b.jsx)("td",{children:"'OK'"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"onConfirmClick"}),Object(b.jsx)("td",{children:"function"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Positive button click function"}),Object(b.jsx)("td",{})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:"confirmDisabled"}),Object(b.jsx)("td",{children:"Boolean"}),Object(b.jsx)("td",{}),Object(b.jsx)("td",{children:"Positive button disabled prop"}),Object(b.jsx)("td",{children:"false"})]})]})]})})]}),Object(b.jsxs)("article",{children:[Object(b.jsx)("h1",{children:"License"}),Object(b.jsx)("h2",{children:"MIT"})]})]}),Object(b.jsxs)("footer",{className:"app-footer",children:["Developed with \u2764\ufe0f by ",Object(b.jsx)("a",{rel:"noreferrer",href:"https://github.com/DenkSchuldt",target:"_blank",children:"@DenkSchuldt"})]}),n&&Object(b.jsx)(a.a,Object(r.a)(Object(r.a)({},n),{},{children:Object(b.jsx)("span",{children:n.body||"This is the body."})})),Object(b.jsx)(h,{})]})},x=function(e){e&&e instanceof Function&&n.e(155).then(n.bind(null,230)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,l=t.getTTFB;n(e),c(e),s(e),i(e),l(e)}))};l.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(O,{})}),document.getElementById("root")),x()}},[[43,152,153]]]);
//# sourceMappingURL=main.15ec1dc8.chunk.js.map