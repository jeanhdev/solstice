import { addDays, formatISO, startOfSecond } from "date-fns";
import { desc } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import ip from "ip";
import { random, sample } from "lodash";

import { NewVisitorEvent, visitorEvents } from "@cosmos/tables/visitor-events";

export async function generateUserEvents({
  client,
  numberOfEventsPerUser,
  maxNumberOfEvents,
  endDate = addDays(getTomorrow(), 100),
}: {
  client: PostgresJsDatabase;
  numberOfEventsPerUser: number;
  maxNumberOfEvents: number;
  endDate?: Date;
}) {
  const latestEvent = await client
    .select({
      createdAt: visitorEvents.createdAt,
    })
    .from(visitorEvents)
    .orderBy(desc(visitorEvents.createdAt))
    .execute()
    .then((r) => r[0]);

  const events: NewVisitorEvent[] = [];

  const minEventIntervalMs = 120000;
  const maxEventIntervalMs = 180000;

  let currentTime: number;

  if (latestEvent) {
    currentTime = startOfSecond(new Date(latestEvent.createdAt)).getTime();
    endDate = addDays(currentTime, 15);
  } else {
    currentTime = startOfSecond(new Date()).getTime();
  }

  const endTime = endDate.getTime();

  console.log(
    `Generating ${maxNumberOfEvents} events between ${formatISO(
      currentTime,
    )} and ${formatISO(endTime)}...`,
  );

  while (events.length < maxNumberOfEvents && currentTime < endTime) {
    const anonymousId = getRandomAnonymousId();
    const randomIp = getRandomIp();

    const pathnameSequence = getRandomEventSequence();
    const randomCompany =
      clientsWebsite[Math.floor(Math.random() * clientsWebsite.length)];

    for (let i = 0; i < numberOfEventsPerUser; i++) {
      if (events.length >= maxNumberOfEvents) {
        break;
      }

      const email = Math.random() <= 0.7 ? getRandomEmail() : null;
      const randomPathname = pathnameSequence[i % pathnameSequence.length];
      const randomUTM = utms[Math.floor(Math.random() * utms.length)];
      const randomHref =
        Math.random() >= 0.5
          ? `https://www.${randomCompany.domain}${randomPathname}?utm_source=${randomUTM.source}&utm_medium=${randomUTM.medium}&utm_campaign=${randomUTM.campaign}`
          : `https://www.${randomCompany.domain}${randomPathname}`;

      events.push({
        createdAt: formatISO(currentTime),
        updatedAt: formatISO(currentTime),
        name: "pageview",
        anonymousId,
        ip: randomIp,
        href: randomHref,
        hostname: new URL(`https://www.${randomCompany.domain}`).hostname,
        scriptVersion: scriptVersions[0],
        referrer: null,
        email,
      });

      currentTime += random(minEventIntervalMs, maxEventIntervalMs);
    }

    currentTime += random(minEventIntervalMs, maxEventIntervalMs);
  }

  return { events };
}

const firstPartyCompanies = [
  {
    name: "Random Company",
    domain: "random.com",
    ip: "172.217.7.438",
  },
];

export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);
  return tomorrow;
};

export function getRandomAnonymousId(): string {
  const hexDigits = "0123456789abcdef";
  let uuid = "";

  for (let i = 0; i < 32; i++) {
    const randomHexDigit = Math.floor(Math.random() * 16);
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += hexDigits[randomHexDigit];
  }
  return uuid;
}

export const clientsWebsite = [{ name: "Solstice", domain: "getsolstice.com" }];

export const utms = [
  { source: "google", medium: "cpc", campaign: "fall_sale" },
  { source: "google", medium: "cpc", campaign: "autumn_sale" },
  { source: "linkedin", medium: "cpc", campaign: "summer_sale" },
  { source: "facebook", medium: "social", campaign: "spring_sale" },
  { source: "twitter", medium: "social", campaign: "winter_sale" },
];

export function getRandomReferrer(): string {
  const referrers = [
    "https://www.google.com/",
    "https://www.facebook.com/",
    "https://www.linkedin.com/",
    "https://www.twitter.com/",
  ];
  return referrers[Math.floor(Math.random() * referrers.length)];
}

