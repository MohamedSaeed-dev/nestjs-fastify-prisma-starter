import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUrl, ValidateIf } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    username: string;

    @ValidateIf((o) => o.newPassword)
    @IsOptional()
    @IsString()
    oldPassword: string;

    @ValidateIf((o) => o.oldPassword)
    @IsOptional()
    @IsStrongPassword()
    @IsString()
    newPassword: string;

    @IsOptional()
    @IsPhoneNumber()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    avatar: string;

    @IsOptional()
    @IsUrl()
    @IsString()
    instagramLink: string;

    @IsOptional()
    @IsUrl()
    @IsString()
    twitterLink: string;

    @IsOptional()
    @IsUrl()
    @IsString()
    youtubeLink: string;

    @IsOptional()
    @IsUrl()
    @IsString()
    tiktokLink: string;
}
