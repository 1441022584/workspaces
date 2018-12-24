/*
 Highcharts JS v7.0.0 (2018-12-11)

 (c) 2014-2018 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(p){"object"===typeof module&&module.exports?module.exports=p:"function"===typeof define&&define.amd?define(function(){return p}):p("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(p){var C=function(b){var y=b.extend,p=b.isArray,g=b.isObject,u=b.isNumber,B=b.merge,z=b.pick;return{getColor:function(q,l){var v=l.index,m=l.mapOptionsToLevel,g=l.parentColor,w=l.parentColorIndex,n=l.series,e=l.colors,y=l.siblings,h=n.points,u=n.chart.options.chart,A,p,a,c;if(q){h=h[q.i];q=m[q.level]||
{};if(m=h&&q.colorByPoint)p=h.index%(e?e.length:u.colorCount),A=e&&e[p];if(!n.chart.styledMode){e=h&&h.options.color;u=q&&q.color;if(a=g)a=(a=q&&q.colorVariation)&&"brightness"===a.key?b.color(g).brighten(v/y*a.to).get():g;a=z(e,u,A,a,n.color)}c=z(h&&h.options.colorIndex,q&&q.colorIndex,p,w,l.colorIndex)}return{color:a,colorIndex:c}},getLevelOptions:function(b){var l=null,v,m,q,w;if(g(b))for(l={},q=u(b.from)?b.from:1,w=b.levels,m={},v=g(b.defaults)?b.defaults:{},p(w)&&(m=w.reduce(function(b,e){var l,
h;g(e)&&u(e.level)&&(h=B({},e),l="boolean"===typeof h.levelIsConstant?h.levelIsConstant:v.levelIsConstant,delete h.levelIsConstant,delete h.level,e=e.level+(l?0:q-1),g(b[e])?y(b[e],h):b[e]=h);return b},{})),w=u(b.to)?b.to:1,b=0;b<=w;b++)l[b]=B({},v,g(m[b])?m[b]:{});return l},setTreeValues:function l(b,m){var g=m.before,v=m.idRoot,n=m.mapIdToNode[v],e=m.points[b.i],u=e&&e.options||{},h=0,p=[];y(b,{levelDynamic:b.level-(("boolean"===typeof m.levelIsConstant?m.levelIsConstant:1)?0:n.level),name:z(e&&
e.name,""),visible:v===b.id||("boolean"===typeof m.visible?m.visible:!1)});"function"===typeof g&&(b=g(b,m));b.children.forEach(function(e,g){var a=y({},m);y(a,{index:g,siblings:b.children.length,visible:b.visible});e=l(e,a);p.push(e);e.visible&&(h+=e.val)});b.visible=0<h||b.visible;g=z(u.value,h);y(b,{children:p,childrenTotal:h,isLeaf:b.visible&&!h,val:g});return b},updateRootId:function(b){var l;g(b)&&(l=g(b.options)?b.options:{},l=z(b.rootNode,l.rootId,""),g(b.userOptions)&&(b.userOptions.rootId=
l),b.rootNode=l);return l}}}(p);(function(b,p){var y=b.seriesType,g=b.seriesTypes,u=b.merge,B=b.extend,z=b.noop,q=p.getColor,l=p.getLevelOptions,v=b.isArray,m=b.isNumber,C=b.isObject,w=b.isString,n=b.pick,e=b.Series,E=b.stableSort,h=b.Color,F=function(a,c,d){d=d||this;b.objectEach(a,function(b,f){c.call(d,b,f,a)})},A=function(a,c,d){d=d||this;a=c.call(d,a);!1!==a&&A(a,c,d)},G=p.updateRootId;y("treemap","scatter",{showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",
formatter:function(){var a=this&&this.point?this.point:{};return w(a.name)?a.name:""},inside:!0},tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,opacity:.15,states:{hover:{borderColor:"#999999",brightness:g.heatmap?0:.1,halo:!1,
opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:z,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,c){a=v(a)?a:[];var d=v(c)?c:[];c=a.reduce(function(a,c,d){c=n(c.parent,"");void 0===a[c]&&(a[c]=[]);a[c].push(d);return a},{"":[]});F(c,function(a,c,b){""!==c&&-1===d.indexOf(c)&&(a.forEach(function(a){b[""].push(a)}),delete b[c])});return c},getTree:function(){var a=
this.data.map(function(a){return a.id}),a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},init:function(a,c){var d=b.colorSeriesMixin;b.colorSeriesMixin&&(this.translateColors=d.translateColors,this.colorAttribs=d.colorAttribs,this.axisTypes=d.axisTypes);e.prototype.init.call(this,a,c);this.options.allowDrillToNode&&b.addEvent(this,"click",this.onClickDrillToNode)},buildNode:function(a,c,d,b,f){var t=this,x=[],k=t.points[c],D=0,e;(b[a]||[]).forEach(function(c){e=
t.buildNode(t.points[c].id,c,d+1,b,a);D=Math.max(e.height+1,D);x.push(e)});c={id:a,i:c,children:x,height:D,level:d,parent:f,visible:!1};t.nodeMap[c.id]=c;k&&(k.node=c);return c},setTreeValues:function(a){var c=this,d=c.options,b=c.nodeMap[c.rootNode],d="boolean"===typeof d.levelIsConstant?d.levelIsConstant:!0,f=0,r=[],x,k=c.points[a.i];a.children.forEach(function(a){a=c.setTreeValues(a);r.push(a);a.ignore||(f+=a.val)});E(r,function(a,c){return a.sortIndex-c.sortIndex});x=n(k&&k.options.value,f);k&&
(k.value=x);B(a,{children:r,childrenTotal:f,ignore:!(n(k&&k.visible,!0)&&0<x),isLeaf:a.visible&&!f,levelDynamic:a.level-(d?0:b.level),name:n(k&&k.name,""),sortIndex:n(k&&k.sortIndex,-x),val:x});return a},calculateChildrenAreas:function(a,c){var d=this,b=d.options,f=d.mapOptionsToLevel[a.level+1],r=n(d[f&&f.layoutAlgorithm]&&f.layoutAlgorithm,b.layoutAlgorithm),x=b.alternateStartingDirection,k=[];a=a.children.filter(function(a){return!a.ignore});f&&f.layoutStartingDirection&&(c.direction="vertical"===
f.layoutStartingDirection?0:1);k=d[r](c,a);a.forEach(function(a,b){b=k[b];a.values=u(b,{val:a.childrenTotal,direction:x?1-c.direction:c.direction});a.pointValues=u(b,{x:b.x/d.axisRatio,width:b.width/d.axisRatio});a.children.length&&d.calculateChildrenAreas(a,a.values)})},setPointValues:function(){var a=this,c=a.xAxis,d=a.yAxis;a.points.forEach(function(b){var f=b.node,r=f.pointValues,t,k,e=0;a.chart.styledMode||(e=(a.pointAttribs(b)["stroke-width"]||0)%2/2);r&&f.visible?(f=Math.round(c.translate(r.x,
0,0,0,1))-e,t=Math.round(c.translate(r.x+r.width,0,0,0,1))-e,k=Math.round(d.translate(r.y,0,0,0,1))-e,r=Math.round(d.translate(r.y+r.height,0,0,0,1))-e,b.shapeType="rect",b.shapeArgs={x:Math.min(f,t),y:Math.min(k,r),width:Math.abs(t-f),height:Math.abs(r-k)},b.plotX=b.shapeArgs.x+b.shapeArgs.width/2,b.plotY=b.shapeArgs.y+b.shapeArgs.height/2):(delete b.plotX,delete b.plotY)})},setColorRecursive:function(a,c,d,b,f){var r=this,t=r&&r.chart,t=t&&t.options&&t.options.colors,k;if(a){k=q(a,{colors:t,index:b,
mapOptionsToLevel:r.mapOptionsToLevel,parentColor:c,parentColorIndex:d,series:r,siblings:f});if(c=r.points[a.i])c.color=k.color,c.colorIndex=k.colorIndex;(a.children||[]).forEach(function(c,d){r.setColorRecursive(c,k.color,k.colorIndex,d,a.children.length)})}},algorithmGroup:function(a,c,d,b){this.height=a;this.width=c;this.plot=b;this.startDirection=this.direction=d;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,c){return Math.max(a/
c,c/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=
this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,c,d,b){var f,t,e,k,l=d.lW,h=d.lH,g=d.plot,m,p=0,n=d.elArr.length-1;c?(l=d.nW,h=d.nH):m=d.elArr[d.elArr.length-1];d.elArr.forEach(function(a){if(c||p<n)0===d.direction?(f=g.x,t=g.y,e=l,k=a/e):(f=g.x,t=g.y,k=h,e=a/k),b.push({x:f,y:t,width:e,height:k}),0===d.direction?g.y+=k:g.x+=e;p+=1});d.reset();0===d.direction?d.width-=l:d.height-=h;g.y=
g.parent.y+(g.parent.height-d.height);g.x=g.parent.x+(g.parent.width-d.width);a&&(d.direction=1-d.direction);c||d.addElement(m)},algorithmLowAspectRatio:function(a,c,d){var b=[],f=this,e,g={x:c.x,y:c.y,parent:c},k=0,l=d.length-1,h=new this.algorithmGroup(c.height,c.width,c.direction,g);d.forEach(function(d){e=d.val/c.val*c.height*c.width;h.addElement(e);h.lP.nR>h.lP.lR&&f.algorithmCalcPoints(a,!1,h,b,g);k===l&&f.algorithmCalcPoints(a,!0,h,b,g);k+=1});return b},algorithmFill:function(a,c,d){var b=
[],f,e=c.direction,g=c.x,k=c.y,h=c.width,l=c.height,m,p,n,q;d.forEach(function(d){f=d.val/c.val*c.height*c.width;m=g;p=k;0===e?(q=l,n=f/q,h-=n,g+=n):(n=h,q=f/n,l-=q,k+=q);b.push({x:m,y:p,width:n,height:q});a&&(e=1-e)});return b},strip:function(a,c){return this.algorithmLowAspectRatio(!1,a,c)},squarified:function(a,c){return this.algorithmLowAspectRatio(!0,a,c)},sliceAndDice:function(a,c){return this.algorithmFill(!0,a,c)},stripes:function(a,c){return this.algorithmFill(!1,a,c)},translate:function(){var a=
this,c=a.options,d=G(a),b,f;e.prototype.translate.call(a);f=a.tree=a.getTree();b=a.nodeMap[d];a.mapOptionsToLevel=l({from:b.level+1,levels:c.levels,to:f.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:c.colorByPoint}});""===d||b&&b.children.length||(a.drillToNode("",!1),d=a.rootNode,b=a.nodeMap[d]);A(a.nodeMap[a.rootNode],function(c){var b=!1,d=c.parent;c.visible=!0;if(d||""===d)b=a.nodeMap[d];return b});A(a.nodeMap[a.rootNode].children,function(a){var c=!1;a.forEach(function(a){a.visible=
!0;a.children.length&&(c=(c||[]).concat(a.children))});return c});a.setTreeValues(f);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=d={x:0,y:0,width:100,height:100};a.nodeMap[""].values=d=u(d,{width:d.width*a.axisRatio,direction:"vertical"===c.layoutStartingDirection?0:1,val:f.val});a.calculateChildrenAreas(f,d);a.colorAxis?a.translateColors():c.colorByPoint||a.setColorRecursive(a.tree);c.allowDrillToNode&&(c=b.pointValues,a.xAxis.setExtremes(c.x,c.x+c.width,!1),a.yAxis.setExtremes(c.y,
c.y+c.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,c=a.mapOptionsToLevel,d,b;a.points.filter(function(a){return a.node.visible}).forEach(function(f){b=c[f.node.level];d={style:{}};f.node.isLeaf||(d.enabled=!1);b&&b.dataLabels&&(d=u(d,b.dataLabels),a._hasPointLabels=!0);f.shapeArgs&&(d.style.width=f.shapeArgs.width,f.dataLabel&&f.dataLabel.css({width:f.shapeArgs.width+"px"}));f.dlOptions=u(d,f.options.dataLabels)});e.prototype.drawDataLabels.call(this)},
alignDataLabel:function(a){g.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},pointAttribs:function(a,c){var b=C(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},e=a&&b[a.node.level]||{},b=this.options,f=c&&b.states[c]||{},g=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||e.borderColor||f.borderColor||b.borderColor,"stroke-width":n(a&&a.borderWidth,e.borderWidth,f.borderWidth,b.borderWidth),dashstyle:a&&a.borderDashStyle||e.borderDashStyle||
f.borderDashStyle||b.borderDashStyle,fill:a&&a.color||this.color};-1!==g.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(c=n(f.opacity,b.opacity),a.fill=h(a.fill).setOpacity(c).get(),a.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?a.fill="none":c&&(a.fill=h(a.fill).brighten(f.brightness).get());return a},drawPoints:function(){var a=this,c=a.points.filter(function(a){return a.node.visible});c.forEach(function(c){var b=
"level-group-"+c.node.levelDynamic;a[b]||(a[b]=a.chart.renderer.g(b).attr({zIndex:1E3-c.node.levelDynamic}).add(a.group));c.group=a[b]});g.column.prototype.drawPoints.call(this);this.colorAttribs&&a.chart.styledMode&&this.points.forEach(function(a){a.graphic&&a.graphic.css(this.colorAttribs(a))},this);a.options.allowDrillToNode&&c.forEach(function(c){c.graphic&&(c.drillId=a.options.interactByLeaf?a.drillToByLeaf(c):a.drillToByGroup(c))})},onClickDrillToNode:function(a){var c=(a=a.point)&&a.drillId;
w(c)&&(a.setState(""),this.drillToNode(c))},drillToByGroup:function(a){var c=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(c=a.id);return c},drillToByLeaf:function(a){var c=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!c;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(c=a.id);return c},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&w(a.parent)&&this.drillToNode(a.parent)},drillToNode:function(a,c){var b=this.nodeMap[a];this.idPreviousRoot=
this.rootNode;this.rootNode=a;""===a?this.drillUpButton=this.drillUpButton.destroy():this.showDrillUpButton(b&&b.name||a);this.isDirty=!0;n(c,!0)&&this.chart.redraw()},showDrillUpButton:function(a){var c=this;a=a||"\x3c Back";var b=c.options.drillUpButton,e,f;b.text&&(a=b.text);this.drillUpButton?(this.drillUpButton.placed=!1,this.drillUpButton.attr({text:a}).align()):(f=(e=b.theme)&&e.states,this.drillUpButton=this.chart.renderer.button(a,null,null,function(){c.drillUp()},e,f&&f.hover,f&&f.select).addClass("highcharts-drillup-button").attr({align:b.position.align,
zIndex:7}).add().align(b.position,!1,b.relativeTo||"plotBox"))},buildKDTree:z,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,getExtremes:function(){e.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;e.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};e.prototype.bindAxes.call(this);
b.extend(this.yAxis.options,a);b.extend(this.xAxis.options,a)},utils:{recursive:A}},{getClassName:function(){var a=b.Point.prototype.getClassName.call(this),c=this.series,d=c.options;this.node.level<=c.nodeMap[c.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||n(d.interactByLeaf,!d.allowDrillToNode)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||m(this.value)},setState:function(a){b.Point.prototype.setState.call(this,
a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},setVisible:g.pie.prototype.pointClass.prototype.setVisible})})(p,C)});
//# sourceMappingURL=treemap.js.map