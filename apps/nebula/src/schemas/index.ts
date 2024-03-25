import { z } from "zod";

export const loginUserForm = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Please enter a valid password",
    ),
});

export type LoginUserForm = z.infer<typeof loginUserForm>;

export const completeUserFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  companyRole: z.string().min(2, "Company role is required"),
  companyName: z.string().min(2, "Company name is required"),
  companyWebsiteHostname: z
    .string()
    .regex(
      /^(https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      "Please enter a valid website",
    ),
});

export type CompleteUserForm = z.infer<typeof completeUserFormSchema>;

export const otpFormSchema = z.object({
  code: z.string().length(6, "Enter a valid code."),
});

export type OtpForm = z.infer<typeof otpFormSchema>;

const allowedCrms = ["HUBSPOT"];

export const crmConnectSchema = z.object({
  crm: z.string().refine((value) => allowedCrms.includes(value), {
    message: `CRM not supported`,
  }),
});

export type CrmConnect = z.infer<typeof crmConnectSchema>;

export const attributionModelsFormSchema = z.object({
  firstClick: z.string(),
  lastClick: z.boolean(),
  linear: z.boolean(),
  timeDecay: z.boolean(),
  positionBased: z.boolean(),
  uShape: z.boolean(),
});

const standardOAuthTokensSchema = z.object({
  refresh_token: z.string().min(2, "Refresh token is required"),
  access_token: z.string().min(2, "Access token is required"),
});

export const hubspotTokensSchema = standardOAuthTokensSchema;

export const triggerSchema = z.object({
  stageId: z.string().min(1, "Stage ID is required"),
  stageLabel: z.string().min(1, "Stage label is required"),
  pipelineId: z.string().min(1, "Pipeline ID is required").optional(),
  pipelineLabel: z.string().min(1, "Pipeline label is required").optional(),
});

export const selectedDateRangeSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export const selectedAttributionModelSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Attribution model name is required"),
  key: z.string().min(1, "Attribution model key is required"),
  isMultiTouch: z.boolean(),
});

export const addChannelFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  utmSource: z.string().min(3, "UTM source is required"),
  category: z.string().min(3, "Category is required"),
});

export type AddChannelForm = z.infer<typeof addChannelFormSchema>;
