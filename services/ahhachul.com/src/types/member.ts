export interface IMember {
  /** 닉네임 */
  nickname: string;
  /** 이메일 */
  email: string;
  /** 프로필 식별 값 */
  profileImageUrl: string;
  tier: string;
  type: string;
}

export type MemberUpdateType = Pick<IMember, 'nickname' | 'profileImageUrl'>;
