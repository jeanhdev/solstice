import {
  Affiliates,
  BlogIcon,
  Email,
  Events,
  SearchIcon,
  StarIcon,
} from "@nebula/ui/svgs";
import { OrganicChannels } from "@nebula/types";

export default function OrganicIcon({
  channel,
  classNames,
}: {
  channel: OrganicChannels;
  classNames: string;
}) {
  if (channel === OrganicChannels.BLOG) {
    return <BlogIcon className={classNames} />;
  }
  if (channel === OrganicChannels.PRODUCTS) {
    return <StarIcon className={classNames} />;
  }
  if (channel === OrganicChannels.SEARCH) {
    return <SearchIcon className={classNames} />;
  }
  if (channel === OrganicChannels.EMAIL) {
    return <Email className={classNames} />;
  }
  if (channel === OrganicChannels.AFFILIATES) {
    return <Affiliates className={classNames} />;
  }
  if (channel === OrganicChannels.EVENTS) {
    return <Events className={classNames} />;
  }
  return null;
}
