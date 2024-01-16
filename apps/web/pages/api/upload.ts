// import aws from "aws-sdk";
// import { NextApiRequest, NextApiResponse } from "next";

// const S3_BUCKET = process.env.BUCKET_NAME;

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new aws.S3();

// const upload = (req: NextApiRequest, res: NextApiResponse) => {
//   const { name, type, path } = req.body.file;

//   const params = {
//     Bucket: S3_BUCKET,
//     Key: path === "" ? `etc/${name}` : `${path}/${name}`,
//     ContentType: type,
//     ACL: "public-read",
//   };

//   s3.getSignedUrl("putObject", params, (error, url) => {
//     if (error) {
//       res.status(500).json({ error });
//     } else {
//       res.status(200).json({ url });
//     }
//   });
// };

// export default upload;