export function getRandomEmail(): string {
  const emailDomains = [
    // Real from mocked Hubspot account
    "dabz.com",
    "linktype.com",
    "browseblab.com",
    "jayo.com",
    "pixonyx.com",
    "meeveo.com",
    "avavee.com",
    "skyba.com",
    "midel.com",
    "wordtune.com",
    "youspan.com",
    "twimm.com",
    "omba.com",
    "wikibox.com",
    "miboo.com",
    "agivu.com",
    "tazzy.com",
    "dabtype.com",
    "bubblebox.com",
    "blogtag.com",
    "einti.com",
    "blognation.com",
    "vimbo.com",
    "wordware.com",
    "zoomcast.com",
    "twitterlist.com",
    "brightbean.com",
    "oyoloo.com",
    "mybuzz.com",
    "skippad.com",
    "ntags.com",
    "lazzy.com",
    "demivee.com",
    "topdrive.com",
    "voonte.com",
    "thoughtblab.com",
    "chatterbridge.com",
    "cogilith.com",
    "nlounge.com",
    "centidel.com",
    "devcast.com",
    "browsetype.com",
    "skinix.com",
    "twinte.com",
    "jaxworks.com",
    "plambee.com",
    "feedmix.com",
    "yadel.com",
    "quaxo.com",
    "abatz.com",
    "oyoyo.com",
    "zooveo.com",
    "skiba.com",
    "babbleopia.com",
    "eare.com",
    "yakijo.com",
    "zava.com",
    "latz.com",
    "flashset.com",
    "yozio.com",
    "wordpedia.com",
    "babbleset.com",
    "livetube.com",
    "jaloo.com",
    "jatri.com",
    "jamia.com",
    "aibox.com",
    "rhycero.com",
    "yodel.com",
    "avamm.com",
    "jabbertype.com",
    "dabfeed.com",
    "linklinks.com",
    "jabbersphere.com",
    "zoovu.com",
    "blogtags.com",
    "innoz.com",
    "avamba.com",
    "yodo.com",
    "yombu.com",
    "zoombox.com",
    "skynoodle.com",
    "meejomeemm.com",
    "myworks.com",
    "skaboo.com",
    "yakidoo.com",
    "flashpoint.com",
    "oyope.com",
    "pixope.com",
    "youtags.com",
    "mita.com",
    "realbridge.com",
    "tagtune.com",
    "edgeclub.com",
    "devshare.com",
    "devify.com",
    "mydo.com",
    "fivespan.com",
    "fatz.com",
    "camido.com",
    "kazu.com",
    "yamia.com",
    "flashdog.com",
    "feednation.com",
    "ooba.com",
    "dabvine.com",
    "yabox.com",
    "flipopia.com",
    "oba.com",
    "gabtune.com",
    "twimbo.com",
    "centizu.com",
    "zoozzy.com",
    "browsedrive.com",
    "skalith.com",
    "voolia.com",
    "cogibox.com",
    "twitternation.com",
    "quimm.com",
    "brainverse.com",
    "meezzy.com",
    "innojam.com",
    "yoveo.com",
    "viva.com",
    "jumpxs.com",
    "mycat.com",
    "voonix.com",
    "kwilith.com",
    "roomm.com",
    "photojam.com",
    "topicstorm.com",
    "vitz.com",
    "yambee.com",
    "oodoo.com",
    "abata.com",
    "trilith.com",
    "edgetag.com",
    "bubbletube.com",
    "muxo.com",
    "avaveo.com",
    "twinder.com",
    "realcube.com",
    "blogspan.com",
    "skyvu.com",
    "bubblemix.com",
    "jetwire.com",
    "minyx.com",
    "eire.com",
    "feedfish.com",
    "kaymbo.com",
    "browsebug.com",
    "yodoo.com",
    "yata.com",
    "skinte.com",
    "mydeo.com",
    "rhyzio.com",
    "dynabox.com",
    "npath.com",
    "feedfire.com",
    "thoughtstorm.com",
    "thoughtsphere.com",
    "rooxo.com",
    "eamia.com",
    "blogpad.com",
    "ntag.com",
    "photobug.com",
    "gabvine.com",
    "gabtype.com",
    "fivebridge.com",
    "yotz.com",
    "skyndu.com",
    "digitube.com",
    "jaxnation.com",
    "tekfly.com",
    "photofeed.com",
    "janyx.com",
    "rhynyx.com",
    "leenti.com",
    "edgepulse.com",
    "yakitri.com",
    "bluejam.com",
    "agimba.com",
    "gevee.com",
    "jazzy.com",
    "fanoodle.com",
    "eayo.com",
    "browsecat.com",
    "eazzy.com",
    "quinu.com",
    "izio.com",
    "gabspot.com",
    "brainsphere.com",
    "devbug.com",
    "cogidoo.com",
    "gigashots.com",
    "blogxs.com",
    "eidel.com",
    "zoonoodle.com",
    "topiczoom.com",
    "youbridge.com",
    // Fake companies
    "1musicrow.com",
    "1netdrive.com",
    "1nsyncfan.com",
    "1pad.de",
    "1under.com",
    "1webave.com",
    "1webhighway.com",
    "1zhuan.com",
    "2-mail.com",
    "20email.eu",
    "20mail.in",
    "20mail.it",
    "212.com",
    "21cn.com",
    "24horas.com",
    "2911.net",
    "2980.com",
  ];

  const randomEmailDomain =
    emailDomains[Math.floor(Math.random() * emailDomains.length)];

  const emailIdentities = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Doe" },
    { firstName: "Mark", lastName: "Smith" },
    { firstName: "Sarah", lastName: "Lee" },
    { firstName: "Tom", lastName: "Williams" },
    { firstName: "Emily", lastName: "Taylor" },
  ];

  const randomIdentity =
    emailIdentities[Math.floor(Math.random() * emailIdentities.length)];

  return `${randomIdentity.firstName}.${randomIdentity.lastName}@${randomEmailDomain}`.toLowerCase();
}

export function getRandomIp(): string {
  const shouldUseRealIp = Math.random() <= 0.7;

  if (shouldUseRealIp) {
    const randomCompany = sample(firstPartyCompanies);
    const randomIpAddress = randomCompany!.ip!;
    return randomIpAddress;
  } else {
    return ip.fromLong(
      Math.floor(
        Math.random() * (ip.toLong("255.255.255.255") - ip.toLong("1.0.0.0")),
      ) + ip.toLong("1.0.0.0"),
    );
  }
}

export function getRandomEventSequence(): string[] {
  const eventSequences = [
    ["/products", "/features", "/pricing", "/contact-us"],
    ["/solutions", "/case-studies", "/blog", "/about-us"],
    ["/resources", "/news", "/events", "/webinars"],
  ];
  return eventSequences[Math.floor(Math.random() * eventSequences.length)];
}

export const scriptVersions = ["0.0.1"];

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function chunkArrayInGroups({
  arr,
  size,
}: {
  arr: any[];
  size: number;
}) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}
