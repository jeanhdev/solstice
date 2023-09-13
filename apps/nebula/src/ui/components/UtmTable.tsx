const campaigns = [
  {
    campaignName: "CorporateCardLaunch",
    channel: "Google",
    utm: {
      source: "google",
      medium: "cpc",
      campaign: "CorporateCardLaunch2023",
    },
  },
  {
    campaignName: "StreamlineSpend",
    channel: "Facebook",
    utm: {
      source: "facebook",
      medium: "cpm",
      campaign: "StreamlineSpend2023",
    },
  },
  {
    campaignName: "BusinessExpenseEase",
    channel: "Twitter",
    utm: {
      source: "twitter",
      medium: "social",
      campaign: "BusinessExpenseEase2023",
    },
  },
  {
    campaignName: "SecureSpending",
    channel: "LinkedIn",
    utm: {
      source: "linkedin",
      medium: "display",
      campaign: "SecureSpending2023",
    },
  },
  {
    campaignName: "SeamlessExpenseManagement",
    channel: "Email",
    utm: {
      source: "email",
      medium: "email",
      campaign: "SeamlessExpenseManagement2023",
    },
  },
  {
    campaignName: "SmartSpendingSolutions",
    channel: "Google",
    utm: {
      source: "google",
      medium: "cpc",
      campaign: "SmartSpendingSolutions2023",
    },
  },
  {
    campaignName: "MoneyManagementMavericks",
    channel: "Facebook",
    utm: {
      source: "facebook",
      medium: "cpm",
      campaign: "MoneyManagementMavericks2023",
    },
  },
  {
    campaignName: "BusinessExpenseEase",
    channel: "Twitter",
    utm: {
      source: "twitter",
      medium: "social",
      campaign: "BusinessExpenseEase2023",
    },
  },
  {
    campaignName: "SecureSpending",
    channel: "Twitter",
    utm: {
      source: "linkedin",
      medium: "display",
      campaign: "SecureSpending2023",
    },
  },
  {
    campaignName: "BusinessBudgetingBoost",
    channel: "Email",
    utm: {
      source: "email",
      medium: "email",
      campaign: "BusinessBudgetingBoost2023",
    },
  },
  {
    campaignName: "CorporateCardsCentral",
    channel: "Google",
    utm: {
      source: "google",
      medium: "cpc",
      campaign: "CorporateCardsCentral2023",
    },
  },
  {
    campaignName: "FinanceFreedom",
    channel: "Facebook",
    utm: {
      source: "facebook",
      medium: "cpm",
      campaign: "FinanceFreedom2023",
    },
  },
  {
    campaignName: "CorporateCredit",
    channel: "Twitter",
    utm: {
      source: "twitter",
      medium: "social",
      campaign: "CorporateCredit2023",
    },
  },
  {
    campaignName: "SmartSpendingStrategies",
    channel: "Linkedin",
    utm: {
      source: "linkedin",
      medium: "display",
      campaign: "SmartSpendingStrategies2023",
    },
  },
  {
    campaignName: "BudgetBenefit",
    channel: "Email",
    utm: {
      source: "email",
      medium: "email",
      campaign: "BudgetBenefit2023",
    },
  },
];

export default function UtmTable() {
  return (
    <div>
      <div className="grid select-none grid-cols-utm gap-4 bg-static-surface-raised pl-[44px] pr-[22px]">
        <div className="flex flex-row py-4 ">
          <span className="label-small-regular text-content-moderate">
            Channel
          </span>
        </div>
        <div className="flex flex-row py-4 ">
          <span className="label-small-regular text-content-moderate">
            Utm Source
          </span>
        </div>
        <div className="flex flex-row py-4 ">
          <span className="label-small-regular text-content-moderate">
            Campaign name
          </span>
        </div>
        <div className="flex flex-row py-4 ">
          <span className="label-small-regular text-content-moderate">
            Utm Campaign
          </span>
        </div>
        <div className="flex flex-row py-4 ">
          <span className="label-small-regular text-content-moderate">
            <div />
          </span>
        </div>
      </div>
      <div className="max-h-scrollable-table overflow-y-auto">
        {campaigns.map((c) => (
          <div className="grid select-none grid-cols-utm gap-4 border-b border-divider-weak pl-[44px] pr-[22px]">
            <div className="truncate py-4">
              <span className="label-small-regular text-content-default">
                {c.channel}
              </span>
            </div>
            <div className="truncate py-4">
              <span className="label-small-regular text-content-default">
                {c.utm.source}
              </span>
            </div>
            <div className="flex flex-row items-center py-4">
              <span className="label-small-regular text-content-default">
                {c.campaignName}
              </span>
            </div>
            <div className="truncate py-4">
              <span className="label-small-regular text-content-default">
                {c.utm.campaign}
              </span>
            </div>
            <div className="truncate py-4">
              <span className="link label-small-regular">Edit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
