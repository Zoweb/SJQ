@echo off
cls
title Building...
echo --- BUILDING ---
java -jar compiler.jar --compilation_level WHITESPACE_ONLY --formatting=pretty_print --output_wrapper_file wrapper.js --js='src/main/*.js' --js='src/fn/*.js' --js_output_file out/sjq.js --assume_function_wrapper
title Compiling...
echo  --- COMPILING ---
java -jar compiler.jar --compilation_level SIMPLE --output_wrapper_file wrapper-compiled.js --js='src/main/*.js' --js='src/fn/*.js' --js_output_file out/sjq.min.js --assume_function_wrapper