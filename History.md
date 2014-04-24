
2.2.0 / 2014-04-24 
==================

 * amd support.
 * Don't include deps in util.js. 
 * util-bundled.js has deps, for now.
 * Move project settings to devDependencies

2.0.0 / 2014-03-12 
==================

 * Removed references to MTVNPlayer, so it can be more easily integrated into the player build.
 * travis-ci integration.
 * Use Handlebars 1.3.x. 
 * Add build status image.

1.7.0 / 2014-02-01 
==================

 * Using Backbone 1.1.0.

1.6.1 / 2014-01-31 
==================

 * Use window to find MTVNPlayer instead of `this`.

1.6.0 / 2014-01-06 
==================

 * Adding Url Util.

1.5.0 / 2013-10-22 
==================

 * Update Gruntfile for deployment
 * Support for lodash default build
 

1.4.0 / 2013-08-07 
==================

  * using underscore 1.5.1


1.3.2 / 2013-08-02 
==================

  * Fix for module options null ref.

1.3.1 / 2013-07-29 
==================

  * use function.call for document.cancelFullScreen

1.3.0 / 2013-07-22 
==================

  * Mixin Backbone Events into the default Module prototype.
  
1.0.0 / 2013-06-21 
==================

  * 1.0.0 update handlebars, grunt, testem. Using Handlebars 1.0.0 release. 

0.7.0 / 2013-06-12
==================
  
  * Moved Logger into here. And Module. Logger logs to the console and is safe for browsers where console is not implemented. Module is a very simple base class.


0.6.0 / 2013-06-10 
==================

  * Adding Playlist class since it's shared across modules.

0.5.0 / 2013-05-29 
==================

  * putting currentMetadata and metadata on the template object. more handlebars scoping.

0.4.0 / 2013-05-01 
==================
  * Fixing unit test.
  * checking if currentMetadata exists for template processor.

0.3.0 / 2013-04-04 
==================

  * Fixes #1, using underscore templates instead of handlebars for on the fly template compiling. Handlebars runtime is still included.

0.2.0 / 2013-03-28 
==================

  * adding FullScreen util
