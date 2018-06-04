#! /bin/bash

clear;

if [[ $(pwd) != "/root/go/src/Portfolio" ]]; then
  echo "This doesn't seem like the EC2";
else
  echo "Building React bundle" &&
  node node_modules/react-scripts/scripts/build.js &&
  echo "Removing source maps" &&
  rm ./build/static/css/main.*.css.map ./build/static/js/main.*.js.map &&
  echo "Uploading bundle to S3" &&
  aws s3 sync build s3://kks.portfolio --acl public-read &&
  echo "Invalidating CDN cache" &&
  aws cloudfront create-invalidation --distribution-id EQYHJW6UVQEA3 --paths "/*" &&
  echo "Done";
fi
