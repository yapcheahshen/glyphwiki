glyphwiki
=========

convert glyphwiki data into ydb format


##install
* download glyphwiki data from http://glyphwiki.org/dump.tar.gz
* extract dump_newest_only.txt from dump.tar.gz 
* convert dump_newest_only.txt to glyphwiki.json and related.json, this will take about 1~2 minutes

     cd xml	
     node gw2json

* generate glyphwiki.ydb from json, this will take less than 30 seconds.

     node glyphwiki

* you will get glyphwiki.ydb about 25MB, type run to open glyphwiki interface

     run

* you may type chinese character or glyphwiki id 

* add end user defined glyph in userglyph.js
