define(['underscore','text!./kagetext.tmpl','../../userglyph'], function(_,template,userglyph) {
  return {
    type: 'Backbone',
    events: {
    	"input #input":"dokagetext"
    },
    dokagetext:function() {
      //when extension B,C,D,
      //convert to svg
      var input=this.$el.find("#input").val();
      var out=this.sandbox.dgg.tagify(input);
      $output=this.$el.find("#output");
      $output.html( out);
      this.sandbox.dgg.loadglyphs.apply(this,[$output]);
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
      

      $img=$('<img width="300px" height="300px" title="'+glyph+'"></img>');
      $img.attr('src',datauri)
      $("#output").prepend($img);
      
    },

    render:function(tofind) {
      this.html(template);
      this.dokagetext();
    },
  
    initialize: function() {
      this.render();
      this.fontcache=userglyph;
    }
  };
});

