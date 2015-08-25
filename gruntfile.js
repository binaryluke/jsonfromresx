module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
      options: {
        globals: {}
      }
    },
    nodeunit: {
      all: ['tests/*Test.js']
    },
    watch: {
      files: ['<%= jshint.files %>', 'fixtures/*.resx'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'nodeunit']);

};