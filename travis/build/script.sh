#!/bin/bash -e
ant tests -Denv=dev

if [[ $TRAVIS_BRANCH == "develop" || $TRAVIS_BRANCH == *"e2e"* || $TRAVIS_BRANCH == "master" ]]
then
    echo "e2e test skip"
#    ant e2e
fi

if [[ $TRAVIS_BRANCH == "develop" || $TRAVIS_BRANCH == *"sauce-labs"* || $TRAVIS_BRANCH == "master" ]]
then
    ant saucelabs-debugger
    ant saucelabs-adminpanel
    ant saucelabs-containerjs
#    ant e2e
fi