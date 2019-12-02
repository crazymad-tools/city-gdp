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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-5119c07b","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-8bc1900e","./when-1faa3867","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./GeometryOffsetAttribute-fa4e7a11","./EllipsoidRhumbLine-d5a5f3d0","./PolygonPipeline-2f06d6d9","./RectangleGeometryLibrary-8ecf10e3"],function(h,e,t,c,y,d,i,b,a,r,E,A,n,G,R,m,o,P,w){"use strict";var _=new b.BoundingSphere(),v=new b.BoundingSphere(),L=new d.Cartesian3(),C=new d.Rectangle();function D(e,t){var i=e._ellipsoid,a=t.height,r=t.width,n=t.northCap,o=t.southCap,l=a,u=2,s=0,c=4;n&&(u-=1,l-=1,s+=1,c-=2),o&&(u-=1,l-=1,s+=1,c-=2),s+=u*r+2*l-c;var d,f=new Float64Array(3*s),p=0,g=0,h=L;if(n)w.RectangleGeometryLibrary.computePosition(t,i,!1,g,0,h),f[p++]=h.x,f[p++]=h.y,f[p++]=h.z;else for(d=0;d<r;d++)w.RectangleGeometryLibrary.computePosition(t,i,!1,g,d,h),f[p++]=h.x,f[p++]=h.y,f[p++]=h.z;for(d=r-1,g=1;g<a;g++)w.RectangleGeometryLibrary.computePosition(t,i,!1,g,d,h),f[p++]=h.x,f[p++]=h.y,f[p++]=h.z;if(g=a-1,!o)for(d=r-2;0<=d;d--)w.RectangleGeometryLibrary.computePosition(t,i,!1,g,d,h),f[p++]=h.x,f[p++]=h.y,f[p++]=h.z;for(d=0,g=a-2;0<g;g--)w.RectangleGeometryLibrary.computePosition(t,i,!1,g,d,h),f[p++]=h.x,f[p++]=h.y,f[p++]=h.z;for(var y=f.length/3*2,b=R.IndexDatatype.createTypedArray(f.length/3,y),m=0,_=0;_<f.length/3-1;_++)b[m++]=_,b[m++]=_+1;b[m++]=f.length/3-1,b[m++]=0;var v=new A.Geometry({attributes:new G.GeometryAttributes(),primitiveType:A.PrimitiveType.LINES});return v.attributes.position=new A.GeometryAttribute({componentDatatype:E.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f}),v.indices=b,v}function f(e){var t=(e=c.defaultValue(e,c.defaultValue.EMPTY_OBJECT)).rectangle,i=c.defaultValue(e.granularity,y.CesiumMath.RADIANS_PER_DEGREE),a=c.defaultValue(e.ellipsoid,d.Ellipsoid.WGS84),r=c.defaultValue(e.rotation,0),n=c.defaultValue(e.height,0),o=c.defaultValue(e.extrudedHeight,n);this._rectangle=d.Rectangle.clone(t),this._granularity=i,this._ellipsoid=a,this._surfaceHeight=Math.max(n,o),this._rotation=r,this._extrudedHeight=Math.min(n,o),this._offsetAttribute=e.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}f.packedLength=d.Rectangle.packedLength+d.Ellipsoid.packedLength+5,f.pack=function(e,t,i){return i=c.defaultValue(i,0),d.Rectangle.pack(e._rectangle,t,i),i+=d.Rectangle.packedLength,d.Ellipsoid.pack(e._ellipsoid,t,i),i+=d.Ellipsoid.packedLength,t[i++]=e._granularity,t[i++]=e._surfaceHeight,t[i++]=e._rotation,t[i++]=e._extrudedHeight,t[i]=c.defaultValue(e._offsetAttribute,-1),t};var p=new d.Rectangle(),g=d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),x={rectangle:p,ellipsoid:g,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};f.unpack=function(e,t,i){t=c.defaultValue(t,0);var a=d.Rectangle.unpack(e,t,p);t+=d.Rectangle.packedLength;var r=d.Ellipsoid.unpack(e,t,g);t+=d.Ellipsoid.packedLength;var n=e[t++],o=e[t++],l=e[t++],u=e[t++],s=e[t];return h.defined(i)?(i._rectangle=d.Rectangle.clone(a,i._rectangle),i._ellipsoid=d.Ellipsoid.clone(r,i._ellipsoid),i._surfaceHeight=o,i._rotation=l,i._extrudedHeight=u,i._offsetAttribute=-1===s?void 0:s,i):(x.granularity=n,x.height=o,x.rotation=l,x.extrudedHeight=u,x.offsetAttribute=-1===s?void 0:s,new f(x))};var H=new d.Cartographic();return f.createGeometry=function(e){var t,i,a=e._rectangle,r=e._ellipsoid,n=w.RectangleGeometryLibrary.computeOptions(a,e._granularity,e._rotation,0,C,H);if(!y.CesiumMath.equalsEpsilon(a.north,a.south,y.CesiumMath.EPSILON10)&&!y.CesiumMath.equalsEpsilon(a.east,a.west,y.CesiumMath.EPSILON10)){var o,l=e._surfaceHeight,u=e._extrudedHeight;if(!y.CesiumMath.equalsEpsilon(l,u,0,y.CesiumMath.EPSILON2)){if(t=function(e,t){var i=e._surfaceHeight,a=e._extrudedHeight,r=e._ellipsoid,n=a,o=i,l=D(e,t),u=t.height,s=t.width,c=P.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,o,r,!1),d=c.length,f=new Float64Array(2*d);f.set(c);var p=P.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,n,r);f.set(p,d),l.attributes.position.values=f;var g=t.northCap,h=t.southCap,y=4;g&&(y-=1),h&&(y-=1);var b=2*(f.length/3+y),m=R.IndexDatatype.createTypedArray(f.length/3,b);d=f.length/6;for(var _,v=0,E=0;E<d-1;E++)m[v++]=E,m[v++]=E+1,m[v++]=E+d,m[v++]=E+d+1;if(m[v++]=d-1,m[v++]=0,m[v++]=d+d-1,m[v++]=d,m[v++]=0,m[v++]=d,g)_=u-1;else{var A=s-1;m[v++]=A,m[v++]=A+d,_=s+u-2}if(m[v++]=_,m[v++]=_+d,!h){var G=s+_-1;m[v++]=G,m[v]=G+d}return l.indices=m,l}(e,n),h.defined(e._offsetAttribute)){var s=t.attributes.position.values.length/3,c=new Uint8Array(s);c=e._offsetAttribute===m.GeometryOffsetAttribute.TOP?m.arrayFill(c,1,0,s/2):(o=e._offsetAttribute===m.GeometryOffsetAttribute.NONE?0:1,m.arrayFill(c,o)),t.attributes.applyOffset=new A.GeometryAttribute({componentDatatype:E.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:c})}var d=b.BoundingSphere.fromRectangle3D(a,r,l,v),f=b.BoundingSphere.fromRectangle3D(a,r,u,_);i=b.BoundingSphere.union(d,f)}else{if((t=D(e,n)).attributes.position.values=P.PolygonPipeline.scaleToGeodeticHeight(t.attributes.position.values,l,r,!1),h.defined(e._offsetAttribute)){var p=t.attributes.position.values.length,g=new Uint8Array(p/3);o=e._offsetAttribute===m.GeometryOffsetAttribute.NONE?0:1,m.arrayFill(g,o),t.attributes.applyOffset=new A.GeometryAttribute({componentDatatype:E.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:g})}i=b.BoundingSphere.fromRectangle3D(a,r,l)}return new A.Geometry({attributes:t.attributes,indices:t.indices,primitiveType:A.PrimitiveType.LINES,boundingSphere:i,offsetAttribute:e._offsetAttribute})}},function(e,t){return h.defined(t)&&(e=f.unpack(e,t)),e._ellipsoid=d.Ellipsoid.clone(e._ellipsoid),e._rectangle=d.Rectangle.clone(e._rectangle),f.createGeometry(e)}});
