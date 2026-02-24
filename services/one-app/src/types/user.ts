type Gender = 'MALE' | 'FEMALE';
type AgeRange = '1' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';

export interface User {
  memberId: number;
  nickname: string;
  email: string;
  maskedEmail?: string;
  gender: Gender;
  ageRange: AgeRange;
  profilePublic?: boolean;
  emailPublic?: boolean;
  genderAgePublic?: boolean;
  postsPublic?: boolean;
  commentsPublic?: boolean;
}
