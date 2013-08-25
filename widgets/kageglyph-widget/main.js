define(['underscore','text!./kage.tmpl','../../userglyph'], function(_,template,userglyph) {
  return {
    type: 'Backbone',
    events: {
    	"click #btn-clear":"clear"
    },
    clear:function() {
      $("#output").empty();
    },
    renderglyph:function(glyph,buhins) {
      if ($('img[title="'+glyph+'"]').length) return;
      var kage=new this.sandbox.kage.Kage();
      var polygons=new this.sandbox.kage.Polygons();
      for (var i in buhins) {
        kage.kBuhin.push( i, buhins[i]) ;
      }
      kage.makeGlyph(polygons, glyph);
      var svg=polygons.generateSVG();
      var datauri="data:image/svg+xml;utf8,"+svg;
      

      $img=$('<img width="200px" height="200px" title="'+glyph+'"></img>');
      $img.attr('src',datauri)
      $("#output").prepend($img);
      
    },
    fetchglyph:function(glyph,callback) {
      var opts={db:'glyphwiki',name:'getBuhins',params:[glyph]};
      var that=this;
      this.sandbox.yase.customfunc(opts,function(err,data){
        var buhins=Object.keys(data);
        for (var i in data) {
          if (!that.fontcache[i]) that.fontcache[i]=data[i];
        }
        callback(data);
          //that.$el.html(JSON.stringify(data));
      })

    },
    render:function(tofind) {
      if (tofind.trim()=="")return;
      var glyph=tofind;
      var that=this;//𠀀
      var iscommand=false;
      if (this.fontcache[tofind]) {
        tofind=this.fontcache[tofind];
        iscommand=true;
      }
      this.fetchglyph(tofind,function(data) {
        if (!Object.keys(data).length) {
          glyph='u'+tofind.charCodeAt(0).toString(16);
          that.fetchglyph(glyph,function(data){
            that.renderglyph(glyph,data);
          })
        } else {
          if (iscommand) data[glyph]=tofind;
          that.renderglyph(glyph,data);
        }
      });

    },
  
    initialize: function() {
      this.html(template);
      this.fontcache=userglyph;
      this.sandbox.on("tofind.change",this.render,this);
    }
  };
});

