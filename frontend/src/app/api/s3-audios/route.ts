import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
const bucket = process.env.S3_BUCKET;

const s3 = new S3Client({
  region,
  credentials: accessKeyId && secretAccessKey ? {
    accessKeyId,
    secretAccessKey,
  } : undefined,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  if (!bucket) {
    return NextResponse.json({ error: 'S3_BUCKET not configured' }, { status: 500 });
  }
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: '', // Optionally filter by prefix/folder
    });
    const listResult = await s3.send(listCommand);
    const audioFiles = (listResult.Contents || [])
      .filter(obj => obj.Key && obj.Key.match(/\.(wav|mp3|ogg)$/i))
      .map(obj => obj.Key!);

    // Generate signed URLs for each audio file (valid for 1 hour)
    const urlPromises = audioFiles.map(async key => {
      const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key });
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
      return { key, url };
    });
    const urls = await Promise.all(urlPromises);
    return NextResponse.json(urls);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('S3 error:', err);
    return NextResponse.json({ error: 'Failed to fetch S3 audio files' }, { status: 500 });
  }
} 