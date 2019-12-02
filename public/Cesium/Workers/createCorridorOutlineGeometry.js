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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-5119c07b","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-8bc1900e","./when-1faa3867","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./IntersectionTests-35b85442","./Plane-475170f0","./GeometryOffsetAttribute-fa4e7a11","./arrayRemoveDuplicates-33a93436","./EllipsoidTangentPlane-0decb876","./EllipsoidRhumbLine-d5a5f3d0","./PolygonPipeline-2f06d6d9","./PolylineVolumeGeometryLibrary-83907e8d","./EllipsoidGeodesic-666ad0d2","./PolylinePipeline-b75c5343","./CorridorGeometryLibrary-612400dc"],function(R,e,t,h,c,B,i,g,r,o,U,F,a,Y,q,n,s,E,b,l,d,C,W,u,p,j){"use strict";var z=new B.Cartesian3(),J=new B.Cartesian3(),K=new B.Cartesian3();function G(e,t){var i,r,o,a=[],n=e.positions,s=e.corners,l=e.endPositions,d=new Y.GeometryAttributes(),u=0,p=0,f=0;for(r=0;r<n.length;r+=2)u+=o=n[r].length-3,f+=o/3*4,p+=n[r+1].length-3;for(u+=3,p+=3,r=0;r<s.length;r++){i=s[r];var h=s[r].leftPositions;R.defined(h)?u+=o=h.length:p+=o=s[r].rightPositions.length,f+=o/3*2}var y,c=R.defined(l);c&&(u+=y=l[0].length-3,p+=y,f+=4*(y/=3));var g,b,m,v,A,_,E=u+p,C=new Float64Array(E),G=0,P=E-1,T=y/2,w=q.IndexDatatype.createTypedArray(E/3,f+4),L=0;if(w[L++]=G/3,w[L++]=(P-2)/3,c){a.push(G/3),_=z,A=J;var D=l[0];for(r=0;r<T;r++)_=B.Cartesian3.fromArray(D,3*(T-1-r),_),A=B.Cartesian3.fromArray(D,3*(T+r),A),j.CorridorGeometryLibrary.addAttribute(C,A,G),j.CorridorGeometryLibrary.addAttribute(C,_,void 0,P),v=(b=G/3)+1,m=(g=(P-2)/3)-1,w[L++]=g,w[L++]=m,w[L++]=b,w[L++]=v,G+=3,P-=3}var k=0,O=n[k++],V=n[k++];for(C.set(O,G),C.set(V,P-V.length+1),o=V.length-3,a.push(G/3,(P-2)/3),r=0;r<o;r+=3)v=(b=G/3)+1,m=(g=(P-2)/3)-1,w[L++]=g,w[L++]=m,w[L++]=b,w[L++]=v,G+=3,P-=3;for(r=0;r<s.length;r++){var N,x,H=(i=s[r]).leftPositions,I=i.rightPositions,S=K;if(R.defined(H)){for(P-=3,x=m,a.push(v),N=0;N<H.length/3;N++)S=B.Cartesian3.fromArray(H,3*N,S),w[L++]=x-N-1,w[L++]=x-N,j.CorridorGeometryLibrary.addAttribute(C,S,void 0,P),P-=3;a.push(x-Math.floor(H.length/6)),t===W.CornerType.BEVELED&&a.push((P-2)/3+1),G+=3}else{for(G+=3,x=v,a.push(m),N=0;N<I.length/3;N++)S=B.Cartesian3.fromArray(I,3*N,S),w[L++]=x+N,w[L++]=x+N+1,j.CorridorGeometryLibrary.addAttribute(C,S,G),G+=3;a.push(x+Math.floor(I.length/6)),t===W.CornerType.BEVELED&&a.push(G/3-1),P-=3}for(O=n[k++],V=n[k++],O.splice(0,3),V.splice(V.length-3,3),C.set(O,G),C.set(V,P-V.length+1),o=V.length-3,N=0;N<V.length;N+=3)b=(v=G/3)-1,g=(m=(P-2)/3)+1,w[L++]=g,w[L++]=m,w[L++]=b,w[L++]=v,G+=3,P-=3;G-=3,P+=3,a.push(G/3,(P-2)/3)}if(c){G+=3,P-=3,_=z,A=J;var M=l[1];for(r=0;r<T;r++)_=B.Cartesian3.fromArray(M,3*(y-r-1),_),A=B.Cartesian3.fromArray(M,3*r,A),j.CorridorGeometryLibrary.addAttribute(C,_,void 0,P),j.CorridorGeometryLibrary.addAttribute(C,A,G),b=(v=G/3)-1,g=(m=(P-2)/3)+1,w[L++]=g,w[L++]=m,w[L++]=b,w[L++]=v,G+=3,P-=3;a.push(G/3)}else a.push(G/3,(P-2)/3);return w[L++]=G/3,w[L++]=(P-2)/3,d.position=new F.GeometryAttribute({componentDatatype:U.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:C}),{attributes:d,indices:w,wallIndices:a}}function y(e){var t=(e=h.defaultValue(e,h.defaultValue.EMPTY_OBJECT)).positions,i=e.width,r=h.defaultValue(e.height,0),o=h.defaultValue(e.extrudedHeight,r);this._positions=t,this._ellipsoid=B.Ellipsoid.clone(h.defaultValue(e.ellipsoid,B.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(r,o),this._extrudedHeight=Math.min(r,o),this._cornerType=h.defaultValue(e.cornerType,W.CornerType.ROUNDED),this._granularity=h.defaultValue(e.granularity,c.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*B.Cartesian3.packedLength+B.Ellipsoid.packedLength+6}y.pack=function(e,t,i){i=h.defaultValue(i,0);var r=e._positions,o=r.length;t[i++]=o;for(var a=0;a<o;++a,i+=B.Cartesian3.packedLength)B.Cartesian3.pack(r[a],t,i);return B.Ellipsoid.pack(e._ellipsoid,t,i),i+=B.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=h.defaultValue(e._offsetAttribute,-1),t};var m=B.Ellipsoid.clone(B.Ellipsoid.UNIT_SPHERE),v={positions:void 0,ellipsoid:m,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return y.unpack=function(e,t,i){t=h.defaultValue(t,0);for(var r=e[t++],o=new Array(r),a=0;a<r;++a,t+=B.Cartesian3.packedLength)o[a]=B.Cartesian3.unpack(e,t);var n=B.Ellipsoid.unpack(e,t,m);t+=B.Ellipsoid.packedLength;var s=e[t++],l=e[t++],d=e[t++],u=e[t++],p=e[t++],f=e[t];return R.defined(i)?(i._positions=o,i._ellipsoid=B.Ellipsoid.clone(n,i._ellipsoid),i._width=s,i._height=l,i._extrudedHeight=d,i._cornerType=u,i._granularity=p,i._offsetAttribute=-1===f?void 0:f,i):(v.positions=o,v.width=s,v.height=l,v.extrudedHeight=d,v.cornerType=u,v.granularity=p,v.offsetAttribute=-1===f?void 0:f,new y(v))},y.createGeometry=function(e){var t=e._positions,i=e._width,r=e._ellipsoid;t=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(t,r);var o=b.arrayRemoveDuplicates(t,B.Cartesian3.equalsEpsilon);if(!(o.length<2||i<=0)){var a,n=e._height,s=e._extrudedHeight,l=!c.CesiumMath.equalsEpsilon(n,s,0,c.CesiumMath.EPSILON2),d={ellipsoid:r,positions:o,width:i,cornerType:e._cornerType,granularity:e._granularity,saveAttributes:!1};if(l)d.height=n,d.extrudedHeight=s,d.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.ellipsoid,i=G(j.CorridorGeometryLibrary.computePositions(e),e.cornerType),r=i.wallIndices,o=e.height,a=e.extrudedHeight,n=i.attributes,s=i.indices,l=n.position.values,d=l.length,u=new Float64Array(d);u.set(l);var p,f=new Float64Array(2*d);if(l=C.PolygonPipeline.scaleToGeodeticHeight(l,o,t),u=C.PolygonPipeline.scaleToGeodeticHeight(u,a,t),f.set(l),f.set(u,d),n.position.values=f,d/=3,R.defined(e.offsetAttribute)){var h=new Uint8Array(2*d);if(e.offsetAttribute===E.GeometryOffsetAttribute.TOP)h=E.arrayFill(h,1,0,d);else{var y=e.offsetAttribute===E.GeometryOffsetAttribute.NONE?0:1;h=E.arrayFill(h,y)}n.applyOffset=new F.GeometryAttribute({componentDatatype:U.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:h})}var c=s.length,g=q.IndexDatatype.createTypedArray(f.length/3,2*(c+r.length));g.set(s);var b,m,v=c;for(p=0;p<c;p+=2){var A=s[p],_=s[p+1];g[v++]=A+d,g[v++]=_+d}for(p=0;p<r.length;p++)m=(b=r[p])+d,g[v++]=b,g[v++]=m;return{attributes:n,indices:g}}(d);else if((a=G(j.CorridorGeometryLibrary.computePositions(d),d.cornerType)).attributes.position.values=C.PolygonPipeline.scaleToGeodeticHeight(a.attributes.position.values,n,r),R.defined(e._offsetAttribute)){var u=a.attributes.position.values.length,p=new Uint8Array(u/3),f=e._offsetAttribute===E.GeometryOffsetAttribute.NONE?0:1;E.arrayFill(p,f),a.attributes.applyOffset=new F.GeometryAttribute({componentDatatype:U.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:p})}var h=a.attributes,y=g.BoundingSphere.fromVertices(h.position.values,void 0,3);return new F.Geometry({attributes:h,indices:a.indices,primitiveType:F.PrimitiveType.LINES,boundingSphere:y,offsetAttribute:e._offsetAttribute})}},function(e,t){return R.defined(t)&&(e=y.unpack(e,t)),e._ellipsoid=B.Ellipsoid.clone(e._ellipsoid),y.createGeometry(e)}});
