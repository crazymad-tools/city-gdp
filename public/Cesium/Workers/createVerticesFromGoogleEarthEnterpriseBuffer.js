/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-5119c07b","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./when-1faa3867","./AttributeCompression-5601f533","./IntersectionTests-35b85442","./Plane-475170f0","./WebMercatorProjection-1ecca5ba","./createTaskProcessorWorker","./EllipsoidTangentPlane-0decb876","./OrientedBoundingBox-2b5c2949","./EllipsoidalOccluder-e6218e4e","./TerrainEncoding-114aa591"],function(We,e,t,n,Oe,Ve,i,Ye,ke,a,r,o,s,u,h,Le,c,Ue,He,je,De){"use strict";var Ge=Uint16Array.BYTES_PER_ELEMENT,ze=Int32Array.BYTES_PER_ELEMENT,qe=Uint32Array.BYTES_PER_ELEMENT,Je=Float32Array.BYTES_PER_ELEMENT,Ke=Float64Array.BYTES_PER_ELEMENT;function Qe(e,t,i){i=n.defaultValue(i,Oe.CesiumMath);for(var a=e.length,r=0;r<a;++r)if(i.equalsEpsilon(e[r],t,Oe.CesiumMath.EPSILON12))return r;return-1}var Xe=new Ve.Cartographic(),Ze=new Ve.Cartesian3(),$e=new Ve.Cartesian3(),et=new Ve.Cartesian3(),tt=new Ye.Matrix4();function it(e,t,i,a,r,n,o,s,u,h){for(var c=o.length,d=0;d<c;++d){var l=o[d],g=l.cartographic,m=l.index,p=e.length,I=g.longitude,f=g.latitude;f=Oe.CesiumMath.clamp(f,-Oe.CesiumMath.PI_OVER_TWO,Oe.CesiumMath.PI_OVER_TWO);var v=g.height-n.skirtHeight;n.hMin=Math.min(n.hMin,v),Ve.Cartographic.fromRadians(I,f,v,Xe),u&&(Xe.longitude+=s),u?d===c-1?Xe.latitude+=h:0===d&&(Xe.latitude-=h):Xe.latitude+=s;var E=n.ellipsoid.cartographicToCartesian(Xe);e.push(E),t.push(v),i.push(Ve.Cartesian2.clone(i[m])),0<a.length&&a.push(a[m]),Ye.Matrix4.multiplyByPoint(n.toENU,E,Ze);var T=n.minimum,C=n.maximum;Ve.Cartesian3.minimumByComponent(Ze,T,T),Ve.Cartesian3.maximumByComponent(Ze,C,C);var M=n.lastBorderPoint;if(We.defined(M)){var N=M.index;r.push(N,p-1,p,p,m,N)}n.lastBorderPoint=l}}return c(function(e,t){e.ellipsoid=Ve.Ellipsoid.clone(e.ellipsoid),e.rectangle=Ve.Rectangle.clone(e.rectangle);var i=function(e,t,i,a,r,n,o,s,u,h){var c,d,l,g,m,p;p=We.defined(a)?(c=a.west,d=a.south,l=a.east,g=a.north,m=a.width,a.height):(c=Oe.CesiumMath.toRadians(r.west),d=Oe.CesiumMath.toRadians(r.south),l=Oe.CesiumMath.toRadians(r.east),g=Oe.CesiumMath.toRadians(r.north),m=Oe.CesiumMath.toRadians(a.width),Oe.CesiumMath.toRadians(a.height));var I,f,v=[d,g],E=[c,l],T=Ye.Transforms.eastNorthUpToFixedFrame(t,i),C=Ye.Matrix4.inverseTransformation(T,tt);s&&(I=Le.WebMercatorProjection.geodeticLatitudeToMercatorAngle(d),f=1/(Le.WebMercatorProjection.geodeticLatitudeToMercatorAngle(g)-I));var M=new DataView(e),N=Number.POSITIVE_INFINITY,x=Number.NEGATIVE_INFINITY,b=$e;b.x=Number.POSITIVE_INFINITY,b.y=Number.POSITIVE_INFINITY,b.z=Number.POSITIVE_INFINITY;var P=et;P.x=Number.NEGATIVE_INFINITY,P.y=Number.NEGATIVE_INFINITY,P.z=Number.NEGATIVE_INFINITY;var S,w,B=0,R=0,A=0;for(w=0;w<4;++w){var y=B;S=M.getUint32(y,!0),y+=qe;var _=Oe.CesiumMath.toRadians(180*M.getFloat64(y,!0));y+=Ke,-1===Qe(E,_)&&E.push(_);var F=Oe.CesiumMath.toRadians(180*M.getFloat64(y,!0));y+=Ke,-1===Qe(v,F)&&v.push(F),y+=2*Ke;var W=M.getInt32(y,!0);y+=ze,R+=W,W=M.getInt32(y,!0),A+=3*W,B+=S+qe}var O=[],V=[],Y=new Array(R),k=new Array(R),L=new Array(R),U=s?new Array(R):[],H=new Array(A),j=[],D=[],G=[],z=[],q=0,J=0;for(w=B=0;w<4;++w){S=M.getUint32(B,!0);var K=B+=qe,Q=Oe.CesiumMath.toRadians(180*M.getFloat64(B,!0));B+=Ke;var X=Oe.CesiumMath.toRadians(180*M.getFloat64(B,!0));B+=Ke;var Z=Oe.CesiumMath.toRadians(180*M.getFloat64(B,!0)),$=.5*Z;B+=Ke;var ee=Oe.CesiumMath.toRadians(180*M.getFloat64(B,!0)),te=.5*ee;B+=Ke;var ie=M.getInt32(B,!0);B+=ze;var ae=M.getInt32(B,!0);B+=ze,B+=ze;for(var re=new Array(ie),ne=0;ne<ie;++ne){var oe=Q+M.getUint8(B++)*Z;Xe.longitude=oe;var se=X+M.getUint8(B++)*ee;Xe.latitude=se;var ue=M.getFloat32(B,!0);if(B+=Je,0!==ue&&ue<h&&(ue*=-Math.pow(2,u)),ue*=6371010*n,Xe.height=ue,-1!==Qe(E,oe)||-1!==Qe(v,se)){var he=Qe(O,Xe,Ve.Cartographic);if(-1!==he){re[ne]=V[he];continue}O.push(Ve.Cartographic.clone(Xe)),V.push(q)}re[ne]=q,Math.abs(oe-c)<$?j.push({index:q,cartographic:Ve.Cartographic.clone(Xe)}):Math.abs(oe-l)<$?G.push({index:q,cartographic:Ve.Cartographic.clone(Xe)}):Math.abs(se-d)<te?D.push({index:q,cartographic:Ve.Cartographic.clone(Xe)}):Math.abs(se-g)<te&&z.push({index:q,cartographic:Ve.Cartographic.clone(Xe)}),N=Math.min(ue,N),x=Math.max(ue,x),L[q]=ue;var ce=i.cartographicToCartesian(Xe);Y[q]=ce,s&&(U[q]=(Le.WebMercatorProjection.geodeticLatitudeToMercatorAngle(se)-I)*f),Ye.Matrix4.multiplyByPoint(C,ce,Ze),Ve.Cartesian3.minimumByComponent(Ze,b,b),Ve.Cartesian3.maximumByComponent(Ze,P,P);var de=(oe-c)/(l-c);de=Oe.CesiumMath.clamp(de,0,1);var le=(se-d)/(g-d);le=Oe.CesiumMath.clamp(le,0,1),k[q]=new Ve.Cartesian2(de,le),++q}for(var ge=3*ae,me=0;me<ge;++me,++J)H[J]=re[M.getUint16(B,!0)],B+=Ge;if(S!==B-K)throw new ke.RuntimeError("Invalid terrain tile.")}Y.length=q,k.length=q,L.length=q,s&&(U.length=q);var pe=q,Ie=J,fe={hMin:N,lastBorderPoint:void 0,skirtHeight:o,toENU:C,ellipsoid:i,minimum:b,maximum:P};j.sort(function(e,t){return t.cartographic.latitude-e.cartographic.latitude}),D.sort(function(e,t){return e.cartographic.longitude-t.cartographic.longitude}),G.sort(function(e,t){return e.cartographic.latitude-t.cartographic.latitude}),z.sort(function(e,t){return t.cartographic.longitude-e.cartographic.longitude});var ve=1e-5;if(it(Y,L,k,U,H,fe,j,-ve*m,!0,-ve*p),it(Y,L,k,U,H,fe,D,-ve*p,!1),it(Y,L,k,U,H,fe,G,ve*m,!0,ve*p),it(Y,L,k,U,H,fe,z,ve*p,!1),0<j.length&&0<z.length){var Ee=j[0].index,Te=pe,Ce=z[z.length-1].index,Me=Y.length-1;H.push(Ce,Me,Te,Te,Ee,Ce)}R=Y.length;var Ne,xe=Ye.BoundingSphere.fromPoints(Y);We.defined(a)&&a.width<Oe.CesiumMath.PI_OVER_TWO+Oe.CesiumMath.EPSILON5&&(Ne=He.OrientedBoundingBox.fromRectangle(a,N,x,i));for(var be=new je.EllipsoidalOccluder(i).computeHorizonCullingPoint(t,Y),Pe=new Ue.AxisAlignedBoundingBox(b,P,t),Se=new De.TerrainEncoding(Pe,fe.hMin,x,T,!1,s),we=new Float32Array(R*Se.getStride()),Be=0,Re=0;Re<R;++Re)Be=Se.encode(we,Be,Y[Re],k[Re],L[Re],void 0,U[Re]);var Ae=j.map(function(e){return e.index}).reverse(),ye=D.map(function(e){return e.index}).reverse(),_e=G.map(function(e){return e.index}).reverse(),Fe=z.map(function(e){return e.index}).reverse();return ye.unshift(_e[_e.length-1]),ye.push(Ae[0]),Fe.unshift(Ae[Ae.length-1]),Fe.push(_e[0]),{vertices:we,indices:new Uint16Array(H),maximumHeight:x,minimumHeight:N,encoding:Se,boundingSphere3D:xe,orientedBoundingBox:Ne,occludeePointInScaledSpace:be,vertexCountWithoutSkirts:pe,skirtIndex:Ie,westIndicesSouthToNorth:Ae,southIndicesEastToWest:ye,eastIndicesNorthToSouth:_e,northIndicesWestToEast:Fe}}(e.buffer,e.relativeToCenter,e.ellipsoid,e.rectangle,e.nativeRectangle,e.exaggeration,e.skirtHeight,e.includeWebMercatorT,e.negativeAltitudeExponentBias,e.negativeElevationThreshold),a=i.vertices;t.push(a.buffer);var r=i.indices;return t.push(r.buffer),{vertices:a.buffer,indices:r.buffer,numberOfAttributes:i.encoding.getStride(),minimumHeight:i.minimumHeight,maximumHeight:i.maximumHeight,boundingSphere3D:i.boundingSphere3D,orientedBoundingBox:i.orientedBoundingBox,occludeePointInScaledSpace:i.occludeePointInScaledSpace,encoding:i.encoding,vertexCountWithoutSkirts:i.vertexCountWithoutSkirts,skirtIndex:i.skirtIndex,westIndicesSouthToNorth:i.westIndicesSouthToNorth,southIndicesEastToWest:i.southIndicesEastToWest,eastIndicesNorthToSouth:i.eastIndicesNorthToSouth,northIndicesWestToEast:i.northIndicesWestToEast}})});
