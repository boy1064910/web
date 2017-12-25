/*
 Highcharts JS v5.0.9 (2017-03-08)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){function k(a,c,e){this.init(a,c,e)}var t=a.each,u=a.extend,g=a.merge,m=a.splat;u(k.prototype,{init:function(a,c,e){var l=this,f=l.defaultOptions;l.chart=c;l.options=a=g(f,c.angular?{background:{}}:void 0,a);(a=a.background)&&t([].concat(m(a)).reverse(),function(c){var b=e.userOptions;c=g(l.defaultBackgroundOptions,c);e.options.plotBands.unshift(c);b.plotBands=b.plotBands||[];b.plotBands!==
e.options.plotBands&&b.plotBands.unshift(c)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{className:"highcharts-pane",shape:"circle",from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});a.Pane=k})(w);(function(a){var k=a.CenteredSeriesMixin,t=a.each,u=a.extend,g=a.map,m=a.merge,q=a.noop,c=a.Pane,e=a.pick,l=a.pInt,f=a.splat,p=a.wrap,b,h,n=a.Axis.prototype;a=a.Tick.prototype;b={getOffset:q,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=
!1},setScale:q,setCategories:q,setTitle:q};h={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",
x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(b){b=this.options=m(this.defaultOptions,this.defaultRadialOptions,b);b.plotBands||(b.plotBands=[])},getOffset:function(){n.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=k.getCenter.call(this.pane)},getLinePath:function(b,d){b=this.center;var c=this.chart,r=e(d,b[2]/2-this.offset);this.isCircular||void 0!==d?d=this.chart.renderer.symbols.arc(this.left+b[0],this.top+b[1],r,r,{start:this.startAngleRad,
end:this.endAngleRad,open:!0,innerR:0}):(d=this.postTranslate(this.angleRad,r),d=["M",b[0]+c.plotLeft,b[1]+c.plotTop,"L",d.x,d.y]);return d},setAxisTranslation:function(){n.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===e(this.userMax,
this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){n.setAxisSize.call(this);this.isRadial&&(this.center=this.pane.center=k.getCenter.call(this.pane),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*e(this.sector,1)/2)},getPosition:function(b,d){return this.postTranslate(this.isCircular?this.translate(b):this.angleRad,e(this.isCircular?
d:this.translate(b),this.center[2]/2)-this.offset)},postTranslate:function(b,d){var c=this.chart,e=this.center;b=this.startAngleRad+b;return{x:c.plotLeft+e[0]+Math.cos(b)*d,y:c.plotTop+e[1]+Math.sin(b)*d}},getPlotBandPath:function(b,d,c){var r=this.center,h=this.startAngleRad,f=r[2]/2,a=[e(c.outerRadius,"100%"),c.innerRadius,e(c.thickness,10)],p=Math.min(this.offset,0),n=/%$/,v,m=this.isCircular;"polygon"===this.options.gridLineInterpolation?r=this.getPlotLinePath(b).concat(this.getPlotLinePath(d,
!0)):(b=Math.max(b,this.min),d=Math.min(d,this.max),m||(a[0]=this.translate(b),a[1]=this.translate(d)),a=g(a,function(b){n.test(b)&&(b=l(b,10)*f/100);return b}),"circle"!==c.shape&&m?(b=h+this.translate(b),d=h+this.translate(d)):(b=-Math.PI/2,d=1.5*Math.PI,v=!0),a[0]-=p,a[2]-=p,r=this.chart.renderer.symbols.arc(this.left+r[0],this.top+r[1],a[0],a[0],{start:Math.min(b,d),end:Math.max(b,d),innerR:e(a[1],a[0]-a[2]),open:v}));return r},getPlotLinePath:function(b,c){var d=this,e=d.center,l=d.chart,h=d.getPosition(b),
a,r,f;d.isCircular?f=["M",e[0]+l.plotLeft,e[1]+l.plotTop,"L",h.x,h.y]:"circle"===d.options.gridLineInterpolation?(b=d.translate(b))&&(f=d.getLinePath(0,b)):(t(l.xAxis,function(b){b.pane===d.pane&&(a=b)}),f=[],b=d.translate(b),e=a.tickPositions,a.autoConnect&&(e=e.concat([e[0]])),c&&(e=[].concat(e).reverse()),t(e,function(d,c){r=a.getPosition(d,b);f.push(c?"L":"M",r.x,r.y)}));return f},getTitlePosition:function(){var b=this.center,d=this.chart,c=this.options.title;return{x:d.plotLeft+b[0]+(c.x||0),
y:d.plotTop+b[1]-{high:.5,middle:.25,low:0}[c.align]*b[2]+(c.y||0)}}};p(n,"init",function(l,d,a){var r=d.angular,p=d.polar,n=a.isX,v=r&&n,g,q=d.options,k=a.pane||0;if(r){if(u(this,v?b:h),g=!n)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else p&&(u(this,h),this.defaultRadialOptions=(g=n)?this.defaultRadialXOptions:m(this.defaultYAxisOptions,this.defaultRadialYOptions));r||p?(this.isRadial=!0,d.inverted=!1,q.chart.zoomType=null):this.isRadial=!1;l.call(this,d,a);v||!r&&!p||(l=this.options,
d.panes||(d.panes=[]),this.pane=d=d.panes[k]=d.panes[k]||new c(f(q.pane)[k],d,this),d=d.options,this.angleRad=(l.angle||0)*Math.PI/180,this.startAngleRad=(d.startAngle-90)*Math.PI/180,this.endAngleRad=(e(d.endAngle,d.startAngle+360)-90)*Math.PI/180,this.offset=l.offset||0,this.isCircular=g)});p(n,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});p(a,"getPosition",function(b,c,e,l,a){var d=this.axis;return d.getPosition?d.getPosition(e):b.call(this,c,
e,l,a)});p(a,"getLabelPosition",function(b,c,l,a,h,f,p,n,m){var d=this.axis,r=f.y,v=20,y=f.align,g=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial?(b=d.getPosition(this.pos,d.center[2]/2+e(f.distance,-25)),"auto"===f.rotation?a.attr({rotation:g}):null===r&&(r=d.chart.renderer.fontMetrics(a.styles.fontSize).b-a.getBBox().height/2),null===y&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(v=0),y=g>v&&g<180-v?"left":g>180+v&&g<360-v?"right":
"center"):y="center",a.attr({align:y})),b.x+=f.x,b.y+=r):b=b.call(this,c,l,a,h,f,p,n,m);return b});p(a,"getMarkPath",function(b,d,c,e,l,a,h){var f=this.axis;f.isRadial?(b=f.getPosition(this.pos,f.center[2]/2+e),d=["M",d,c,"L",b.x,b.y]):d=b.call(this,d,c,e,l,a,h);return d})})(w);(function(a){var k=a.each,t=a.noop,u=a.pick,g=a.Series,m=a.seriesType,q=a.seriesTypes;m("arearange","area",{marker:null,threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{series.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(c){return[c.low,c.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(c){var e=this.chart,l=this.xAxis.postTranslate(c.rectPlotX,this.yAxis.len-c.plotHigh);c.plotHighX=l.x-e.plotLeft;c.plotHigh=l.y-e.plotTop},translate:function(){var c=this,e=c.yAxis,l=!!c.modifyValue;q.area.prototype.translate.apply(c);
k(c.points,function(a){var f=a.low,b=a.high,h=a.plotY;null===b||null===f?a.isNull=!0:(a.plotLow=h,a.plotHigh=e.translate(l?c.modifyValue(b,a):b,0,1,0,1),l&&(a.yBottom=a.plotHigh))});this.chart.polar&&k(this.points,function(e){c.highToXY(e)})},getGraphPath:function(c){var e=[],a=[],f,p=q.area.prototype.getGraphPath,b,h,n;n=this.options;var r=this.chart.polar&&!1!==n.connectEnds,d=n.step;c=c||this.points;for(f=c.length;f--;)b=c[f],b.isNull||r||c[f+1]&&!c[f+1].isNull||a.push({plotX:b.plotX,plotY:b.plotY,
doCurve:!1}),h={polarPlotY:b.polarPlotY,rectPlotX:b.rectPlotX,yBottom:b.yBottom,plotX:u(b.plotHighX,b.plotX),plotY:b.plotHigh,isNull:b.isNull},a.push(h),e.push(h),b.isNull||r||c[f-1]&&!c[f-1].isNull||a.push({plotX:b.plotX,plotY:b.plotY,doCurve:!1});c=p.call(this,c);d&&(!0===d&&(d="left"),n.step={left:"right",center:"center",right:"left"}[d]);e=p.call(this,e);a=p.call(this,a);n.step=d;n=[].concat(c,e);this.chart.polar||"M"!==a[0]||(a[0]="L");this.graphPath=n;this.areaPath=this.areaPath.concat(c,a);
n.isArea=!0;n.xMap=c.xMap;this.areaPath.xMap=c.xMap;return n},drawDataLabels:function(){var c=this.data,a=c.length,l,f=[],p=g.prototype,b=this.options.dataLabels,h=b.align,n=b.verticalAlign,r=b.inside,d,v,m=this.chart.inverted;if(b.enabled||this._hasPointLabels){for(l=a;l--;)if(d=c[l])v=r?d.plotHigh<d.plotLow:d.plotHigh>d.plotLow,d.y=d.high,d._plotY=d.plotY,d.plotY=d.plotHigh,f[l]=d.dataLabel,d.dataLabel=d.dataLabelUpper,d.below=v,m?h||(b.align=v?"right":"left"):n||(b.verticalAlign=v?"top":"bottom"),
b.x=b.xHigh,b.y=b.yHigh;p.drawDataLabels&&p.drawDataLabels.apply(this,arguments);for(l=a;l--;)if(d=c[l])v=r?d.plotHigh<d.plotLow:d.plotHigh>d.plotLow,d.dataLabelUpper=d.dataLabel,d.dataLabel=f[l],d.y=d.low,d.plotY=d._plotY,d.below=!v,m?h||(b.align=v?"left":"right"):n||(b.verticalAlign=v?"bottom":"top"),b.x=b.xLow,b.y=b.yLow;p.drawDataLabels&&p.drawDataLabels.apply(this,arguments)}b.align=h;b.verticalAlign=n},alignDataLabel:function(){q.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:t,
getSymbol:t,drawPoints:t})})(w);(function(a){var k=a.seriesType;k("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(w);(function(a){var k=a.defaultPlotOptions,t=a.each,u=a.merge,g=a.noop,m=a.pick,q=a.seriesType,c=a.seriesTypes.column.prototype;q("columnrange","arearange",u(k.column,k.arearange,{lineWidth:1,pointRange:null}),{translate:function(){var a=this,l=a.yAxis,f=a.xAxis,p=f.startAngleRad,b,h=a.chart,n=a.xAxis.isRadial,r;c.translate.apply(a);
t(a.points,function(d){var c=d.shapeArgs,e=a.options.minPointLength,g,k;d.plotHigh=r=l.translate(d.high,0,1,0,1);d.plotLow=d.plotY;k=r;g=m(d.rectPlotY,d.plotY)-r;Math.abs(g)<e?(e-=g,g+=e,k-=e/2):0>g&&(g*=-1,k-=g);n?(b=d.barX+p,d.shapeType="path",d.shapeArgs={d:a.polarArc(k+g,k,b,b+d.pointWidth)}):(c.height=g,c.y=k,d.tooltipPos=h.inverted?[l.len+l.pos-h.plotLeft-k-g/2,f.len+f.pos-h.plotTop-c.x-c.width/2,g]:[f.left-h.plotLeft+c.x+c.width/2,l.pos-h.plotTop+k+g/2,g])})},directTouch:!0,trackerGroups:["group",
"dataLabelsGroup"],drawGraph:g,crispCol:c.crispCol,drawPoints:c.drawPoints,drawTracker:c.drawTracker,getColumnMetrics:c.getColumnMetrics,animate:function(){return c.animate.apply(this,arguments)},polarArc:function(){return c.polarArc.apply(this,arguments)},pointAttribs:c.pointAttribs})})(w);(function(a){var k=a.each,t=a.isNumber,u=a.merge,g=a.pick,m=a.pInt,q=a.Series,c=a.seriesType,e=a.TrackerMixin;c("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2},
dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var c=this.yAxis,a=this.options,e=c.center;this.generatePoints();k(this.points,function(b){var h=u(a.dial,b.dial),l=m(g(h.radius,80))*e[2]/200,f=m(g(h.baseLength,70))*l/100,d=m(g(h.rearLength,10))*l/100,p=h.baseWidth||3,k=h.topWidth||1,q=a.overshoot,x=c.startAngleRad+c.translate(b.y,null,null,
null,!0);t(q)?(q=q/180*Math.PI,x=Math.max(c.startAngleRad-q,Math.min(c.endAngleRad+q,x))):!1===a.wrap&&(x=Math.max(c.startAngleRad,Math.min(c.endAngleRad,x)));x=180*x/Math.PI;b.shapeType="path";b.shapeArgs={d:h.path||["M",-d,-p/2,"L",f,-p/2,l,-k/2,l,k/2,f,p/2,-d,p/2,"z"],translateX:e[0],translateY:e[1],rotation:x};b.plotX=e[0];b.plotY=e[1]})},drawPoints:function(){var c=this,a=c.yAxis.center,e=c.pivot,b=c.options,h=b.pivot,n=c.chart.renderer;k(c.points,function(a){var d=a.graphic,e=a.shapeArgs,h=
e.d;u(b.dial,a.dial);d?(d.animate(e),e.d=h):a.graphic=n[a.shapeType](e).attr({rotation:e.rotation,zIndex:1}).addClass("highcharts-dial").add(c.group)});e?e.animate({translateX:a[0],translateY:a[1]}):c.pivot=n.circle(0,0,g(h.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],a[1]).add(c.group)},animate:function(c){var a=this;c||(k(a.points,function(c){var b=c.graphic;b&&(b.attr({rotation:180*a.yAxis.startAngleRad/Math.PI}),b.animate({rotation:c.shapeArgs.rotation},a.options.animation))}),
a.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);q.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(c,a){q.prototype.setData.call(this,c,!1);this.processData();this.generatePoints();g(a,!0)&&this.chart.redraw()},drawTracker:e&&e.drawTrackerPoint},{setState:function(c){this.state=c}})})(w);(function(a){var k=a.each,t=a.noop,u=a.seriesType,g=a.seriesTypes;u("boxplot",
"column",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%"},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",drawDataLabels:t,
translate:function(){var a=this.yAxis,q=this.pointArrayMap;g.column.prototype.translate.apply(this);k(this.points,function(c){k(q,function(e){null!==c[e]&&(c[e+"Plot"]=a.translate(c[e],0,1,0,1))})})},drawPoints:function(){var a=this,g=a.chart.renderer,c,e,l,f,p,b,h=0,n,r,d,v,y=!1!==a.doQuartiles,t,x=a.options.whiskerLength;k(a.points,function(k){var m=k.graphic,q=m?"animate":"attr",u=k.shapeArgs;void 0!==k.plotY&&(n=u.width,r=Math.floor(u.x),d=r+n,v=Math.round(n/2),c=Math.floor(y?k.q1Plot:k.lowPlot),
e=Math.floor(y?k.q3Plot:k.lowPlot),l=Math.floor(k.highPlot),f=Math.floor(k.lowPlot),m||(k.graphic=m=g.g("point").add(a.group),k.stem=g.path().addClass("highcharts-boxplot-stem").add(m),x&&(k.whiskers=g.path().addClass("highcharts-boxplot-whisker").add(m)),y&&(k.box=g.path(void 0).addClass("highcharts-boxplot-box").add(m)),k.medianShape=g.path(void 0).addClass("highcharts-boxplot-median").add(m)),b=k.stem.strokeWidth()%2/2,h=r+v+b,k.stem[q]({d:["M",h,e,"L",h,l,"M",h,c,"L",h,f]}),y&&(b=k.box.strokeWidth()%
2/2,c=Math.floor(c)+b,e=Math.floor(e)+b,r+=b,d+=b,k.box[q]({d:["M",r,e,"L",r,c,"L",d,c,"L",d,e,"L",r,e,"z"]})),x&&(b=k.whiskers.strokeWidth()%2/2,l+=b,f+=b,t=/%$/.test(x)?v*parseFloat(x)/100:x/2,k.whiskers[q]({d:["M",h-t,l,"L",h+t,l,"M",h-t,f,"L",h+t,f]})),p=Math.round(k.medianPlot),b=k.medianShape.strokeWidth()%2/2,p+=b,k.medianShape[q]({d:["M",r,p,"L",d,p]}))})},setStackedPoints:t})})(w);(function(a){var k=a.each,t=a.noop,u=a.seriesType,g=a.seriesTypes;u("errorbar","boxplot",{grouping:!1,linkedTo:":previous",
tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:g.arearange?function(){var a=this.pointValKey;g.arearange.prototype.drawDataLabels.call(this);k(this.data,function(k){k.y=k[a]})}:t,getColumnMetrics:function(){return this.linkedParent&&
this.linkedParent.columnMetrics||g.column.prototype.getColumnMetrics.call(this)}})})(w);(function(a){var k=a.correctFloat,t=a.isNumber,u=a.pick,g=a.Point,m=a.Series,q=a.seriesType,c=a.seriesTypes;q("waterfall","column",{dataLabels:{inside:!0}},{pointValKey:"y",translate:function(){var a=this.options,l=this.yAxis,f,p,b,h,n,r,d,g,m,q=u(a.minPointLength,5),t=q/2,w=a.threshold,A=a.stacking,z;c.column.prototype.translate.apply(this);d=g=w;p=this.points;f=0;for(a=p.length;f<a;f++)b=p[f],r=this.processedYData[f],
h=b.shapeArgs,n=A&&l.stacks[(this.negStacks&&r<w?"-":"")+this.stackKey],z=this.getStackIndicator(z,b.x),m=n?n[b.x].points[this.index+","+f+","+z.index]:[0,r],b.isSum?b.y=k(r):b.isIntermediateSum&&(b.y=k(r-g)),n=Math.max(d,d+b.y)+m[0],h.y=l.toPixels(n,!0),b.isSum?(h.y=l.toPixels(m[1],!0),h.height=Math.min(l.toPixels(m[0],!0),l.len)-h.y):b.isIntermediateSum?(h.y=l.toPixels(m[1],!0),h.height=Math.min(l.toPixels(g,!0),l.len)-h.y,g=m[1]):(h.height=0<r?l.toPixels(d,!0)-h.y:l.toPixels(d,!0)-l.toPixels(d-
r,!0),d+=r),0>h.height&&(h.y+=h.height,h.height*=-1),b.plotY=h.y=Math.round(h.y)-this.borderWidth%2/2,h.height=Math.max(Math.round(h.height),.001),b.yBottom=h.y+h.height,h.height<=q&&!b.isNull?(h.height=q,h.y-=t,b.plotY=h.y,b.minPointLengthOffset=0>b.y?-t:t):b.minPointLengthOffset=0,h=b.plotY+(b.negative?h.height:0),this.chart.inverted?b.tooltipPos[0]=l.len-h:b.tooltipPos[1]=h},processData:function(a){var c=this.yData,e=this.options.data,p,b=c.length,h,n,r,d,g,q;n=h=r=d=this.options.threshold||0;
for(q=0;q<b;q++)g=c[q],p=e&&e[q]?e[q]:{},"sum"===g||p.isSum?c[q]=k(n):"intermediateSum"===g||p.isIntermediateSum?c[q]=k(h):(n+=g,h+=g),r=Math.min(n,r),d=Math.max(n,d);m.prototype.processData.call(this,a);this.dataMin=r;this.dataMax=d},toYData:function(a){return a.isSum?0===a.x?null:"sum":a.isIntermediateSum?0===a.x?null:"intermediateSum":a.y},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var a=this.data,c=a.length,f=this.graph.strokeWidth()+this.borderWidth,f=Math.round(f)%2/2,
p=[],b,h,n;for(n=1;n<c;n++)h=a[n].shapeArgs,b=a[n-1].shapeArgs,h=["M",b.x+b.width,b.y+a[n-1].minPointLengthOffset+f,"L",h.x,b.y+a[n-1].minPointLengthOffset+f],0>a[n-1].y&&(h[2]+=b.height,h[5]+=b.height),p=p.concat(h);return p},drawGraph:function(){m.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},getExtremes:a.noop},{getClassName:function(){var a=g.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");
return a},isValid:function(){return t(this.y,!0)||this.isSum||this.isIntermediateSum}})})(w);(function(a){var k=a.Series,t=a.seriesType,u=a.seriesTypes;t("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=k.prototype.getGraphPath.call(this),m=a.length+1;m--;)(m===a.length||"M"===a[m])&&0<m&&a.splice(m,0,"z");return this.areaPath=a},drawGraph:function(){u.area.prototype.drawGraph.call(this)},
drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:k.prototype.drawTracker,setStackedPoints:a.noop})})(w);(function(a){var k=a.arrayMax,t=a.arrayMin,u=a.Axis,g=a.each,m=a.isNumber,q=a.noop,c=a.pick,e=a.pInt,l=a.Point,f=a.seriesType,p=a.seriesTypes;f("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},
tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["markerGroup","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",getRadii:function(a,c,e,l){var b,h,f,p=this.zData,r=[],n=this.options,k="width"!==n.sizeBy,g=n.zThreshold,m=c-a;h=0;for(b=p.length;h<b;h++)f=p[h],n.sizeByAbsoluteValue&&null!==f&&(f=Math.abs(f-g),c=Math.max(c-g,Math.abs(a-g)),a=0),null===f?f=null:f<a?f=e/2-1:(f=
0<m?(f-a)/m:.5,k&&0<=f&&(f=Math.sqrt(f)),f=Math.ceil(e+f*(l-e))/2),r.push(f);this.radii=r},animate:function(a){var b=this.options.animation;a||(g(this.points,function(a){var c=a.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(d,b))}),this.animate=null)},translate:function(){var b,c=this.data,e,f,d=this.radii;p.scatter.prototype.translate.call(this);for(b=c.length;b--;)e=c[b],f=d?d[b]:0,m(f)&&f>=this.minPxSize/2?(e.marker=
a.extend(e.marker,{radius:f,width:2*f,height:2*f}),e.dlBox={x:e.plotX-f,y:e.plotY-f,width:2*f,height:2*f}):e.shapeArgs=e.plotY=e.dlBox=void 0},alignDataLabel:p.column.prototype.alignDataLabel,buildKDTree:q,applyZones:q},{haloPath:function(a){return l.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});u.prototype.beforePadding=function(){var a=this,f=this.len,l=this.chart,p=0,d=f,q=this.isXAxis,u=q?"xData":"yData",w=this.min,x={},E=Math.min(l.plotWidth,l.plotHeight),
A=Number.MAX_VALUE,z=-Number.MAX_VALUE,C=this.max-w,B=f/C,D=[];g(this.series,function(b){var d=b.options;!b.bubblePadding||!b.visible&&l.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,D.push(b),q&&(g(["minSize","maxSize"],function(a){var b=d[a],c=/%$/.test(b),b=e(b);x[a]=c?E*b/100:b}),b.minPxSize=x.minSize,b.maxPxSize=Math.max(x.maxSize,x.minSize),b=b.zData,b.length&&(A=c(d.zMin,Math.min(A,Math.max(t(b),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),z=c(d.zMax,Math.max(z,k(b))))))});
g(D,function(b){var c=b[u],e=c.length,f;q&&b.getRadii(A,z,b.minPxSize,b.maxPxSize);if(0<C)for(;e--;)m(c[e])&&a.dataMin<=c[e]&&c[e]<=a.dataMax&&(f=b.radii[e],p=Math.min((c[e]-w)*B-f,p),d=Math.max((c[e]-w)*B+f,d))});D.length&&0<C&&!this.isLog&&(d-=f,B*=(f+p-d)/f,g([["min","userMin",p],["max","userMax",d]],function(b){void 0===c(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/B)}))}})(w);(function(a){function k(a,e){var c=this.chart,f=this.options.animation,p=this.group,b=this.markerGroup,h=this.xAxis.center,
g=c.plotLeft,k=c.plotTop;c.polar?c.renderer.isSVG&&(!0===f&&(f={}),e?(a={translateX:h[0]+g,translateY:h[1]+k,scaleX:.001,scaleY:.001},p.attr(a),b&&b.attr(a)):(a={translateX:g,translateY:k,scaleX:1,scaleY:1},p.animate(a,f),b&&b.animate(a,f),this.animate=null)):a.call(this,e)}var t=a.each,u=a.pick,g=a.seriesTypes,m=a.wrap,q=a.Series.prototype;a=a.Pointer.prototype;q.searchPointByAngle=function(a){var c=this.chart,l=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-
l[0]-c.plotLeft,a.chartY-l[1]-c.plotTop)})};m(q,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.kdDimensions=2);a.apply(this)});q.toXY=function(a){var c,l=this.chart,f=a.plotX;c=a.plotY;a.rectPlotX=f;a.rectPlotY=c;c=this.xAxis.postTranslate(a.plotX,this.yAxis.len-c);a.plotX=a.polarPlotX=c.x-l.plotLeft;a.plotY=a.polarPlotY=c.y-l.plotTop;this.kdByAngle?(l=(f/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>l&&(l+=360),a.clientX=l):a.clientX=
a.plotX};g.spline&&m(g.spline.prototype,"getPointSpline",function(a,e,l,f){var c,b,h,g,k,d,m;this.chart.polar?(c=l.plotX,b=l.plotY,a=e[f-1],h=e[f+1],this.connectEnds&&(a||(a=e[e.length-2]),h||(h=e[1])),a&&h&&(g=a.plotX,k=a.plotY,e=h.plotX,d=h.plotY,g=(1.5*c+g)/2.5,k=(1.5*b+k)/2.5,h=(1.5*c+e)/2.5,m=(1.5*b+d)/2.5,e=Math.sqrt(Math.pow(g-c,2)+Math.pow(k-b,2)),d=Math.sqrt(Math.pow(h-c,2)+Math.pow(m-b,2)),g=Math.atan2(k-b,g-c),k=Math.atan2(m-b,h-c),m=Math.PI/2+(g+k)/2,Math.abs(g-m)>Math.PI/2&&(m-=Math.PI),
g=c+Math.cos(m)*e,k=b+Math.sin(m)*e,h=c+Math.cos(Math.PI+m)*d,m=b+Math.sin(Math.PI+m)*d,l.rightContX=h,l.rightContY=m),f?(l=["C",a.rightContX||a.plotX,a.rightContY||a.plotY,g||c,k||b,c,b],a.rightContX=a.rightContY=null):l=["M",c,b]):l=a.call(this,e,l,f);return l});m(q,"translate",function(a){var c=this.chart;a.call(this);if(c.polar&&(this.kdByAngle=c.tooltip&&c.tooltip.shared,!this.preventPostTranslate))for(a=this.points,c=a.length;c--;)this.toXY(a[c])});m(q,"getGraphPath",function(a,e){var c=this,
f,g;if(this.chart.polar){e=e||this.points;for(f=0;f<e.length;f++)if(!e[f].isNull){g=f;break}!1!==this.options.connectEnds&&void 0!==g&&(this.connectEnds=!0,e.splice(e.length,0,e[g]));t(e,function(a){void 0===a.polarPlotY&&c.toXY(a)})}return a.apply(this,[].slice.call(arguments,1))});m(q,"animate",k);g.column&&(g=g.column.prototype,g.polarArc=function(a,e,l,f){var c=this.xAxis.center,b=this.yAxis.len;return this.chart.renderer.symbols.arc(c[0],c[1],b-e,null,{start:l,end:f,innerR:b-u(a,b)})},m(g,"animate",
k),m(g,"translate",function(a){var c=this.xAxis,l=c.startAngleRad,f,g,b;this.preventPostTranslate=!0;a.call(this);if(c.isRadial)for(f=this.points,b=f.length;b--;)g=f[b],a=g.barX+l,g.shapeType="path",g.shapeArgs={d:this.polarArc(g.yBottom,g.plotY,a,a+g.pointWidth)},this.toXY(g),g.tooltipPos=[g.plotX,g.plotY],g.ttBelow=g.plotY>c.center[1]}),m(g,"alignDataLabel",function(a,e,g,f,k,b){this.chart.polar?(a=e.rectPlotX/Math.PI*180,null===f.align&&(f.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),
null===f.verticalAlign&&(f.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),q.alignDataLabel.call(this,e,g,f,k,b)):a.call(this,e,g,f,k,b)}));m(a,"getCoordinates",function(a,e){var c=this.chart,f={xAxis:[],yAxis:[]};c.polar?t(c.axes,function(a){var b=a.isXAxis,h=a.center,g=e.chartX-h[0]-c.plotLeft,h=e.chartY-h[1]-c.plotTop;f[b?"xAxis":"yAxis"].push({axis:a,value:a.translate(b?Math.PI-Math.atan2(g,h):Math.sqrt(Math.pow(g,2)+Math.pow(h,2)),!0)})}):f=a.call(this,e);return f})})(w)});