#!/usr/bin/env bash
echo 'Publishing Script Started...'

# Regular Colors
Black='\033[0;30m'  # Black
Red='\033[0;31m'    # Red
Green='\033[0;32m'  # Green
Yellow='\033[0;33m' # Yellow
Blue='\033[0;34m'   # Blue
Purple='\033[0;35m' # Purple
Cyan='\033[0;36m'   # Cyan
White='\033[0;37m'  # White

for ARGUMENT in "$@"
do

    KEY=$(echo "$ARGUMENT" | cut -f1 -d=)
    VALUE=$(echo "$ARGUMENT" | cut -f2 -d=)

    case "$KEY" in
            REPLACE_DATA)       REPLACE_DATA=${VALUE} ;;
            DISTRIBUTION_ID)    DISTRIBUTION_ID=${VALUE} ;;
            BUCKET_NAME)        BUCKET_NAME=${VALUE} ;;
            *)
    esac
done

BUCKET_NAME="s3://${BUCKET_NAME}"

if [ "$REPLACE_DATA" = true ]
then
  echo -e "${Red} \r\nRemoving existing files in temp directory..."
  aws s3 rm --recursive "$BUCKET_NAME/temp"

  echo -e "${Blue} \r\nMoving published files to temp directory..."
  aws s3 mv "$BUCKET_NAME/" "$BUCKET_NAME/temp" --recursive --exclude "temp/*" --exclude "README.md"
else
  echo -e "${Red} \r\nRemoving existing files in directory..."
  aws s3 rm --recursive "$BUCKET_NAME/" --exclude "temp/*"
fi

echo -e "${Green} \r\nPushing files to ${BUCKET_NAME}..."
PARENT_DIRECTORY="${PWD%/*}"
PARENT_DIRECTORY="${PARENT_DIRECTORY}/dynamic-material-ui/gh-pages"
aws s3 cp "$PARENT_DIRECTORY" "$BUCKET_NAME/" --recursive

#echo -e "${Purple} \r\n Creating cloudfront invalidation to site..."
#aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
