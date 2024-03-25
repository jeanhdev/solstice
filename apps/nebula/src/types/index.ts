import { Channel } from "@solstice/cosmos/tables/channels";
import { IntegrationType } from "@solstice/cosmos/tables/integrations";
import { VisitorSession } from "@solstice/cosmos/tables/visitor-sessions";
import { type z } from "zod";

import { ERROR_KEYS } from "@nebula/constants";
import { type hubspotTokensSchema, type triggerSchema } from "@nebula/schemas";

export enum OrganicChannels {
  SEARCH = "SEARCH",
  BLOG = "BLOG",
  PRODUCTS = "PRODUCTS",
  EMAIL = "EMAIL",
  EVENTS = "EVENTS",
  AFFILIATES = "AFFILIATES",
}

// React setState type
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
export type SetState<S> = Dispatch<SetStateAction<S>>;

export enum CrmIntegrations {
  HUBSPOT = "hubspot",
  SALESFORCE = "salesforce",
  PIPEDRIVE = "pipedrive",
}

export interface Crm {
  key: CrmIntegrations;
  name: string;
  logo: JSX.Element;
}

export enum ConfirmationStages {
  UNCONFIRMED,
  CONFIRMED,
}

export interface Option {
  value: string;
  label: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export enum OAuthGrantType {
  AUTHORIZATION_CODE = "authorization_code",
  IMPLICIT = "implicit",
  CLIENT_CREDENTIALS = "client_credentials",
  PASSWORD = "password",
  REFRESH_TOKEN = "refresh_token",
}

export type HubspotTokens = z.infer<typeof hubspotTokensSchema>;

export type Trigger = z.infer<typeof triggerSchema>;

export interface NavigationGroupLinks {
  groupName: string;
  groupActionIcon?: JSX.Element;
  links: { name: string; key: string; href: string }[];
}

export interface GeneralNavigationLink {
  name: string;
  key: string;
  href: string;
}

export interface LocalAttributionModel {
  [key: string]: JSX.Element;
}

export enum ToggleMode {
  ENABLE = "enable",
  DISABLE = "disable",
}

enum SyncStatus {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
}

export interface SyncedIntegrations {
  name: string;
  type: IntegrationType;
  syncStatus: SyncStatus;
  lastSynced: Date | undefined;
}

export enum IntegrationTypeMap {
  CRM = "Crm",
  PAID_CHANNEL = "Ads network",
}

export enum SyncStatusMap {
  CONNECTED = "Connected",
  DISCONNECTED = "Not connected",
}

export interface EnrichedVisitorSession {
  visitorSession: VisitorSession;
  channel: Channel;
}

export type ApiResponse<T> =
  | undefined
  | T
  | {
      errorKey: ERROR_KEYS;
    };

export function hasErrorKey(
  obj: ApiResponse<any>,
): obj is { errorKey: ERROR_KEYS } {
  return "errorKey" in obj;
}
