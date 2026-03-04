import { toast } from "sonner";

export type PlanType = "dev" | "pro" | "team";

export interface PlanDetails {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  description: string;
}

const PLANS: Record<PlanType, PlanDetails> = {
  dev: {
    id: "price_dev_monthly",
    name: "Dev Plan",
    price: 5,
    currency: "usd",
    interval: "month",
    description: "For individuals & hobbyists"
  },
  pro: {
    id: "price_pro_monthly",
    name: "Pro Plan",
    price: 20,
    currency: "usd",
    interval: "month",
    description: "For professionals & small teams"
  },
  team: {
    id: "price_team_monthly",
    name: "Team Plan",
    price: 30,
    currency: "usd",
    interval: "month",
    description: "Per user, for larger teams"
  }
};

export interface UserBillingInfo {
  credits: number;
  plan: PlanType | null;
  trialEndsAt: Date | null;
  isInTrial: boolean;
  hasActiveSubscription: boolean;
}

const mockUserBillingInfo: UserBillingInfo = {
  credits: 5.00,
  plan: null,
  trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  isInTrial: true,
  hasActiveSubscription: false
};

export const getUserBillingInfo = (): UserBillingInfo => {
  const storedInfo = localStorage.getItem('userBillingInfo');
  if (storedInfo) {
    const parsedInfo = JSON.parse(storedInfo);
    return {
      ...parsedInfo,
      trialEndsAt: parsedInfo.trialEndsAt ? new Date(parsedInfo.trialEndsAt) : null
    };
  }

  localStorage.setItem('userBillingInfo', JSON.stringify(mockUserBillingInfo));
  return mockUserBillingInfo;
};

export const updateUserBillingInfo = (info: Partial<UserBillingInfo>): UserBillingInfo => {
  const currentInfo = getUserBillingInfo();
  const updatedInfo = { ...currentInfo, ...info };
  localStorage.setItem('userBillingInfo', JSON.stringify(updatedInfo));
  return updatedInfo;
};

export const redirectToCheckout = async (planType: PlanType, quantity: number = 1) => {
  const plan = PLANS[planType];

  try {
    window.location.href = `https://billing.hanzo.ai/checkout?plan=${planType}&quantity=${quantity}`;
    return true;
  } catch (error) {
    console.error("Error redirecting to checkout:", error);

    toast.error("Failed to process checkout", {
      description: "There was an error redirecting to billing. Please try again later."
    });

    return false;
  }
};

export const purchaseCredits = async (amount: number) => {
  try {
    window.location.href = `https://billing.hanzo.ai/credits?amount=${amount}`;
    return true;
  } catch (error) {
    console.error("Error purchasing credits:", error);

    toast.error("Failed to purchase credits", {
      description: "There was an error processing your credit purchase. Please try again later."
    });

    return false;
  }
};

export const getPlanDetails = (planType: PlanType): PlanDetails => {
  return PLANS[planType];
};

export const getAllPlans = (): Record<PlanType, PlanDetails> => {
  return PLANS;
};
