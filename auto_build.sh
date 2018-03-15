#!/bin/sh

BUILD_DIR=$1

if [ $# != 1 ] ; then 
	BUILD_DIR="build"
fi 

echo "Build dir:"${BUILD_DIR}

if [ -d `pwd`/${BUILD_DIR} ]; then
	echo "remove build cache starting"
	rm -vrf `pwd`/${BUILD_DIR}
	echo "remove cache finished"
fi

echo "build starting"

if [ hash tsc ]; then
	npm install typescript -g
fi

tsc --pretty -p .
echo "buld finished"
echo "test ................"
node `pwd`/${BUILD_DIR}/test/test.js


