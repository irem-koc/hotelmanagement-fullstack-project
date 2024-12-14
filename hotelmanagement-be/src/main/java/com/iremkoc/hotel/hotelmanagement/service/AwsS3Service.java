package com.iremkoc.hotel.hotelmanagement.service;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class AwsS3Service {
    private final String bucketName = "iremkoc-hotel-images";

    @Value("${aws.s3.access.key}")
    private String awsS3AccessKey;

    @Value("${aws.s3.secret.key}")
    private String awsS3SecretKey;

    public String saveImagetoS3(MultipartFile photo) {
        String s3LocationImage = null;

        try {
            String s3FileName = photo.getOriginalFilename();
            BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                    .withRegion(Regions.EU_NORTH_1)
                    .build();

            InputStream is = photo.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, is,
                    metadata);
            s3Client.putObject(putObjectRequest);
            return "https://" + bucketName + ".s3.amazonaws.com/" + s3FileName;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to upload image to S3" + e.getMessage());
        }
    }

}