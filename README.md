# AFKScapeDrop
Analyze RS chat to notify for drops/events


# Stuff

screencapture -Rx,y,w,h file.png
upload that to s3 bucket
aws textract start-document-text-detection --document-location '{"S3Object":{"Bucket":"seren-textract","Name":"seren.png"}}' --profile mwildeadmin --region us-west-2
{
    "JobId": "e1554931f4ba49234680c836ee9f1f9128d5880040545c5d5e4b02622e0a5f8d"
}
aws textract get-document-text-detection --job-id e1554931f4ba49234680c836ee9f1f9128d5880040545c5d5e4b02622e0a5f8d --profile mwildeadmin --region us-west-2 | grep "A Seren spirit appears"

us jq to parse instead of grep.

might get duplicates if nothing comes through the chat and stuff. so every time there is a positive, clear the chat. so i will get like notifications every 5 seconds until i go and check it and clear the chat....

don't send another notification if one has already been sent in last 30-60 seconds.


