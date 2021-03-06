"use strict"

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            compilation: {
                files: {
                    'dev/css/wap.css': 'dev/less/wap.less'
                }
            },
            zip: {
                files: {
                    'public/css/wap.css': 'dev/css/wap.css'
                },
                options: {
                    compress: true,
                    yuicompress:false
                }
            }
        },
        jshint:{
            files: [
                'dev/js/**/*.js',
                'dev/js/controller/*.js',
                'dev/js/Demo/*.js',
                'dev/js/direetives/*.js',
                'dev/js/filters/*.js',
                'dev/js/services/*.js'
                // 'dev/js/*.js'
            ],
            options:{
                
            }
        },
        copy:{
            js:{
                files: [{
                    expand: true,
                    cwd:"dev/js/",
                    src: '**',
                    dest: 'public/js/'
                }],
            },
            img:{
                files: [{
                    expand: true,
                    cwd:"dev/img/",
                    src: '**',
                    dest: 'public/images/'
                   
                }],
            },
            bower:{
                files:[{
                    expand: true, // 启用动态扩展
                    cwd:"bower_components/", // 源文件匹配都相对此目录
                    src: '**/*.min.js', // 匹配模式
                    dest: 'public/js/lib', // 目标路径前缀
                    ext: '.min.js', // 目标文件路径中文件的扩展名
                    makeBase:true,
                     extDot: 'first' // 扩展名始于文件名的第一个点号
                }]
            }
        },
        uglify:{
            buildall:{
                options: {
                    mangle: false,
                    preserveComments: false,
                },
                files: [{
                    expand:true,
                    cwd:'dev/js',//js目录下
                    src:[
                        'controller/*.js',
                        'direetives/*.js',
                        'filters/*.js',
                        'services/*.js',
                        '*.js'
                        // 'config.js'
                    ],
                    dest: 'public/js'//输出到此目录下
                }]
            }
        },
        // jshint: {
        //     files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        //     options: {
        //         globals: {
        //             jQuery: true
        //         }
        //     }
        // },
        watch: {
            scripts:{
                files: ['dev/js/**/*.js'],
                tasks: ['copy']
            },
            img:{
                files: ['dev/img/**'],
                tasks: ['copy']
               
            },
            less:{
                files: ['dev/less/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.event.on('watch', function(action, filepath, target) {
          grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.registerTask('default', ['copy','uglify:buildall','less']);
};