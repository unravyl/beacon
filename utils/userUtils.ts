import { ProfileInterface } from '@/interface/authInterface';

export const cleanUserProfile = (profile: ProfileInterface) => {
  let updatedProfile = { ...profile };
  for (const [key, value] of Object.entries(profile)) {
    if (Array.isArray(value)) {
      const updatedValue = value
        .filter((item): item is string => item !== undefined)
        .map((item: string) => item.trim())
        .filter(Boolean);
      updatedProfile[key] = updatedValue;
    }
  }
  return updatedProfile;
};
